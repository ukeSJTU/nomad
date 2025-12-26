import { execSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pino from "pino";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const appDir = path.join(repoRoot, "app");

const DISALLOWED_IMPORT_PREFIXES = ["@/db", "@/domains"];
const ALLOWED_IMPORT_PREFIXES = ["@/config/errors", "@/db/schema/ancillary"];
const IGNORED_DIRECTORIES = [
  path.join(appDir, "_actions"),
  path.join(appDir, "api"),
];
const IGNORED_FILENAMES = new Set(["page.tsx"]);
const TARGET_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"]);
const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "yyyy-mm-dd HH:MM:ss",
      ignore: "pid,hostname",
    },
  },
});

const args = new Set(process.argv.slice(2));
const useStagedFiles = args.has("--staged");

function isAllowedImport(specifier) {
  return ALLOWED_IMPORT_PREFIXES.some(
    allowed => specifier === allowed || specifier.startsWith(`${allowed}/`)
  );
}

function isRestricted(specifier) {
  if (
    !DISALLOWED_IMPORT_PREFIXES.some(prefix => specifier.startsWith(prefix))
  ) {
    return false;
  }

  return !isAllowedImport(specifier);
}

function shouldSkipFile(filePath) {
  if (!TARGET_EXTENSIONS.has(path.extname(filePath))) {
    return true;
  }

  if (IGNORED_FILENAMES.has(path.basename(filePath))) {
    return true;
  }

  return IGNORED_DIRECTORIES.some(ignorePath =>
    filePath.startsWith(ignorePath)
  );
}

function collectAppFiles(directory) {
  const entries = readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectAppFiles(fullPath));
    } else if (entry.isFile() && !shouldSkipFile(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

function collectStagedFiles() {
  try {
    const staged = execSync("git diff --cached --name-only --diff-filter=ACM", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);

    return staged
      .map(relative => path.resolve(repoRoot, relative))
      .filter(filePath => filePath.startsWith(appDir))
      .filter(filePath => !shouldSkipFile(filePath))
      .filter(filePath => statSafe(filePath)?.isFile());
  } catch {
    return [];
  }
}

function statSafe(filePath) {
  try {
    return statSync(filePath);
  } catch {
    return null;
  }
}

function findRestrictedImports(filePath) {
  const content = readFileSync(filePath, "utf8");
  const violations = [];
  const lines = content.split("\n");

  const importRegex =
    /(?:import|export)\s+(?:[^'"();]*?\s+from\s+)?["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g;

  lines.forEach((line, index) => {
    for (const match of line.matchAll(importRegex)) {
      const specifier = match[1] ?? match[2];

      if (specifier && isRestricted(specifier)) {
        violations.push({
          file: filePath,
          line: index + 1,
          specifier,
        });
      }
    }
  });

  return violations;
}

function main() {
  if (!statSafe(appDir)?.isDirectory()) {
    return;
  }

  const files = useStagedFiles ? collectStagedFiles() : collectAppFiles(appDir);
  const errors = [];

  for (const filePath of files) {
    errors.push(...findRestrictedImports(filePath));
  }

  if (errors.length > 0) {
    logger.error(
      "App boundary check failed. Use server actions/API clients instead of importing domains/DB modules directly."
    );
    errors.forEach(error => {
      const relative = path.relative(repoRoot, error.file);
      logger.error(`- ${relative}:${error.line} → ${error.specifier}`);
    });
    process.exitCode = 1;
    return;
  }

  if (!useStagedFiles) {
    logger.info("✅ App boundary check passed.");
  }
}

main();

import { glob as globSync } from "glob";

/**
 * Find test files matching the given pattern
 * @param pattern - Glob pattern to match (e.g., "**\/*.test.ts")
 * @param cwd - Current working directory (defaults to apps/web)
 * @returns Array of absolute file paths
 */
export async function findTestFiles(
  pattern: string,
  cwd?: string
): Promise<string[]> {
  const workingDir = cwd || process.cwd();

  const files = await globSync(pattern, {
    cwd: workingDir,
    absolute: true,
    ignore: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
  });

  return files;
}

/**
 * Get default test file patterns for apps/web
 */
export function getDefaultTestPatterns(): string[] {
  return [
    "app/**/*.test.ts",
    "app/**/*.test.tsx",
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
  ];
}

/**
 * Find all test files in apps/web using default patterns
 */
export async function findAllTestFiles(webAppPath: string): Promise<string[]> {
  const patterns = getDefaultTestPatterns();
  const allFiles: string[] = [];

  for (const pattern of patterns) {
    const files = await findTestFiles(pattern, webAppPath);
    allFiles.push(...files);
  }

  // Remove duplicates
  return [...new Set(allFiles)];
}

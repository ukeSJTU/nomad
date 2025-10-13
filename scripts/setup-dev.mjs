#!/usr/bin/env node

/**
 * Development environment setup script
 *
 * This script automatically completes the following tasks:
 * 1. Check base environment (Node.js, pnpm versions)
 * 2. Install project dependencies
 * 3. Configure Playwright browsers
 * 4. Set up Git hooks
 * 5. Create environment file
 * 6. Verify configuration
 * 7. Show next steps
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color utilities
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

// Logging helper functions
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n[${step}] ${message}`, colors.blue + colors.bright);
}

function logSuccess(message) {
  log(`* ${message}`, colors.green);
}

function logWarning(message) {
  log(`* ${message}`, colors.yellow);
}

function logError(message) {
  log(`* ${message}`, colors.red);
}

function logInfo(message) {
  log(`  ${message}`, colors.cyan);
}

// Helper function to execute commands
function execCommand(command, options = {}) {
  try {
    return execSync(command, {
      stdio: options.silent ? "pipe" : "inherit",
      encoding: "utf-8",
      ...options,
    });
  } catch (error) {
    if (!options.ignoreError) {
      throw error;
    }
    return null;
  }
}

// Check if command exists
function commandExists(command) {
  try {
    execCommand(`command -v ${command}`, { silent: true });
    return true;
  } catch {
    return false;
  }
}

// Get version number
function getVersion(command) {
  try {
    const output = execCommand(command, { silent: true });
    const match = output.match(/\d+\.\d+\.\d+/);
    return match ? match[0] : null;
  } catch {
    return null;
  }
}

// Compare version numbers
function compareVersions(version1, version2) {
  const v1Parts = version1.split(".").map(Number);
  const v2Parts = version2.split(".").map(Number);

  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const v1 = v1Parts[i] || 0;
    const v2 = v2Parts[i] || 0;

    if (v1 > v2) return 1;
    if (v1 < v2) return -1;
  }

  return 0;
}

// 1. Check base environment
async function checkEnvironment() {
  logStep("1/7", "检查基础环境");

  // Read package.json to get version requirements
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../package.json"), "utf-8")
  );

  const requiredNode = packageJson.engines?.node || ">=20.15.0";
  const requiredPnpm = packageJson.engines?.pnpm || ">=10.0.0";

  // Check Node.js
  logInfo("检查 Node.js 版本...");
  if (!commandExists("node")) {
    logError("未找到 Node.js，请先安装 Node.js");
    logInfo(`要求版本: ${requiredNode}`);
    logInfo("下载地址: https://nodejs.org/");
    process.exit(1);
  }

  const nodeVersion = getVersion("node --version");
  const minNodeVersion = requiredNode.replace(/[^0-9.]/g, "");

  if (compareVersions(nodeVersion, minNodeVersion) < 0) {
    logError(`Node.js 版本过低: ${nodeVersion}`);
    logInfo(`要求版本: ${requiredNode}`);
    logInfo("请升级 Node.js: https://nodejs.org/");
    process.exit(1);
  }

  logSuccess(`Node.js 版本: ${nodeVersion} (符合要求)`);

  // Check pnpm
  logInfo("检查 pnpm 版本...");
  if (!commandExists("pnpm")) {
    logError("未找到 pnpm，请先安装 pnpm");
    logInfo("安装命令: npm install -g pnpm");
    logInfo("或访问: https://pnpm.io/installation");
    process.exit(1);
  }

  const pnpmVersion = getVersion("pnpm --version");
  const minPnpmVersion = requiredPnpm.replace(/[^0-9.]/g, "");

  if (compareVersions(pnpmVersion, minPnpmVersion) < 0) {
    logWarning(`pnpm 版本较低: ${pnpmVersion}`);
    logInfo(`推荐版本: ${requiredPnpm}`);
    logInfo("升级命令: pnpm add -g pnpm");
  } else {
    logSuccess(`pnpm 版本: ${pnpmVersion} (符合要求)`);
  }

  // Check Git
  logInfo("检查 Git...");
  if (!commandExists("git")) {
    logWarning("未找到 Git，将跳过 Git hooks 配置");
  } else {
    const gitVersion = getVersion("git --version");
    logSuccess(`Git 版本: ${gitVersion}`);
  }

  logSuccess("基础环境检查完成");
}

// 2. Install dependencies
async function installDependencies() {
  logStep("2/7", "安装项目依赖");

  try {
    logInfo("正在安装依赖（这可能需要几分钟）...");
    execCommand("pnpm install --frozen-lockfile");
    logSuccess("依赖安装完成");
  } catch (error) {
    logError("依赖安装失败");
    throw error;
  }
}

// 3. Setup Playwright
async function setupPlaywright() {
  logStep("3/7", "配置 Playwright 测试浏览器");

  try {
    logInfo("正在下载 Playwright 浏览器（这可能需要几分钟）...");
    execCommand("pnpm exec playwright install chromium");
    logSuccess("Playwright 浏览器配置完成");
  } catch (error) {
    logWarning("Playwright 浏览器安装失败，但不影响基础开发");
    logInfo("稍后可以手动运行: pnpm exec playwright install");
  }
}

// 4. Setup Git hooks
async function setupGitHooks() {
  logStep("4/7", "设置 Git Hooks");

  if (!commandExists("git")) {
    logWarning("未安装 Git，跳过 Git hooks 设置");
    return;
  }

  try {
    execCommand("git rev-parse --git-dir", { silent: true });
  } catch {
    logWarning("不在 Git 仓库中，跳过 Git hooks 设置");
    return;
  }

  try {
    logInfo("正在配置 Husky...");
    execCommand("pnpm exec husky install");
    logSuccess("Git hooks 设置完成");
  } catch (error) {
    logWarning("Git hooks 设置失败，但不影响基本开发");
    logInfo("稍后可以手动运行: pnpm prepare");
  }
}

// 5. Setup environment file
async function setupEnvFile() {
  logStep("5/7", "配置环境变量文件");

  const envPath = path.join(__dirname, "../.env");
  const envExamplePath = path.join(__dirname, "../.env.example");

  if (fs.existsSync(envPath)) {
    logInfo(".env 文件已存在，跳过创建");
    return;
  }

  if (!fs.existsSync(envExamplePath)) {
    logWarning(".env.example 文件不存在，跳过 .env 创建");
    return;
  }

  try {
    fs.copyFileSync(envExamplePath, envPath);
    logSuccess(".env 文件已创建（基于 .env.example）");
    logWarning("请编辑 .env 文件并填写必要的配置信息");
  } catch (error) {
    logWarning(".env 文件创建失败，请手动复制 .env.example");
  }
}

// 6. Verify setup
async function verifySetup() {
  logStep("6/7", "验证配置");

  const checks = {
    依赖安装: fs.existsSync(path.join(__dirname, "../node_modules")),
    "TypeScript 配置": checkTypeScript(),
    "ESLint 配置": fs.existsSync(path.join(__dirname, "../eslint.config.mjs")),
    "Playwright 配置": fs.existsSync(
      path.join(__dirname, "../playwright.config.ts")
    ),
    "Drizzle 配置": fs.existsSync(path.join(__dirname, "../drizzle.config.ts")),
    "Next.js 配置": fs.existsSync(path.join(__dirname, "../next.config.ts")),
  };

  let allPassed = true;

  for (const [name, passed] of Object.entries(checks)) {
    if (passed) {
      logSuccess(`${name}: 正常`);
    } else {
      logWarning(`${name}: 缺失`);
      allPassed = false;
    }
  }

  if (allPassed) {
    logSuccess("所有配置验证通过");
  } else {
    logWarning("部分配置缺失，但不影响基本开发");
  }
}

function checkTypeScript() {
  try {
    execCommand("pnpm exec tsc --version", { silent: true });
    return true;
  } catch {
    return false;
  }
}

// 7. Show next steps
async function showNextSteps() {
  logStep("7/7", "配置完成");

  log("\n" + "=".repeat(60), colors.green);
  log("* 开发环境初始化完成", colors.green + colors.bright);
  log("=".repeat(60), colors.green);

  log("\n后续步骤:", colors.cyan + colors.bright);
  log("");

  const steps = [
    {
      title: "1. 配置环境变量",
      commands: [
        "   编辑 .env 文件，填写必要的配置信息",
        "   特别是数据库连接字符串 (DATABASE_URL)",
      ],
    },
    {
      title: "2. 启动开发服务器",
      commands: ["   pnpm dev"],
    },
    {
      title: "3. 运行测试",
      commands: [
        "   pnpm test          # 运行单元测试",
        "   pnpm e2e           # 运行端到端测试",
      ],
    },
    {
      title: "4. 数据库操作",
      commands: [
        "   pnpm db:push       # 推送数据库 schema",
        "   pnpm db:studio     # 打开数据库管理界面",
      ],
    },
    {
      title: "5. 生成 API 文档",
      commands: ["   pnpm api:generate  # 生成 OpenAPI 文档"],
    },
    {
      title: "6. 代码检查和格式化",
      commands: [
        "   pnpm lint          # 运行 ESLint",
        "   pnpm format        # 格式化代码",
      ],
    },
  ];

  for (const step of steps) {
    log(`\n${step.title}`, colors.cyan);
    for (const cmd of step.commands) {
      log(cmd, colors.reset);
    }
  }

  log("\n" + "=".repeat(60), colors.cyan);
  log("更多信息:", colors.cyan + colors.bright);
  log("  * 查看 README.md 了解项目详情", colors.cyan);
  log("  * 查看 docs/ 目录了解开发规范", colors.cyan);
  log("=".repeat(60) + "\n", colors.cyan);
}

// Main function
async function main() {
  log("\n" + "=".repeat(60), colors.cyan);
  log("Nomad 开发环境初始化", colors.cyan + colors.bright);
  log("=".repeat(60) + "\n", colors.cyan);

  try {
    await checkEnvironment();
    await installDependencies();
    await setupPlaywright();
    await setupGitHooks();
    await setupEnvFile();
    await verifySetup();
    await showNextSteps();

    process.exit(0);
  } catch (error) {
    log("\n" + "=".repeat(60), colors.red);
    log("* 初始化过程中发生错误", colors.red + colors.bright);
    log("=".repeat(60), colors.red);
    logError(error.message);

    if (error.stack) {
      log("\n详细错误信息:", colors.red);
      console.error(error.stack);
    }

    log("\n如需帮助，请:", colors.yellow);
    log("  1. 检查错误信息并尝试手动执行失败的步骤");
    log("  2. 查看项目文档");
    log("  3. 联系项目维护者\n");

    process.exit(1);
  }
}

// Run main function
main();

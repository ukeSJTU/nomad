import pino from "pino";

import { getEnv, isDevelopment, isProduction, isTest } from "@/config/env";

const VALID_LOG_LEVELS: pino.LevelWithSilent[] = [
  "fatal",
  "error",
  "warn",
  "info",
  "debug",
  "trace",
  "silent",
];

/**
 * Determines the appropriate log level based on the current environment.
 *
 * Priority order:
 * 1. Test environment: silent (no logs during tests)
 * 2. LOG_LEVEL from parsed env if valid
 * 3. Development: debug
 * 4. Production / others: info
 */
export const getLogLevel = (): pino.LevelWithSilent => {
  // 1) 测试环境：完全静音，避免干扰 Vitest
  if (isTest()) return "silent";

  const env = getEnv();

  // 2) 显式 LOG_LEVEL 优先（同时保证是合法值）
  const raw = env.LOG_LEVEL?.trim().toLowerCase();
  if (raw && VALID_LOG_LEVELS.includes(raw as pino.LevelWithSilent)) {
    return raw as pino.LevelWithSilent;
  }

  // 3) 按 NODE_ENV 默认值
  const nodeEnv = env.NODE_ENV?.trim().toLowerCase();
  if (nodeEnv === "development") return "debug";

  // 默认：包括 production / undefined / 其他未知环境
  return "info";
};

/**
 * Creates the appropriate stream for the logger based on environment.
 * - development（非 test）下尝试使用 pino-pretty
 * - 其他环境直接用 stdout（结构化日志）
 *
 * 注意：这里对 require("pino-pretty") 做了 try/catch，
 * 以避免在 ESM / 浏览器打包环境里直接崩溃。
 */
export const createLoggerStream = () => {
  // 只在开发环境且非 test 时尝试 pretty 输出
  if (isDevelopment() && !isTest()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const pretty = require("pino-pretty") as typeof import("pino-pretty");
      return pretty({
        colorize: true,
        ignore: "pid,hostname",
        translateTime: "yyyy-mm-dd HH:MM:ss",
        singleLine: false,
        hideObject: false,
      });
    } catch {
      // 在 Storybook / Playwright / 浏览器构建等环境里 require 失败时，退回 stdout
      return process.stdout;
    }
  }

  // Production / Test / 其他环境：统一走 stdout
  return process.stdout;
};

/**
 * pino 配置，根据环境做差异化配置。
 */
const pinoOptions: pino.LoggerOptions = {
  level: getLogLevel(),
  base: {
    service: "nomad",
    environment: process.env.NODE_ENV ?? "development",
  },
  messageKey: "message",
  redact: {
    paths: REDACT_PATHS,
    censor: "[REDACTED]",
  },

  // Production：结构化日志 + ISO 时间戳
  ...(isProduction() && {
    formatters: {
      level: label => ({ level: label }),
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  }),

  // Development：增加 HTTP / Error 序列化，便于调试
  ...(isDevelopment() && {
    serializers: {
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res,
      err: pino.stdSerializers.err,
    },
  }),

  // Test 环境下 pino 本身就会因为 level=silent 而不输出，
  // 这里不需要额外配置；如果你想更彻底，也可以加 enabled: !isTest()
  ...(isTest() && {
    enabled: false,
  }),
};

/**
 * 全局 logger 实例。
 *
 * - test: level=silent + enabled=false，不产生多余输出/异步句柄
 * - dev: pretty 输出 + debug 级别
 * - prod: 结构化 JSON 日志 + info 级别
 */
export const logger = pino(pinoOptions, createLoggerStream());

// 保留 default export，兼容老代码 `import logger from "@/infra/logging"`
export default logger;

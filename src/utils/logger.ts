import pino from "pino";

import { isDevelopment, isProduction, isTest } from "@/utils/env";

// Environment detection flags for conditional logger configuration
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
 * @returns The log level to use for the pino logger
 *
 * Priority order:
 * 1. Test environment: silent (no logs during tests)
 * 2. LOG_LEVEL environment variable if set
 * 3. Development: debug level for detailed logging
 * 4. Production: info level for essential logs only
 */
const getLogLevel = (): pino.LevelWithSilent => {
  if (isTest()) return "silent";
  if (process.env.LOG_LEVEL) {
    const envLevel = process.env.LOG_LEVEL as pino.LevelWithSilent;
    // Validate the environment variable
    if (VALID_LOG_LEVELS.includes(envLevel)) {
      return envLevel;
    }
    console.warn(`Invalid LOG_LEVEL: ${process.env.LOG_LEVEL}, using default`);
  }
  return isDevelopment() ? "debug" : "info";
};

// Configuration object for the pino logger with environment-specific settings
const pinoOptions: pino.LoggerOptions = {
  level: getLogLevel(),

  // Production environment configuration
  // Optimized for structured logging in production systems
  ...(isProduction() && {
    formatters: {
      // Use simple level labels instead of numeric values
      level: label => ({ level: label }),
    },
    // Use ISO timestamp format for better log aggregation
    timestamp: pino.stdTimeFunctions.isoTime,
  }),

  // Development environment configuration
  // Enhanced with request/response/error serializers for debugging
  ...(isDevelopment() && {
    serializers: {
      req: pino.stdSerializers.req, // HTTP request serializer
      res: pino.stdSerializers.res, // HTTP response serializer
      err: pino.stdSerializers.err, // Error object serializer
    },
  }),
};

// 说明：避免在测试环境同步引入 pino-pretty，使用顶层 await 按需加载以防止阻塞
const loggerStream = await (async () => {
  if (isDevelopment() && !isTest()) {
    const { default: pretty } = await import("pino-pretty");
    return pretty({
      colorize: true,
      ignore: "pid,hostname",
      translateTime: "yyyy-mm-dd HH:MM:ss",
      singleLine: false,
      hideObject: false,
    });
  }
  return process.stdout;
})();

/**
 * Configured pino logger instance.
 *
 * Features:
 * - Environment-aware log levels (debug in dev, info in prod, silent in test)
 * - Pretty printing in development using streams (avoids worker thread issues)
 * - Structured logging in production with ISO timestamps
 * - Built-in serializers for HTTP requests, responses, and errors
 * - Configurable via LOG_LEVEL environment variable
 * - Stream-based approach prevents pnpm/ESM module resolution issues
 *
 * Usage:
 * ```typescript
 * import logger from './utils/logger';
 *
 * logger.info('Application started');
 * logger.error({ err: error }, 'Something went wrong');
 * logger.debug({ req, res }, 'Request processed');
 * ```
 */
const logger = pino(pinoOptions, loggerStream);

export default logger;

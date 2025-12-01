import { createRequire } from "module";
import pino from "pino";

import { isDevelopment, isProduction, isTest } from "@/config/env";

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
  const raw = process.env.LOG_LEVEL?.trim().toLowerCase();
  if (raw) {
    const envLevel = raw as pino.LevelWithSilent;
    if (VALID_LOG_LEVELS.includes(envLevel)) {
      return envLevel;
    }
    console.warn(`Invalid LOG_LEVEL: ${raw}, using default`);
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

/**
 * Creates the appropriate stream for the logger based on environment.
 * Uses pino-pretty stream in development for better readability.
 * Uses standard process.stdout in production for structured logging.
 */
const createLoggerStream = () => {
  if (isDevelopment() && !isTest()) {
    const require = createRequire(import.meta.url);
    const pretty = require("pino-pretty");
    return pretty({
      colorize: true, // Add colors to log levels
      ignore: "pid,hostname", // Hide process ID and hostname for cleaner output
      translateTime: "yyyy-mm-dd HH:MM:ss", // Human-readable timestamp format
      singleLine: false, // Multi-line formatting for better readability
      hideObject: false, // Show log objects in full detail
    });
  }

  // Production/Test: Use standard output for structured logging
  return process.stdout;
};

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
const logger = pino(pinoOptions, createLoggerStream());

export default logger;

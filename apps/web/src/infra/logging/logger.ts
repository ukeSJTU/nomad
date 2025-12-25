import pino from "pino";
import pretty from "pino-pretty";

import {
  getLogLevel as envGetLogLevel,
  isDevelopment,
  isTest,
} from "@/config/env";

const bootstrapLogger = pino({
  level: "warn",
  base: {
    service: "nomad",
    environment: isTest()
      ? "test"
      : isDevelopment()
        ? "development"
        : "production",
  },
  messageKey: "message",
});

const REDACT_PATHS = [
  "req.headers.authorization",
  "req.headers.cookie",
  "headers.authorization",
  "headers.cookie",
  "password",
  "token",
  "otp",
  "verificationCode",
];

const resolveLogLevel = (): pino.LevelWithSilent => {
  if (isTest()) return "silent";
  try {
    return envGetLogLevel();
  } catch {
    const envLevel = process.env.LOG_LEVEL;
    bootstrapLogger.warn(
      { envLevel },
      "Invalid LOG_LEVEL provided, falling back to default"
    );
    return isDevelopment() ? "debug" : "info";
  }
};

// Configuration object for the pino logger with environment-specific settings
const pinoOptions: pino.LoggerOptions = {
  level: resolveLogLevel(),
  base: {
    service: "nomad",
    environment: isTest()
      ? "test"
      : isDevelopment()
        ? "development"
        : "production",
  },
  messageKey: "message",
  redact: {
    paths: REDACT_PATHS,
    censor: "[REDACTED]",
  },

  // Production environment configuration
  // Optimized for structured logging in production systems
  formatters: {
    // Use simple level labels instead of numeric values
    level: label => ({ level: label }),
  },
  // Use ISO timestamp format for better log aggregation
  timestamp: pino.stdTimeFunctions.isoTime,

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
    // Development: Use pino-pretty stream for enhanced readability
    return pretty({
      messageKey: "message",
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

export const createScopedLogger = (bindings?: pino.Bindings) =>
  logger.child(bindings ?? {});

export default logger;

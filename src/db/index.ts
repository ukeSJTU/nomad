import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { EnhancedQueryLogger } from "drizzle-query-logger";

import * as schema from "@/db/schema";
import { createScopedLogger } from "@/infra/logging/logger";

// Load environment variables based on NODE_ENV
// - NODE_ENV=test → loads .env.test
// - NODE_ENV=development → loads .env.local or .env.development
// - NODE_ENV=production → loads .env.production
loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const logger = createScopedLogger({ module: "db" });

// Merge the multi-line drizzle-query-logger output into one ANSI-free message.
const buildDrizzleLogMessage = (() => {
  const ANSI_ESCAPE_REGEX = /\u001b\[[0-9;]*m/g;
  let buffer: string[] = [];

  return (message: string) => {
    const cleanedMessage = message.replace(ANSI_ESCAPE_REGEX, "").trimEnd();
    if (!cleanedMessage) return;

    if (cleanedMessage.startsWith("╭─")) {
      buffer = [];
    }

    buffer.push(cleanedMessage);

    if (cleanedMessage.startsWith("╰─")) {
      logger.debug(`[Drizzle] query\n${buffer.join("\n")}`);
      buffer = [];
    }
  };
})();

const dbLogger = new EnhancedQueryLogger({
  log: message => {
    buildDrizzleLogMessage(message);
  },
});

/**
 * Determine whether to use SSL for database connections
 * Priority:
 * 1. Explicit DATABASE_SSL environment variable (true/false)
 * 2. Auto-detect from DATABASE_URL (sslmode parameter)
 * 3. Default based on NODE_ENV (production = true, others = false)
 */
function shouldUseSSL(): boolean {
  // Check explicit DATABASE_SSL environment variable
  const explicitSSL = process.env.DATABASE_SSL?.toLowerCase();
  if (explicitSSL === "true" || explicitSSL === "enabled") {
    return true;
  }
  if (explicitSSL === "false" || explicitSSL === "disabled") {
    return false;
  }

  // Auto-detect from DATABASE_URL sslmode parameter
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl?.includes("sslmode=require")) {
    return true;
  }
  if (databaseUrl?.includes("sslmode=disable")) {
    return false;
  }

  // Default: use SSL in production, disable in development/test
  return process.env.NODE_ENV === "production";
}

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: shouldUseSSL(),
  },
  schema,
  logger: process.env.NODE_ENV === "development" ? dbLogger : false,
});

import { drizzle } from "drizzle-orm/node-postgres";
import { EnhancedQueryLogger } from "drizzle-query-logger";

import * as schema from "@/lib/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const dbLogger = new EnhancedQueryLogger({
  log: message => {
    // In development, use console.log directly to avoid pino formatting issues
    console.log(message);
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

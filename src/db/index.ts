import { drizzle } from "drizzle-orm/node-postgres";
import { EnhancedQueryLogger } from "drizzle-query-logger";

import { getDbEnv } from "@/config/env";
import { ensureNodeEnvLoaded } from "@/config/load-env";
import * as schema from "@/db/schema";
import { createScopedLogger } from "@/infra/logging/logger";

// Load environment variables based on NODE_ENV
// - NODE_ENV=test → loads .env.test
// - NODE_ENV=development → loads .env.local or .env.development
// - NODE_ENV=production → loads .env.production
// Next Node Runtime 会自动注入 .env；CLI 场景使用专用加载器显式加载。
ensureNodeEnvLoaded();

const env = getDbEnv();

if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const logger = createScopedLogger({ module: "db" });

const dbLogger = new EnhancedQueryLogger({
  log: message => {
    logger.debug({ sql: message }, "[Drizzle] query");
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
  // 1) Explicit DATABASE_SSL
  const explicit = env.DATABASE_SSL;
  if (typeof explicit === "boolean") return explicit;
  if (explicit === "true") return true;
  if (explicit === "false") return false;

  // 2) Detect from DATABASE_URL
  const databaseUrl = env.DATABASE_URL;
  if (databaseUrl.includes("sslmode=require")) return true;
  if (databaseUrl.includes("sslmode=disable")) return false;

  // 3) Default by NODE_ENV
  return env.NODE_ENV === "production";
}

export const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
    ssl: shouldUseSSL(),
  },
  schema,
  logger: env.NODE_ENV === "development" ? dbLogger : false,
});

import { getEnv } from "@/config/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { EnhancedQueryLogger } from "drizzle-query-logger";

import * as schema from "@/db/schema";
import { createScopedLogger } from "@/infra/logging/logger";

// 通过集中化的 getEnv() 读取配置（内部已经处理 @next/env 加载）
const env = getEnv();

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
  // 1. 显式 DATABASE_SSL
  const explicitSSL = env.DATABASE_SSL?.toLowerCase();
  if (explicitSSL === "true" || explicitSSL === "enabled") {
    return true;
  }
  if (explicitSSL === "false" || explicitSSL === "disabled") {
    return false;
  }

  // 2. 从 DATABASE_URL 自动检测 sslmode
  const databaseUrl = env.DATABASE_URL;
  if (databaseUrl?.includes("sslmode=require")) {
    return true;
  }
  if (databaseUrl?.includes("sslmode=disable")) {
    return false;
  }

  // 3. 默认：生产环境启用 SSL，开发/测试关闭
  return env.NODE_ENV === "production";
}

export const db = drizzle({
  connection: {
    // 上面已经检查过为空就抛错了，这里用 non-null 断言
    connectionString: env.DATABASE_URL!,
    ssl: shouldUseSSL(),
  },
  schema,
  logger: env.NODE_ENV === "development" ? dbLogger : false,
});

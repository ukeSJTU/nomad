import { drizzle } from "drizzle-orm/node-postgres";
import { EnhancedQueryLogger } from "drizzle-query-logger";

import * as schema from "@/lib/schema";
import logger from "@/utils/logger";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const dbLogger = new EnhancedQueryLogger({
  log: message => {
    logger.debug(message);
  },
});

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production",
  },
  schema,
  logger: process.env.NODE_ENV === "development" ? dbLogger : false,
});

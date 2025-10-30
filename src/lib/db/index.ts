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

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production",
  },
  schema,
  logger: process.env.NODE_ENV === "development" ? dbLogger : false,
});

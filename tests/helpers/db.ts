import { getTableName, is, sql } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";

import { db } from "@/lib/db";
import * as schema from "@/lib/schema";

/**
 * Clear all test data from the database
 *
 * This function automatically truncates all tables defined in the schema.
 * It uses CASCADE to handle foreign key constraints automatically.
 *
 * Benefits:
 * - No need to manually maintain table list
 * - Automatically includes new tables when schema changes
 * - Handles foreign key constraints with CASCADE
 * - Type-safe: uses actual schema definitions
 */
export async function clearDatabase() {
  // Get all table objects from schema using Drizzle's is() helper
  const tables = Object.values(schema).filter(obj => is(obj, PgTable));

  // Truncate all tables with CASCADE
  // CASCADE automatically handles foreign key constraints
  for (const table of tables) {
    const tableName = getTableName(table);
    await db.execute(sql.raw(`TRUNCATE TABLE "${tableName}" CASCADE`));
  }
}

/**
 * Setup test database connection
 * This function can be used to initialize the test database if needed
 */
export async function setupTestDatabase() {
  // Currently, the database connection is already initialized via @/lib/db
  // This function is a placeholder for future setup needs
  // For example, running migrations, creating test schemas, etc.
}

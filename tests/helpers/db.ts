import { sql } from "drizzle-orm";

import { db } from "@/lib/db";

/**
 * Clear all test data from the database
 * This function truncates all tables in the correct order to avoid foreign key constraint violations
 */
export async function clearDatabase() {
  // Truncate tables in reverse dependency order
  // passengers depends on user, so truncate passengers first
  await db.execute(sql`TRUNCATE TABLE passengers CASCADE`);
  await db.execute(sql`TRUNCATE TABLE "user" CASCADE`);
  await db.execute(sql`TRUNCATE TABLE session CASCADE`);
  await db.execute(sql`TRUNCATE TABLE account CASCADE`);
  await db.execute(sql`TRUNCATE TABLE verification CASCADE`);
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

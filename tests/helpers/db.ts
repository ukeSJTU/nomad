import { getTableName, is, like, or, sql } from "drizzle-orm";
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
 *
 * Note: This is suitable for integration tests that run sequentially.
 * For E2E tests that may run in parallel, use clearTestData() with a test ID prefix.
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
 * Generate a unique test ID for E2E tests
 * This ensures data isolation between parallel test runs
 *
 * Format: e2e-{timestamp}-{random}
 * Example: e2e-1234567890-abc123
 *
 * @returns A unique test ID string
 */
export function generateTestId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `e2e-${timestamp}-${random}`;
}

/**
 * Create a test-prefixed email address
 * This ensures email uniqueness across parallel tests
 *
 * @param testId - The unique test ID
 * @param baseEmail - Base email (e.g., "user@example.com")
 * @returns Test-prefixed email (e.g., "e2e-123-abc@example.com")
 */
export function getTestEmail(
  testId: string,
  baseEmail: string = "user@example.com"
): string {
  const [localPart, domain] = baseEmail.split("@");
  return `${testId}-${localPart}@${domain}`;
}

/**
 * Create a test-prefixed phone number
 * This ensures phone uniqueness across parallel tests
 *
 * @param testId - The unique test ID
 * @param basePhone - Base phone number (e.g., "13800138000")
 * @returns Test-prefixed phone (e.g., "e2e-123-abc-13800138000")
 */
export function getTestPhone(
  testId: string,
  basePhone: string = "13800138000"
): string {
  return `${testId}-${basePhone}`;
}

/**
 * Create a test-prefixed username
 * This ensures username uniqueness across parallel tests
 *
 * @param testId - The unique test ID
 * @param baseName - Base username (e.g., "testuser")
 * @returns Test-prefixed username (e.g., "e2e-123-abc-testuser")
 */
export function getTestUsername(
  testId: string,
  baseName: string = "testuser"
): string {
  return `${testId}-${baseName}`;
}

/**
 * Clear test data for a specific test ID
 * This allows parallel E2E tests to clean up only their own data
 *
 * @param testId - The unique test ID to clean up
 */
export async function clearTestData(testId: string) {
  // Delete users with test ID prefix in email or phone
  await db
    .delete(schema.user)
    .where(
      or(
        like(schema.user.email, `${testId}%`),
        like(schema.user.phoneNumber, `${testId}%`)
      )
    );

  // Note: Due to CASCADE foreign key constraints, deleting users will automatically
  // delete related records in other tables (sessions, accounts, orders, etc.)
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

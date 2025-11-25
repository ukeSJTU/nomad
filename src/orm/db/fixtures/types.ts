/**
 * Fixture Type Utilities
 *
 * This file provides utility types for creating type-safe fixture data
 * that automatically syncs with database schema changes.
 */

import type { InferInsertModel, Table } from "drizzle-orm";

/**
 * Extract fixture data type from a Drizzle table schema
 *
 * This utility type removes only truly auto-generated fields (id, timestamps)
 * from the insert model, leaving all other fields including those with defaults.
 * This allows fixtures to explicitly set values for fields like isDeleted, isDomestic, etc.
 *
 * @template T - The Drizzle table type (use `typeof tableName`)
 *
 * @example
 * ```typescript
 * import { cities } from "@/orm/schema/cities";
 * import type { FixtureData } from "./types";
 *
 * export const REAL_CITIES: FixtureData<typeof cities>[] = [
 *   {
 *     iataCode: "BJS",
 *     name: "北京",
 *     isDomestic: true,
 *     // ... other fields
 *   }
 * ];
 * ```
 */
export type FixtureData<T extends Table> = Omit<
  InferInsertModel<T>,
  "id" | "createdAt" | "updatedAt"
>;

/**
 * Extract fixture data type with explicit timestamps
 *
 * Some fixtures may want to explicitly set timestamps (e.g., for exam scenarios).
 * This type only excludes the id field.
 *
 * @template T - The Drizzle table type (use `typeof tableName`)
 */
export type FixtureDataWithTimestamps<T extends Table> = Omit<
  InferInsertModel<T>,
  "id"
>;

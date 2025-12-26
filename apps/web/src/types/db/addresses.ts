/**
 * Database types for address-related tables.
 *
 * These types are automatically inferred from the Drizzle schema definitions.
 * They represent address information stored in the database.
 *
 * @module types/db/addresses
 */

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { addresses } from "@/db/schema";

// ============================================================================
// Address Types
// ============================================================================

/**
 * Address record as returned from database SELECT queries.
 * Contains user shipping/contact address information.
 */
export type Address = InferSelectModel<typeof addresses>;

/**
 * Address data for INSERT operations.
 */
export type NewAddress = InferInsertModel<typeof addresses>;

/**
 * Database types for airport-related tables.
 *
 * These types are automatically inferred from the Drizzle schema definitions.
 * They represent airport information worldwide.
 *
 * @module types/database/airports
 */

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { airports } from "@/orm/schema";

// ============================================================================
// Airport Types
// ============================================================================

/**
 * Airport record as returned from database SELECT queries.
 * Represents an airport with its location and details.
 */
export type Airport = InferSelectModel<typeof airports>;

/**
 * Airport data for INSERT operations.
 */
export type NewAirport = InferInsertModel<typeof airports>;

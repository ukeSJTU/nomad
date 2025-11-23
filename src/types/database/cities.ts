/**
 * Database types for city-related tables.
 *
 * These types are automatically inferred from the Drizzle schema definitions.
 * They represent city information for flight destinations.
 *
 * @module types/database/cities
 */

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { cities } from "@/lib/schema";

// ============================================================================
// City Types
// ============================================================================

/**
 * City record as returned from database SELECT queries.
 * Represents a city that can be a flight origin or destination.
 */
export type City = InferSelectModel<typeof cities>;

/**
 * City data for INSERT operations.
 */
export type NewCity = InferInsertModel<typeof cities>;

/**
 * Database types for airline-related tables.
 *
 * These types are automatically inferred from the Drizzle schema definitions.
 * They represent airline company information.
 *
 * @module types/database/airlines
 */

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { airlines } from "@/db/schema";

// ============================================================================
// Airline Types
// ============================================================================

/**
 * Airline record as returned from database SELECT queries.
 * Represents an airline company operating flights.
 */
export type Airline = InferSelectModel<typeof airlines>;

/**
 * Airline data for INSERT operations.
 */
export type NewAirline = InferInsertModel<typeof airlines>;

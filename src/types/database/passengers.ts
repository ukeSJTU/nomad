/**
 * Database types for passenger-related tables.
 *
 * These types are automatically inferred from the Drizzle schema definitions.
 * They represent passenger information stored in the database.
 *
 * @module types/database/passengers
 */

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { passengers } from "@/db/schema";

// ============================================================================
// Passenger Types
// ============================================================================

/**
 * Passenger record as returned from database SELECT queries.
 * Contains personal information for flight bookings.
 */
export type Passenger = InferSelectModel<typeof passengers>;

/**
 * Passenger data for INSERT operations.
 */
export type NewPassenger = InferInsertModel<typeof passengers>;

/**
 * Passenger gender type derived from the passengers table.
 */
export type PassengerGender = Passenger["gender"];

/**
 * Document type for passenger identification.
 * Examples: PASSPORT, ID_CARD, etc.
 */
export type DocumentType = Passenger["documentType"];

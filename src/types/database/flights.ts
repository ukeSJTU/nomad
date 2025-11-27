/**
 * Database types for flight-related tables.
 *
 * These types are automatically inferred from the Drizzle schema definitions.
 * They represent flight information and seat class data.
 *
 * @module types/database/flights
 */

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { flights, flightSeatClasses } from "@/db/schema";

// ============================================================================
// Flight Types
// ============================================================================

/**
 * Flight record as returned from database SELECT queries.
 * Represents a scheduled flight between two airports.
 */
export type Flight = InferSelectModel<typeof flights>;

/**
 * Flight data for INSERT operations.
 */
export type NewFlight = InferInsertModel<typeof flights>;

// ============================================================================
// Flight Seat Class Types
// ============================================================================

/**
 * Flight seat class record as returned from database SELECT queries.
 * Represents available seat classes for a specific flight (Economy, Business, etc.)
 */
export type FlightSeatClass = InferSelectModel<typeof flightSeatClasses>;

/**
 * Flight seat class data for INSERT operations.
 */
export type NewFlightSeatClass = InferInsertModel<typeof flightSeatClasses>;

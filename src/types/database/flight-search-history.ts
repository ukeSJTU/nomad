/**
 * Database types for flight search history tables.
 *
 * These types are automatically inferred from the Drizzle schema definitions.
 * They represent user flight search history for analytics and recommendations.
 *
 * @module types/database/flight-search-history
 */

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { flightSearchHistory } from "@/lib/schema";

// ============================================================================
// Flight Search History Types
// ============================================================================

/**
 * Flight search history record as returned from database SELECT queries.
 * Tracks user search queries for flights.
 */
export type FlightSearchHistory = InferSelectModel<typeof flightSearchHistory>;

/**
 * Flight search history data for INSERT operations.
 */
export type NewFlightSearchHistory = InferInsertModel<
  typeof flightSearchHistory
>;

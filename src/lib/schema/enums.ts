import { pgEnum } from "drizzle-orm/pg-core";

/**
 * Enums for Database Schema
 *
 * This file contains all enum definitions used across the schema files.
 * Centralizing enums here prevents circular import issues.
 */

// ============================================================================
// PostgreSQL Enums (pgEnum)
// ============================================================================

/**
 * Gender enum for passengers
 */
export const genderEnum = pgEnum("gender", ["male", "female", "other"]);

/**
 * Document type enum for passengers
 */
export const documentTypeEnum = pgEnum("document_type", [
  "passport",
  "id_card",
  "other",
]);

// ============================================================================
// TypeScript Enums and Constants
// ============================================================================

/**
 * Trip types for flight searches
 */
export const TripType = {
  ONE_WAY: "one-way",
  ROUND_TRIP: "round-trip",
} as const;

export type TripType = (typeof TripType)[keyof typeof TripType];

/**
 * Seat class filter options for flight searches (includes "any" option)
 * Used in search forms and search history
 */
export const SearchSeatClass = {
  ANY: "any", // Special filter: show all classes
  ECONOMY: "economy",
  BUSINESS: "business",
  FIRST: "first",
} as const;

export type SearchSeatClass =
  (typeof SearchSeatClass)[keyof typeof SearchSeatClass];

/**
 * Actual seat class types stored in database
 * Used in flight seat inventory and orders (does not include "any")
 */
export const SeatClassType = {
  ECONOMY: "ECONOMY",
  BUSINESS: "BUSINESS",
  FIRST: "FIRST",
} as const;

export type SeatClassType = (typeof SeatClassType)[keyof typeof SeatClassType];

/**
 * Continents for international cities
 */
export const Continent = {
  ASIA: "Asia",
  EUROPE: "Europe",
  AMERICA: "America",
  AFRICA: "Africa",
  OCEANIA: "Oceania",
} as const;

export type Continent = (typeof Continent)[keyof typeof Continent];

// ============================================================================
// Helper Arrays (for validation and iteration)
// ============================================================================

/**
 * Array of all valid trip types
 */
export const TRIP_TYPES = Object.values(TripType);

/**
 * Array of all valid search seat class filters
 */
export const SEARCH_SEAT_CLASSES = Object.values(SearchSeatClass);

/**
 * Array of all valid seat class types
 */
export const SEAT_CLASS_TYPES = Object.values(SeatClassType);

/**
 * Array of all valid continents
 */
export const CONTINENTS = Object.values(Continent);

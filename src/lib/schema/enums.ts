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
 * Seat classes for flights (lowercase - used in search history)
 */
export const SeatClass = {
  ECONOMY: "economy",
  BUSINESS: "business",
  FIRST: "first",
} as const;

export type SeatClass = (typeof SeatClass)[keyof typeof SeatClass];

/**
 * Flight seat class types (uppercase - used in seat inventory)
 */
export const FlightSeatClassType = {
  ECONOMY: "ECONOMY",
  BUSINESS: "BUSINESS",
  FIRST: "FIRST",
} as const;

export type FlightSeatClassType =
  (typeof FlightSeatClassType)[keyof typeof FlightSeatClassType];

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
 * Array of all valid seat classes
 */
export const SEAT_CLASSES = Object.values(SeatClass);

/**
 * Array of all valid flight seat class types
 */
export const FLIGHT_SEAT_CLASS_TYPES = Object.values(FlightSeatClassType);

/**
 * Array of all valid continents
 */
export const CONTINENTS = Object.values(Continent);

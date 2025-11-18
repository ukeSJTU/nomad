/**
 * Database Types
 *
 * This module serves as the central export point for all database-related types.
 * All types in this layer are automatically inferred from Drizzle ORM schema definitions,
 * ensuring they stay in sync with the actual database structure.
 *
 * ## Purpose
 * - Provide TypeScript types for database tables and their fields
 * - Serve as the foundation for all other type layers (DTO, Validation, Actions)
 * - Maintain a single source of truth derived from the database schema
 *
 * ## Type Categories
 * 1. **Select Types**: Represent data as returned from SELECT queries (e.g., `User`, `Order`)
 * 2. **Insert Types**: Represent data for INSERT operations (e.g., `NewUser`, `NewOrder`)
 * 3. **Field Types**: Specific field types extracted from tables (e.g., `OrderStatus`, `UserGender`)
 
 */

// ============================================================================
// Authentication & User Management
// ============================================================================

export type {
  // Account types (OAuth)
  Account,
  NewAccount,
  NewSession,
  NewUser,
  NewVerification,
  // Session types
  Session,
  // User types
  User,
  UserGender,
  // Verification types
  Verification,
} from "./auth";

// ============================================================================
// Orders & Bookings
// ============================================================================

export type {
  NewOrder,
  NewOrderPassenger,
  // Order types
  Order,
  // Order passenger types
  OrderPassenger,
  OrderStatus,
} from "./orders";

// ============================================================================
// Passengers
// ============================================================================

export type {
  DocumentType,
  NewPassenger,
  Passenger,
  PassengerGender,
} from "./passengers";

// ============================================================================
// Flights & Seat Classes
// ============================================================================

export type {
  // Flight types
  Flight,
  // Flight seat class types
  FlightSeatClass,
  NewFlight,
  NewFlightSeatClass,
} from "./flights";

// ============================================================================
// Airlines
// ============================================================================

export type { Airline, NewAirline } from "./airlines";

// ============================================================================
// Airports
// ============================================================================

export type { Airport, NewAirport } from "./airports";

// ============================================================================
// Cities & Locations
// ============================================================================

export type { City, NewCity } from "./cities";

// ============================================================================
// Flight Search History
// ============================================================================

export type {
  FlightSearchHistory,
  NewFlightSearchHistory,
} from "./flight-search-history";

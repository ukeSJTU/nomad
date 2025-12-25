/**
 * Database layer types - Single source of truth
 *
 * All types are inferred from Drizzle schema definitions in src/db/schema/
 * Used in services, repositories, queries, and server actions (data layer)
 *
 * Type naming:
 * - Select types: User, Order (data returned from SELECT queries)
 * - Insert types: NewUser, NewOrder (data for INSERT operations)
 * - Field types: OrderStatus, UserGender (extracted from table fields)
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
// Address Management
// ============================================================================

export type { Address, NewAddress } from "./addresses";

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

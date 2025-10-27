import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { airlines } from "./airlines";
import { airports } from "./airports";

/**
 * Flights Schema
 *
 * Purpose:
 * - Display stage: Show detailed flight information including terminals
 * - Search results: Return list of flights matching search criteria
 *
 * Relationships:
 * - Flight → Airline (Many-to-One)
 * - Flight → Departure Airport (Many-to-One)
 * - Flight → Arrival Airport (Many-to-One)
 * - Flight → Seat Classes (One-to-Many, via flight_seat_classes table)
 *
 * Business Rules:
 * - Flight number format: 2 uppercase letters + 1-4 digits (e.g., "CA1234", "MU567")
 * - Flight number prefix must match airline IATA code
 * - Arrival time must be after departure time
 * - All times stored in UTC with timezone
 * - Terminal information is optional (not all airports have multiple terminals)
 */
export const flights = pgTable(
  "flights",
  {
    id: uuid().primaryKey().defaultRandom(),

    // Flight Identification
    flight_number: varchar({ length: 10 }).notNull(), // Format: [A-Z]{2}[0-9]{1,4} (e.g., "CA1234")

    // Relationships
    airline_id: uuid()
      .notNull()
      .references(() => airlines.id, { onDelete: "restrict" }),
    departure_airport_id: uuid()
      .notNull()
      .references(() => airports.id, { onDelete: "restrict" }),
    arrival_airport_id: uuid()
      .notNull()
      .references(() => airports.id, { onDelete: "restrict" }),

    // Flight Schedule (stored in UTC)
    departure_datetime: timestamp({ withTimezone: true }).notNull(),
    arrival_datetime: timestamp({ withTimezone: true }).notNull(),

    // Terminal Information (for display in flight cards)
    departure_terminal: varchar({ length: 10 }), // Departure terminal (e.g., "T1", "T2", "Terminal A")
    arrival_terminal: varchar({ length: 10 }), // Arrival terminal (optional)

    // Aircraft Information
    aircraft_type: varchar({ length: 50 }), // Aircraft model (e.g., "Boeing 737", "Airbus A320")

    // Soft Delete
    is_deleted: boolean().notNull().default(false),

    // Timestamps
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp()
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [
    // Index Design
    index("idx_flights_airline_id").on(table.airline_id), // Filter by airline
    index("idx_flights_departure_airport_id").on(table.departure_airport_id), // Filter by departure airport
    index("idx_flights_arrival_airport_id").on(table.arrival_airport_id), // Filter by arrival airport
    index("idx_flights_flight_number").on(table.flight_number), // Search by flight number
    index("idx_flights_departure_datetime").on(table.departure_datetime), // Filter by departure time
    index("idx_flights_is_deleted").on(table.is_deleted), // Soft delete filter

    // Composite Index: Core flight search query (from airport A to airport B on date X)
    index("idx_flights_search").on(
      table.departure_airport_id,
      table.arrival_airport_id,
      table.departure_datetime,
      table.is_deleted
    ),

    // Constraints
    check(
      "flights_flight_number_format",
      sql`${table.flight_number} ~ '^[A-Z]{2}[0-9]{1,4}$'`
    ), // Flight number must match format: 2 letters + 1-4 digits
    check(
      "flights_arrival_after_departure",
      sql`${table.arrival_datetime} > ${table.departure_datetime}`
    ), // Arrival must be after departure
  ]
);

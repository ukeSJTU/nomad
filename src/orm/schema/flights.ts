import { relations, sql } from "drizzle-orm";
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
    flightNumber: varchar("flight_number", { length: 10 }).notNull(), // Format: [A-Z]{2}[0-9]{1,4} (e.g., "CA1234")

    // Relationships
    airlineId: uuid("airline_id")
      .notNull()
      .references(() => airlines.id, { onDelete: "restrict" }),
    departureAirportId: uuid("departure_airport_id")
      .notNull()
      .references(() => airports.id, { onDelete: "restrict" }),
    arrivalAirportId: uuid("arrival_airport_id")
      .notNull()
      .references(() => airports.id, { onDelete: "restrict" }),

    // Flight Schedule (stored in UTC)
    departureDatetime: timestamp("departure_datetime", {
      withTimezone: true,
    }).notNull(),
    arrivalDatetime: timestamp("arrival_datetime", {
      withTimezone: true,
    }).notNull(),

    // Terminal Information (for display in flight cards)
    departureTerminal: varchar("departure_terminal", { length: 10 }), // Departure terminal (e.g., "T1", "T2", "Terminal A")
    arrivalTerminal: varchar("arrival_terminal", { length: 10 }), // Arrival terminal (optional)

    // Aircraft Information
    aircraftType: varchar("aircraft_type", { length: 50 }), // Aircraft model (e.g., "Boeing 737", "Airbus A320")

    // Soft Delete
    isDeleted: boolean("is_deleted").notNull().default(false),

    // Timestamps
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [
    // Index Design
    index("idx_flights_airline_id").on(table.airlineId), // Filter by airline
    index("idx_flights_departure_airport_id").on(table.departureAirportId), // Filter by departure airport
    index("idx_flights_arrival_airport_id").on(table.arrivalAirportId), // Filter by arrival airport
    index("idx_flights_flight_number").on(table.flightNumber), // Search by flight number
    index("idx_flights_departure_datetime").on(table.departureDatetime), // Filter by departure time
    index("idx_flights_is_deleted").on(table.isDeleted), // Soft delete filter

    // Composite Index: Core flight search query (from airport A to airport B on date X)
    index("idx_flights_search").on(
      table.departureAirportId,
      table.arrivalAirportId,
      table.departureDatetime,
      table.isDeleted
    ),

    // Constraints
    check(
      "flights_flight_number_format",
      sql`${table.flightNumber} ~ '^[A-Z0-9]{2}[0-9]{1,4}$'`
    ), // Flight number must match format: 2 letters/digits + 1-4 digits (e.g., "CA1234", "9C8947")
    check(
      "flights_arrival_after_departure",
      sql`${table.arrivalDatetime} > ${table.departureDatetime}`
    ), // Arrival must be after departure
  ]
);

/**
 * Flights Relations
 */
export const flightsRelations = relations(flights, ({ one }) => ({
  airline: one(airlines, {
    fields: [flights.airlineId],
    references: [airlines.id],
  }),
  departureAirport: one(airports, {
    fields: [flights.departureAirportId],
    references: [airports.id],
    relationName: "departureAirport",
  }),
  arrivalAirport: one(airports, {
    fields: [flights.arrivalAirportId],
    references: [airports.id],
    relationName: "arrivalAirport",
  }),
}));

import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  numeric,
  pgTable,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { flights } from "./flights";

/**
 * Flight Seat Classes Schema
 *
 * Purpose:
 * - Store seat inventory and pricing for different cabin classes
 * - Support seat availability checking during booking
 * - Enable price filtering in flight search results
 *
 * Relationships:
 * - Flight Seat Class → Flight (Many-to-One)
 * - One flight can have multiple seat classes (Economy, Business, First)
 * - Each seat class has its own inventory and pricing
 *
 * Business Rules:
 * - Class type must be one of: ECONOMY, BUSINESS, FIRST
 * - One flight can only have one record per class type (unique constraint)
 * - Available seats cannot exceed total seats
 * - Available seats must be non-negative (>= 0)
 * - Total seats must be positive (> 0)
 * - Price must be positive (> 0)
 * - When booking: decrement available_seats
 * - When canceling: increment available_seats
 */
export const flightSeatClasses = pgTable(
  "flight_seat_classes",
  {
    id: uuid().primaryKey().defaultRandom(),

    // Relationships
    flight_id: uuid()
      .notNull()
      .references(() => flights.id, { onDelete: "restrict" }),

    // Seat Class Information
    class_type: varchar({ length: 20 }).notNull(), // ECONOMY, BUSINESS, FIRST

    // Seat Inventory
    total_seats: integer().notNull(), // Total number of seats in this class
    available_seats: integer().notNull(), // Remaining seats available for booking

    // Pricing
    price: numeric({ precision: 10, scale: 2 }).notNull(), // Current price for this class (CNY)

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
    index("idx_seat_classes_flight_id").on(table.flight_id), // Query seat classes by flight
    index("idx_seat_classes_class_type").on(table.class_type), // Filter by cabin class
    index("idx_seat_classes_is_deleted").on(table.is_deleted), // Soft delete filter

    // Unique Constraint: One flight can only have one record per class type
    unique("uk_seat_classes_flight_class").on(
      table.flight_id,
      table.class_type
    ),

    // Constraints
    check(
      "seat_classes_class_type_valid",
      sql`${table.class_type} IN ('ECONOMY', 'BUSINESS', 'FIRST')`
    ), // Class type must be one of the allowed values
    check(
      "seat_classes_available_seats_non_negative",
      sql`${table.available_seats} >= 0`
    ), // Available seats cannot be negative
    check(
      "seat_classes_available_seats_not_exceed_total",
      sql`${table.available_seats} <= ${table.total_seats}`
    ), // Available seats cannot exceed total seats
    check("seat_classes_total_seats_positive", sql`${table.total_seats} > 0`), // Total seats must be positive
    check("seat_classes_price_positive", sql`${table.price} > 0`), // Price must be positive
  ]
);

import { relations, sql } from "drizzle-orm";
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
    flightId: uuid("flight_id")
      .notNull()
      .references(() => flights.id, { onDelete: "restrict" }),

    // Seat Class Information
    classType: varchar("class_type", { length: 20 }).notNull(), // ECONOMY, BUSINESS, FIRST

    // Seat Inventory
    totalSeats: integer("total_seats").notNull(), // Total number of seats in this class
    availableSeats: integer("available_seats").notNull(), // Remaining seats available for booking

    // Pricing
    price: numeric({ precision: 10, scale: 2 }).notNull(), // Current price for this class (CNY)

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
    index("idx_seat_classes_flight_id").on(table.flightId), // Query seat classes by flight
    index("idx_seat_classes_class_type").on(table.classType), // Filter by cabin class
    index("idx_seat_classes_is_deleted").on(table.isDeleted), // Soft delete filter

    // Unique Constraint: One flight can only have one record per class type
    unique("uk_seat_classes_flight_class").on(table.flightId, table.classType),

    // Constraints
    check(
      "seat_classes_class_type_valid",
      sql`${table.classType} IN ('ECONOMY', 'BUSINESS', 'FIRST')`
    ), // Class type must be one of the allowed values
    check(
      "seat_classes_available_seats_non_negative",
      sql`${table.availableSeats} >= 0`
    ), // Available seats cannot be negative
    check(
      "seat_classes_available_seats_not_exceed_total",
      sql`${table.availableSeats} <= ${table.totalSeats}`
    ), // Available seats cannot exceed total seats
    check("seat_classes_total_seats_positive", sql`${table.totalSeats} > 0`), // Total seats must be positive
    check("seat_classes_price_positive", sql`${table.price} > 0`), // Price must be positive
  ]
);

/**
 * Flight Seat Classes Relations
 */
export const flightSeatClassesRelations = relations(
  flightSeatClasses,
  ({ one }) => ({
    flight: one(flights, {
      fields: [flightSeatClasses.flightId],
      references: [flights.id],
    }),
  })
);

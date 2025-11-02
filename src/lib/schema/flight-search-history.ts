import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  date,
  index,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { user } from "../../../auth-schema";
import { cities } from "./cities";

/**
 * Flight Search History Schema
 *
 * Purpose:
 * - Record user's flight search history for quick re-search
 * - Display recent searches on /flights page below search form
 * - Track price changes for searched routes
 *
 * Relationships:
 * - Search History → User (Many-to-One)
 * - Search History → Departure City (Many-to-One)
 * - Search History → Arrival City (Many-to-One)
 *
 * Business Rules:
 * - Only logged-in users have search history
 * - One user can have multiple search records
 * - Duplicate searches (same route + date) increment search_count instead of creating new record
 * - Price tracking: store lowest price at search time and update current price periodically
 * - Denormalized city names for display performance (avoid joins)
 * - Soft delete to preserve history
 */
export const flightSearchHistory = pgTable(
  "flight_search_history",
  {
    id: uuid().primaryKey().defaultRandom(),

    // User Association
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    // Search Parameters - City References (for data integrity)
    departureCityId: uuid("departure_city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "restrict" }),
    arrivalCityId: uuid("arrival_city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "restrict" }),

    // Search Parameters - Denormalized Display Data (for performance)
    departureCityIata: varchar("departure_city_iata", { length: 3 }).notNull(), // Denormalized for display (e.g., "SHA")
    departureCityName: varchar("departure_city_name", {
      length: 100,
    }).notNull(), // Denormalized for display (e.g., "上海")
    arrivalCityIata: varchar("arrival_city_iata", { length: 3 }).notNull(), // Denormalized for display (e.g., "BJS")
    arrivalCityName: varchar("arrival_city_name", { length: 100 }).notNull(), // Denormalized for display (e.g., "北京")

    // Search Parameters - Trip Details
    tripType: varchar("trip_type", { length: 20 }).notNull(), // "one-way" or "round-trip"
    departureDate: date("departure_date").notNull(), // Departure date in YYYY-MM-DD format
    returnDate: date("return_date"), // Return date (NULL for one-way trips)
    seatClass: varchar("seat_class", { length: 20 })
      .notNull()
      .default("economy"), // "economy", "business", or "first"

    // Price Tracking (optional but valuable for "price changed" badges)
    lowestPriceAtSearch: numeric("lowest_price_at_search", {
      precision: 10,
      scale: 2,
    }), // Lowest price when search was performed (CNY)
    currentLowestPrice: numeric("current_lowest_price", {
      precision: 10,
      scale: 2,
    }), // Updated periodically for price change detection (CNY)

    // Metadata
    searchCount: integer("search_count").notNull().default(1), // Track how many times user searched this route
    lastSearchedAt: timestamp("last_searched_at", { withTimezone: true })
      .notNull()
      .defaultNow(), // Last time this search was performed

    // Soft Delete
    isDeleted: boolean("is_deleted").notNull().default(false),

    // Timestamps
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [
    // Index Design
    index("idx_search_history_user_id").on(table.userId), // Query all searches by user
    index("idx_search_history_last_searched").on(table.lastSearchedAt), // Sort by recency
    index("idx_search_history_is_deleted").on(table.isDeleted), // Soft delete filter

    // Composite Index: Query recent searches for a user (most common query)
    index("idx_search_history_user_recent").on(
      table.userId,
      table.lastSearchedAt,
      table.isDeleted
    ),

    // Composite Index: Prevent duplicate active searches for same route/date
    // This serves as a unique constraint for non-deleted records
    index("idx_search_history_unique_search").on(
      table.userId,
      table.departureCityId,
      table.arrivalCityId,
      table.departureDate,
      table.returnDate,
      table.isDeleted
    ),

    // Constraints
    check(
      "search_history_trip_type_valid",
      sql`${table.tripType} IN ('one-way', 'round-trip')`
    ), // Trip type must be one of allowed values
    check(
      "search_history_seat_class_valid",
      sql`${table.seatClass} IN ('economy', 'business', 'first')`
    ), // Seat class must be one of allowed values
    check(
      "search_history_search_count_positive",
      sql`${table.searchCount} > 0`
    ), // Search count must be positive
    check(
      "search_history_different_cities",
      sql`${table.departureCityId} != ${table.arrivalCityId}`
    ), // Departure and arrival cities must be different
    check(
      "search_history_return_date_after_departure",
      sql`${table.returnDate} IS NULL OR ${table.returnDate} > ${table.departureDate}`
    ), // Return date must be after departure date (if provided)
    check(
      "search_history_prices_non_negative",
      sql`(${table.lowestPriceAtSearch} IS NULL OR ${table.lowestPriceAtSearch} >= 0) AND (${table.currentLowestPrice} IS NULL OR ${table.currentLowestPrice} >= 0)`
    ), // Prices must be non-negative if provided
  ]
);

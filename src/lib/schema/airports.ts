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

import { cities } from "./cities";

/**
 * Airports Schema
 *
 * Purpose:
 * - Filter stage: Users can filter flights by specific airport (e.g., only Pudong)
 * - Display stage: Show airport name and code in flight results
 *
 * Relationships:
 * - Multiple airports → One city (Many-to-One)
 * - One airport → Multiple flights (One-to-Many, via flights table)
 *
 * Business Rules:
 * - IATA code is globally unique, 3 uppercase letters
 * - Airport names in Chinese only (project requirement)
 * - Linked to cities table via city_id foreign key
 */
export const airports = pgTable(
  "airports",
  {
    id: uuid().primaryKey().defaultRandom(),

    // Basic Information
    iataCode: varchar("iata_code", { length: 3 }).notNull().unique(), // IATA airport code (e.g., "PVG", "SHA")
    name: varchar({ length: 255 }).notNull(), // Airport name in Chinese (e.g., "浦东国际机场", "虹桥国际机场")

    // City Association
    cityId: uuid("city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "restrict" }), // Foreign key to cities table

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
    index("idx_airports_city_id").on(table.cityId), // Query all airports in a city
    index("idx_airports_is_deleted").on(table.isDeleted), // Soft delete filter optimization
    index("idx_airports_name").on(table.name), // Search by name

    // Composite Index: Query active airports in a city
    index("idx_airports_city_active").on(table.cityId, table.isDeleted),

    // Constraints
    check("airports_iata_code_format", sql`${table.iataCode} ~ '^[A-Z]{3}$'`), // IATA code must be 3 uppercase letters
  ]
);

/**
 * Airports Relations
 */
export const airportsRelations = relations(airports, ({ one }) => ({
  city: one(cities, {
    fields: [airports.cityId],
    references: [cities.id],
  }),
}));

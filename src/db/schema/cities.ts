import { relations, sql } from "drizzle-orm";
import {
  boolean,
  char,
  check,
  index,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { airports } from "./airports";

/**
 * Cities Schema
 *
 * Purpose:
 * - City selector component data source
 * - Support domestic/international city grouping
 * - Enable popular cities, alphabetical sorting, and continent-based filtering
 *
 * Frontend UI Structure:
 * 1. First-level tabs: "Domestic" | "International"
 * 2. Domestic second-level tabs: "Popular" | "ABCD" | "EFGH" | ...
 * 3. International second-level tabs: "Popular" | "Asia" | "Europe" | ...
 *
 * Business Rules:
 * - One city can have multiple airports (linked via airports.city_id)
 * - Domestic cities grouped by pinyin first letter
 * - International cities grouped by continent
 * - Popular cities shown in separate tab for both domestic and international
 */
export const cities = pgTable(
  "cities",
  {
    id: uuid().primaryKey().defaultRandom(),

    // Basic Information
    iataCode: varchar("iata_code", { length: 3 }).notNull().unique(), // IATA city code (e.g., "SHA" for Shanghai, "BJS" for Beijing, "BKK" for Bangkok)
    name: varchar({ length: 100 }).notNull(), // City name in Chinese (e.g., "上海", "北京")

    // Timezone (for flight time display)
    timezone: varchar({ length: 50 }).notNull(), // IANA timezone identifier (e.g., "Asia/Shanghai")

    // Domestic vs International Classification
    isDomestic: boolean("is_domestic").notNull().default(true), // true = Domestic (China), false = International

    // Domestic City Grouping (for Alphabetical Tabs: ABCD, EFGH, etc.)
    // Only required for domestic cities, can be NULL for international
    pinyinFirstLetter: char("pinyin_first_letter", { length: 1 }), // Pinyin first letter: 'A', 'B', 'C', ..., 'Z'

    // International City Grouping (for Continent Tabs: Asia, Europe, etc.)
    // Only required for international cities, can be NULL for domestic
    continent: varchar({ length: 20 }), // 'Asia', 'Europe', 'America', 'Africa', 'Oceania'

    // Popular City Flag (shown in "Popular" tab for both domestic and international)
    isPopular: boolean("is_popular").notNull().default(false),

    // Display Order (for fine-grained sorting within same group)
    // Lower number = higher priority
    // Example: Beijing (display_order=1) appears before other 'B' cities
    displayOrder: integer("display_order").notNull().default(9999),

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
    index("idx_cities_is_domestic").on(table.isDomestic), // Filter: Domestic vs International
    index("idx_cities_is_popular").on(table.isPopular), // Query: Popular cities
    index("idx_cities_pinyin_first_letter").on(table.pinyinFirstLetter), // Query: Alphabetical groups (ABCD, EFGH, etc.)
    index("idx_cities_continent").on(table.continent), // Query: Continent groups (Asia, Europe, etc.)
    index("idx_cities_is_deleted").on(table.isDeleted), // Soft delete filter
    index("idx_cities_name").on(table.name), // Search by name
    index("idx_cities_iata_code").on(table.iataCode), // Search by IATA code (e.g., "SHA", "BJS")

    // Composite Indexes for Common Queries
    // Query: Domestic popular cities, sorted by display_order
    index("idx_cities_domestic_popular").on(
      table.isDomestic,
      table.isPopular,
      table.displayOrder,
      table.isDeleted
    ),
    // Query: Domestic cities by letter group (e.g., ABCD), sorted by letter and display_order
    index("idx_cities_domestic_letter").on(
      table.isDomestic,
      table.pinyinFirstLetter,
      table.displayOrder,
      table.isDeleted
    ),
    // Query: International cities by continent, sorted by display_order
    index("idx_cities_international_continent").on(
      table.isDomestic,
      table.continent,
      table.displayOrder,
      table.isDeleted
    ),

    // Constraints
    check("cities_iata_code_format", sql`${table.iataCode} ~ '^[A-Z]{3}$'`), // IATA code must be exactly 3 uppercase letters
    check(
      "cities_pinyin_first_letter_format",
      sql`${table.pinyinFirstLetter} IS NULL OR ${table.pinyinFirstLetter} ~ '^[A-Z]$'`
    ), // Pinyin first letter must be uppercase A-Z or NULL
    check(
      "cities_continent_valid",
      sql`${table.continent} IS NULL OR ${table.continent} IN ('Asia', 'Europe', 'America', 'Africa', 'Oceania')`
    ), // Continent must be one of predefined values or NULL
    check("cities_display_order_positive", sql`${table.displayOrder} >= 0`), // Display order must be non-negative
    check(
      "cities_domestic_has_pinyin",
      sql`(${table.isDomestic} = false) OR (${table.isDomestic} = true AND ${table.pinyinFirstLetter} IS NOT NULL)`
    ), // Domestic cities must have pinyin_first_letter
    check(
      "cities_international_has_continent",
      sql`(${table.isDomestic} = true) OR (${table.isDomestic} = false AND ${table.continent} IS NOT NULL)`
    ), // International cities must have continent
  ]
);

/**
 * Cities Relations
 */
export const citiesRelations = relations(cities, ({ many }) => ({
  airports: many(airports),
}));

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

/**
 * Airlines Schema
 *
 * Purpose:
 * - Store airline company information
 * - Support airline filtering in flight search results
 * - Display airline logos and names in flight cards
 *
 * Relationships:
 * - One airline → Multiple flights (One-to-Many, via flights table)
 *
 * Business Rules:
 * - IATA code is globally unique, 2 uppercase letters
 * - IATA code matches the first 2 letters of flight numbers
 * - Airline names in Chinese only (project requirement)
 * - Use soft delete to preserve historical flight data
 */
export const airlines = pgTable(
  "airlines",
  {
    id: uuid().primaryKey().defaultRandom(),

    // Basic Information
    iata_code: varchar({ length: 2 }).notNull().unique(), // IATA airline code (e.g., "CA" for Air China, "MU" for China Eastern)
    name: varchar({ length: 255 }).notNull(), // Airline name in Chinese (e.g., "中国国际航空", "东方航空")
    logo_url: varchar({ length: 500 }), // URL to airline logo image (optional)

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
    index("idx_airlines_is_deleted").on(table.is_deleted), // Soft delete filter optimization

    // Constraints
    check("airlines_iata_code_format", sql`${table.iata_code} ~ '^[A-Z]{2}$'`), // IATA code must be 2 uppercase letters
  ]
);

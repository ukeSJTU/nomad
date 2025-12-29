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
    iataCode: varchar("iata_code", { length: 2 }).notNull().unique(), // IATA airline code (e.g., "CA" for Air China, "MU" for China Eastern)
    name: varchar({ length: 255 }).notNull(), // Airline name in Chinese (e.g., "中国国际航空", "中国东方航空")
    logoUrl: varchar("logo_url", { length: 500 }), // Logo URL (optional)

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
    index("idx_airlines_iata_code").on(table.iataCode), // Unique IATA code lookup
    index("idx_airlines_is_deleted").on(table.isDeleted), // Soft delete filter optimization

    // Constraints
    check("airlines_iata_code_check", sql`${table.iataCode} ~ '^[A-Z0-9]{2}$'`), // IATA code must be 2 uppercase letters or digits (e.g., "CA", "9C")
  ]
);

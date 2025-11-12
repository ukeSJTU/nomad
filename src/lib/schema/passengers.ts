// At least one of Chinese name or English name is required
// Nationality
// Gender: male/female/unknown
// Date of birth
// Place of birth
// Phone number
// Fax number
// Email
// Document type, document number, expiry date are required

import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  date,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { user } from "../../../auth-schema";
import { documentTypeEnum, genderEnum } from "./enums";

// All other fields are optional
export const passengers = pgTable(
  "passengers",
  {
    id: uuid().primaryKey().defaultRandom(),
    // User who owns this passenger
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    // At least one of Chinese name or English name is required
    chineseName: varchar("chinese_name", { length: 100 }),
    englishFirstName: varchar("english_first_name", { length: 100 }),
    englishLastName: varchar("english_last_name", { length: 100 }),
    // Nationality
    nationality: varchar({ length: 100 }),
    // Gender: male/female/other
    gender: genderEnum(),
    // Date of birth
    dateOfBirth: date("date_of_birth"),
    // Place of birth
    placeOfBirth: varchar("place_of_birth", { length: 255 }),
    // Phone number
    phone: varchar({ length: 20 }),
    // Fax number
    fax: varchar({ length: 20 }),
    // Email
    email: varchar({ length: 255 }),
    // Document type, document number, expiry date (required)
    documentType: documentTypeEnum().notNull(),
    documentNumber: varchar("document_number", { length: 50 }).notNull(),
    documentExpiryDate: date("document_expiry_date").notNull(),
    // Soft delete flag
    isDeleted: boolean("is_deleted").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [
    // Indexes
    index("idx_passengers_user_id").on(table.userId),
    index("idx_passengers_is_deleted").on(table.isDeleted),
    index("idx_passengers_email").on(table.email),
    index("idx_passengers_phone").on(table.phone),
    index("idx_passengers_document").on(
      table.documentType,
      table.documentNumber
    ),
    // Constraint: at least one of Chinese name or English name is required
    check(
      "passengers_name_required",
      sql`${table.chineseName} IS NOT NULL OR (${table.englishFirstName} IS NOT NULL AND ${table.englishLastName} IS NOT NULL)`
    ),
  ]
);

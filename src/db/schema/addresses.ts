import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

/**
 * User Addresses Schema
 *
 * Stores user's shipping/contact addresses.
 */
export const addresses = pgTable("addresses", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  // Recipient Info
  recipientName: varchar("recipient_name", { length: 100 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),

  // Region Info (Province/City/District/Town)
  // Storing as strings for simplicity as per requirement.
  // In a real strict system, these might reference area IDs.
  province: varchar("province", { length: 50 }).notNull(),
  city: varchar("city", { length: 50 }).notNull(),
  district: varchar("district", { length: 50 }).notNull(),
  town: varchar("town", { length: 50 }), // Optional

  // Detailed Address
  detailAddress: text("detail_address").notNull(),

  // Settings
  isDefault: boolean("is_default").notNull().default(false),

  // Timestamps
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

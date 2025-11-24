import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const passwordResetLog = pgTable("password_reset_log", {
  id: varchar("id", { length: 30 }).primaryKey(),
  account: varchar("account", { length: 128 }).notNull(),
  method: varchar("method", { length: 10 }).notNull(),
  sentAt: timestamp("sent_at", { withTimezone: true }).notNull(),
  verifiedAt: timestamp("verified_at", { withTimezone: true }).default(null),
  error: text("error").default(null),
});

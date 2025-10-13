import {
  boolean,
  index,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const airports = pgTable(
  "airports",
  {
    id: uuid().primaryKey().defaultRandom(),
    iata_code: varchar({ length: 3 }).notNull().unique(),
    name: varchar({ length: 255 }).notNull(),
    city: varchar({ length: 100 }).notNull(),
    country: varchar({ length: 100 }).notNull(),
    timezone: varchar({ length: 50 }).notNull(),
    is_deleted: boolean().notNull().default(false),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp()
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [
    index("idx_airports_city").on(table.city),
    index("idx_airports_country").on(table.country),
    index("idx_airports_is_deleted").on(table.is_deleted),
  ]
);

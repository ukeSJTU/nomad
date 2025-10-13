import {
  boolean,
  index,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const airlines = pgTable(
  "airlines",
  {
    id: uuid().primaryKey().defaultRandom(),
    iata_code: varchar({ length: 2 }).notNull().unique(),
    name: varchar({ length: 255 }).notNull(),
    logo_url: varchar({ length: 500 }),
    is_deleted: boolean().notNull().default(false),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp()
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [index("idx_airlines_is_deleted").on(table.is_deleted)]
);

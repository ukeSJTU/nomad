import {
  index,
  integer,
  numeric,
  pgTable,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { flights } from "./flights";

export const flightSeatClasses = pgTable(
  "flight_seat_classes",
  {
    id: uuid().primaryKey().defaultRandom(),
    flight_id: uuid()
      .notNull()
      .references(() => flights.id, { onDelete: "cascade" }),
    class_type: varchar({ length: 20 }).notNull(),
    total_seats: integer().notNull(),
    available_seats: integer().notNull(),
    price: numeric({ precision: 10, scale: 2 }).notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp()
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [
    index("idx_seat_classes_flight_id").on(table.flight_id),
    index("idx_seat_classes_class_type").on(table.class_type),
    unique("uk_seat_classes_flight_class").on(
      table.flight_id,
      table.class_type
    ),
  ]
);

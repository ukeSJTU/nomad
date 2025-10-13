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

import { airlines } from "./airlines";
import { airports } from "./airports";

export const flights = pgTable(
  "flights",
  {
    id: uuid().primaryKey().defaultRandom(),
    flight_number: varchar({ length: 10 }).notNull(),
    airline_id: uuid()
      .notNull()
      .references(() => airlines.id),
    departure_airport_id: uuid()
      .notNull()
      .references(() => airports.id),
    arrival_airport_id: uuid()
      .notNull()
      .references(() => airports.id),
    departure_datetime: timestamp({ withTimezone: true }).notNull(),
    arrival_datetime: timestamp({ withTimezone: true }).notNull(),
    aircraft_type: varchar({ length: 50 }),
    status: varchar({ length: 20 }).notNull().default("SCHEDULED"),
    is_deleted: boolean().notNull().default(false),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp()
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [
    index("idx_flights_airline_id").on(table.airline_id),
    index("idx_flights_departure_airport_id").on(table.departure_airport_id),
    index("idx_flights_arrival_airport_id").on(table.arrival_airport_id),
    index("idx_flights_flight_number").on(table.flight_number),
    index("idx_flights_departure_datetime").on(table.departure_datetime),
    index("idx_flights_status").on(table.status),
    index("idx_flights_is_deleted").on(table.is_deleted),
    index("idx_flights_search").on(
      table.departure_airport_id,
      table.arrival_airport_id,
      table.departure_datetime,
      table.is_deleted
    ),
    check(
      "flights_flight_number_format",
      sql`${table.flight_number} ~ '^[A-Z]{2}[0-9]{1,4}$'`
    ),
    check(
      "flights_arrival_after_departure",
      sql`${table.arrival_datetime} > ${table.departure_datetime}`
    ),
    check(
      "flights_status_valid",
      sql`${table.status} IN ('SCHEDULED', 'DELAYED', 'CANCELLED', 'COMPLETED')`
    ),
  ]
);

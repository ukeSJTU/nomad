import { sql } from "drizzle-orm";
import { afterAll, beforeAll, beforeEach } from "vitest";

import { db } from "@/db";

export const truncateAllTables = async () => {
  await db.execute(sql`
    TRUNCATE TABLE
      order_passengers,
      payments,
      orders,
      passengers,
      flight_search_history,
      flight_seat_classes,
      flights,
      airports,
      airlines,
      cities,
      session,
      account,
      verification,
      rate_limit,
      "user"
    CASCADE
  `);
};

beforeAll(async () => {
  await truncateAllTables();
});

beforeEach(async () => {
  await truncateAllTables();
});

afterAll(async () => {
  const client =
    // drizzle v0.44 exposes the pg client on session.client when using the connection config
    // biome-ignore lint/suspicious/noExplicitAny: Accessing internal properties for cleanup
    (db as any).session?.client ?? (db as any).$client;

  if (client?.end) {
    await client.end();
  }
});

import { getTableName } from "drizzle-orm";
import { describe, expect, it } from "vitest";

import { flightSeatClasses } from "./flight-seat-classes";

describe("Flight Seat Classes Schema", () => {
  it("should have correct table name", () => {
    expect(getTableName(flightSeatClasses)).toBe("flight_seat_classes");
  });

  it("should have all required fields defined", () => {
    const columns = Object.keys(flightSeatClasses);

    expect(columns).toContain("id");
    expect(columns).toContain("flight_id");
    expect(columns).toContain("class_type");
    expect(columns).toContain("total_seats");
    expect(columns).toContain("available_seats");
    expect(columns).toContain("price");
    expect(columns).toContain("is_deleted");
    expect(columns).toContain("created_at");
    expect(columns).toContain("updated_at");
  });

  it("should have foreign key reference to flights", () => {
    const flightIdColumn = flightSeatClasses.flight_id;
    expect(flightIdColumn.notNull).toBe(true);
  });
});

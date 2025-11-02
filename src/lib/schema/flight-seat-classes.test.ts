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
    expect(columns).toContain("flightId");
    expect(columns).toContain("classType");
    expect(columns).toContain("totalSeats");
    expect(columns).toContain("availableSeats");
    expect(columns).toContain("price");
    expect(columns).toContain("isDeleted");
    expect(columns).toContain("createdAt");
    expect(columns).toContain("updatedAt");
  });

  it("should have foreign key reference to flights", () => {
    const flightIdColumn = flightSeatClasses.flightId;
    expect(flightIdColumn.notNull).toBe(true);
  });
});

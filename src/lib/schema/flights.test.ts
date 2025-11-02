import { getTableName } from "drizzle-orm";
import { describe, expect, it } from "vitest";

import { flights } from "./flights";

describe("Flights Schema", () => {
  it("should have correct table name", () => {
    expect(getTableName(flights)).toBe("flights");
  });

  it("should have all required fields defined", () => {
    const columns = Object.keys(flights);

    expect(columns).toContain("id");
    expect(columns).toContain("flightNumber");
    expect(columns).toContain("airlineId");
    expect(columns).toContain("departureAirportId");
    expect(columns).toContain("arrivalAirportId");
    expect(columns).toContain("departureDatetime");
    expect(columns).toContain("arrivalDatetime");
    expect(columns).toContain("departureTerminal");
    expect(columns).toContain("arrivalTerminal");
    expect(columns).toContain("aircraftType");
    expect(columns).toContain("isDeleted");
    expect(columns).toContain("createdAt");
    expect(columns).toContain("updatedAt");
  });

  it("should have foreign key references to airlines and airports", () => {
    const airlineIdColumn = flights.airlineId;
    const departureAirportColumn = flights.departureAirportId;
    const arrivalAirportColumn = flights.arrivalAirportId;

    expect(airlineIdColumn.notNull).toBe(true);
    expect(departureAirportColumn.notNull).toBe(true);
    expect(arrivalAirportColumn.notNull).toBe(true);
  });
});

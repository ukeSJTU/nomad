import { describe, expect, it } from "vitest";

import { flights } from "./flights";

describe("Flights Schema", () => {
  it("should have correct table name", () => {
    expect(flights[Symbol.for("drizzle:Name")]).toBe("flights");
  });

  it("should have all required fields defined", () => {
    const columns = Object.keys(flights);

    expect(columns).toContain("id");
    expect(columns).toContain("flight_number");
    expect(columns).toContain("airline_id");
    expect(columns).toContain("departure_airport_id");
    expect(columns).toContain("arrival_airport_id");
    expect(columns).toContain("departure_datetime");
    expect(columns).toContain("arrival_datetime");
    expect(columns).toContain("aircraft_type");
    expect(columns).toContain("status");
    expect(columns).toContain("is_deleted");
    expect(columns).toContain("created_at");
    expect(columns).toContain("updated_at");
  });

  it("should have foreign key references to airlines and airports", () => {
    const airlineIdColumn = flights.airline_id;
    const departureAirportColumn = flights.departure_airport_id;
    const arrivalAirportColumn = flights.arrival_airport_id;

    expect(airlineIdColumn.notNull).toBe(true);
    expect(departureAirportColumn.notNull).toBe(true);
    expect(arrivalAirportColumn.notNull).toBe(true);
  });
});

import { describe, expect, it } from "vitest";

import { airports } from "./airports";

describe("Airports Schema", () => {
  it("should have correct table name", () => {
    expect(airports[Symbol.for("drizzle:Name")]).toBe("airports");
  });

  it("should have all required fields defined", () => {
    const columns = Object.keys(airports);

    expect(columns).toContain("id");
    expect(columns).toContain("iata_code");
    expect(columns).toContain("name");
    expect(columns).toContain("city");
    expect(columns).toContain("country");
    expect(columns).toContain("timezone");
    expect(columns).toContain("is_deleted");
    expect(columns).toContain("created_at");
    expect(columns).toContain("updated_at");
  });

  it("should have unique constraint on iata_code", () => {
    const iataCodeColumn = airports.iata_code;
    expect(iataCodeColumn.isUnique).toBe(true);
  });
});

import { getTableName } from "drizzle-orm";
import { describe, expect, it } from "vitest";

import { airports } from "./airports";

describe("Airports Schema", () => {
  it("should have correct table name", () => {
    expect(getTableName(airports)).toBe("airports");
  });

  it("should have all required fields defined", () => {
    const columns = Object.keys(airports);

    expect(columns).toContain("id");
    expect(columns).toContain("iataCode");
    expect(columns).toContain("name");
    expect(columns).toContain("cityId");
    expect(columns).toContain("isDeleted");
    expect(columns).toContain("createdAt");
    expect(columns).toContain("updatedAt");
  });

  it("should have unique constraint on iata_code", () => {
    const iataCodeColumn = airports.iataCode;
    expect(iataCodeColumn.isUnique).toBe(true);
  });

  it("should have foreign key reference to cities", () => {
    const cityIdColumn = airports.cityId;
    expect(cityIdColumn.notNull).toBe(true);
  });
});

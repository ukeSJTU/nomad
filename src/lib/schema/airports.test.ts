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
    expect(columns).toContain("iata_code");
    expect(columns).toContain("name");
    expect(columns).toContain("city_id");
    expect(columns).toContain("is_deleted");
    expect(columns).toContain("created_at");
    expect(columns).toContain("updated_at");
  });

  it("should have unique constraint on iata_code", () => {
    const iataCodeColumn = airports.iata_code;
    expect(iataCodeColumn.isUnique).toBe(true);
  });

  it("should have foreign key reference to cities", () => {
    const cityIdColumn = airports.city_id;
    expect(cityIdColumn.notNull).toBe(true);
  });
});

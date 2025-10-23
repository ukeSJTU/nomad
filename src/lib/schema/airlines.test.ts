import { describe, expect, it } from "vitest";

import { airlines } from "./airlines";

describe("Airlines Schema", () => {
  it("should have correct table name", () => {
    expect(airlines[Symbol.for("drizzle:Name")]).toBe("airlines");
  });

  it("should have all required fields defined", () => {
    const columns = Object.keys(airlines);

    expect(columns).toContain("id");
    expect(columns).toContain("iata_code");
    expect(columns).toContain("name");
    expect(columns).toContain("logo_url");
    expect(columns).toContain("is_deleted");
    expect(columns).toContain("created_at");
    expect(columns).toContain("updated_at");
  });

  it("should have unique constraint on iata_code", () => {
    const iataCodeColumn = airlines.iata_code;
    expect(iataCodeColumn.isUnique).toBe(true);
  });
});

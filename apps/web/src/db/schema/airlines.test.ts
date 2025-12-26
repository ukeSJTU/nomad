import { getTableName } from "drizzle-orm";
import { describe, expect, it } from "vitest";

import { airlines } from "./airlines";

describe("Airlines Schema", () => {
  it("should have correct table name", () => {
    expect(getTableName(airlines)).toBe("airlines");
  });

  it("should have all required fields defined", () => {
    const columns = Object.keys(airlines);

    expect(columns).toContain("id");
    expect(columns).toContain("iataCode");
    expect(columns).toContain("name");
    expect(columns).toContain("logoUrl");
    expect(columns).toContain("isDeleted");
    expect(columns).toContain("createdAt");
    expect(columns).toContain("updatedAt");
  });

  it("should have unique constraint on iata_code", () => {
    const iataCodeColumn = airlines.iataCode;
    expect(iataCodeColumn.isUnique).toBe(true);
  });
});

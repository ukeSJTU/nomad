import { getTableName } from "drizzle-orm";
import { describe, expect, it } from "vitest";

import { cities } from "./cities";

describe("Cities Schema", () => {
  it("should have correct table name", () => {
    expect(getTableName(cities)).toBe("cities");
  });

  it("should have all required fields defined", () => {
    const columns = Object.keys(cities);

    expect(columns).toContain("id");
    expect(columns).toContain("iataCode");
    expect(columns).toContain("name");
    expect(columns).toContain("timezone");
    expect(columns).toContain("isDomestic");
    expect(columns).toContain("pinyinFirstLetter");
    expect(columns).toContain("continent");
    expect(columns).toContain("isPopular");
    expect(columns).toContain("displayOrder");
    expect(columns).toContain("isDeleted");
    expect(columns).toContain("createdAt");
    expect(columns).toContain("updatedAt");
  });

  it("should have unique constraint on iata_code", () => {
    const iataCodeColumn = cities.iataCode;
    expect(iataCodeColumn.isUnique).toBe(true);
  });

  it("should have correct default values", () => {
    expect(cities.isDomestic.default).toBeDefined();
    expect(cities.isPopular.default).toBeDefined();
    expect(cities.displayOrder.default).toBeDefined();
    expect(cities.isDeleted.default).toBeDefined();
  });

  it("should have pinyin_first_letter as nullable", () => {
    expect(cities.pinyinFirstLetter.notNull).toBe(false);
  });

  it("should have continent as nullable", () => {
    expect(cities.continent.notNull).toBe(false);
  });
});

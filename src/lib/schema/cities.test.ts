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
    expect(columns).toContain("iata_code");
    expect(columns).toContain("name");
    expect(columns).toContain("timezone");
    expect(columns).toContain("is_domestic");
    expect(columns).toContain("pinyin_first_letter");
    expect(columns).toContain("continent");
    expect(columns).toContain("is_popular");
    expect(columns).toContain("display_order");
    expect(columns).toContain("is_deleted");
    expect(columns).toContain("created_at");
    expect(columns).toContain("updated_at");
  });

  it("should have unique constraint on iata_code", () => {
    const iataCodeColumn = cities.iata_code;
    expect(iataCodeColumn.isUnique).toBe(true);
  });

  it("should have correct default values", () => {
    expect(cities.is_domestic.default).toBeDefined();
    expect(cities.is_popular.default).toBeDefined();
    expect(cities.display_order.default).toBeDefined();
    expect(cities.is_deleted.default).toBeDefined();
  });

  it("should have pinyin_first_letter as nullable", () => {
    expect(cities.pinyin_first_letter.notNull).toBe(false);
  });

  it("should have continent as nullable", () => {
    expect(cities.continent.notNull).toBe(false);
  });
});

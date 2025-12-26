import { getTableName } from "drizzle-orm";
import { describe, expect, it } from "vitest";

import { flightSearchHistory } from "./flight-search-history";

describe("Flight Search History Schema", () => {
  it("should have correct table name", () => {
    expect(getTableName(flightSearchHistory)).toBe("flight_search_history");
  });

  it("should have all required fields defined", () => {
    const columns = Object.keys(flightSearchHistory);

    // Required fields
    expect(columns).toContain("id");
    expect(columns).toContain("userId");
    expect(columns).toContain("departureCityId");
    expect(columns).toContain("arrivalCityId");
    expect(columns).toContain("departureCityIata");
    expect(columns).toContain("departureCityName");
    expect(columns).toContain("arrivalCityIata");
    expect(columns).toContain("arrivalCityName");
    expect(columns).toContain("tripType");
    expect(columns).toContain("departureDate");
    expect(columns).toContain("seatClass");
    expect(columns).toContain("searchCount");
    expect(columns).toContain("lastSearchedAt");
    expect(columns).toContain("isDeleted");
    expect(columns).toContain("createdAt");
    expect(columns).toContain("updatedAt");

    // Optional fields
    expect(columns).toContain("returnDate");
    expect(columns).toContain("lowestPriceAtSearch");
    expect(columns).toContain("currentLowestPrice");
  });

  it("should have foreign key references to user and cities", () => {
    const userIdColumn = flightSearchHistory.userId;
    const departureCityIdColumn = flightSearchHistory.departureCityId;
    const arrivalCityIdColumn = flightSearchHistory.arrivalCityId;

    expect(userIdColumn.notNull).toBe(true);
    expect(departureCityIdColumn.notNull).toBe(true);
    expect(arrivalCityIdColumn.notNull).toBe(true);
  });

  it("should have default values for specific fields", () => {
    const seatClassColumn = flightSearchHistory.seatClass;
    const searchCountColumn = flightSearchHistory.searchCount;
    const isDeletedColumn = flightSearchHistory.isDeleted;

    expect(seatClassColumn.default).toBe("any");
    expect(searchCountColumn.default).toBe(1);
    expect(isDeletedColumn.default).toBe(false);
  });

  it("should have correct column types", () => {
    expect(flightSearchHistory.tripType.getSQLType()).toBe("varchar(20)");
    expect(flightSearchHistory.departureCityIata.getSQLType()).toBe(
      "varchar(3)"
    );
    expect(flightSearchHistory.arrivalCityIata.getSQLType()).toBe("varchar(3)");
    expect(flightSearchHistory.departureCityName.getSQLType()).toBe(
      "varchar(100)"
    );
    expect(flightSearchHistory.arrivalCityName.getSQLType()).toBe(
      "varchar(100)"
    );
    expect(flightSearchHistory.seatClass.getSQLType()).toBe("varchar(20)");
  });
});

import { eq } from "drizzle-orm";
import { describe, expect, it, vi } from "vitest";

import { db } from "@/db";
import { cities, flightSearchHistory } from "@/db/schema";
import {
  createSearchHistoryRecord as createHistoryRecord,
  createUser,
} from "@/tests/integration/helpers/factories";
import {
  findCityByIataCode,
  findExistingSearchHistory,
  getRecentSearchHistory,
  softDeleteSearchHistoryByUser,
  updateSearchHistory,
} from "./flight-search-history.repository";

vi.mock("server-only", () => {
  return {}; // 返回空对象，不做任何检查
});

describe("flight-search-history.repository", () => {
  it("returns recent search history ordered by last searched and limited", async () => {
    const user = await createUser();
    await createHistoryRecord({
      user,
      lastSearchedAt: new Date("2024-01-01T00:00:00Z"),
    });
    const newest = await createHistoryRecord({
      user,
      lastSearchedAt: new Date("2024-02-01T00:00:00Z"),
    });

    const records = await getRecentSearchHistory(user.id, 1);

    expect(records).toHaveLength(1);
    expect(records[0]?.id).toBe(newest.record.id);
  });

  it("finds cities by IATA code case-insensitively and ignores deleted records", async () => {
    const [cityRow] = await db
      .insert(cities)
      .values({
        name: "查找城市",
        iataCode: "ABC",
        timezone: "Asia/Shanghai",
        isDomestic: true,
        pinyinFirstLetter: "A",
        isPopular: false,
        displayOrder: 1,
      })
      .returning();

    await createHistoryRecord({
      user: await createUser(),
      departureCity: cityRow,
    });

    const city = await findCityByIataCode("abc");
    expect(city?.id).toBe(cityRow.id);

    await db
      .update(cities)
      .set({ isDeleted: true })
      .where(eq(cities.id, cityRow.id));

    const deletedCity = await findCityByIataCode("ABC");
    expect(deletedCity).toBeNull();
  });

  it("finds existing search history with and without return dates", async () => {
    const user = await createUser();
    const { record } = await createHistoryRecord({
      user,
      departureDate: new Date("2024-01-10"),
      returnDate: null,
    });
    const roundTrip = await createHistoryRecord({
      user,
      departureDate: new Date("2024-02-01"),
      returnDate: new Date("2024-02-05"),
      tripType: "round-trip",
    });

    const foundOneWay = await findExistingSearchHistory({
      userId: user.id,
      departureCityId: record.departureCityId,
      arrivalCityId: record.arrivalCityId,
      departureDate: String(record.departureDate),
      returnDate: undefined,
    });
    expect(foundOneWay?.id).toBe(record.id);

    const foundRoundTrip = await findExistingSearchHistory({
      userId: user.id,
      departureCityId: roundTrip.record.departureCityId,
      arrivalCityId: roundTrip.record.arrivalCityId,
      departureDate: String(roundTrip.record.departureDate),
      returnDate: roundTrip.record.returnDate
        ? String(roundTrip.record.returnDate)
        : undefined,
    });
    expect(foundRoundTrip?.id).toBe(roundTrip.record.id);
  });

  it("increments search count and updates lowest price when updating history", async () => {
    const user = await createUser();
    const { record } = await createHistoryRecord({
      user,
      lowestPriceAtSearch: "1000.00",
      currentLowestPrice: "1000.00",
      lastSearchedAt: new Date("2024-01-01T00:00:00Z"),
    });

    await updateSearchHistory(record.id, { lowestPrice: "900.00" });

    const [updated] = await db
      .select()
      .from(flightSearchHistory)
      .where(eq(flightSearchHistory.id, record.id));

    expect(updated?.searchCount).toBe(2);
    expect(updated?.currentLowestPrice).toBe("900.00");
    expect(new Date(updated?.lastSearchedAt).getTime()).toBeGreaterThan(
      new Date("2024-01-01T00:00:00Z").getTime()
    );
  });

  it("soft deletes search history for user", async () => {
    const user = await createUser();
    const { record } = await createHistoryRecord({ user });

    await softDeleteSearchHistoryByUser(user.id);

    const [deleted] = await db
      .select()
      .from(flightSearchHistory)
      .where(eq(flightSearchHistory.id, record.id));
    expect(deleted?.isDeleted).toBe(true);
  });
});

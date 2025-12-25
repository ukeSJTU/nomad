import { and, desc, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { cities, flightSearchHistory } from "@/db/schema";
import type { DbExecutor } from "@/db/transaction";
import { SearchHistoryRecord } from "@/types/dto";

export type FlightSearchHistoryRow = typeof flightSearchHistory.$inferSelect;
export type CityRow = typeof cities.$inferSelect;

/**
 * Get recent search history for a user
 *
 * @param userId - User ID to fetch search history for
 * @param limit - Maximum number of records to return (default: 10)
 * @returns Array of search history records, ordered by most recent first
 */
export async function getRecentSearchHistory(
  userId: string,
  limit: number = 10,
  dbClient: DbExecutor = db
): Promise<SearchHistoryRecord[]> {
  const results = await dbClient
    .select({
      id: flightSearchHistory.id,
      departureCityIata: flightSearchHistory.departureCityIata,
      departureCityName: flightSearchHistory.departureCityName,
      arrivalCityIata: flightSearchHistory.arrivalCityIata,
      arrivalCityName: flightSearchHistory.arrivalCityName,
      tripType: flightSearchHistory.tripType,
      departureDate: flightSearchHistory.departureDate,
      returnDate: flightSearchHistory.returnDate,
      seatClass: flightSearchHistory.seatClass,
      lowestPriceAtSearch: flightSearchHistory.lowestPriceAtSearch,
      currentLowestPrice: flightSearchHistory.currentLowestPrice,
      lastSearchedAt: flightSearchHistory.lastSearchedAt,
    })
    .from(flightSearchHistory)
    .where(
      and(
        eq(flightSearchHistory.userId, userId),
        eq(flightSearchHistory.isDeleted, false)
      )
    )
    .orderBy(desc(flightSearchHistory.lastSearchedAt))
    .limit(limit);

  return results.map(record => ({
    ...record,
    tripType: record.tripType as "one-way" | "round-trip",
  }));
}

export async function findCityByIataCode(
  iataCode: string,
  dbClient: DbExecutor = db
): Promise<CityRow | null> {
  const city = await dbClient.query.cities.findFirst({
    where: and(
      eq(cities.iataCode, iataCode.toUpperCase()),
      eq(cities.isDeleted, false)
    ),
  });

  return city ?? null;
}

export async function findExistingSearchHistory(
  params: {
    userId: string;
    departureCityId: string;
    arrivalCityId: string;
    departureDate: string;
    returnDate?: string | null;
  },
  dbClient: DbExecutor = db
): Promise<FlightSearchHistoryRow | null> {
  const existing = await dbClient.query.flightSearchHistory.findFirst({
    where: and(
      eq(flightSearchHistory.userId, params.userId),
      eq(flightSearchHistory.departureCityId, params.departureCityId),
      eq(flightSearchHistory.arrivalCityId, params.arrivalCityId),
      eq(flightSearchHistory.departureDate, params.departureDate),
      params.returnDate
        ? eq(flightSearchHistory.returnDate, params.returnDate)
        : sql`${flightSearchHistory.returnDate} IS NULL`,
      eq(flightSearchHistory.isDeleted, false)
    ),
  });

  return existing ?? null;
}

export async function updateSearchHistory(
  id: string,
  options: { lowestPrice?: string },
  dbClient: DbExecutor = db
): Promise<void> {
  await dbClient
    .update(flightSearchHistory)
    .set({
      searchCount: sql`${flightSearchHistory.searchCount} + 1`,
      lastSearchedAt: new Date(),
      ...(options.lowestPrice !== undefined && {
        currentLowestPrice: options.lowestPrice,
      }),
      updatedAt: new Date(),
    })
    .where(eq(flightSearchHistory.id, id));
}

export async function createSearchHistoryRecord(
  record: typeof flightSearchHistory.$inferInsert,
  dbClient: DbExecutor = db
): Promise<void> {
  await dbClient.insert(flightSearchHistory).values(record);
}

export async function softDeleteSearchHistoryByUser(
  userId: string,
  dbClient: DbExecutor = db
): Promise<void> {
  await dbClient
    .update(flightSearchHistory)
    .set({
      isDeleted: true,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(flightSearchHistory.userId, userId),
        eq(flightSearchHistory.isDeleted, false)
      )
    );
}

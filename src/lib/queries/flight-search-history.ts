import { and, desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { flightSearchHistory } from "@/lib/schema";
import { SearchHistoryRecord } from "@/types/dto";

/**
 * Get recent search history for a user
 *
 * @param userId - User ID to fetch search history for
 * @param limit - Maximum number of records to return (default: 10)
 * @returns Array of search history records, ordered by most recent first
 */
export async function getRecentSearchHistory(
  userId: string,
  limit: number = 10
): Promise<SearchHistoryRecord[]> {
  const results = await db
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

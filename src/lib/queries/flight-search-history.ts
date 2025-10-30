import { and, desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { flightSearchHistory } from "@/lib/schema";

/**
 * Search history record type for display
 */
export interface SearchHistoryRecord {
  id: string;
  departureCityIata: string;
  departureCityName: string;
  arrivalCityIata: string;
  arrivalCityName: string;
  tripType: "one-way" | "round-trip";
  departureDate: string; // YYYY-MM-DD format
  returnDate: string | null; // YYYY-MM-DD format (null for one-way)
  seatClass: string;
  lowestPriceAtSearch: string | null; // Decimal string (e.g., "1234.56")
  currentLowestPrice: string | null; // Decimal string (e.g., "1234.56")
  searchCount: number;
  lastSearchedAt: Date;
}

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
      searchCount: flightSearchHistory.searchCount,
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

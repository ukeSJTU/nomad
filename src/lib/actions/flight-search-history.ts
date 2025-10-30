"use server";

import { and, eq, sql } from "drizzle-orm";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { cities, flightSearchHistory } from "@/lib/schema";
import logger from "@/utils/logger";

interface RecordSearchHistoryParams {
  departureCityIata: string;
  arrivalCityIata: string;
  departureDate: string; // YYYY-MM-DD format
  returnDate?: string; // YYYY-MM-DD format (optional for one-way)
  tripType: "one-way" | "round-trip";
  seatClass?: "economy" | "business" | "first";
  lowestPrice?: number; // Optional: lowest price found in search results
}

/**
 * Record user's flight search history
 *
 * Business Logic:
 * - Only records for logged-in users
 * - If same search exists (same route + dates), increment search_count and update last_searched_at
 * - If new search, create new record
 * - Silently fails for unauthenticated users (returns without error)
 *
 * @param params - Search parameters to record
 */
export async function recordSearchHistory(
  params: RecordSearchHistoryParams
): Promise<void> {
  logger.debug(`Recording search history for: ${JSON.stringify(params)}`);
  try {
    // Check if user is logged in
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });

    if (!session?.user?.id) {
      // User not logged in - silently return without recording
      logger.debug("Search history not recorded as user is not logged in.");
      return;
    }

    const userId = session.user.id;

    // Fetch city details for both departure and arrival cities
    const [departureCity, arrivalCity] = await Promise.all([
      db.query.cities.findFirst({
        where: and(
          eq(cities.iataCode, params.departureCityIata.toUpperCase()),
          eq(cities.isDeleted, false)
        ),
      }),
      db.query.cities.findFirst({
        where: and(
          eq(cities.iataCode, params.arrivalCityIata.toUpperCase()),
          eq(cities.isDeleted, false)
        ),
      }),
    ]);

    if (!departureCity || !arrivalCity) {
      console.error("Invalid city IATA codes provided for search history");
      return;
    }

    // Normalize seat class
    const seatClass = params.seatClass?.toLowerCase() as
      | "economy"
      | "business"
      | "first"
      | undefined;

    // Check if this exact search already exists (not deleted)
    const existingSearch = await db.query.flightSearchHistory.findFirst({
      where: and(
        eq(flightSearchHistory.userId, userId),
        eq(flightSearchHistory.departureCityId, departureCity.id),
        eq(flightSearchHistory.arrivalCityId, arrivalCity.id),
        eq(flightSearchHistory.departureDate, params.departureDate),
        params.returnDate
          ? eq(flightSearchHistory.returnDate, params.returnDate)
          : sql`${flightSearchHistory.returnDate} IS NULL`,
        eq(flightSearchHistory.isDeleted, false)
      ),
    });

    if (existingSearch) {
      // Update existing search: increment count, update timestamp, and optionally update price
      await db
        .update(flightSearchHistory)
        .set({
          searchCount: sql`${flightSearchHistory.searchCount} + 1`,
          lastSearchedAt: new Date(),
          ...(params.lowestPrice !== undefined && {
            currentLowestPrice: params.lowestPrice.toString(),
          }),
          updatedAt: new Date(),
        })
        .where(eq(flightSearchHistory.id, existingSearch.id));
    } else {
      // Create new search history record
      await db.insert(flightSearchHistory).values({
        userId,
        departureCityId: departureCity.id,
        arrivalCityId: arrivalCity.id,
        departureCityIata: departureCity.iataCode,
        departureCityName: departureCity.name,
        arrivalCityIata: arrivalCity.iataCode,
        arrivalCityName: arrivalCity.name,
        tripType: params.tripType,
        departureDate: params.departureDate,
        returnDate: params.returnDate || null,
        seatClass: seatClass || "economy",
        lowestPriceAtSearch: params.lowestPrice?.toString() || null,
        currentLowestPrice: params.lowestPrice?.toString() || null,
        searchCount: 1,
        lastSearchedAt: new Date(),
      });
    }
  } catch (error) {
    // Log error but don't throw - recording history should not break the search flow
    console.error("Failed to record search history:", error);
  }
}

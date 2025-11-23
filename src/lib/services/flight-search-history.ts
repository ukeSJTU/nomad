import { and, eq, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { cities, flightSearchHistory } from "@/lib/schema";
import type { RecordFlightSearchData } from "@/types/validations";
import logger from "@/utils/logger";

import type { ServiceResult } from "./types";

/**
 * Service layer for flight search history business logic
 *
 * This layer contains pure business logic without framework dependencies (no Next.js runtime),
 * making it easy to test and reuse in different contexts.
 *
 * All functions accept userId as a parameter instead of accessing session directly,
 * following the dependency injection pattern.
 */

/**
 * Record a flight search to history
 *
 * Business Logic:
 * - Validates city IATA codes
 * - If same search exists (same route + dates), increment search_count and update last_searched_at
 * - If new search, create new record
 * - Silently fails for invalid cities (returns success without recording)
 *
 * @param userId - The ID of the user recording the search
 * @param data - Search parameters to record
 * @returns ServiceResult indicating success or failure
 */
export async function recordFlightSearch(
  userId: string,
  data: RecordFlightSearchData
): Promise<ServiceResult<void>> {
  logger.debug(
    `Recording search history for user ${userId}: ${JSON.stringify(data)}`
  );

  try {
    // Fetch city details for both departure and arrival cities
    const [departureCity, arrivalCity] = await Promise.all([
      db.query.cities.findFirst({
        where: and(
          eq(cities.iataCode, data.departureCityIata.toUpperCase()),
          eq(cities.isDeleted, false)
        ),
      }),
      db.query.cities.findFirst({
        where: and(
          eq(cities.iataCode, data.arrivalCityIata.toUpperCase()),
          eq(cities.isDeleted, false)
        ),
      }),
    ]);

    if (!departureCity || !arrivalCity) {
      logger.warn("Invalid city IATA codes provided for search history");
      return {
        success: true,
        message: "Search not recorded due to invalid city codes",
      };
    }

    // Normalize seat class
    const seatClass = data.seatClass?.toLowerCase() as
      | "any"
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
        eq(flightSearchHistory.departureDate, data.departureDate),
        data.returnDate
          ? eq(flightSearchHistory.returnDate, data.returnDate)
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
          ...(data.lowestPrice !== undefined && {
            currentLowestPrice: data.lowestPrice.toString(),
          }),
          updatedAt: new Date(),
        })
        .where(eq(flightSearchHistory.id, existingSearch.id));

      logger.debug(
        `Updated existing search history: ${existingSearch.id} (count: ${existingSearch.searchCount + 1})`
      );
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
        tripType: data.tripType,
        departureDate: data.departureDate,
        returnDate: data.returnDate || null,
        seatClass: seatClass || "any", // Default to "any" to match database schema default
        lowestPriceAtSearch: data.lowestPrice?.toString() || null,
        currentLowestPrice: data.lowestPrice?.toString() || null,
        searchCount: 1,
        lastSearchedAt: new Date(),
      });

      logger.debug("Created new search history record");
    }

    return {
      success: true,
      message: "Search recorded successfully",
    };
  } catch (error) {
    // Log error but don't throw - recording history should not break the search flow
    logger.error({ err: error }, "Failed to record search history");
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to record search history",
    };
  }
}

/**
 * Clear all search history for a user
 *
 * Business Logic:
 * - Performs soft delete (sets isDeleted = true)
 * - Only deletes non-deleted records
 *
 * @param userId - The ID of the user clearing their history
 * @returns ServiceResult with success status and message
 */
export async function clearFlightSearchHistory(
  userId: string
): Promise<ServiceResult<void>> {
  logger.debug(`Clearing search history for user ${userId}`);

  try {
    // Soft delete all search history for this user
    await db
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

    logger.debug(`Cleared search history for user ${userId}`);

    return {
      success: true,
      message: "搜索历史已清空",
    };
  } catch (error) {
    logger.error({ err: error }, "Failed to clear search history");
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "清空搜索历史失败，请稍后重试",
    };
  }
}

import { logger } from "@/infra/logging";
import type { ServiceResult } from "@/types/result";
import type { RecordFlightSearchData } from "@/types/validations";
import {
  createSearchHistoryRecord,
  findCityByIataCode,
  findExistingSearchHistory,
  softDeleteSearchHistoryByUser,
  updateSearchHistory,
} from "./flight-search-history.repository";

/**
 * Service layer for flight search history business logic
 *
 * This layer contains pure business logic without framework dependencies (no Next.js runtime),
 * making it easy to test and reuse in different contexts (user actions, admin operations, cron jobs, etc.).
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
    const [departureCity, arrivalCity] = await Promise.all([
      findCityByIataCode(data.departureCityIata),
      findCityByIataCode(data.arrivalCityIata),
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

    const existingSearch = await findExistingSearchHistory({
      userId,
      departureCityId: departureCity.id,
      arrivalCityId: arrivalCity.id,
      departureDate: data.departureDate,
      returnDate: data.returnDate,
    });

    if (existingSearch) {
      await updateSearchHistory(existingSearch.id, {
        lowestPrice: data.lowestPrice?.toString(),
      });

      logger.debug(
        `Updated existing search history: ${existingSearch.id} (count: ${existingSearch.searchCount + 1})`
      );
    } else {
      await createSearchHistoryRecord({
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
        seatClass: seatClass || "any",
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
    await softDeleteSearchHistoryByUser(userId);

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

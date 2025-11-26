/**
 * Flight Search Service
 *
 * Business logic for flight search operations including search history recording.
 * This service layer abstracts the complexity of searching flights and recording history.
 */

import {
  searchOneWayFlights,
  searchRoundTripFlights,
} from "@/domains/flights/flight.repository";
import { recordFlightSearch } from "@/domains/flights/flight-search-history.service";
import { calculateLowestPrice } from "@/lib/flights/calculations";
import logger from "@/lib/server/logger";
import type {
  FlightSearchResult,
  RoundTripFlightSearchResult,
} from "@/types/dto";
import type { SeatClass, TripType, UpperSeatClass } from "@/types/validations";

/**
 * Parameters for searching one-way flights
 */
export interface SearchOneWayParams {
  from: string;
  to: string;
  departureDate: string;
  seatClass: SeatClass;
  classType?: UpperSeatClass;
  userId?: string;
}

/**
 * Parameters for searching round-trip flights
 */
export interface SearchRoundTripParams extends SearchOneWayParams {
  returnDate: string;
}

/**
 * Search one-way flights and record search history
 *
 * @param params - Search parameters
 * @returns Flight search results
 */
export async function searchOneWayFlightsWithHistory(
  params: SearchOneWayParams
): Promise<FlightSearchResult[] | undefined> {
  const { from, to, departureDate, seatClass, classType, userId } = params;

  try {
    // Execute flight search
    const flights = await searchOneWayFlights({
      from,
      to,
      departureDate,
      classType,
    });

    // Record search history (fire-and-forget, non-blocking)
    if (userId) {
      recordFlightSearch(userId, {
        departureCityIata: from,
        arrivalCityIata: to,
        departureDate,
        tripType: "one-way",
        seatClass,
        lowestPrice: calculateLowestPrice(flights),
      }).catch(error => {
        logger.error({ err: error }, "Failed to record search history");
      });
    }

    return flights;
  } catch (error) {
    logger.error({ err: error }, "One-way flight search failed");
    throw error;
  }
}

/**
 * Search round-trip flights and record search history
 *
 * @param params - Search parameters
 * @returns Flight search results
 */
export async function searchRoundTripFlightsWithHistory(
  params: SearchRoundTripParams
): Promise<RoundTripFlightSearchResult | undefined> {
  const { from, to, departureDate, returnDate, seatClass, classType, userId } =
    params;

  try {
    // Execute flight search
    const flights = await searchRoundTripFlights({
      from,
      to,
      departureDate,
      returnDate,
      classType,
    });

    // Record search history (fire-and-forget, non-blocking)
    if (userId) {
      recordFlightSearch(userId, {
        departureCityIata: from,
        arrivalCityIata: to,
        departureDate,
        returnDate,
        tripType: "round-trip",
        seatClass,
        lowestPrice: calculateLowestPrice(flights),
      }).catch(error => {
        logger.error({ err: error }, "Failed to record search history");
      });
    }

    return flights;
  } catch (error) {
    logger.error({ err: error }, "Round-trip flight search failed");
    throw error;
  }
}

/**
 * Search flights based on trip type and record search history
 *
 * This is a unified function that handles both one-way and round-trip searches.
 *
 * @param params - Search parameters
 * @returns Flight search results
 */
export async function searchFlightsWithHistory(params: {
  tripType: TripType;
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  seatClass: SeatClass;
  classType?: UpperSeatClass;
  userId?: string;
}): Promise<FlightSearchResult[] | RoundTripFlightSearchResult | undefined> {
  const {
    tripType,
    from,
    to,
    departureDate,
    returnDate,
    seatClass,
    classType,
    userId,
  } = params;

  if (tripType === "round-trip") {
    if (!returnDate) {
      throw new Error("Return date is required for round-trip searches");
    }

    return searchRoundTripFlightsWithHistory({
      from,
      to,
      departureDate,
      returnDate,
      seatClass,
      classType,
      userId,
    });
  }

  return searchOneWayFlightsWithHistory({
    from,
    to,
    departureDate,
    seatClass,
    classType,
    userId,
  });
}

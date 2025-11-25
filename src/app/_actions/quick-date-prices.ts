"use server";

import { and, eq, gte, inArray, lt, sql } from "drizzle-orm";

import { db } from "@/orm/db";
import { airports, cities, flights, flightSeatClasses } from "@/orm/schema";
import { addCurrency, getCurrencyValue, parseCurrency } from "@/utils/currency";
import {
  calculateQuickSelectDateRange,
  getBookingDateRange,
} from "@/utils/date";
import logger from "@/utils/logger";

/**
 * Result type for quick date price lookup
 */
export interface QuickDatePrice {
  date: string; // YYYY-MM-DD format
  lowestPrice: number | null; // null if no flights available
  returnDate?: string; // Only for round-trip (YYYY-MM-DD format)
}

/**
 * Parameters for fetching quick date prices
 */
interface GetQuickDatePricesParams {
  from: string; // Departure city IATA code
  to: string; // Arrival city IATA code
  departureDate: string; // Selected departure date (YYYY-MM-DD)
  returnDate?: string; // Selected return date for round-trip (YYYY-MM-DD)
  tripType: "one-way" | "round-trip";
  classType?: "ECONOMY" | "BUSINESS" | "FIRST";
}

/**
 * Get lowest prices for quick date selection
 *
 * For one-way trips:
 * - Returns 7 dates centered on departureDate with lowest price for each
 *
 * For round-trip:
 * - Returns 7 date pairs centered on departureDate
 * - Each price is sum of outbound (on that date) + inbound (on returnDate offset by same amount)
 * - Example: If user searches 12-25 to 12-28 (3 day gap)
 *   - Item 1: 12-22 to 12-25 (same 3 day gap)
 *   - Item 2: 12-23 to 12-26 (same 3 day gap)
 *   - ...
 *   - Item 7: 12-28 to 12-31 (same 3 day gap)
 */
export async function getQuickDatePrices(
  params: GetQuickDatePricesParams
): Promise<QuickDatePrice[]> {
  try {
    logger.debug(`Fetching quick date prices for: ${JSON.stringify(params)}`);

    // Validate parameters
    const fromCode = params.from.toUpperCase();
    const toCode = params.to.toUpperCase();

    if (fromCode === toCode) {
      throw new Error("Departure and arrival cities must be different");
    }

    // Find departure city to get timezone
    const [departureCityData] = await db
      .select({ city: cities })
      .from(cities)
      .where(and(eq(cities.iataCode, fromCode), eq(cities.isDeleted, false)))
      .limit(1);

    if (!departureCityData) {
      throw new Error(`Departure city ${fromCode} not found`);
    }

    const departureCity = departureCityData.city;

    // Get booking date range (today to today + 365 days)
    const { minDate, maxDate } = getBookingDateRange(departureCity.timezone);

    // Calculate 7-day window centered on selected departure date
    const selectedDate = new Date(params.departureDate);
    const { dates } = calculateQuickSelectDateRange(
      selectedDate,
      minDate,
      maxDate
    );

    if (params.tripType === "one-way") {
      // One-way: Get lowest price for each date
      return await getOneWayQuickPrices({
        from: fromCode,
        to: toCode,
        dates,
        classType: params.classType,
      });
    } else {
      // Round-trip: Get lowest price for each date pair
      if (!params.returnDate) {
        throw new Error("Return date is required for round-trip");
      }

      const selectedDepartureDate = new Date(params.departureDate);
      const selectedReturnDate = new Date(params.returnDate);

      // Calculate the gap between departure and return (in days)
      const dayGap = Math.floor(
        (selectedReturnDate.getTime() - selectedDepartureDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      if (dayGap < 0) {
        throw new Error("Return date must be after departure date");
      }

      return await getRoundTripQuickPrices({
        from: fromCode,
        to: toCode,
        dates,
        dayGap,
        classType: params.classType,
      });
    }
  } catch (error) {
    logger.error(`Error fetching quick date prices: ${error}`);
    throw error;
  }
}

/**
 * Get lowest prices for one-way trips
 */
async function getOneWayQuickPrices(params: {
  from: string;
  to: string;
  dates: Date[];
  classType?: "ECONOMY" | "BUSINESS" | "FIRST";
}): Promise<QuickDatePrice[]> {
  const { from, to, dates, classType } = params;

  // Get all airports for departure and arrival cities
  const [departureAirports, arrivalAirports] = await Promise.all([
    db
      .select({ id: airports.id })
      .from(airports)
      .innerJoin(cities, eq(airports.cityId, cities.id))
      .where(and(eq(cities.iataCode, from), eq(airports.isDeleted, false))),
    db
      .select({ id: airports.id })
      .from(airports)
      .innerJoin(cities, eq(airports.cityId, cities.id))
      .where(and(eq(cities.iataCode, to), eq(airports.isDeleted, false))),
  ]);

  const departureAirportIds = departureAirports.map(a => a.id);
  const arrivalAirportIds = arrivalAirports.map(a => a.id);

  if (departureAirportIds.length === 0 || arrivalAirportIds.length === 0) {
    // No airports found, return all dates with null prices
    return dates.map(date => ({
      date: date.toISOString().split("T")[0],
      lowestPrice: null,
    }));
  }

  // Query lowest price for each date
  const pricePromises = dates.map(async date => {
    const dateStr = date.toISOString().split("T")[0];
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    // Query for lowest price on this date
    const result = await db
      .select({
        lowestPrice: sql<string>`MIN(${flightSeatClasses.price})`,
      })
      .from(flights)
      .innerJoin(
        flightSeatClasses,
        and(
          eq(flightSeatClasses.flightId, flights.id),
          eq(flightSeatClasses.isDeleted, false),
          classType ? eq(flightSeatClasses.classType, classType) : sql`true`
        )
      )
      .where(
        and(
          inArray(flights.departureAirportId, departureAirportIds),
          inArray(flights.arrivalAirportId, arrivalAirportIds),
          gte(flights.departureDatetime, startOfDay),
          lt(flights.departureDatetime, endOfDay),
          eq(flights.isDeleted, false)
        )
      );

    const lowestPrice = result[0]?.lowestPrice
      ? getCurrencyValue(parseCurrency(result[0].lowestPrice))
      : null;

    return {
      date: dateStr,
      lowestPrice,
    };
  });

  return await Promise.all(pricePromises);
}

/**
 * Get lowest prices for round-trip
 */
async function getRoundTripQuickPrices(params: {
  from: string;
  to: string;
  dates: Date[];
  dayGap: number;
  classType?: "ECONOMY" | "BUSINESS" | "FIRST";
}): Promise<QuickDatePrice[]> {
  const { from, to, dates, dayGap, classType } = params;

  // Get all airports for departure and arrival cities
  const [departureAirports, arrivalAirports] = await Promise.all([
    db
      .select({ id: airports.id })
      .from(airports)
      .innerJoin(cities, eq(airports.cityId, cities.id))
      .where(and(eq(cities.iataCode, from), eq(airports.isDeleted, false))),
    db
      .select({ id: airports.id })
      .from(airports)
      .innerJoin(cities, eq(airports.cityId, cities.id))
      .where(and(eq(cities.iataCode, to), eq(airports.isDeleted, false))),
  ]);

  const departureAirportIds = departureAirports.map(a => a.id);
  const arrivalAirportIds = arrivalAirports.map(a => a.id);

  if (departureAirportIds.length === 0 || arrivalAirportIds.length === 0) {
    // No airports found, return all dates with null prices
    return dates.map(date => {
      const returnDate = new Date(date);
      returnDate.setDate(returnDate.getDate() + dayGap);
      return {
        date: date.toISOString().split("T")[0],
        returnDate: returnDate.toISOString().split("T")[0],
        lowestPrice: null,
      };
    });
  }

  // Query lowest price for each date pair
  const pricePromises = dates.map(async outboundDate => {
    // Calculate return date (outbound + dayGap)
    const returnDate = new Date(outboundDate);
    returnDate.setDate(returnDate.getDate() + dayGap);

    const outboundDateStr = outboundDate.toISOString().split("T")[0];
    const returnDateStr = returnDate.toISOString().split("T")[0];

    // Get lowest outbound price
    const outboundStartOfDay = new Date(outboundDate);
    outboundStartOfDay.setUTCHours(0, 0, 0, 0);
    const outboundEndOfDay = new Date(outboundDate);
    outboundEndOfDay.setUTCHours(23, 59, 59, 999);

    // Get lowest return price
    const returnStartOfDay = new Date(returnDate);
    returnStartOfDay.setUTCHours(0, 0, 0, 0);
    const returnEndOfDay = new Date(returnDate);
    returnEndOfDay.setUTCHours(23, 59, 59, 999);

    // Query both in parallel
    const [outboundResult, returnResult] = await Promise.all([
      db
        .select({
          lowestPrice: sql<string>`MIN(${flightSeatClasses.price})`,
        })
        .from(flights)
        .innerJoin(
          flightSeatClasses,
          and(
            eq(flightSeatClasses.flightId, flights.id),
            eq(flightSeatClasses.isDeleted, false),
            classType ? eq(flightSeatClasses.classType, classType) : sql`true`
          )
        )
        .where(
          and(
            inArray(flights.departureAirportId, departureAirportIds),
            inArray(flights.arrivalAirportId, arrivalAirportIds),
            gte(flights.departureDatetime, outboundStartOfDay),
            lt(flights.departureDatetime, outboundEndOfDay),
            eq(flights.isDeleted, false)
          )
        ),
      db
        .select({
          lowestPrice: sql<string>`MIN(${flightSeatClasses.price})`,
        })
        .from(flights)
        .innerJoin(
          flightSeatClasses,
          and(
            eq(flightSeatClasses.flightId, flights.id),
            eq(flightSeatClasses.isDeleted, false),
            classType ? eq(flightSeatClasses.classType, classType) : sql`true`
          )
        )
        .where(
          and(
            // Reverse: from arrival city back to departure city
            inArray(flights.departureAirportId, arrivalAirportIds),
            inArray(flights.arrivalAirportId, departureAirportIds),
            gte(flights.departureDatetime, returnStartOfDay),
            lt(flights.departureDatetime, returnEndOfDay),
            eq(flights.isDeleted, false)
          )
        ),
    ]);

    const outboundPrice = outboundResult[0]?.lowestPrice
      ? getCurrencyValue(parseCurrency(outboundResult[0].lowestPrice))
      : null;
    const returnPrice = returnResult[0]?.lowestPrice
      ? getCurrencyValue(parseCurrency(returnResult[0].lowestPrice))
      : null;

    // Sum prices using currency.js for precision (null if either is null)
    const totalPrice =
      outboundPrice !== null && returnPrice !== null
        ? getCurrencyValue(addCurrency(outboundPrice, returnPrice))
        : null;

    return {
      date: outboundDateStr,
      returnDate: returnDateStr,
      lowestPrice: totalPrice,
    };
  });

  return await Promise.all(pricePromises);
}

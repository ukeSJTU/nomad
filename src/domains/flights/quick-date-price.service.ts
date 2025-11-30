import { and, eq, gte, inArray, lt, sql } from "drizzle-orm";

import { db } from "@/db";
import { airports, cities, flightSeatClasses, flights } from "@/db/schema";
import { logger } from "@/infra/logging";
import {
  addCurrency,
  getCurrencyValue,
  parseCurrency,
} from "@/lib/format/currency";
import {
  calculateQuickSelectDateRange,
  getBookingDateRange,
} from "@/lib/format/date";
import {
  type GetQuickDatePricesParams,
  type QuickDatePrice,
} from "@/types/dto";

export async function getQuickDatePrices(
  params: GetQuickDatePricesParams
): Promise<QuickDatePrice[]> {
  try {
    logger.debug(`Fetching quick date prices for: ${JSON.stringify(params)}`);

    const fromCode = params.from.toUpperCase();
    const toCode = params.to.toUpperCase();

    if (fromCode === toCode) {
      throw new Error("Departure and arrival cities must be different");
    }

    const [departureCityData] = await db
      .select({ city: cities })
      .from(cities)
      .where(and(eq(cities.iataCode, fromCode), eq(cities.isDeleted, false)))
      .limit(1);

    if (!departureCityData) {
      throw new Error(`Departure city ${fromCode} not found`);
    }

    const departureCity = departureCityData.city;
    const { minDate, maxDate } = getBookingDateRange(departureCity.timezone);
    const selectedDate = new Date(params.departureDate);
    const { dates } = calculateQuickSelectDateRange(
      selectedDate,
      minDate,
      maxDate
    );

    if (params.tripType === "one-way") {
      return await getOneWayQuickPrices({
        from: fromCode,
        to: toCode,
        dates,
        classType: params.classType,
      });
    }

    if (!params.returnDate) {
      throw new Error("Return date is required for round-trip");
    }

    const selectedDepartureDate = new Date(params.departureDate);
    const selectedReturnDate = new Date(params.returnDate);

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
  } catch (error) {
    logger.error(`Error fetching quick date prices: ${error}`);
    throw error;
  }
}

async function getOneWayQuickPrices(params: {
  from: string;
  to: string;
  dates: Date[];
  classType?: "ECONOMY" | "BUSINESS" | "FIRST";
}): Promise<QuickDatePrice[]> {
  const { from, to, dates, classType } = params;

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
    return dates.map(date => ({
      date: date.toISOString().split("T")[0],
      lowestPrice: null,
    }));
  }

  const pricePromises = dates.map(async date => {
    const dateStr = date.toISOString().split("T")[0];
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

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

async function getRoundTripQuickPrices(params: {
  from: string;
  to: string;
  dates: Date[];
  dayGap: number;
  classType?: "ECONOMY" | "BUSINESS" | "FIRST";
}): Promise<QuickDatePrice[]> {
  const { from, to, dates, dayGap, classType } = params;

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

  const pricePromises = dates.map(async outboundDate => {
    const returnDate = new Date(outboundDate);
    returnDate.setDate(returnDate.getDate() + dayGap);

    const outboundDateStr = outboundDate.toISOString().split("T")[0];
    const returnDateStr = returnDate.toISOString().split("T")[0];

    const outboundStartOfDay = new Date(outboundDate);
    outboundStartOfDay.setUTCHours(0, 0, 0, 0);
    const outboundEndOfDay = new Date(outboundDate);
    outboundEndOfDay.setUTCHours(23, 59, 59, 999);

    const returnStartOfDay = new Date(returnDate);
    returnStartOfDay.setUTCHours(0, 0, 0, 0);
    const returnEndOfDay = new Date(returnDate);
    returnEndOfDay.setUTCHours(23, 59, 59, 999);

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

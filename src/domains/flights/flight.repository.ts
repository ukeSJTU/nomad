import { addYears, endOfDay, isBefore, isToday, startOfDay } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { and, eq, gte, inArray, lt, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { z } from "zod";

import { db } from "@/db";
import {
  airlines,
  airports,
  cities,
  flights,
  flightSeatClasses,
} from "@/db/schema";
import type {
  FlightSearchResult,
  RoundTripFlightSearchResult,
} from "@/types/dto";

const seatClassEnum = z.enum(["ECONOMY", "BUSINESS", "FIRST"], {
  message: "Seat class must be ECONOMY, BUSINESS, or FIRST",
});

const searchFlightsParamsSchema = z.object({
  from: z
    .string()
    .length(3, "Departure city code must be 3 characters")
    .regex(/^[A-Z]{3}$/, "City code must be uppercase letters"),
  to: z
    .string()
    .length(3, "Arrival city code must be 3 characters")
    .regex(/^[A-Z]{3}$/, "City code must be uppercase letters"),
  departureDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  classType: seatClassEnum.optional(),
});
/**
 * Core function to search flights based on departure/arrival cities and date
 *
 * @param params.from - Departure city IATA code (3 letters, e.g., "SHA" for Shanghai)
 * @param params.to - Arrival city IATA code (3 letters, e.g., "NYC" for New York)
 * @param params.departureDate - Departure date in YYYY-MM-DD format (in departure city's local time)
 * @param params.classType - Optional seat class filter
 *
 * Note: The function handles multiple airports per city and filters flights based on
 * the current time in the departure city's timezone to avoid showing past flights.
 */
export async function searchFlights(params: {
  from: string;
  to: string;
  departureDate: string;
  classType?: "ECONOMY" | "BUSINESS" | "FIRST";
}): Promise<FlightSearchResult[]> {
  // Validate and normalize parameters
  const validated = searchFlightsParamsSchema.parse({
    ...params,
    from: params.from.toUpperCase(),
    to: params.to.toUpperCase(),
  });

  // Validate that departure and arrival cities are different
  if (validated.from === validated.to) {
    throw new Error("Departure and arrival cities must be different");
  }

  // Find departure city and its airports
  const [departureCityData] = await db
    .select({
      city: cities,
    })
    .from(cities)
    .where(
      and(eq(cities.iataCode, validated.from), eq(cities.isDeleted, false))
    )
    .limit(1);

  if (!departureCityData) {
    throw new Error(`Departure city ${validated.from} not found`);
  }

  const departureCity = departureCityData.city;

  // Find all airports in the departure city
  const departureAirports = await db
    .select({ airport: airports })
    .from(airports)
    .where(
      and(eq(airports.cityId, departureCity.id), eq(airports.isDeleted, false))
    );

  if (departureAirports.length === 0) {
    throw new Error(`No airports found for departure city ${validated.from}`);
  }

  // Find arrival city and its airports
  const [arrivalCityData] = await db
    .select({
      city: cities,
    })
    .from(cities)
    .where(and(eq(cities.iataCode, validated.to), eq(cities.isDeleted, false)))
    .limit(1);

  if (!arrivalCityData) {
    throw new Error(`Arrival city ${validated.to} not found`);
  }

  const arrivalCity = arrivalCityData.city;

  // Find all airports in the arrival city
  const arrivalAirports = await db
    .select({ airport: airports })
    .from(airports)
    .where(
      and(eq(airports.cityId, arrivalCity.id), eq(airports.isDeleted, false))
    );

  if (arrivalAirports.length === 0) {
    throw new Error(`No airports found for arrival city ${validated.to}`);
  }

  // Calculate the date range in the departure city's timezone
  // The user's selected date is in the departure city's local time
  const departureDateStr = validated.departureDate; // YYYY-MM-DD format
  const departureTimezone = departureCity.timezone; // IANA timezone (e.g., "Asia/Shanghai")

  // Get current time in UTC, then convert to departure city's timezone
  const nowUTC = new Date();
  const nowInDepartureCity = toZonedTime(nowUTC, departureTimezone);

  // Parse the user's selected date as a date in the departure city's timezone
  // The user inputs "2025-10-28", which means "2025-10-28 00:00:00" in departure city's local time
  const selectedDateInDepartureCity = new Date(`${departureDateStr}T00:00:00`);

  // Get today's date (start of day) in departure city's timezone
  const todayInDepartureCity = startOfDay(nowInDepartureCity);

  // Check if the selected date is in the past (in departure city's timezone)
  if (isBefore(selectedDateInDepartureCity, todayInDepartureCity)) {
    throw new Error("Departure date cannot be in the past");
  }

  // Check if the selected date exceeds one year from today
  const oneYearFromToday = addYears(todayInDepartureCity, 1);
  if (!isBefore(selectedDateInDepartureCity, oneYearFromToday)) {
    throw new Error("Departure date cannot exceed one year from today");
  }

  // Calculate start and end of the selected day in departure city's timezone
  // Then convert to UTC for database query
  // End time is always end of the selected day
  const endTimeInDepartureCity = endOfDay(selectedDateInDepartureCity);

  // Start time depends on whether it's today or a future date
  // If the selected date is today, use current time as the start time
  // to filter out flights that have already departed
  const startTimeInDepartureCity = isToday(selectedDateInDepartureCity)
    ? nowInDepartureCity // Today: use current time to filter out past flights
    : startOfDay(selectedDateInDepartureCity); // Future: use start of day

  // Convert departure city local times to UTC for database query
  // fromZonedTime treats the input date as being in the specified timezone
  // and converts it to UTC
  const startTime = fromZonedTime(startTimeInDepartureCity, departureTimezone);
  const endTime = fromZonedTime(endTimeInDepartureCity, departureTimezone);

  const departureAirportIds = departureAirports.map(a => a.airport.id);
  const arrivalAirportIds = arrivalAirports.map(a => a.airport.id);

  // Create aliases for airports table to join twice (departure and arrival)
  const departureAirportsTable = alias(airports, "departureAirports");
  const arrivalAirportsTable = alias(airports, "arrivalAirports");

  // Query flights with all related data
  // Need to fetch both departure and arrival airport information for each flight
  const results = await db
    .select({
      flight: flights,
      airline: airlines,
      departureAirport: departureAirportsTable,
      arrivalAirport: arrivalAirportsTable,
      seatClass: flightSeatClasses,
    })
    .from(flights)
    .innerJoin(airlines, eq(flights.airlineId, airlines.id))
    .innerJoin(
      departureAirportsTable,
      eq(flights.departureAirportId, departureAirportsTable.id)
    )
    .innerJoin(
      arrivalAirportsTable,
      eq(flights.arrivalAirportId, arrivalAirportsTable.id)
    )
    .leftJoin(
      flightSeatClasses,
      and(
        eq(flightSeatClasses.flightId, flights.id),
        eq(flightSeatClasses.isDeleted, false),
        validated.classType
          ? eq(flightSeatClasses.classType, validated.classType)
          : sql`true`
      )
    )
    .where(
      and(
        inArray(flights.departureAirportId, departureAirportIds),
        inArray(flights.arrivalAirportId, arrivalAirportIds),
        gte(flights.departureDatetime, startTime),
        lt(flights.departureDatetime, endTime),
        eq(flights.isDeleted, false)
      )
    )
    .orderBy(flights.departureDatetime);

  // Group results by flight and aggregate seat classes
  // Use Omit to create a temporary type without lowestPrice fields
  type FlightWithoutLowestPrice = Omit<
    FlightSearchResult,
    "lowestPrice" | "lowestPriceClassType"
  >;
  const flightMap = new Map<string, FlightWithoutLowestPrice>();

  for (const row of results) {
    const flightId = row.flight.id;

    if (!flightMap.has(flightId)) {
      flightMap.set(flightId, {
        id: row.flight.id,
        flightNumber: row.flight.flightNumber,
        airline: {
          id: row.airline.id,
          iataCode: row.airline.iataCode,
          name: row.airline.name,
          logoUrl: row.airline.logoUrl,
        },
        departure: {
          airport: {
            id: row.departureAirport.id,
            iataCode: row.departureAirport.iataCode,
            name: row.departureAirport.name,
          },
          city: {
            id: departureCity.id,
            iataCode: departureCity.iataCode,
            name: departureCity.name,
            timezone: departureCity.timezone,
          },
          terminal: row.flight.departureTerminal,
          datetime: row.flight.departureDatetime.toISOString(),
        },
        arrival: {
          airport: {
            id: row.arrivalAirport.id,
            iataCode: row.arrivalAirport.iataCode,
            name: row.arrivalAirport.name,
          },
          city: {
            id: arrivalCity.id,
            iataCode: arrivalCity.iataCode,
            name: arrivalCity.name,
            timezone: arrivalCity.timezone,
          },
          terminal: row.flight.arrivalTerminal,
          datetime: row.flight.arrivalDatetime.toISOString(),
        },
        aircraftType: row.flight.aircraftType,
        seatClasses: [],
      });
    }

    // Add seat class if present
    if (row.seatClass) {
      const flight = flightMap.get(flightId);
      if (!flight) {
        continue;
      }
      flight.seatClasses.push({
        id: row.seatClass.id,
        classType: row.seatClass.classType as "ECONOMY" | "BUSINESS" | "FIRST",
        totalSeats: row.seatClass.totalSeats,
        availableSeats: row.seatClass.availableSeats,
        price: row.seatClass.price,
      });
    }
  }

  // Calculate lowestPrice and lowestPriceClassType for each flight
  const resultsWithLowestPrice = Array.from(flightMap.values())
    .map(flight => {
      // Skip flights with no seat classes (shouldn't happen in normal cases)
      if (flight.seatClasses.length === 0) {
        return null;
      }

      // Find the seat class with the lowest price
      const lowestSeatClass = flight.seatClasses.reduce((min, current) => {
        const minPrice = parseFloat(min.price);
        const currentPrice = parseFloat(current.price);
        return currentPrice < minPrice ? current : min;
      });

      return {
        ...flight,
        lowestPrice: parseFloat(lowestSeatClass.price),
        lowestPriceClassType: lowestSeatClass.classType,
      };
    })
    .filter((flight): flight is FlightSearchResult => flight !== null);

  return resultsWithLowestPrice;
}

/**
 * Search one-way flights
 */
export async function searchOneWayFlights(params: {
  from: string;
  to: string;
  departureDate: string;
  classType?: "ECONOMY" | "BUSINESS" | "FIRST";
}): Promise<FlightSearchResult[]> {
  return searchFlights(params);
}

/**
 * Search round-trip flights (outbound and inbound)
 */
export async function searchRoundTripFlights(params: {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  classType?: "ECONOMY" | "BUSINESS" | "FIRST";
}): Promise<RoundTripFlightSearchResult> {
  // Validate return date
  const returnDateSchema = z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format");
  const validatedReturnDate = returnDateSchema.parse(params.returnDate);

  const departureDate = new Date(params.departureDate);
  const returnDate = new Date(validatedReturnDate);

  if (returnDate <= departureDate) {
    throw new Error("Return date must be after departure date");
  }

  // Search outbound and inbound flights in parallel
  const [outbound, inbound] = await Promise.all([
    searchFlights({
      from: params.from,
      to: params.to,
      departureDate: params.departureDate,
      classType: params.classType,
    }),
    searchFlights({
      from: params.to,
      to: params.from,
      departureDate: validatedReturnDate,
      classType: params.classType,
    }),
  ]);

  return {
    outbound,
    inbound,
  };
}

import { and, eq, gte, inArray, lt, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import {
  airlines,
  airports,
  cities,
  flights,
  flightSeatClasses,
} from "@/lib/schema";

// Validation schemas
const seatClassEnum = z.enum(["ECONOMY", "BUSINESS", "FIRST"]);

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

// TypeScript types for return values
export type SeatClass = {
  id: string;
  classType: "ECONOMY" | "BUSINESS" | "FIRST";
  totalSeats: number;
  availableSeats: number;
  price: string;
};

export type FlightSearchResult = {
  id: string;
  flightNumber: string;
  airline: {
    id: string;
    iataCode: string;
    name: string;
    logoUrl: string | null;
  };
  departure: {
    airport: {
      id: string;
      iataCode: string;
      name: string;
    };
    city: {
      id: string;
      iataCode: string;
      name: string;
      timezone: string;
    };
    terminal: string | null;
    datetime: string;
  };
  arrival: {
    airport: {
      id: string;
      iataCode: string;
      name: string;
    };
    city: {
      id: string;
      iataCode: string;
      name: string;
      timezone: string;
    };
    terminal: string | null;
    datetime: string;
  };
  aircraftType: string | null;
  seatClasses: SeatClass[];
};

export type RoundTripFlightSearchResult = {
  outbound: FlightSearchResult[];
  inbound: FlightSearchResult[];
};

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

  // Get current time in departure city's timezone
  const nowInDepartureCity = new Date(
    new Date().toLocaleString("en-US", { timeZone: departureCity.timezone })
  );

  // Parse the selected date in departure city's timezone
  const selectedDateInDepartureCity = new Date(`${departureDateStr}T00:00:00`);

  // Check if the selected date is in the past (in departure city's timezone)
  const todayInDepartureCity = new Date(nowInDepartureCity);
  todayInDepartureCity.setHours(0, 0, 0, 0);

  if (selectedDateInDepartureCity < todayInDepartureCity) {
    throw new Error("Departure date cannot be in the past");
  }

  // Calculate start and end of the selected day in departure city's timezone
  // Then convert to UTC for database query
  const startOfDayLocal = `${departureDateStr}T00:00:00`;
  const endOfDayLocal = `${departureDateStr}T23:59:59.999`;

  // If the selected date is today, use current time as the start time
  // to filter out flights that have already departed
  let startTime: Date;
  if (
    selectedDateInDepartureCity.getTime() === todayInDepartureCity.getTime()
  ) {
    // Use current time in departure city
    startTime = nowInDepartureCity;
  } else {
    // Use start of day in departure city's timezone
    startTime = new Date(
      new Date(startOfDayLocal).toLocaleString("en-US", {
        timeZone: departureCity.timezone,
      })
    );
  }

  const endTime = new Date(
    new Date(endOfDayLocal).toLocaleString("en-US", {
      timeZone: departureCity.timezone,
    })
  );

  const departureAirportIds = departureAirports.map(a => a.airport.id);
  const arrivalAirportIds = arrivalAirports.map(a => a.airport.id);

  // Create aliases for airports table to join twice (departure and arrival)
  const departureAirportsTable = airports;
  const arrivalAirportsTable = airports;

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
  const flightMap = new Map<string, FlightSearchResult>();

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
      const flight = flightMap.get(flightId)!;
      flight.seatClasses.push({
        id: row.seatClass.id,
        classType: row.seatClass.classType as "ECONOMY" | "BUSINESS" | "FIRST",
        totalSeats: row.seatClass.totalSeats,
        availableSeats: row.seatClass.availableSeats,
        price: row.seatClass.price,
      });
    }
  }

  return Array.from(flightMap.values());
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

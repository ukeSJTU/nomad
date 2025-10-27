import { and, eq, gte, lt, sql } from "drizzle-orm";
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
    .length(3, "Departure airport code must be 3 characters")
    .regex(/^[A-Z]{3}$/, "Airport code must be uppercase letters"),
  to: z
    .string()
    .length(3, "Arrival airport code must be 3 characters")
    .regex(/^[A-Z]{3}$/, "Airport code must be uppercase letters"),
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
 * Core function to search flights based on departure/arrival airports and date
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

  // Validate that departure and arrival are different
  if (validated.from === validated.to) {
    throw new Error("Departure and arrival airports must be different");
  }

  // Validate that departure date is not in the past
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const departureDate = new Date(validated.departureDate);
  if (departureDate < today) {
    throw new Error("Departure date cannot be in the past");
  }

  // Calculate date range for the departure date (start and end of day)
  const startOfDay = new Date(validated.departureDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(validated.departureDate);
  endOfDay.setHours(23, 59, 59, 999);

  // Find airport and city information from IATA codes
  const [departureAirportData] = await db
    .select({
      airport: airports,
      city: cities,
    })
    .from(airports)
    .innerJoin(cities, eq(airports.cityId, cities.id))
    .where(
      and(eq(airports.iataCode, validated.from), eq(airports.isDeleted, false))
    )
    .limit(1);

  const [arrivalAirportData] = await db
    .select({
      airport: airports,
      city: cities,
    })
    .from(airports)
    .innerJoin(cities, eq(airports.cityId, cities.id))
    .where(
      and(eq(airports.iataCode, validated.to), eq(airports.isDeleted, false))
    )
    .limit(1);

  if (!departureAirportData) {
    throw new Error(`Departure airport ${validated.from} not found`);
  }

  if (!arrivalAirportData) {
    throw new Error(`Arrival airport ${validated.to} not found`);
  }

  const departureAirport = departureAirportData.airport;
  const departureCity = departureAirportData.city;
  const arrivalAirport = arrivalAirportData.airport;
  const arrivalCity = arrivalAirportData.city;

  // Query flights with all related data
  const results = await db
    .select({
      flight: flights,
      airline: airlines,
      seatClass: flightSeatClasses,
    })
    .from(flights)
    .innerJoin(airlines, eq(flights.airlineId, airlines.id))
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
        eq(flights.departureAirportId, departureAirport.id),
        eq(flights.arrivalAirportId, arrivalAirport.id),
        gte(flights.departureDatetime, startOfDay),
        lt(flights.departureDatetime, endOfDay),
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
            id: departureAirport.id,
            iataCode: departureAirport.iataCode,
            name: departureAirport.name,
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
            id: arrivalAirport.id,
            iataCode: arrivalAirport.iataCode,
            name: arrivalAirport.name,
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

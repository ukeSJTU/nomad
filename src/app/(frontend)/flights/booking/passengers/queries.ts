import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

import { db } from "@/lib/db";
import {
  airlines,
  airports,
  cities,
  flights,
  flightSeatClasses,
} from "@/lib/schema";

/**
 * Flight seat class details with full flight information
 */
export type FlightSeatClassDetails = {
  id: string;
  classType: "ECONOMY" | "BUSINESS" | "FIRST";
  price: string;
  availableSeats: number;
  totalSeats: number;
  flight: {
    id: string;
    flightNumber: string;
    aircraftType: string | null;
    airline: {
      id: string;
      name: string;
      iataCode: string;
      logoUrl: string | null;
    };
    departure: {
      datetime: string;
      terminal: string | null;
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
    };
    arrival: {
      datetime: string;
      terminal: string | null;
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
    };
  };
};

/**
 * Get flight seat class details by ID
 * Includes full flight information with airline, airports, and cities
 */
export async function getFlightSeatClassById(
  seatClassId: string
): Promise<FlightSeatClassDetails | null> {
  // Create aliases for departure and arrival airports
  const departureAirportsTable = alias(airports, "departure_airport");
  const arrivalAirportsTable = alias(airports, "arrival_airport");

  // Query seat class with all related flight information
  const result = await db
    .select({
      seatClass: flightSeatClasses,
      flight: flights,
      airline: airlines,
      departureAirport: departureAirportsTable,
      arrivalAirport: arrivalAirportsTable,
    })
    .from(flightSeatClasses)
    .innerJoin(flights, eq(flightSeatClasses.flightId, flights.id))
    .innerJoin(airlines, eq(flights.airlineId, airlines.id))
    .innerJoin(
      departureAirportsTable,
      eq(flights.departureAirportId, departureAirportsTable.id)
    )
    .innerJoin(
      arrivalAirportsTable,
      eq(flights.arrivalAirportId, arrivalAirportsTable.id)
    )
    .where(eq(flightSeatClasses.id, seatClassId))
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const row = result[0];

  // Fetch departure and arrival cities
  const [departureCity, arrivalCity] = await Promise.all([
    db.query.cities.findFirst({
      where: eq(cities.id, row.departureAirport.cityId),
    }),
    db.query.cities.findFirst({
      where: eq(cities.id, row.arrivalAirport.cityId),
    }),
  ]);

  if (!departureCity || !arrivalCity) {
    return null;
  }

  return {
    id: row.seatClass.id,
    classType: row.seatClass.classType as "ECONOMY" | "BUSINESS" | "FIRST",
    price: row.seatClass.price,
    availableSeats: row.seatClass.availableSeats,
    totalSeats: row.seatClass.totalSeats,
    flight: {
      id: row.flight.id,
      flightNumber: row.flight.flightNumber,
      aircraftType: row.flight.aircraftType,
      airline: {
        id: row.airline.id,
        name: row.airline.name,
        iataCode: row.airline.iataCode,
        logoUrl: row.airline.logoUrl,
      },
      departure: {
        datetime: row.flight.departureDatetime.toISOString(),
        terminal: row.flight.departureTerminal,
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
      },
      arrival: {
        datetime: row.flight.arrivalDatetime.toISOString(),
        terminal: row.flight.arrivalTerminal,
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
      },
    },
  };
}

/**
 * Get multiple flight seat class details by IDs
 * Useful for round-trip bookings
 */
export async function getFlightSeatClassesByIds(
  seatClassIds: string[]
): Promise<FlightSeatClassDetails[]> {
  const results = await Promise.all(
    seatClassIds.map(id => getFlightSeatClassById(id))
  );

  // Filter out null results
  return results.filter(
    (result): result is FlightSeatClassDetails => result !== null
  );
}

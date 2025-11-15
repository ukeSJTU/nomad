/**
 * Flight Generator
 *
 * Generates realistic flight data based on real airports and airlines.
 * Uses Faker.js for randomization while maintaining data integrity.
 */

import { faker } from "@faker-js/faker";
import type { InferInsertModel } from "drizzle-orm";

import type { airlines } from "@/lib/schema/airlines";
import type { airports } from "@/lib/schema/airports";
import type { flights } from "@/lib/schema/flights";

type Airport = InferInsertModel<typeof airports> & { id: string };
type Airline = InferInsertModel<typeof airlines> & { id: string };
type FlightInsert = Omit<
  InferInsertModel<typeof flights>,
  "id" | "isDeleted" | "createdAt" | "updatedAt"
>;

/**
 * Generate realistic flights based on real airports and airlines
 *
 * @param count - Number of flights to generate
 * @param airports - List of available airports
 * @param airlines - List of available airlines
 * @returns Array of flight insert objects
 */
export function generateFlights(
  count: number,
  airports: Airport[],
  airlines: Airline[]
): FlightInsert[] {
  if (airports.length < 2) {
    throw new Error("Need at least 2 airports to generate flights");
  }
  if (airlines.length === 0) {
    throw new Error("Need at least 1 airline to generate flights");
  }

  const flights: FlightInsert[] = [];
  const usedFlightNumbers = new Set<string>();

  for (let i = 0; i < count; i++) {
    // Select random airline
    const airline = faker.helpers.arrayElement(airlines);

    // Select departure and arrival airports (must be different)
    const departureAirport = faker.helpers.arrayElement(airports);
    const arrivalAirport = faker.helpers.arrayElement(
      airports.filter(a => a.id !== departureAirport.id)
    );

    // Generate unique flight number matching airline IATA code
    let flightNumber: string;
    do {
      const flightNum = faker.number.int({ min: 100, max: 9999 });
      flightNumber = `${airline.iataCode}${flightNum}`;
    } while (usedFlightNumbers.has(flightNumber));
    usedFlightNumbers.add(flightNumber);

    // Generate departure time (within next 6 months)
    const departureDate = faker.date.future({ years: 0.5 });

    // Generate flight duration (1-12 hours based on typical flight times)
    const flightDurationHours = faker.number.int({ min: 1, max: 12 });
    const arrivalDate = new Date(
      departureDate.getTime() + flightDurationHours * 3600000
    );

    // Generate terminal information (70% chance of having terminals)
    const departureTerminal = faker.helpers.maybe(
      () => `T${faker.number.int({ min: 1, max: 3 })}`,
      { probability: 0.7 }
    );
    const arrivalTerminal = faker.helpers.maybe(
      () => `T${faker.number.int({ min: 1, max: 3 })}`,
      { probability: 0.7 }
    );

    // Generate aircraft type
    const aircraftType = faker.airline.airplane().name;

    flights.push({
      flightNumber,
      airlineId: airline.id,
      departureAirportId: departureAirport.id,
      arrivalAirportId: arrivalAirport.id,
      departureDatetime: departureDate,
      arrivalDatetime: arrivalDate,
      departureTerminal: departureTerminal ?? null,
      arrivalTerminal: arrivalTerminal ?? null,
      aircraftType,
    });
  }

  return flights;
}

/**
 * Generate flight seat classes for a flight
 *
 * @param flightId - Flight ID
 * @returns Array of seat class insert objects
 */
export function generateSeatClasses(flightId: string) {
  const seatClasses = [];

  // Economy class (always present)
  const economyTotal = faker.number.int({ min: 100, max: 250 });
  seatClasses.push({
    flightId,
    classType: "ECONOMY",
    price: faker.number.int({ min: 300, max: 2000 }).toString(),
    totalSeats: economyTotal,
    availableSeats: faker.number.int({ min: 0, max: economyTotal }),
  });

  // Business class (80% chance)
  if (faker.datatype.boolean({ probability: 0.8 })) {
    const businessTotal = faker.number.int({ min: 20, max: 50 });
    seatClasses.push({
      flightId,
      classType: "BUSINESS",
      price: faker.number.int({ min: 1500, max: 8000 }).toString(),
      totalSeats: businessTotal,
      availableSeats: faker.number.int({ min: 0, max: businessTotal }),
    });
  }

  // First class (30% chance)
  if (faker.datatype.boolean({ probability: 0.3 })) {
    const firstTotal = faker.number.int({ min: 8, max: 16 });
    seatClasses.push({
      flightId,
      classType: "FIRST",
      price: faker.number.int({ min: 8000, max: 20000 }).toString(),
      totalSeats: firstTotal,
      availableSeats: faker.number.int({ min: 0, max: firstTotal }),
    });
  }

  return seatClasses;
}

import { faker } from "@faker-js/faker";
import { sql } from "drizzle-orm";

import {
  airlines,
  airports,
  flights,
  flightSeatClasses,
} from "../schema/index";
import { db } from "./index";

/**
 * Seed the database with sample data
 * This script populates airports, airlines, flights, and flight_seat_classes tables
 */
async function seed() {
  console.log("[SEED] Starting database seeding...");

  try {
    // Clear existing data (in reverse order of dependencies)
    console.log("[SEED] Clearing existing data...");
    await db.delete(flightSeatClasses);
    await db.delete(flights);
    await db.delete(airlines);
    await db.delete(airports);

    // Seed Airports
    console.log("[SEED] Seeding airports...");
    const airportData = [
      {
        iata_code: "JFK",
        name: "John F. Kennedy International Airport",
        city: "New York",
        country: "United States",
        timezone: "America/New_York",
      },
      {
        iata_code: "LAX",
        name: "Los Angeles International Airport",
        city: "Los Angeles",
        country: "United States",
        timezone: "America/Los_Angeles",
      },
      {
        iata_code: "LHR",
        name: "London Heathrow Airport",
        city: "London",
        country: "United Kingdom",
        timezone: "Europe/London",
      },
      {
        iata_code: "CDG",
        name: "Charles de Gaulle Airport",
        city: "Paris",
        country: "France",
        timezone: "Europe/Paris",
      },
      {
        iata_code: "NRT",
        name: "Narita International Airport",
        city: "Tokyo",
        country: "Japan",
        timezone: "Asia/Tokyo",
      },
      {
        iata_code: "DXB",
        name: "Dubai International Airport",
        city: "Dubai",
        country: "United Arab Emirates",
        timezone: "Asia/Dubai",
      },
      {
        iata_code: "SIN",
        name: "Singapore Changi Airport",
        city: "Singapore",
        country: "Singapore",
        timezone: "Asia/Singapore",
      },
      {
        iata_code: "HKG",
        name: "Hong Kong International Airport",
        city: "Hong Kong",
        country: "China",
        timezone: "Asia/Hong_Kong",
      },
      {
        iata_code: "SYD",
        name: "Sydney Kingsford Smith Airport",
        city: "Sydney",
        country: "Australia",
        timezone: "Australia/Sydney",
      },
      {
        iata_code: "ORD",
        name: "O'Hare International Airport",
        city: "Chicago",
        country: "United States",
        timezone: "America/Chicago",
      },
      {
        iata_code: "PVG",
        name: "Shanghai Pudong International Airport",
        city: "Shanghai",
        country: "China",
        timezone: "Asia/Shanghai",
      },
      {
        iata_code: "ICN",
        name: "Incheon International Airport",
        city: "Seoul",
        country: "South Korea",
        timezone: "Asia/Seoul",
      },
    ];

    const insertedAirports = await db
      .insert(airports)
      .values(airportData)
      .returning();
    console.log(`[SEED] Seeded ${insertedAirports.length} airports`);

    // Seed Airlines
    console.log("[SEED] Seeding airlines...");
    const airlineData = [
      {
        iata_code: "AA",
        name: "American Airlines",
        logo_url: "https://example.com/logos/aa.png",
      },
      {
        iata_code: "UA",
        name: "United Airlines",
        logo_url: "https://example.com/logos/ua.png",
      },
      {
        iata_code: "DL",
        name: "Delta Air Lines",
        logo_url: "https://example.com/logos/dl.png",
      },
      {
        iata_code: "BA",
        name: "British Airways",
        logo_url: "https://example.com/logos/ba.png",
      },
      {
        iata_code: "AF",
        name: "Air France",
        logo_url: "https://example.com/logos/af.png",
      },
      {
        iata_code: "NH",
        name: "All Nippon Airways",
        logo_url: "https://example.com/logos/nh.png",
      },
      {
        iata_code: "EK",
        name: "Emirates",
        logo_url: "https://example.com/logos/ek.png",
      },
      {
        iata_code: "SQ",
        name: "Singapore Airlines",
        logo_url: "https://example.com/logos/sq.png",
      },
      {
        iata_code: "CX",
        name: "Cathay Pacific",
        logo_url: "https://example.com/logos/cx.png",
      },
      {
        iata_code: "QF",
        name: "Qantas Airways",
        logo_url: "https://example.com/logos/qf.png",
      },
    ];

    const insertedAirlines = await db
      .insert(airlines)
      .values(airlineData)
      .returning();
    console.log(`[SEED] Seeded ${insertedAirlines.length} airlines`);

    // Seed Flights
    console.log("[SEED] Seeding flights...");
    const flightData = [];
    const statuses = [
      "SCHEDULED",
      "DELAYED",
      "BOARDING",
      "DEPARTED",
      "ARRIVED",
    ];
    const aircraftTypes = [
      "Boeing 737",
      "Airbus A320",
      "Boeing 777",
      "Airbus A350",
      "Boeing 787",
      "Airbus A380",
    ];

    // Generate 50 flights
    for (let i = 0; i < 50; i++) {
      const airline = faker.helpers.arrayElement(insertedAirlines);
      const departureAirport = faker.helpers.arrayElement(insertedAirports);
      let arrivalAirport = faker.helpers.arrayElement(insertedAirports);

      // Ensure departure and arrival airports are different
      while (arrivalAirport.id === departureAirport.id) {
        arrivalAirport = faker.helpers.arrayElement(insertedAirports);
      }

      const departureDate = faker.date.between({
        from: new Date(),
        to: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // Next 90 days
      });

      // Flight duration between 2-15 hours
      const durationHours = faker.number.int({ min: 2, max: 15 });
      const arrivalDate = new Date(
        departureDate.getTime() + durationHours * 60 * 60 * 1000
      );

      flightData.push({
        flight_number: `${airline.iata_code}${faker.number.int({ min: 100, max: 9999 })}`,
        airline_id: airline.id,
        departure_airport_id: departureAirport.id,
        arrival_airport_id: arrivalAirport.id,
        departure_datetime: departureDate,
        arrival_datetime: arrivalDate,
        aircraft_type: faker.helpers.arrayElement(aircraftTypes),
        status: faker.helpers.arrayElement(statuses),
      });
    }

    const insertedFlights = await db
      .insert(flights)
      .values(flightData)
      .returning();
    console.log(`[SEED] Seeded ${insertedFlights.length} flights`);

    // Seed Flight Seat Classes
    console.log("[SEED] Seeding flight seat classes...");
    const seatClassData = [];
    const classTypes = [
      { type: "ECONOMY", basePrice: 200, baseSeats: 150 },
      { type: "PREMIUM_ECONOMY", basePrice: 500, baseSeats: 40 },
      { type: "BUSINESS", basePrice: 1500, baseSeats: 30 },
      { type: "FIRST", basePrice: 5000, baseSeats: 12 },
    ];

    for (const flight of insertedFlights) {
      // Randomly decide how many classes to add (2-4 classes per flight)
      const numClasses = faker.number.int({ min: 2, max: 4 });
      const selectedClasses = faker.helpers
        .shuffle(classTypes)
        .slice(0, numClasses);

      for (const classType of selectedClasses) {
        const totalSeats = faker.number.int({
          min: classType.baseSeats - 10,
          max: classType.baseSeats + 10,
        });
        const availableSeats = faker.number.int({
          min: Math.floor(totalSeats * 0.3), // At least 30% available
          max: totalSeats,
        });

        // Add some price variation (±30%)
        const priceVariation = faker.number.float({ min: 0.7, max: 1.3 });
        const price = (classType.basePrice * priceVariation).toFixed(2);

        seatClassData.push({
          flight_id: flight.id,
          class_type: classType.type,
          total_seats: totalSeats,
          available_seats: availableSeats,
          price,
        });
      }
    }

    const insertedSeatClasses = await db
      .insert(flightSeatClasses)
      .values(seatClassData)
      .returning();
    console.log(
      `[SEED] Seeded ${insertedSeatClasses.length} flight seat classes`
    );

    console.log("[SEED] Database seeding completed successfully!");
    console.log("\n[SEED] Summary:");
    console.log(`   - Airports: ${insertedAirports.length}`);
    console.log(`   - Airlines: ${insertedAirlines.length}`);
    console.log(`   - Flights: ${insertedFlights.length}`);
    console.log(`   - Seat Classes: ${insertedSeatClasses.length}`);
  } catch (error) {
    console.error("[SEED] Error seeding database:", error);
    throw error;
  } finally {
    // Close database connection
    await db.execute(sql`SELECT 1`); // Keep connection alive test
    process.exit(0);
  }
}

// Run the seed function
seed();

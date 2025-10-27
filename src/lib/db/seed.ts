import { faker } from "@faker-js/faker";
import { sql } from "drizzle-orm";

import {
  account,
  airlines,
  airports,
  cities,
  flights,
  flightSeatClasses,
  passengers,
  user,
} from "../schema/index";
import { db } from "./index";
import { displaySeedConfig, parseSeedConfig } from "./seed.config";

/**
 * Seed the database with sample data
 * This script populates airports, airlines, flights, and flight_seat_classes tables
 *
 * Uses Faker.js Airline module (v10.0.0+) for realistic aviation data:
 * - faker.airline.airport() - generates airport with name, IATA code, and city
 * - faker.airline.airline() - generates airline with name and IATA code
 * - faker.airline.flightNumber() - generates industry-standard flight numbers
 * - faker.airline.airplane() - generates realistic aircraft model names
 *
 * All IATA codes are guaranteed unique through duplicate checking loops
 *
 * Supports CLI arguments for configuration:
 * @example
 * ```bash
 * # Use specific seed for reproducible data
 * pnpm db:seed --seed=12345
 *
 * # Generate more data
 * pnpm db:seed --cities=50 --airports=100 --flights=200
 *
 * # Combine options
 * pnpm db:seed --seed=12345 --users=20 --flights=100
 * ```
 */
async function seed() {
  // Parse configuration from CLI arguments
  const config = parseSeedConfig();

  // Set Faker seed for reproducible data generation
  const seedValue = config.seed ?? Date.now();
  faker.seed(seedValue);

  console.log("[SEED] Starting database seeding...");
  displaySeedConfig({ ...config, seed: seedValue });

  try {
    // Clear existing data (in reverse order of dependencies)
    console.log("[SEED] Clearing existing data...");
    await db.delete(flightSeatClasses);
    await db.delete(flights);
    await db.delete(airlines);
    await db.delete(airports);
    await db.delete(cities);
    await db.delete(passengers);
    await db.delete(account);
    await db.delete(user);

    // Seed Cities
    console.log("[SEED] Seeding cities...");
    const cityData = [];
    const usedCityIataCodes = new Set<string>();

    for (let i = 0; i < config.counts.cities; i++) {
      let cityIataCode;
      // Ensure IATA code is unique (3-character code)
      do {
        cityIataCode = faker.string.alpha({ length: 3, casing: "upper" });
      } while (usedCityIataCodes.has(cityIataCode));

      usedCityIataCodes.add(cityIataCode);

      const isDomestic = faker.datatype.boolean();
      const continents = ["Asia", "Europe", "America", "Africa", "Oceania"];

      cityData.push({
        iataCode: cityIataCode,
        name: faker.location.city(),
        timezone: faker.location.timeZone(),
        isDomestic,
        // Domestic cities must have pinyinFirstLetter
        pinyinFirstLetter: isDomestic
          ? faker.string.alpha({ length: 1, casing: "upper" })
          : null,
        // International cities must have continent
        continent: !isDomestic ? faker.helpers.arrayElement(continents) : null,
        isPopular: faker.datatype.boolean({ probability: 0.2 }), // 20% chance of being popular
      });
    }

    const insertedCities = await db.insert(cities).values(cityData).returning();
    console.log(`[SEED] Seeded ${insertedCities.length} cities`);

    // Seed Airports
    console.log("[SEED] Seeding airports...");
    /**
     * Generate airport data using Faker.js Airline module
     * faker.airline.airport() returns: { name: string, iataCode: string }
     * We supplement with faker.location for missing fields (city, country, timezone)
     * IATA code uniqueness is enforced to prevent database constraint violations
     */
    const airportData = [];
    const usedAirportIataCodes = new Set<string>();

    for (let i = 0; i < config.counts.airports; i++) {
      let airport;
      // Ensure IATA code is unique (3-character code)
      do {
        airport = faker.airline.airport();
      } while (usedAirportIataCodes.has(airport.iataCode));

      usedAirportIataCodes.add(airport.iataCode);

      // Randomly select a city for this airport
      const city = faker.helpers.arrayElement(insertedCities);

      airportData.push({
        iataCode: airport.iataCode,
        name: airport.name,
        cityId: city.id,
      });
    }

    const insertedAirports = await db
      .insert(airports)
      .values(airportData)
      .returning();
    console.log(`[SEED] Seeded ${insertedAirports.length} airports`);

    // Seed Airlines
    console.log("[SEED] Seeding airlines...");
    /**
     * Generate airline data using Faker.js Airline module
     * faker.airline.airline() returns: { name: string, iataCode: string }
     * We use a placeholder template for logo_url
     * IATA code uniqueness is enforced to prevent database constraint violations
     *
     * Note: Database constraint requires IATA codes to be exactly 2 uppercase letters (A-Z)
     * Faker may generate codes with digits (e.g., "6E", "9R"), so we filter those out
     */
    const airlineData = [];
    const usedAirlineIataCodes = new Set<string>();

    for (let i = 0; i < config.counts.airlines; i++) {
      let airline;
      // Ensure IATA code is unique AND matches pattern ^[A-Z]{2}$ (2 uppercase letters only)
      do {
        airline = faker.airline.airline();
      } while (
        usedAirlineIataCodes.has(airline.iataCode) ||
        !/^[A-Z]{2}$/.test(airline.iataCode)
      );

      usedAirlineIataCodes.add(airline.iataCode);

      airlineData.push({
        iataCode: airline.iataCode,
        name: airline.name,
        logoUrl: `https://example.com/logos/${airline.iataCode.toLowerCase()}.png`,
      });
    }

    const insertedAirlines = await db
      .insert(airlines)
      .values(airlineData)
      .returning();
    console.log(`[SEED] Seeded ${insertedAirlines.length} airlines`);

    // Seed Flights
    console.log("[SEED] Seeding flights...");
    /**
     * Generate flight data using Faker.js Airline module for realistic aviation data
     * - faker.airline.flightNumber() returns industry-standard flight number format
     * - faker.airline.airplane() returns realistic aircraft model names
     * Flight status and timing use existing Faker methods for consistency
     */
    const flightData = [];

    for (let i = 0; i < config.counts.flights; i++) {
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

      // Generate realistic flight number using Faker.js Airline module
      // Format: airline IATA code + numeric identifier (e.g., "AA1234")
      const flightNumberData = faker.airline.flightNumber({
        addLeadingZeros: true,
      });

      // Generate realistic aircraft type (e.g., "Boeing 737", "Airbus A320")
      const aircraftData = faker.airline.airplane();

      flightData.push({
        flightNumber: `${airline.iataCode}${flightNumberData.slice(-4)}`, // Use airline's IATA code with generated number
        airlineId: airline.id,
        departureAirportId: departureAirport.id,
        arrivalAirportId: arrivalAirport.id,
        departureDatetime: departureDate,
        arrivalDatetime: arrivalDate,
        aircraftType: aircraftData.name,
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
      { type: "BUSINESS", basePrice: 1500, baseSeats: 30 },
      { type: "FIRST", basePrice: 5000, baseSeats: 12 },
    ];

    for (const flight of insertedFlights) {
      // Randomly decide how many classes to add (2-3 classes per flight)
      const numClasses = faker.number.int({ min: 2, max: 3 });
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
          flightId: flight.id,
          classType: classType.type,
          totalSeats,
          availableSeats,
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

    // Seed Users
    console.log("[SEED] Seeding users...");
    const userData = [];

    for (let i = 0; i < config.counts.users; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      userData.push({
        id: faker.string.uuid(),
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({
          firstName: firstName.toLowerCase(),
          lastName: lastName.toLowerCase(),
        }),
        emailVerified: faker.datatype.boolean(),
        phoneNumber: faker.helpers.maybe(
          () => faker.phone.number({ style: "national" }),
          { probability: 0.7 }
        ),
        phoneNumberVerified: faker.helpers.maybe(
          () => faker.datatype.boolean(),
          {
            probability: 0.7,
          }
        ),
        image: faker.helpers.maybe(() => faker.image.avatar(), {
          probability: 0.5,
        }),
      });
    }

    const insertedUsers = await db.insert(user).values(userData).returning();
    console.log(`[SEED] Seeded ${insertedUsers.length} users`);

    // Seed Passengers for each user
    console.log("[SEED] Seeding passengers...");
    const passengerData = [];

    for (const currentUser of insertedUsers) {
      // Each user gets a random number of passengers based on config
      const numberOfPassengers = faker.number.int({
        min: config.counts.passengersPerUser.min,
        max: config.counts.passengersPerUser.max,
      });

      for (let i = 0; i < numberOfPassengers; i++) {
        const hasChineseName = faker.datatype.boolean();
        const gender = faker.helpers.arrayElement([
          "male",
          "female",
          "other",
        ] as const);

        // Generate document number based on type
        const documentType = faker.helpers.arrayElement([
          "id_card",
          "passport",
          "other",
        ] as const);

        let documentNumber: string;
        if (documentType === "id_card") {
          // Chinese ID card format: 18 digits
          documentNumber = faker.string.numeric(18);
        } else if (documentType === "passport") {
          // Passport format: 1 letter + 8 digits
          documentNumber = `E${faker.string.numeric(8)}`;
        } else {
          documentNumber = faker.string.alphanumeric(10);
        }

        const passenger = {
          userId: currentUser.id,
          chineseName: hasChineseName
            ? faker.person.fullName({
                sex: gender === "male" ? "male" : "female",
              })
            : null,
          englishFirstName: !hasChineseName
            ? faker.person.firstName(gender === "male" ? "male" : "female")
            : faker.helpers.maybe(
                () =>
                  faker.person.firstName(gender === "male" ? "male" : "female"),
                { probability: 0.5 }
              ),
          englishLastName: !hasChineseName
            ? faker.person.lastName()
            : faker.helpers.maybe(() => faker.person.lastName(), {
                probability: 0.5,
              }),
          nationality: faker.helpers.arrayElement([
            "中国大陆",
            "United States",
            "United Kingdom",
            "Canada",
            "Australia",
            "Japan",
            "South Korea",
            "Singapore",
          ]),
          gender,
          dateOfBirth: faker.date
            .birthdate({ min: 1, max: 80, mode: "age" })
            .toISOString()
            .split("T")[0],
          placeOfBirth: faker.helpers.maybe(() => faker.location.city(), {
            probability: 0.6,
          }),
          phone: faker.helpers.maybe(
            () => faker.string.numeric({ length: { min: 10, max: 15 } }),
            {
              probability: 0.5,
            }
          ),
          fax: faker.helpers.maybe(
            () => faker.string.numeric({ length: { min: 10, max: 15 } }),
            {
              probability: 0.2,
            }
          ),
          email: faker.helpers.maybe(
            () => faker.internet.email().toLowerCase(),
            { probability: 0.6 }
          ),
          documentType,
          documentNumber,
          documentExpiryDate: faker.date
            .future({ years: faker.number.int({ min: 1, max: 10 }) })
            .toISOString()
            .split("T")[0],
        };

        passengerData.push(passenger);
      }
    }

    const insertedPassengers = await db
      .insert(passengers)
      .values(passengerData)
      .returning();
    console.log(`[SEED] Seeded ${insertedPassengers.length} passengers`);

    console.log("[SEED] Database seeding completed successfully!");
    console.log("\n[SEED] Summary:");
    console.log(`   - Users: ${insertedUsers.length}`);
    console.log(`   - Passengers: ${insertedPassengers.length}`);
    console.log(`   - Cities: ${insertedCities.length}`);
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

/**
 * Database Seeding Script
 *
 * Supports two modes:
 * 1. Fixture-Faker Mode: Uses real fixture data for cities/airports/airlines, generates flights with Faker
 * 2. Scenario Mode: Uses complete predefined scenario data (for exam, etc.)
 *
 * @example
 * ```bash
 * # Development scenario (real cities + generated flights)
 * pnpm db:seed --scenario=development
 *
 * # Demo scenario (all real data + many flights)
 * pnpm db:seed --scenario=demo
 *
 * # Exam scenario (exact predefined data)
 * pnpm db:seed --scenario=exam
 *
 * # Custom configuration
 * pnpm db:seed --cities=20 --flights=100
 * ```
 */

import { faker } from "@faker-js/faker";
import { sql } from "drizzle-orm";
import ora from "ora";

import {
  account,
  airlines,
  airports,
  cities,
  flights,
  flightSearchHistory,
  flightSeatClasses,
  passengers,
  user,
} from "@/lib/schema";

import { REAL_AIRLINES } from "./fixtures/base/airlines";
import { REAL_AIRPORTS } from "./fixtures/base/airports";
import { REAL_CITIES } from "./fixtures/base/cities";
import {
  generateFlights,
  generateSeatClasses,
} from "./generators/flight-generator";
import { generatePassengers, generateUsers } from "./generators/user-generator";
import { db } from "./index";
import {
  displaySeedConfig,
  parseSeedConfig,
  promptForScenario,
  type SeedConfig,
} from "./seed.config";

/**
 * Main seed function
 */
async function seed() {
  // Check if interactive mode (no CLI arguments)
  const hasCliArgs = process.argv.slice(2).length > 0;
  let config: SeedConfig;

  if (!hasCliArgs) {
    // Interactive mode
    config = await promptForScenario();
  } else {
    // Parse configuration from CLI arguments
    config = parseSeedConfig();
  }

  console.log("[SEED] Starting database seeding...");
  displaySeedConfig(config);

  try {
    // Clear existing data (in reverse order of dependencies) - only in full mode
    if (config.mode === "full") {
      await clearDatabase();
    } else {
      console.log("[SEED] Incremental mode - keeping existing data");
    }

    // Seed based on data source
    if (config.dataSource === "scenario") {
      await seedFromScenario(config);
    } else {
      await seedWithFixtureAndFaker(config);
    }

    console.log("\n[SEED] Database seeding completed successfully!\n");
  } catch (error) {
    console.error("[SEED] Error seeding database:", error);
    throw error;
  } finally {
    // Keep connection alive test
    await db.execute(sql`SELECT 1`);
    process.exit(0);
  }
}

/**
 * Clear all data from database
 */
async function clearDatabase() {
  const spinner = ora("Clearing existing data...").start();
  await db.delete(flightSeatClasses);
  await db.delete(flights);
  await db.delete(airlines);
  await db.delete(airports);
  await db.delete(flightSearchHistory); // Clear search history before cities
  await db.delete(cities);
  await db.delete(passengers);
  await db.delete(account);
  await db.delete(user);
  spinner.succeed("Cleared existing data");
}

/**
 * Seed from a predefined scenario file
 */
async function seedFromScenario(config: SeedConfig) {
  if (!config.scenarioFile) {
    throw new Error("Scenario file is required for scenario mode");
  }

  console.log(`\n[SEED] Loading scenario: ${config.scenarioFile}`);

  // Dynamically import the scenario file
  const scenarioModule = await import(
    `./fixtures/scenarios/${config.scenarioFile}.ts`
  );
  const scenarioKey = `${config.scenarioFile.toUpperCase().replace(/-/g, "_")}_SCENARIO`;
  const scenario = scenarioModule[scenarioKey];

  if (!scenario) {
    throw new Error(
      `Scenario not found: ${scenarioKey} in ${config.scenarioFile}.ts`
    );
  }

  // Seed cities
  const citiesSpinner = ora("Seeding cities...").start();
  const insertedCities = await db
    .insert(cities)
    .values(scenario.cities)
    .returning();
  citiesSpinner.succeed(`Seeded ${insertedCities.length} cities`);

  // Create city IATA code to ID mapping
  const cityIataToId = new Map(insertedCities.map(c => [c.iataCode, c.id]));

  // Seed airports (resolve city references)
  const airportsSpinner = ora("Seeding airports...").start();
  const airportData = scenario.airports.map((airport: any) => ({
    iataCode: airport.iataCode,
    name: airport.name,
    cityId: cityIataToId.get(airport.cityIataCode)!,
  }));
  const insertedAirports = await db
    .insert(airports)
    .values(airportData)
    .returning();
  airportsSpinner.succeed(`Seeded ${insertedAirports.length} airports`);

  // Create airport IATA code to ID mapping
  const airportIataToId = new Map(
    insertedAirports.map(a => [a.iataCode, a.id])
  );

  // Seed airlines
  const airlinesSpinner = ora("Seeding airlines...").start();
  const insertedAirlines = await db
    .insert(airlines)
    .values(scenario.airlines)
    .returning();
  airlinesSpinner.succeed(`Seeded ${insertedAirlines.length} airlines`);

  // Create airline IATA code to ID mapping
  const airlineIataToId = new Map(
    insertedAirlines.map(a => [a.iataCode, a.id])
  );

  // Seed flights (resolve airport and airline references)
  const flightsSpinner = ora("Seeding flights...").start();
  const flightData = scenario.flights.map((flight: any) => ({
    flightNumber: flight.flightNumber,
    airlineId: airlineIataToId.get(flight.airlineIataCode)!,
    departureAirportId: airportIataToId.get(flight.departureAirportIataCode)!,
    arrivalAirportId: airportIataToId.get(flight.arrivalAirportIataCode)!,
    departureDatetime: new Date(flight.departureDatetime),
    arrivalDatetime: new Date(flight.arrivalDatetime),
    departureTerminal: flight.departureTerminal,
    arrivalTerminal: flight.arrivalTerminal,
    aircraftType: flight.aircraftType,
  }));
  const insertedFlights = await db
    .insert(flights)
    .values(flightData)
    .returning();
  flightsSpinner.succeed(`Seeded ${insertedFlights.length} flights`);

  // Seed flight seat classes
  const seatClassesSpinner = ora("Seeding seat classes...").start();
  const seatClassData = [];
  for (let i = 0; i < scenario.flights.length; i++) {
    const flight = insertedFlights[i];
    const scenarioFlight = scenario.flights[i];
    for (const seatClass of scenarioFlight.seatClasses) {
      seatClassData.push({
        flightId: flight.id,
        classType: seatClass.classType,
        price: seatClass.price.toString(),
        availableSeats: seatClass.availableSeats,
        totalSeats: seatClass.totalSeats,
      });
    }
  }
  const insertedSeatClasses = await db
    .insert(flightSeatClasses)
    .values(seatClassData)
    .returning();
  seatClassesSpinner.succeed(
    `Seeded ${insertedSeatClasses.length} seat classes`
  );

  // Seed users
  const usersSpinner = ora("Seeding users...").start();
  const insertedUsers = await db
    .insert(user)
    .values(scenario.users)
    .returning();
  usersSpinner.succeed(`Seeded ${insertedUsers.length} users`);

  // Seed passengers
  const passengersSpinner = ora("Seeding passengers...").start();
  const insertedPassengers = await db
    .insert(passengers)
    .values(scenario.passengers)
    .returning();
  passengersSpinner.succeed(`Seeded ${insertedPassengers.length} passengers`);

  // Summary
  console.log("\nSummary:");
  console.log(`   - Users: ${insertedUsers.length}`);
  console.log(`   - Passengers: ${insertedPassengers.length}`);
  console.log(`   - Cities: ${insertedCities.length}`);
  console.log(`   - Airports: ${insertedAirports.length}`);
  console.log(`   - Airlines: ${insertedAirlines.length}`);
  console.log(`   - Flights: ${insertedFlights.length}`);
  console.log(`   - Seat Classes: ${insertedSeatClasses.length}`);
}

/**
 * Seed with fixture data + Faker generation
 */
async function seedWithFixtureAndFaker(config: SeedConfig) {
  // Set Faker seed for reproducible data generation
  faker.seed(config.seed);

  console.log(
    "\n[SEED] Using fixture-faker mode (real data + generated flights)"
  );

  // 1. Seed Cities from fixtures
  const citiesSpinner = ora("Seeding cities from fixtures...").start();
  const cityData = REAL_CITIES.slice(0, config.counts.cities).map(city => ({
    iataCode: city.iataCode,
    name: city.name,
    timezone: city.timezone,
    isDomestic: city.isDomestic,
    pinyinFirstLetter: city.pinyinFirstLetter,
    continent: city.continent,
    isPopular: city.isPopular,
    displayOrder: city.displayOrder,
  }));
  const insertedCities = await db.insert(cities).values(cityData).returning();
  citiesSpinner.succeed(`Seeded ${insertedCities.length} cities from fixtures`);

  // Create city IATA code to ID mapping
  const cityIataToId = new Map(insertedCities.map(c => [c.iataCode, c.id]));

  // 2. Seed Airports from fixtures (filter by available cities)
  const airportsSpinner = ora("Seeding airports from fixtures...").start();
  const availableCityIataCodes = new Set(insertedCities.map(c => c.iataCode));
  const airportData = REAL_AIRPORTS.filter(airport =>
    availableCityIataCodes.has(airport.cityIataCode)
  )
    .slice(0, config.counts.airports)
    .map(airport => ({
      iataCode: airport.iataCode,
      name: airport.name,
      cityId: cityIataToId.get(airport.cityIataCode)!,
    }));
  const insertedAirports = await db
    .insert(airports)
    .values(airportData)
    .returning();
  airportsSpinner.succeed(
    `Seeded ${insertedAirports.length} airports from fixtures`
  );

  // 3. Seed Airlines from fixtures
  const airlinesSpinner = ora("Seeding airlines from fixtures...").start();
  const airlineData = REAL_AIRLINES.slice(0, config.counts.airlines).map(
    airline => ({
      iataCode: airline.iataCode,
      name: airline.name,
      logoUrl: airline.logoUrl,
    })
  );
  const insertedAirlines = await db
    .insert(airlines)
    .values(airlineData)
    .returning();
  airlinesSpinner.succeed(
    `Seeded ${insertedAirlines.length} airlines from fixtures`
  );

  // 4. Generate Flights with Faker
  const flightsSpinner = ora("Generating flights with Faker...").start();
  const flightData = generateFlights(
    config.counts.flights,
    insertedAirports,
    insertedAirlines
  );
  const insertedFlights = await db
    .insert(flights)
    .values(flightData)
    .returning();
  flightsSpinner.succeed(`Generated ${insertedFlights.length} flights`);

  // 5. Generate Seat Classes for each flight
  const seatClassesSpinner = ora("Generating seat classes...").start();
  const seatClassData = [];
  for (const flight of insertedFlights) {
    const classes = generateSeatClasses(flight.id);
    seatClassData.push(...classes);
  }
  const insertedSeatClasses = await db
    .insert(flightSeatClasses)
    .values(seatClassData)
    .returning();
  seatClassesSpinner.succeed(
    `Generated ${insertedSeatClasses.length} seat classes`
  );

  // 6. Generate Users
  const usersSpinner = ora("Generating users...").start();
  const userData = generateUsers(config.counts.users);
  const insertedUsers = await db.insert(user).values(userData).returning();
  usersSpinner.succeed(`Generated ${insertedUsers.length} users`);

  // 7. Generate Passengers for each user
  const passengersSpinner = ora("Generating passengers...").start();
  const passengerData = [];
  for (const u of insertedUsers) {
    const count = faker.number.int({
      min: config.counts.passengersPerUser.min,
      max: config.counts.passengersPerUser.max,
    });
    const userPassengers = generatePassengers(u.id, count);
    passengerData.push(...userPassengers);
  }
  const insertedPassengers = await db
    .insert(passengers)
    .values(passengerData)
    .returning();
  passengersSpinner.succeed(
    `Generated ${insertedPassengers.length} passengers`
  );

  // Summary
  console.log("\nSummary:");
  console.log(`   - Users: ${insertedUsers.length}`);
  console.log(`   - Passengers: ${insertedPassengers.length}`);
  console.log(`   - Cities: ${insertedCities.length}`);
  console.log(`   - Airports: ${insertedAirports.length}`);
  console.log(`   - Airlines: ${insertedAirlines.length}`);
  console.log(`   - Flights: ${insertedFlights.length}`);
  console.log(`   - Seat Classes: ${insertedSeatClasses.length}`);
}

// Run the seed function
seed();

/**
 * Database Seeding Script
 *
 * Supports two modes:
 * 1. Fixture-Faker Mode: Uses real fixture data for cities/airports/airlines, generates flights with Faker
 * 2. Scenario Mode: Uses complete predefined scenario data (for exam, etc.)
 *
 * Environment variables are loaded via tsx -r dotenv/config in package.json
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
  orderPassengers,
  orders,
  passengers,
  payments,
  user,
} from "@/db/schema";
import { generateAirlineLogoForSeed } from "@/lib/flights/airline";

import { db } from "../index";
import { REAL_AIRLINES } from "./fixtures/base/airlines";
import { REAL_AIRPORTS } from "./fixtures/base/airports";
import { REAL_CITIES } from "./fixtures/base/cities";
import { generateFlights, generateSeatClasses } from "./generators/flight";
import { generateOrders } from "./generators/order";
import { generateSearchHistory } from "./generators/search.history";
import { generatePassengers, generateUsers } from "./generators/user";
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
 * Clear all data from database (in reverse order of dependencies)
 */
async function clearDatabase() {
  const spinner = ora("Clearing existing data...").start();

  // Clear in reverse order of dependencies
  await db.delete(payments); // Depends on orders
  await db.delete(orderPassengers); // Depends on orders
  await db.delete(orders); // Depends on users, flightSeatClasses
  await db.delete(flightSeatClasses); // Depends on flights
  await db.delete(flights); // Depends on airlines, airports
  await db.delete(airlines);
  await db.delete(airports); // Depends on cities
  await db.delete(flightSearchHistory); // Depends on users, cities
  await db.delete(cities);
  await db.delete(passengers); // Depends on users
  await db.delete(account); // Depends on users
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
  const scenarioKey = `${config.scenarioFile
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "_")}_SCENARIO`;
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

  // Seed users (skip if empty)
  const usersSpinner = ora("Seeding users...").start();
  let insertedUsers: typeof scenario.users = [];
  if (scenario.users.length > 0) {
    insertedUsers = await db.insert(user).values(scenario.users).returning();
    usersSpinner.succeed(`Seeded ${insertedUsers.length} users`);
  } else {
    usersSpinner.info("No users to seed (empty array)");
  }

  // Seed passengers (skip if empty)
  const passengersSpinner = ora("Seeding passengers...").start();
  let insertedPassengers: typeof scenario.passengers = [];
  if (scenario.passengers.length > 0) {
    insertedPassengers = await db
      .insert(passengers)
      .values(scenario.passengers)
      .returning();
    passengersSpinner.succeed(`Seeded ${insertedPassengers.length} passengers`);
  } else {
    passengersSpinner.info("No passengers to seed (empty array)");
  }

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

  // 3. Seed Airlines from fixtures (with logo fallback)
  const airlinesSpinner = ora("Seeding airlines from fixtures...").start();
  const airlineData = REAL_AIRLINES.slice(0, config.counts.airlines).map(
    airline => {
      const withLogo = generateAirlineLogoForSeed(airline);
      return {
        iataCode: withLogo.iataCode,
        name: withLogo.name,
        logoUrl: withLogo.logoUrl ?? null,
      };
    }
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
  const passengersByUser = new Map<
    string,
    Array<{
      name: string;
      identityType: "passport" | "id_card" | "other";
      identityNumber: string;
      phone: string | null;
    }>
  >();

  for (const u of insertedUsers) {
    const count = faker.number.int({
      min: config.counts.passengersPerUser.min,
      max: config.counts.passengersPerUser.max,
    });
    const userPassengers = generatePassengers(u.id, count);
    passengerData.push(...userPassengers);

    // Store passenger data for order generation
    passengersByUser.set(
      u.id,
      userPassengers.map(p => ({
        name: p.name,
        identityType: p.documentType, // Map documentType to identityType
        identityNumber: p.documentNumber, // Map documentNumber to identityNumber
        phone: p.phone ?? null, // Ensure phone is string | null, not undefined
      }))
    );
  }
  const insertedPassengers = await db
    .insert(passengers)
    .values(passengerData)
    .returning();
  passengersSpinner.succeed(
    `Generated ${insertedPassengers.length} passengers`
  );

  // 8. Separate future and past flight seat classes for order generation
  const now = new Date();
  const futureFlightSeatClassIds: string[] = [];
  const pastFlightSeatClassIds: string[] = [];

  for (const seatClass of insertedSeatClasses) {
    const flight = insertedFlights.find(f => f.id === seatClass.flightId);
    if (flight) {
      if (flight.departureDatetime > now) {
        futureFlightSeatClassIds.push(seatClass.id);
      } else {
        pastFlightSeatClassIds.push(seatClass.id);
      }
    }
  }

  // 9. Generate Orders (with order passengers and payments)
  // Orders will cover all states: PENDING_PAYMENT, CONFIRMED, CANCELLED, REFUNDED
  // Some CONFIRMED orders will be for past flights (already traveled)
  const ordersSpinner = ora("Generating orders...").start();
  const orderGeneratorOutput = generateOrders({
    userIds: insertedUsers.map(u => u.id),
    flightSeatClassIds: insertedSeatClasses.map(sc => sc.id),
    futureFlightSeatClassIds,
    pastFlightSeatClassIds,
    passengersByUser,
    count: config.counts.orders || Math.floor(insertedUsers.length * 1.5), // Default: 1.5 orders per user
    seed: config.seed,
  });

  // Insert orders
  const insertedOrders = await db
    .insert(orders)
    .values(orderGeneratorOutput.orders)
    .returning();
  ordersSpinner.succeed(`Generated ${insertedOrders.length} orders`);

  // Create order ID mapping (temp ID -> actual ID)
  const orderIdMapping = new Map<string, string>();
  for (let i = 0; i < insertedOrders.length; i++) {
    const tempId = Array.from(orderGeneratorOutput.orderIdMap.keys())[i];
    orderIdMapping.set(tempId, insertedOrders[i].id);
  }

  // 10. Insert Order Passengers
  const orderPassengersSpinner = ora("Generating order passengers...").start();
  const orderPassengerDataWithIds = orderGeneratorOutput.orderPassengers.map(
    op => ({
      ...op,
      orderId: orderIdMapping.get(op.orderId)!,
    })
  );
  const insertedOrderPassengers = await db
    .insert(orderPassengers)
    .values(orderPassengerDataWithIds)
    .returning();
  orderPassengersSpinner.succeed(
    `Generated ${insertedOrderPassengers.length} order passengers`
  );

  // 11. Insert Payments
  const paymentsSpinner = ora("Generating payments...").start();
  const paymentDataWithIds = orderGeneratorOutput.payments.map(p => ({
    ...p,
    orderId: orderIdMapping.get(p.orderId)!,
  }));
  const insertedPayments = await db
    .insert(payments)
    .values(paymentDataWithIds)
    .returning();
  paymentsSpinner.succeed(`Generated ${insertedPayments.length} payments`);

  // 12. Generate Flight Search History
  const searchHistorySpinner = ora("Generating search history...").start();
  const searchHistoryData = generateSearchHistory({
    userIds: insertedUsers.map(u => u.id),
    cities: insertedCities.map(c => ({
      id: c.id,
      iataCode: c.iataCode,
      name: c.name,
    })),
    searchesPerUser: config.counts.searchesPerUser || { min: 2, max: 8 }, // Default: 2-8 searches per user
    seed: config.seed,
  });
  const insertedSearchHistory = await db
    .insert(flightSearchHistory)
    .values(searchHistoryData)
    .returning();
  searchHistorySpinner.succeed(
    `Generated ${insertedSearchHistory.length} search history entries`
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
  console.log(`   - Orders: ${insertedOrders.length}`);
  console.log(`   - Order Passengers: ${insertedOrderPassengers.length}`);
  console.log(`   - Payments: ${insertedPayments.length}`);
  console.log(`   - Search History: ${insertedSearchHistory.length}`);
}

// Run the seed function
seed();

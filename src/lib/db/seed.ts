import { faker } from "@faker-js/faker";
import { sql } from "drizzle-orm";

import {
  account,
  airlines,
  airports,
  flights,
  flightSeatClasses,
  passengers,
  user,
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
    await db.delete(passengers);
    await db.delete(account);
    await db.delete(user);

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
    const statuses = ["SCHEDULED", "DELAYED", "CANCELLED", "COMPLETED"];
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

    // Seed Users
    console.log("[SEED] Seeding users...");
    const numberOfUsers = 10;
    const userData = [];

    for (let i = 0; i < numberOfUsers; i++) {
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
      // Each user gets 1-5 passengers
      const numberOfPassengers = faker.number.int({ min: 1, max: 5 });

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

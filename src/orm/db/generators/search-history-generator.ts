/**
 * Flight Search History Generator
 *
 * Generates realistic flight search history data for users.
 * Simulates user search behavior with realistic patterns.
 */

import { faker } from "@faker-js/faker";
import type { InferInsertModel } from "drizzle-orm";

import { SearchSeatClass, TripType } from "@/orm/schema/enums";
import { flightSearchHistory } from "@/orm/schema/flight-search-history";

type SearchHistoryInsert = InferInsertModel<typeof flightSearchHistory>;

export interface SearchHistoryGeneratorInput {
  userIds: string[]; // Available user IDs
  cities: Array<{ id: string; iataCode: string; name: string }>; // Available cities
  searchesPerUser: { min: number; max: number }; // Number of searches per user
  seed?: number;
}

/**
 * Generate realistic flight search history
 */
export function generateSearchHistory(
  input: SearchHistoryGeneratorInput
): Omit<SearchHistoryInsert, "id" | "createdAt" | "updatedAt">[] {
  const { userIds, cities, searchesPerUser, seed } = input;

  if (seed !== undefined) {
    faker.seed(seed);
  }

  const searchHistories: Omit<
    SearchHistoryInsert,
    "id" | "createdAt" | "updatedAt"
  >[] = [];

  for (const userId of userIds) {
    const searchCount = faker.number.int(searchesPerUser);

    for (let i = 0; i < searchCount; i++) {
      // Select two different cities
      const departureCity = faker.helpers.arrayElement(cities);
      const arrivalCity = faker.helpers.arrayElement(
        cities.filter(c => c.id !== departureCity.id)
      );

      // Trip type: 70% one-way, 30% round-trip
      const tripType = faker.datatype.boolean({ probability: 0.7 })
        ? TripType.ONE_WAY
        : TripType.ROUND_TRIP;

      // Departure date: within next 3 months
      const departureDate = faker.date.soon({ days: 90 });
      const departureDateStr = departureDate.toISOString().split("T")[0];

      // Return date: 3-14 days after departure (for round-trip)
      const returnDate =
        tripType === TripType.ROUND_TRIP
          ? new Date(
              departureDate.getTime() +
                faker.number.int({ min: 3, max: 14 }) * 24 * 60 * 60 * 1000
            )
          : null;
      const returnDateStr = returnDate
        ? returnDate.toISOString().split("T")[0]
        : null;

      // Seat class: 70% any, 20% economy, 8% business, 2% first
      const seatClassRoll = faker.number.float({ min: 0, max: 1 });
      const seatClass =
        seatClassRoll < 0.7
          ? SearchSeatClass.ANY
          : seatClassRoll < 0.9
            ? SearchSeatClass.ECONOMY
            : seatClassRoll < 0.98
              ? SearchSeatClass.BUSINESS
              : SearchSeatClass.FIRST;

      // Price tracking (optional, 60% of searches have price data)
      const hasPriceData = faker.datatype.boolean({ probability: 0.6 });
      const lowestPriceAtSearch = hasPriceData
        ? faker.number
            .float({ min: 300, max: 3000, fractionDigits: 2 })
            .toString()
        : null;
      const currentLowestPrice = hasPriceData
        ? faker.number
            .float({ min: 300, max: 3000, fractionDigits: 2 })
            .toString()
        : null;

      // Search count: 1-5 (how many times user searched this route)
      const searchCountValue = faker.number.int({ min: 1, max: 5 });

      // Last searched: within last 30 days
      const lastSearchedAt = faker.date.recent({ days: 30 });

      searchHistories.push({
        userId,
        departureCityId: departureCity.id,
        arrivalCityId: arrivalCity.id,
        departureCityIata: departureCity.iataCode,
        departureCityName: departureCity.name,
        arrivalCityIata: arrivalCity.iataCode,
        arrivalCityName: arrivalCity.name,
        tripType,
        departureDate: departureDateStr,
        returnDate: returnDateStr,
        seatClass,
        lowestPriceAtSearch,
        currentLowestPrice,
        searchCount: searchCountValue,
        lastSearchedAt,
        isDeleted: false,
      });
    }
  }

  return searchHistories;
}

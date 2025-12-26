import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { cities } from "@/db/schema";
import { CityData, CityWithAirports } from "@/types/dto";

/**
 * Get all cities (for city selector)
 * Use this in Server Components to fetch all cities at once
 */
export async function getAllCities(): Promise<CityData[]> {
  return await db
    .select({
      iataCode: cities.iataCode,
      name: cities.name,
      timezone: cities.timezone,
      pinyinFirstLetter: cities.pinyinFirstLetter,
      continent: cities.continent,
      isPopular: cities.isPopular,
      displayOrder: cities.displayOrder,
    })
    .from(cities)
    .where(eq(cities.isDeleted, false))
    .orderBy(asc(cities.displayOrder), asc(cities.name));
}

/**
 * Get popular airports (cities with their airports)
 * Used in airport guide page to display popular airports grouped by domestic/international
 */
export async function getPopularAirports(): Promise<CityWithAirports[]> {
  const result = await db.query.cities.findMany({
    where: (cities, { eq, and }) =>
      and(eq(cities.isPopular, true), eq(cities.isDeleted, false)),
    orderBy: (cities, { asc }) => [asc(cities.displayOrder)],
    with: {
      airports: {
        where: (airports, { eq }) => eq(airports.isDeleted, false),
        orderBy: (airports, { asc }) => [asc(airports.name)],
      },
    },
  });

  return result.map(city => ({
    id: city.id,
    iataCode: city.iataCode,
    name: city.name,
    isDomestic: city.isDomestic,
    isPopular: city.isPopular,
    displayOrder: city.displayOrder,
    airports: city.airports.map(airport => ({
      id: airport.id,
      iataCode: airport.iataCode,
      name: airport.name,
      cityId: airport.cityId,
    })),
  }));
}

export async function getCityByIataCode(iataCode: string) {
  return await db.query.cities.findFirst({
    where: (cities, { eq }) => eq(cities.iataCode, iataCode),
  });
}

/**
 * Get airport by IATA code with its city information
 * Used in airport detail page
 */
export async function getAirportByIataCode(iataCode: string) {
  const result = await db.query.airports.findFirst({
    where: (airports, { eq, and }) =>
      and(eq(airports.iataCode, iataCode), eq(airports.isDeleted, false)),
    with: {
      city: true,
    },
  });

  if (!result) {
    return null;
  }

  return {
    id: result.id,
    iataCode: result.iataCode,
    name: result.name,
    city: {
      id: result.city.id,
      iataCode: result.city.iataCode,
      name: result.city.name,
      isDomestic: result.city.isDomestic,
    },
  };
}

import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { cities } from "@/lib/schema";

/**
 * City data type for city selector
 */
export interface CityData {
  iataCode: string;
  name: string;
  timezone: string;
  pinyinFirstLetter: string | null;
  continent: string | null;
  isPopular: boolean;
  displayOrder: number;
}

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

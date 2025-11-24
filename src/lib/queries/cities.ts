import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { cities } from "@/lib/schema";
import { CityData } from "@/types/dto";

/**
 * Get all cities (for city selector)
 * Use this in Server Components to fetch all cities at once
 */
const FALLBACK_CITIES: CityData[] = [
  {
    iataCode: "SHA",
    name: "上海",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "S",
    continent: null,
    isPopular: true,
    displayOrder: 1,
  },
  {
    iataCode: "BJS",
    name: "北京",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "B",
    continent: null,
    isPopular: true,
    displayOrder: 2,
  },
  {
    iataCode: "BKK",
    name: "曼谷",
    timezone: "Asia/Bangkok",
    pinyinFirstLetter: null,
    continent: "Asia",
    isPopular: false,
    displayOrder: 100,
  },
];

export async function getAllCities(): Promise<CityData[]> {
  try {
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
  } catch {
    if (process.env.NODE_ENV === "development") {
      return FALLBACK_CITIES;
    }
    return [];
  }
}

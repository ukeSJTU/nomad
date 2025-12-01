import type { CityData, SearchHistoryRecord } from "@/types/dto";

import { getAllCities as getAllCitiesFromRepo } from "./city.repository";
import { getRecentSearchHistory as getRecentSearchHistoryFromRepo } from "./flight-search-history.repository";

/**
 * Read-only service layer for flight domain queries.
 * Keeps repository access inside the flights domain while exposing
 * simple functions for controllers/actions to consume.
 */
export async function getAllCities(): Promise<CityData[]> {
  return getAllCitiesFromRepo();
}

export async function getRecentSearchHistory(
  userId: string,
  limit: number = 10
): Promise<SearchHistoryRecord[]> {
  return getRecentSearchHistoryFromRepo(userId, limit);
}

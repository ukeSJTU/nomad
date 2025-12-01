"use server";

import { getSessionUser } from "@/actions/session";
import {
  getAllCities,
  getRecentSearchHistory,
  searchFlightsWithHistory,
} from "@/domains/flights";
import type {
  FlightSearchResult,
  RoundTripFlightSearchResult,
} from "@/types/dto";
import type { SeatClass, TripType, UpperSeatClass } from "@/types/validations";

export async function getFlightsLandingDataAction(): Promise<{
  cities: Awaited<ReturnType<typeof getAllCities>>;
  searchHistory: Awaited<ReturnType<typeof getRecentSearchHistory>>;
}> {
  const [cities, user] = await Promise.all([getAllCities(), getSessionUser()]);
  const searchHistory = user ? await getRecentSearchHistory(user.id, 6) : [];

  return { cities, searchHistory };
}

export interface SearchFlightsActionParams {
  tripType: TripType;
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  seatClass: SeatClass;
  classType?: UpperSeatClass;
}

export async function searchFlightsAction(
  params: SearchFlightsActionParams
): Promise<FlightSearchResult[] | RoundTripFlightSearchResult | undefined> {
  const user = await getSessionUser();

  return searchFlightsWithHistory({
    ...params,
    userId: user?.id,
  });
}

export async function getCitiesAction() {
  return getAllCities();
}

export async function getSearchHistoryAction(limit = 6) {
  const user = await getSessionUser();

  if (!user) {
    return [];
  }

  return getRecentSearchHistory(user.id, limit);
}

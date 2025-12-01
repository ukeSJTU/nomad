"use server";

import { getCityByIataCode, getPopularAirports } from "@/domains/flights";

export async function getPopularAirportsAction() {
  return await getPopularAirports();
}

export async function getCityByIataCodeAction(iataCode: string) {
  return await getCityByIataCode(iataCode);
}

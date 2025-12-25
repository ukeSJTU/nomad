"use server";

import {
  getAirportByIataCode,
  getCityByIataCode,
  getPopularAirports,
} from "@/domains/flights";

export async function getPopularAirportsAction() {
  return await getPopularAirports();
}

export async function getCityByIataCodeAction(iataCode: string) {
  return await getCityByIataCode(iataCode);
}

export async function getAirportByIataCodeAction(iataCode: string) {
  return await getAirportByIataCode(iataCode);
}

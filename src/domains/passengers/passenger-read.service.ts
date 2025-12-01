import type { PassengerDTO, PassengerDetailData } from "@/types/dto";
import {
  getPassengerById as getPassengerByIdFromRepo,
  getPassengers as getPassengersFromRepo,
} from "./passenger.repository";

/**
 * Read-only passenger services to keep repository usage inside the domain.
 */
export async function getPassengers(userId: string): Promise<PassengerDTO[]> {
  return getPassengersFromRepo(userId);
}

export async function getPassengerById(
  id: string,
  userId: string
): Promise<PassengerDetailData | null> {
  return getPassengerByIdFromRepo(id, userId);
}

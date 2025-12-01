import {
  getPassengerById as getPassengerByIdFromRepo,
  getPassengers as getPassengersFromRepo,
} from "./passenger.repository";

/**
 * Read-only passenger services to keep repository usage inside the domain.
 */
export async function getPassengers(userId: string) {
  return getPassengersFromRepo(userId);
}

export async function getPassengerById(id: string, userId: string) {
  return getPassengerByIdFromRepo(id, userId);
}

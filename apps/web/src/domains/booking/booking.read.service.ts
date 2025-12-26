import { getOrderForAncillary as getOrderForAncillaryFromRepo } from "./ancillary.repository";
import {
  getFlightSeatClassById as getFlightSeatClassByIdFromRepo,
  getFlightSeatClassesByIds as getFlightSeatClassesByIdsFromRepo,
  getSavedPassengers as getSavedPassengersFromRepo,
} from "./booking-passengers.repository";
import { getOrderConfirmation as getOrderConfirmationFromRepo } from "./confirmation.repository";
import {
  getAllOrdersByUserId as getAllOrdersByUserIdFromRepo,
  getOrderDetailById as getOrderDetailByIdFromRepo,
} from "./orders.repository";
import { getOrderForPayment as getOrderForPaymentFromRepo } from "./payment.repository";

/**
 * Read-only booking services to keep repository usage scoped to this domain.
 */
export async function getAllOrdersByUserId(userId: string) {
  return getAllOrdersByUserIdFromRepo(userId);
}

export async function getOrderDetailById(orderId: string, userId: string) {
  return getOrderDetailByIdFromRepo(orderId, userId);
}

export async function getFlightSeatClassById(seatClassId: string) {
  return getFlightSeatClassByIdFromRepo(seatClassId);
}

export async function getFlightSeatClassesByIds(seatClassIds: string[]) {
  return getFlightSeatClassesByIdsFromRepo(seatClassIds);
}

export async function getSavedPassengers(userId: string) {
  return getSavedPassengersFromRepo(userId);
}

export async function getOrderForAncillary(orderId: string, userId: string) {
  return getOrderForAncillaryFromRepo(orderId, userId);
}

export async function getOrderConfirmation(orderId: string, userId: string) {
  return getOrderConfirmationFromRepo(orderId, userId);
}

export async function getOrderForPayment(orderId: string, userId: string) {
  return getOrderForPaymentFromRepo(orderId, userId);
}

/**
 * Booking queries exports
 *
 * Centralized exports for all booking-related queries
 * Used across the 4-page flight booking flow:
 * - passengers: Flight seat class and saved passengers
 * - ancillary: Order details for ancillary services
 * - payment: Order payment details and user balance
 * - confirmation: Order confirmation with payment info
 */

export { getOrderForAncillary } from "@/domains/booking/ancillary.repository";
export {
  getFlightSeatClassById,
  getFlightSeatClassesByIds,
  getSavedPassengers,
} from "@/domains/booking/booking-passengers.repository";
export { getOrderConfirmation } from "@/domains/booking/confirmation.repository";
export { getOrderForPayment } from "@/domains/booking/payment.repository";

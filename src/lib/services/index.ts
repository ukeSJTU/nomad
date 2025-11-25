/**
 * Service Layer Exports
 *
 * This file exports all service layer functions for easy importing.
 * Service layer contains pure business logic without framework dependencies.
 */

// Shims to keep existing imports working while the codebase migrates to domain paths
export type { ServiceResult } from "@/domains/types";

// Auth services
export {
  changePassword,
  setPasswordForOAuthUser,
  unlinkSocialAccount,
  updateEmail,
  updatePhoneNumber,
} from "@/domains/auth/auth.service";

// Order services
export { cancelExpiredOrders } from "@/domains/booking/orders.service";

// Passenger services
export type { PassengerInput } from "@/domains/passengers/passenger.service";
export {
  batchDeletePassengers,
  createPassenger,
  deletePassenger,
  getPassenger,
  updatePassenger,
} from "@/domains/passengers/passenger.service";

// User services
export { updateUserInfo } from "@/domains/user/user.service";

// Flight search history services
export {
  clearFlightSearchHistory,
  recordFlightSearch,
} from "@/domains/flights/flight-search-history.service";

// Flight search services
export { searchFlightsWithHistory } from "@/domains/flights/flight-search.service";

/**
 * Service Layer Exports
 *
 * This file exports all service layer functions for easy importing.
 * Service layer contains pure business logic without framework dependencies.
 */

// Export common types (used by all services)
export type { ServiceResult } from "./types";

// Export auth services
export {
  changePassword,
  setPasswordForOAuthUser,
  unlinkSocialAccount,
} from "./auth";

// Export order services
export { cancelExpiredOrders } from "./orders";

// Export passenger services
export type { PassengerInput } from "./passengers";
export {
  batchDeletePassengers,
  createPassenger,
  deletePassenger,
  getPassenger,
  updatePassenger,
} from "./passengers";

// Export user services
export { updateUserInfo } from "./user";

// Export flight search history services
export {
  clearFlightSearchHistory,
  recordFlightSearch,
} from "./flight-search-history";

// Export flight search services
export { searchFlightsWithHistory } from "./flight-search";

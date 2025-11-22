/**
 * Data Transfer Objects (DTOs)
 *
 * Frontend-optimized data structures for UI components and API responses
 * Used in components, pages, hooks, and client-side code (presentation layer)
 *
 * Key differences from database types:
 * - Denormalized for display efficiency (reduces query complexity)
 * - Uses ISO string dates for serialization (not Date objects)
 * - Includes computed/derived fields for UI convenience
 */

export * from "./cities";
export { type SearchHistoryRecord } from "./flight-search-history";
export * from "./orders";
export {
  type Passenger as PassengerDTO,
  type PassengerListItem,
} from "./passengers";
export { type UserInfo, type UserSecurityStatus } from "./user";

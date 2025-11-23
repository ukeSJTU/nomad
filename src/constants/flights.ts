/**
 * Flight-related constants
 *
 * Centralized constants for flight search and booking UI
 */

/**
 * Seat class type mapping from URL param to API enum
 */
export const SEAT_CLASS_TYPE_MAP = {
  economy: "ECONOMY",
  business: "BUSINESS",
  first: "FIRST",
} as const;

/**
 * UI text constants
 */
export const FLIGHT_UI_TEXT = {
  // Trip type labels
  ONE_WAY: "单程",
  ROUND_TRIP: "往返",

  // Action buttons
  BOOK_BUTTON: "订票",
  SELECT_OUTBOUND: "选择去程",
  SELECT_RETURN: "选择返程",

  // Tab labels
  TAB_SELECT_OUTBOUND: "选择去程",
  TAB_SELECT_RETURN: "选择返程",

  // Messages
  NO_FLIGHTS_FOUND: "未找到航班",
  NO_FLIGHTS_DESCRIPTION:
    "抱歉,没有找到符合您搜索条件的航班。请尝试调整搜索条件。",
  LAST_UPDATE: "最近更新",
  PRICE_FLUCTUATION_NOTICE: "机票价格变动频繁,搜索结果有效期15min。",
} as const;

/**
 * Round trip step numbers
 */
export const ROUND_TRIP_STEPS = {
  OUTBOUND: 1,
  RETURN: 2,
} as const;

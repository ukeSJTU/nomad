/**
 * Flight validation schemas (Zod)
 *
 * Runtime validation schemas for flight search parameters.
 * Used in validation layer: server components, service layer.
 */

import { z } from "zod";

/**
 * Seat class options (lowercase for URL params)
 */
export const seatClassSchema = z.enum(["any", "economy", "business", "first"], {
  message: "Seat class must be any, economy, business, or first",
});

/**
 * Uppercase seat class type for backend API
 */
export const upperSeatClassSchema = z.enum(["ECONOMY", "BUSINESS", "FIRST"], {
  message: "Seat class type must be ECONOMY, BUSINESS, or FIRST",
});

/**
 * Trip type options
 */
export const tripTypeSchema = z.enum(["one-way", "round-trip"], {
  message: "Trip type must be one-way or round-trip",
});

/**
 * Schema for flight search URL parameters
 */
export const flightSearchParamsSchema = z.object({
  tripType: tripTypeSchema,
  from: z.string().length(3, "Departure city code must be 3 characters"),
  to: z.string().length(3, "Arrival city code must be 3 characters"),
  departDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date format must be YYYY-MM-DD"),
  returnDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date format must be YYYY-MM-DD")
    .optional(),
  class: seatClassSchema.default("any"),
});

/**
 * Type inferred from seatClassSchema
 */
export type SeatClass = z.infer<typeof seatClassSchema>;

/**
 * Type inferred from upperSeatClassSchema
 */
export type UpperSeatClass = z.infer<typeof upperSeatClassSchema>;

/**
 * Type inferred from tripTypeSchema
 */
export type TripType = z.infer<typeof tripTypeSchema>;

/**
 * Type inferred from flightSearchParamsSchema
 */
export type FlightSearchParams = z.infer<typeof flightSearchParamsSchema>;

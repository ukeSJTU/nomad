import type { InferInsertModel } from "drizzle-orm";
import { Factory } from "fishery";

import type { flightSeatClasses } from "@/lib/schema/flight-seat-classes";

/**
 * Flight Seat Class type for factory
 */
type FlightSeatClass = InferInsertModel<typeof flightSeatClasses>;

/**
 * Factory for creating test flight seat classes
 *
 * Usage:
 * - flightSeatClassFactory.build() - Create a seat class object (not inserted to DB)
 * - flightSeatClassFactory.build({ flightId: 'flight-123' }) - Override specific fields
 */
export const flightSeatClassFactory = Factory.define<FlightSeatClass>(
  ({ sequence }) => ({
    flightId: `flight-${sequence}`, // Should be overridden
    classType: "ECONOMY",
    totalSeats: 100,
    availableSeats: 100,
    price: "500.00", // CNY, stored as string for precision
    createdAt: new Date(),
    updatedAt: new Date(),
  })
);

/**
 * Factory for creating business class seats
 */
export const businessSeatClassFactory = flightSeatClassFactory.params({
  classType: "BUSINESS",
  totalSeats: 20,
  availableSeats: 20,
  price: "1500.00",
});

/**
 * Factory for creating first class seats
 */
export const firstSeatClassFactory = flightSeatClassFactory.params({
  classType: "FIRST",
  totalSeats: 8,
  availableSeats: 8,
  price: "3000.00",
});

/**
 * Factory for creating seat classes with limited availability
 */
export const limitedSeatClassFactory = flightSeatClassFactory.params({
  totalSeats: 100,
  availableSeats: 5, // Only 5 seats left
});

/**
 * Factory for creating sold out seat classes
 */
export const soldOutSeatClassFactory = flightSeatClassFactory.params({
  totalSeats: 100,
  availableSeats: 0, // Sold out
});

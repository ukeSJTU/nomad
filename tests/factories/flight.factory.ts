import type { InferInsertModel } from "drizzle-orm";
import { Factory } from "fishery";

import type { flights } from "@/lib/schema/flights";

/**
 * Flight type for factory
 */
type Flight = InferInsertModel<typeof flights>;

/**
 * Factory for creating test flights
 *
 * Usage:
 * - flightFactory.build() - Create a flight object (not inserted to DB)
 * - flightFactory.build({ airlineId: 'airline-123' }) - Override specific fields
 */
export const flightFactory = Factory.define<Flight>(({ sequence }) => {
  const departureDate = new Date();
  departureDate.setDate(departureDate.getDate() + 7); // 7 days from now
  departureDate.setHours(10, 0, 0, 0);

  const arrivalDate = new Date(departureDate);
  arrivalDate.setHours(12, 30, 0, 0); // 2.5 hours flight

  return {
    flightNumber: `CA${(1000 + sequence).toString()}`, // CA1001, CA1002, etc.
    airlineId: `airline-${sequence}`, // Should be overridden
    departureAirportId: `airport-${sequence}`, // Should be overridden
    arrivalAirportId: `airport-${sequence + 1}`, // Should be overridden
    departureDatetime: departureDate,
    arrivalDatetime: arrivalDate,
    departureTerminal: "T2",
    arrivalTerminal: "T3",
    aircraftType: "Boeing 737",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

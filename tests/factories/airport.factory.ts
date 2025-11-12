import type { InferInsertModel } from "drizzle-orm";
import { Factory } from "fishery";

import type { airports } from "@/lib/schema/airports";

/**
 * Airport type for factory
 */
type Airport = InferInsertModel<typeof airports>;

/**
 * Factory for creating test airports
 *
 * Usage:
 * - airportFactory.build() - Create an airport object (not inserted to DB)
 * - airportFactory.build({ cityId: 'city-123' }) - Override specific fields
 */
export const airportFactory = Factory.define<Airport>(({ sequence }) => ({
  iataCode: `A${sequence.toString().padStart(2, "0")}`, // A01, A02, etc.
  name: `测试机场${sequence}`,
  cityId: `city-${sequence}`, // Default city ID, should be overridden
  createdAt: new Date(),
  updatedAt: new Date(),
}));

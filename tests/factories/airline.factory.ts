import type { InferInsertModel } from "drizzle-orm";
import { Factory } from "fishery";

import type { airlines } from "@/lib/schema/airlines";

/**
 * Airline type for factory
 */
type Airline = InferInsertModel<typeof airlines>;

/**
 * Factory for creating test airlines
 *
 * Usage:
 * - airlineFactory.build() - Create an airline object (not inserted to DB)
 * - airlineFactory.build({ name: '中国国航' }) - Override specific fields
 */
export const airlineFactory = Factory.define<Airline>(({ sequence }) => ({
  iataCode: `A${sequence.toString().padStart(1, "0")}`, // A1, A2, etc. (2-letter IATA code)
  name: `测试航空${sequence}`,
  logoUrl: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

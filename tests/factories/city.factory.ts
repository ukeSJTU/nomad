import type { InferInsertModel } from "drizzle-orm";
import { Factory } from "fishery";

import type { cities } from "@/lib/schema/cities";

/**
 * City type for factory
 */
type City = InferInsertModel<typeof cities>;

/**
 * Factory for creating test cities
 *
 * Usage:
 * - cityFactory.build() - Create a city object (not inserted to DB)
 * - cityFactory.build({ name: '北京' }) - Override specific fields
 */
export const cityFactory = Factory.define<City>(({ sequence }) => ({
  iataCode: `C${sequence.toString().padStart(2, "0")}`, // C01, C02, etc.
  name: `测试城市${sequence}`,
  timezone: "Asia/Shanghai",
  isDomestic: true,
  pinyinFirstLetter: "C",
  continent: null,
  isPopular: false,
  displayOrder: sequence,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

/**
 * Factory for creating international cities
 */
export const internationalCityFactory = cityFactory.params({
  isDomestic: false,
  pinyinFirstLetter: null,
  continent: "Asia",
});

/**
 * Factory for creating popular cities
 */
export const popularCityFactory = cityFactory.params({
  isPopular: true,
  displayOrder: 1,
});

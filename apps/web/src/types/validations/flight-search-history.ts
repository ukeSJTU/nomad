/**
 * Flight Search History validation schemas (Zod)
 *
 * Runtime validation schemas for flight search history.
 * Used in validation layer: server actions, service layer.
 */

import { z } from "zod";

/**
 * Schema for recording a flight search
 */
export const recordFlightSearchSchema = z.object({
  departureCityIata: z
    .string()
    .length(3, "出发城市代码必须为3个字符")
    .toUpperCase(),
  arrivalCityIata: z
    .string()
    .length(3, "到达城市代码必须为3个字符")
    .toUpperCase(),
  departureDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "日期格式必须为 YYYY-MM-DD"),
  returnDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "日期格式必须为 YYYY-MM-DD")
    .optional()
    .nullable(),
  tripType: z.enum(["one-way", "round-trip"], {
    message: "行程类型必须为 one-way 或 round-trip",
  }),
  seatClass: z
    .enum(["any", "economy", "business", "first"], {
      message: "舱位等级必须为 any, economy, business 或 first",
    })
    .optional(),
  lowestPrice: z.number().positive().optional(),
});

/**
 * Type inferred from recordFlightSearchSchema
 */
export type RecordFlightSearchData = z.infer<typeof recordFlightSearchSchema>;

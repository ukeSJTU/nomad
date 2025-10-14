import { z } from "zod";

import { createSuccessResponseSchema } from "./response";

/**
 * Health check API validation schemas
 */

// Health check data schema (business data)
export const healthDataSchema = z.object({
  status: z.literal("ok"),
  timestamp: z.string().datetime(),
  uptime: z.number().nonnegative(),
  message: z.string(),
});

// Health check response schema (using standard format)
export const healthResponseSchema =
  createSuccessResponseSchema(healthDataSchema);

// TypeScript types
export type HealthData = z.infer<typeof healthDataSchema>;
export type HealthResponse = z.infer<typeof healthResponseSchema>;

import { z } from "zod";

/**
 * Health check API validation schemas
 */

// Health check response schema
export const healthResponseSchema = z.object({
  status: z.literal("ok"),
  timestamp: z.iso.datetime(),
  uptime: z.number().nonnegative(),
  message: z.string(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;

import { z } from "zod";

import { responseMetaSchema } from "./response";

/**
 * Health check API validation schemas
 */

// Health check data schema (business data)
export const healthDataSchema = z.object({
  status: z.literal("ok").describe("Service status"),
  timestamp: z.string().datetime(),
  uptime: z.number().nonnegative().describe("Server uptime in seconds"),
  message: z.string().describe("Status message"),
});

// Health check response schema (explicit definition for OpenAPI generation)
export const healthResponseSchema = z.object({
  success: z.literal(true).describe("Request success indicator"),
  data: healthDataSchema,
  meta: responseMetaSchema,
});

// TypeScript types
export type HealthData = z.infer<typeof healthDataSchema>;
export type HealthResponse = z.infer<typeof healthResponseSchema>;

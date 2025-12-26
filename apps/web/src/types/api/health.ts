import { z } from "zod";

import { responseMetaSchema } from "./response";

/**
 * Health Check API Validation Schemas
 *
 * This file contains Zod validation schemas for the health check API endpoint.
 * All schemas are compatible with Zod v4 and include OpenAPI-compatible descriptions.
 *
 * The health check endpoint is used to verify that the API is running and responsive.
 * It returns basic service status information including uptime and timestamp.
 *
 * Naming conventions:
 * - Schemas: camelCase ending with "Schema" (e.g., healthDataSchema)
 * - Types: PascalCase (e.g., HealthData)
 */

// ============================================================================
// Health Check Schemas
// ============================================================================

/**
 * Health check data schema
 *
 * Contains the core health status information returned by the health check endpoint.
 * This schema uses `.describe()` for OpenAPI documentation generation.
 *
 * @property status - Always "ok" when the service is healthy
 * @property timestamp - ISO 8601 datetime string of when the health check was performed
 * @property uptime - Server uptime in seconds (non-negative number)
 * @property message - Human-readable status message
 */
export const healthDataSchema = z.object({
  status: z.literal("ok").describe("Service status indicator"),
  timestamp: z.iso.datetime().describe("Health check timestamp"),
  uptime: z.number().nonnegative().describe("Server uptime in seconds"),
  message: z.string().describe("Human-readable status message"),
});

/**
 * Health check response schema
 *
 * Complete response format for the health check endpoint.
 * Explicitly defined (rather than using createSuccessResponseSchema) for better
 * OpenAPI documentation generation.
 *
 * @property success - Always true for successful health checks
 * @property data - Health status data
 * @property meta - Response metadata (timestamp, requestId)
 */
export const healthResponseSchema = z.object({
  success: z.literal(true).describe("Request success indicator"),
  data: healthDataSchema,
  meta: responseMetaSchema,
});

// ============================================================================
// TypeScript Type Exports
// ============================================================================

/**
 * Inferred TypeScript types from Zod schemas
 * These types are automatically generated and should not be manually modified
 */
export type HealthData = z.infer<typeof healthDataSchema>;
export type HealthResponse = z.infer<typeof healthResponseSchema>;

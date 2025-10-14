import { z } from "zod";

import { ApiResponse } from "@/lib/utils/api-response";

// Define schemas in the same file for next-openapi-gen
const HealthData = z.object({
  status: z.literal("ok").describe("Service status"),
  timestamp: z.string().describe("Response timestamp in ISO format"),
  uptime: z.number().nonnegative().describe("Server uptime in seconds"),
  message: z.string().describe("Status message"),
});

export const HealthResponse = z.object({
  success: z.literal(true).describe("Request success indicator"),
  data: HealthData,
  meta: z.object({
    timestamp: z.string().describe("Response timestamp in ISO format"),
    requestId: z.string().describe("Unique request identifier"),
  }),
});

/**
 * Check health status of the server
 * @description Check health status of the server
 * @response HealthResponse
 * @openapi
 */
export async function GET() {
  const healthData = {
    status: "ok" as const,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: "Service is healthy",
  };

  // Validate the response data against the schema
  const validatedData = HealthData.parse(healthData);

  // Return using standard response format
  return ApiResponse.success(validatedData);
}

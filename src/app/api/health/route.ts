import { ApiResponse } from "@/lib/utils/api-response";
import {
  type HealthData,
  healthDataSchema,
  healthResponseSchema, // eslint-disable-line @typescript-eslint/no-unused-vars
} from "@/types/api/health";

/**
 * Check health status of the server
 * @description Check health status of the server
 * @response healthResponseSchema
 * @openapi
 */
export async function GET() {
  const healthData: HealthData = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: "Service is healthy",
  };

  // Validate the response data against the schema
  const validatedData = healthDataSchema.parse(healthData);

  // Return using standard response format
  return ApiResponse.success(validatedData);
}

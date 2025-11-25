import { NextResponse } from "next/server";

import {
  type HealthData,
  healthDataSchema,
  type HealthResponse,
} from "@/types/api";
import { ApiResponse } from "@/utils/api-response";

export async function GET(): Promise<NextResponse<HealthResponse>> {
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

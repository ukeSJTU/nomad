import { NextResponse } from "next/server";

import { ApiResponse } from "@/lib/utils/api-response";
import {
  type HealthData,
  healthDataSchema,
  type HealthResponse,
} from "@/types/api";

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

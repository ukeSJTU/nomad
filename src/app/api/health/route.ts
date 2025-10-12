import { NextResponse } from "next/server";

import { type HealthResponse, healthResponseSchema } from "@/types";

/**
 * Check health status of the server
 * @description Check health status of the server
 * @response healthResponseSchema
 * @openapi
 */
export async function GET(): Promise<NextResponse<HealthResponse>> {
  const response: HealthResponse = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: "Service is healthy",
  };

  // Validate the response against the schema
  const validatedResponse = healthResponseSchema.parse(response);

  return NextResponse.json(validatedResponse);
}

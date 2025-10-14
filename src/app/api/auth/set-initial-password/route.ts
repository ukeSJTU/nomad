import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { account } from "@/lib/schema";
import { ApiResponse } from "@/lib/utils/api-response";

// Define schemas in the same file for next-openapi-gen
export const SetInitialPasswordRequest = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must not exceed 128 characters")
    .describe("User password"),
});

export const SetInitialPasswordResponse = z.object({
  success: z.literal(true).describe("Request success indicator"),
  data: z.object({
    message: z.string().describe("Success message"),
  }),
  meta: z.object({
    timestamp: z.string().describe("Response timestamp in ISO format"),
    requestId: z.string().describe("Unique request identifier"),
  }),
});

/**
 * Set initial password for users who registered via phone verification
 * @description This endpoint is called after successful phone verification to complete the registration process
 * @body SetInitialPasswordRequest
 * @response SetInitialPasswordResponse
 * @responseSet auth
 * @add 422
 * @openapi
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = SetInitialPasswordRequest.parse(body);

    // Get current user session (should exist after phone verification)
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return ApiResponse.unauthorized(
        "AUTH_UNAUTHORIZED",
        "Authentication required. Please log in first."
      );
    }

    // Check if user has already set a password
    // Query the account table for existing credential provider records
    const existingAccounts = await db
      .select()
      .from(account)
      .where(
        and(
          eq(account.userId, session.user.id),
          eq(account.providerId, "credential")
        )
      );

    // Prevent users from setting password multiple times
    if (existingAccounts.length > 0) {
      return ApiResponse.businessError(
        "BUSINESS_PASSWORD_ALREADY_SET",
        "Password has already been set for this account"
      );
    }

    // Set the password using better-auth API
    // This creates a credential account for the user
    await auth.api.setPassword({
      body: {
        newPassword: validatedData.password,
      },
      headers: request.headers,
    });

    return ApiResponse.success({ message: "Password set successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Data format/type errors → 400
      const details = error.issues.map(issue => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return ApiResponse.validationError(details);
    }

    console.error("Set password error:", error);
    return ApiResponse.internalError("An unexpected error occurred");
  }
}

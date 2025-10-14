import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { account } from "@/lib/schema";
import { ApiResponse } from "@/lib/utils/api-response";
import {
  setInitialPasswordRequestSchema,
  setInitialPasswordResponseSchema, // eslint-disable-line @typescript-eslint/no-unused-vars
} from "@/types/api/auth";

/**
 * Set initial password for users who registered via phone verification
 * @description This endpoint is called after successful phone verification to complete the registration process
 * @body setInitialPasswordRequestSchema
 * @response setInitialPasswordResponseSchema
 * @responseSet auth
 * @add 422
 * @openapi
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = setInitialPasswordRequestSchema.parse(body);

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

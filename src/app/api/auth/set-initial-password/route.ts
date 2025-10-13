import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { account } from "@/lib/schema";

/**
 * API endpoint to set initial password for users who registered via phone verification
 * This endpoint is called after successful phone verification to complete the registration process
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body to extract password
    const { password } = await request.json();

    // Validate password input
    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // Validate minimum password length (additional validation on top of frontend)
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Get current user session (should exist after phone verification)
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      return NextResponse.json(
        { error: "Password already set" },
        { status: 400 }
      );
    }

    // Set the password using better-auth API
    // This creates a credential account for the user
    await auth.api.setPassword({
      body: {
        newPassword: password,
      },
      headers: request.headers,
    });

    return NextResponse.json(
      { message: "Password set successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Set password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

"use server";

import { desc, eq, type InferSelectModel } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { user, verification } from "@/db/schema";
import { auth } from "@/domains/auth";

// ============================================================================
// Types - Using schema native types
// ============================================================================

type User = InferSelectModel<typeof user>;

export type DevUserListResult =
  | { success: true; users: User[] }
  | { success: false; error: string };

export type SwitchUserResult =
  | { success: true }
  | { success: false; error: string };

// ============================================================================
// Server Actions
// ============================================================================

/**
 * Get all users (dev only)
 */
export async function getAllUsersForDevAction(): Promise<DevUserListResult> {
  if (process.env.NODE_ENV !== "development") {
    return { success: false, error: "Not available" };
  }

  try {
    const users = await db.select().from(user).orderBy(desc(user.createdAt));
    return { success: true, users };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}

/**
 * Switch to specified user (dev only)
 *
 * Implementation approach:
 * Since passwords are randomly generated and not guaranteed to be present,
 * we use the email OTP flow:
 * 1. Query the database to get the email of given userId
 * 2. Send email OTP using Better Auth's sendVerificationOTP API
 * 3. Retrieve the verification code from the database
 * 4. Sign in with the email and verification OTP code
 */
export async function switchUserAction(
  userId: string
): Promise<SwitchUserResult> {
  if (process.env.NODE_ENV !== "development") {
    return { success: false, error: "Not available in production" };
  }

  try {
    // Step 1: Query the database to get the email of given userId
    const [targetUser] = await db
      .select({ email: user.email })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (!targetUser) {
      return { success: false, error: "User not found" };
    }

    const email = targetUser.email;

    // Step 2: Send email OTP using Better Auth's API
    await auth.api.sendVerificationOTP({
      body: {
        email,
        type: "sign-in",
      },
      headers: await headers(),
    });

    // Step 3: Get the verification code from the database
    // Wait a bit for the verification record to be created
    await new Promise(resolve => setTimeout(resolve, 100));

    const verificationRecord = await db
      .select()
      .from(verification)
      .where(eq(verification.identifier, `sign-in-otp-${email}`))
      .orderBy(desc(verification.createdAt))
      .limit(1);

    if (!verificationRecord || verificationRecord.length === 0) {
      return { success: false, error: "Verification code not found" };
    }

    // The database stores the OTP code along with tried times
    // xxxxxx:y such as 123456:0
    const otp = verificationRecord[0].value.split(":")[0];

    console.debug(email, otp);

    // Step 4: Sign in with the email and verification OTP code
    const signInResult = await auth.api.signInEmailOTP({
      body: {
        email,
        otp,
      },
      headers: await headers(),
    });

    if (!signInResult) {
      return { success: false, error: "Failed to sign in with OTP" };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to switch user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to switch user",
    };
  }
}

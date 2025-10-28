"use server";

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { account } from "@/lib/schema";

/**
 * Server action to set initial password for users who registered via phone/email verification
 *
 * This action is called after successful phone/email verification to complete the registration process.
 * It checks if the user already has a password set and prevents duplicate password setup.
 *
 * @param password - The password to set for the user
 * @returns Object with success status and optional error message
 */
export async function setInitialPasswordAction(password: string) {
  try {
    // Get current user session (should exist after phone/email verification)
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    // Check if user is authenticated
    if (!session?.user?.id) {
      return {
        success: false,
        error: "Authentication required. Please complete verification first.",
      };
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
      return {
        success: false,
        error: "Password has already been set for this account.",
      };
    }

    // Set the password using better-auth API
    // This creates a credential account for the user
    await auth.api.setPassword({
      body: {
        newPassword: password,
      },
      headers: headersList,
    });

    return {
      success: true,
      message: "Password set successfully",
    };
  } catch (error) {
    console.error("Set password error:", error);
    return {
      success: false,
      error: "Failed to set password. Please try again.",
    };
  }
}

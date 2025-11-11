"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { account } from "@/lib/schema";
import { unlinkSocialAccount } from "@/lib/services/auth";

/**
 * Server action to unlink a social account
 *
 * This is a thin controller that:
 * 1. Handles authentication (Next.js specific)
 * 2. Calls the service layer for business logic
 * 3. Handles revalidation (Next.js specific)
 * 4. Formats the response
 *
 * @param providerId - The social provider ID (e.g., "github", "google")
 * @returns Result object with success status and message/error
 */
export async function unlinkAccountAction(providerId: string) {
  try {
    // 1. Verify authentication (framework-specific)
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Authentication required. Please log in first.",
      };
    }

    // 2. Call service layer for business logic
    const result = await unlinkSocialAccount(session.user.id, providerId);

    // 3. Revalidate the page if successful (framework-specific)
    if (result.success) {
      revalidatePath("/home/accounts");
    }

    // 4. Return the result
    return result;
  } catch (error) {
    console.error("Failed to unlink account:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to unlink account",
    };
  }
}

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

"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { account } from "@/lib/schema";

/**
 * Server action to unlink a social account
 *
 * This action removes the connection between a user and their social provider account.
 * It prevents unlinking if it's the user's only account to ensure they can still log in.
 *
 * @param providerId - The social provider ID (e.g., "github", "google")
 * @returns Result object with success status and message/error
 */
export async function unlinkAccountAction(providerId: string) {
  try {
    // 1. Verify authentication
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

    // 2. Get all accounts for this user
    const userAccounts = await db
      .select()
      .from(account)
      .where(eq(account.userId, session.user.id));

    // 3. Prevent unlinking if this is the only account
    if (userAccounts.length <= 1) {
      return {
        success: false,
        error:
          "Cannot unlink your only account. Please add another account first.",
      };
    }

    // 4. Find the specific account to unlink
    const accountToUnlink = userAccounts.find(
      acc => acc.providerId === providerId
    );

    if (!accountToUnlink) {
      return {
        success: false,
        error: "Account not found or already unlinked.",
      };
    }

    // 5. Delete the account from database
    await db
      .delete(account)
      .where(
        and(
          eq(account.id, accountToUnlink.id),
          eq(account.userId, session.user.id)
        )
      );

    // 6. Revalidate the page to show updated data
    revalidatePath("/home/accounts");

    return {
      success: true,
      message: `Successfully unlinked ${providerId} account.`,
    };
  } catch (error) {
    console.error("Failed to unlink account:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to unlink account",
    };
  }
}

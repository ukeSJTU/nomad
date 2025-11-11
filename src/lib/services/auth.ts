import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { account } from "@/lib/schema";

/**
 * Service layer for authentication-related business logic
 *
 * This layer contains pure business logic without framework dependencies,
 * making it easy to test and reuse in different contexts.
 */

/**
 * Result type for service operations
 */
export interface ServiceResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Unlink a social account from a user
 *
 * This function contains the core business logic for unlinking accounts.
 * It performs the following checks:
 * 1. Ensures the user has more than one account (prevents lockout)
 * 2. Verifies the account exists and belongs to the user
 * 3. Deletes the account from the database
 *
 * WARNING: This implementation has a race condition vulnerability!
 * The check (step 1) and delete (step 3) are not atomic, which means
 * concurrent requests could bypass the "last account" protection.
 *
 * @param userId - The ID of the user
 * @param providerId - The social provider ID (e.g., "github", "google")
 * @returns Result object with success status and message/error
 */
export async function unlinkSocialAccount(
  userId: string,
  providerId: string
): Promise<ServiceResult> {
  // 1. Get all accounts for this user
  const userAccounts = await db
    .select()
    .from(account)
    .where(eq(account.userId, userId));

  // 2. Prevent unlinking if this is the only account
  // ⚠️ RACE CONDITION: Another request could delete an account here!
  if (userAccounts.length <= 1) {
    return {
      success: false,
      error:
        "Cannot unlink your only account. Please add another account first.",
    };
  }

  // 3. Find the specific account to unlink
  const accountToUnlink = userAccounts.find(
    acc => acc.providerId === providerId
  );

  if (!accountToUnlink) {
    return {
      success: false,
      error: "Account not found or already unlinked.",
    };
  }

  // 4. Delete the account from database
  // ⚠️ RACE CONDITION: By the time we reach here, the account count might have changed!
  await db
    .delete(account)
    .where(and(eq(account.id, accountToUnlink.id), eq(account.userId, userId)));

  return {
    success: true,
    message: `Successfully unlinked ${providerId} account.`,
  };
}

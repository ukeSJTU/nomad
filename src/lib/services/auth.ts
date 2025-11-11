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
 * It performs the following checks within a database transaction:
 * 1. Ensures the user has more than one account (prevents lockout)
 * 2. Verifies the account exists and belongs to the user
 * 3. Deletes the account from the database
 *
 * The transaction ensures atomicity: the check and delete happen as a single unit,
 * preventing race conditions where concurrent requests could bypass the protection.
 *
 * @param userId - The ID of the user
 * @param providerId - The social provider ID (e.g., "github", "google")
 * @returns Result object with success status and message/error
 */
export async function unlinkSocialAccount(
  userId: string,
  providerId: string
): Promise<ServiceResult> {
  try {
    // Use a transaction to ensure atomicity
    const result = await db.transaction(async tx => {
      // 1. Get all accounts for this user
      const userAccounts = await tx
        .select()
        .from(account)
        .where(eq(account.userId, userId));

      // 2. Prevent unlinking if this is the only account
      if (userAccounts.length <= 1) {
        throw new Error(
          "Cannot unlink your only account. Please add another account first."
        );
      }

      // 3. Find the specific account to unlink
      const accountToUnlink = userAccounts.find(
        acc => acc.providerId === providerId
      );

      if (!accountToUnlink) {
        throw new Error("Account not found or already unlinked.");
      }

      // 4. Delete the account from database (within transaction)
      await tx
        .delete(account)
        .where(
          and(eq(account.id, accountToUnlink.id), eq(account.userId, userId))
        );

      return {
        success: true,
        message: `Successfully unlinked ${providerId} account.`,
      };
    });

    return result;
  } catch (error) {
    // Handle errors thrown from within the transaction
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to unlink account",
    };
  }
}

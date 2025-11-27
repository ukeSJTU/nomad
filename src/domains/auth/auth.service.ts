import { runInTransaction } from "@/db/transaction";
import {
  deleteAccountById,
  findCredentialAccount,
  getAccountsByUserId,
} from "@/domains/auth/auth.repository";
import type { ServiceResult } from "@/domains/types";
import {
  updateUserEmail,
  updateUserPhoneNumber,
} from "@/domains/user/user.repository";

/**
 * Service layer for authentication-related business logic
 *
 * This layer contains pure business logic without framework dependencies,
 * making it easy to test and reuse in different contexts.
 */

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
    const result = await runInTransaction(async tx => {
      const userAccounts = await getAccountsByUserId(userId, tx);

      if (userAccounts.length <= 1) {
        throw new Error(
          "Cannot unlink your only account. Please add another account first."
        );
      }

      const accountToUnlink = userAccounts.find(
        acc => acc.providerId === providerId
      );

      if (!accountToUnlink) {
        throw new Error("Account not found or already unlinked.");
      }

      await deleteAccountById(accountToUnlink.id, userId, tx);

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

/**
 * Validate password strength
 *
 * Password must meet the following requirements:
 * - At least 8 characters long
 * - At most 128 characters long
 * - Contains at least one number
 * - Contains at least one letter
 *
 * @param password - The password to validate
 * @returns Result object with success status and error message if invalid
 */
export function validatePasswordStrength(
  password: string
): ServiceResult<void> {
  if (password.length < 8) {
    return {
      success: false,
      error: "密码至少需要 8 个字符",
    };
  }

  if (password.length > 128) {
    return {
      success: false,
      error: "密码最多 128 个字符",
    };
  }

  if (!/\d/.test(password)) {
    return {
      success: false,
      error: "密码必须包含至少一个数字",
    };
  }

  if (!/[a-zA-Z]/.test(password)) {
    return {
      success: false,
      error: "密码必须包含至少一个字母",
    };
  }

  return {
    success: true,
  };
}

/**
 * Change password for a user who already has a password
 *
 * This function contains the business logic for changing passwords.
 * It performs the following checks:
 * 1. Validates the new password strength
 * 2. Verifies the user has an existing password (credential account)
 * 3. Calls better-auth API to change the password
 *
 * @param userId - The ID of the user
 * @param currentPassword - The user's current password
 * @param newPassword - The new password to set
 * @returns Result object with success status and message/error
 */
export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<ServiceResult> {
  try {
    // 1. Validate new password strength
    const validationResult = validatePasswordStrength(newPassword);
    if (!validationResult.success) {
      return validationResult;
    }

    // 2. Check if current password is the same as new password
    if (currentPassword === newPassword) {
      return {
        success: false,
        error: "新密码不能与当前密码相同",
      };
    }

    // 3. Verify user has a credential account (password-based login)
    const credentialAccount = await findCredentialAccount(userId);

    if (!credentialAccount) {
      return {
        success: false,
        error: "您还没有设置密码，请先设置密码",
      };
    }

    // 4. The actual password change will be done by better-auth API
    // This service layer only handles validation and business logic
    // The API call will be made in the action layer

    return {
      success: true,
      message: "密码修改成功",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "修改密码失败，请重试",
    };
  }
}

/**
 * Set password for OAuth users who don't have a password yet
 *
 * This function contains the business logic for setting initial passwords
 * for users who registered via OAuth (Google, GitHub, etc.).
 * It performs the following checks:
 * 1. Validates the password strength
 * 2. Verifies the user doesn't already have a password
 * 3. Calls better-auth API to set the password
 *
 * @param userId - The ID of the user
 * @param password - The password to set
 * @returns Result object with success status and message/error
 */
export async function setPasswordForOAuthUser(
  userId: string,
  password: string
): Promise<ServiceResult> {
  try {
    // 1. Validate password strength
    const validationResult = validatePasswordStrength(password);
    if (!validationResult.success) {
      return validationResult;
    }

    // 2. Check if user already has a password
    const credentialAccount = await findCredentialAccount(userId);

    if (credentialAccount) {
      return {
        success: false,
        error: "您已经设置过密码了",
      };
    }

    // 3. The actual password setting will be done by better-auth API
    // This service layer only handles validation and business logic
    // The API call will be made in the action layer

    return {
      success: true,
      message: "密码设置成功",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "设置密码失败，请重试",
    };
  }
}

/**
 * Update user's phone number
 *
 * This function updates the phone number in the database.
 * It performs the following:
 * 1. Validates the phone number format
 * 2. Updates the user's phoneNumber and phoneNumberVerified fields
 *
 * @param userId - The ID of the user
 * @param phoneNumber - The new phone number (with +86 prefix)
 * @returns Result object with success status and message/error
 */
export async function updatePhoneNumber(
  userId: string,
  phoneNumber: string
): Promise<ServiceResult> {
  try {
    // 1. Validate phone number format (should have +86 prefix)
    if (!phoneNumber.startsWith("+86")) {
      return {
        success: false,
        error: "手机号格式错误",
      };
    }

    // Remove +86 prefix to get the actual phone number
    const actualPhoneNumber = phoneNumber.substring(3);

    // Validate it's 11 digits
    if (!/^[0-9]{11}$/.test(actualPhoneNumber)) {
      return {
        success: false,
        error: "手机号必须是11位数字",
      };
    }

    // 2. Update the user's phone number in the database
    await updateUserPhoneNumber(userId, phoneNumber);

    return {
      success: true,
      message: "手机号更新成功",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "更新手机号失败，请重试",
    };
  }
}

/**
 * Update user's email address
 *
 * This function updates the email address in the database.
 * It performs the following:
 * 1. Validates the email format
 * 2. Updates the user's email and emailVerified fields
 *
 * @param userId - The ID of the user
 * @param email - The new email address
 * @returns Result object with success status and message/error
 */
export async function updateEmail(
  userId: string,
  email: string
): Promise<ServiceResult> {
  try {
    // 1. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "邮箱格式错误",
      };
    }

    // 2. Update the user's email in the database
    await updateUserEmail(userId, email);

    return {
      success: true,
      message: "邮箱更新成功",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "更新邮箱失败，请重试",
    };
  }
}

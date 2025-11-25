"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { account } from "@/db/schema";
import { auth } from "@/domains/auth";
import {
  changePassword,
  setPasswordForOAuthUser,
  unlinkSocialAccount,
  updateEmail,
  updatePhoneNumber,
} from "@/domains/auth/auth.service";

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

/**
 * Server action to change password for users who already have a password
 *
 * This is a thin controller that:
 * 1. Handles authentication (Next.js specific)
 * 2. Calls the service layer for business logic validation
 * 3. Calls better-auth API to change the password
 * 4. Handles revalidation (Next.js specific)
 * 5. Formats the response
 *
 * @param currentPassword - The user's current password
 * @param newPassword - The new password to set
 * @returns Result object with success status and message/error
 */
export async function changePasswordAction(
  currentPassword: string,
  newPassword: string
) {
  try {
    // 1. Verify authentication (framework-specific)
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "请先登录",
      };
    }

    // 2. Call service layer for business logic validation
    const validationResult = await changePassword(
      session.user.id,
      currentPassword,
      newPassword
    );

    if (!validationResult.success) {
      return validationResult;
    }

    // 3. Call better-auth API to change the password
    const changeResult = await auth.api.changePassword({
      body: {
        currentPassword,
        newPassword,
        revokeOtherSessions: false, // Don't log out other sessions
      },
      headers: headersList,
    });

    // Check if the API call was successful
    if (!changeResult) {
      return {
        success: false,
        error: "当前密码不正确",
      };
    }

    // 4. Revalidate the security page (framework-specific)
    revalidatePath("/home/security");

    // 5. Return success result
    return {
      success: true,
      message: "密码修改成功",
    };
  } catch (error) {
    console.error("Change password error:", error);
    return {
      success: false,
      error: "修改密码失败，请重试",
    };
  }
}

/**
 * Server action to set password for OAuth users who don't have a password yet
 *
 * This is a thin controller that:
 * 1. Handles authentication (Next.js specific)
 * 2. Calls the service layer for business logic validation
 * 3. Calls better-auth API to set the password
 * 4. Handles revalidation (Next.js specific)
 * 5. Formats the response
 *
 * @param password - The password to set
 * @returns Result object with success status and message/error
 */
export async function setPasswordForOAuthUserAction(password: string) {
  try {
    // 1. Verify authentication (framework-specific)
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "请先登录",
      };
    }

    // 2. Call service layer for business logic validation
    const validationResult = await setPasswordForOAuthUser(
      session.user.id,
      password
    );

    if (!validationResult.success) {
      return validationResult;
    }

    // 3. Call better-auth API to set the password
    await auth.api.setPassword({
      body: {
        newPassword: password,
      },
      headers: headersList,
    });

    // 4. Revalidate the security page (framework-specific)
    revalidatePath("/home/security");

    // 5. Return success result
    return {
      success: true,
      message: "密码设置成功",
    };
  } catch (error) {
    console.error("Set password for OAuth user error:", error);
    return {
      success: false,
      error: "设置密码失败，请重试",
    };
  }
}

/**
 * Server action to update user's phone number
 *
 * This is a thin controller that:
 * 1. Handles authentication (Next.js specific)
 * 2. Calls the service layer for business logic
 * 3. Handles revalidation (Next.js specific)
 * 4. Formats the response
 *
 * @param phoneNumber - The new phone number (with +86 prefix)
 * @returns Result object with success status and message/error
 */
export async function updatePhoneNumberAction(phoneNumber: string) {
  try {
    // 1. Verify authentication (framework-specific)
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "请先登录",
      };
    }

    // 2. Call service layer for business logic
    const result = await updatePhoneNumber(session.user.id, phoneNumber);

    if (!result.success) {
      return result;
    }

    // 3. Revalidate the security page (framework-specific)
    revalidatePath("/home/security");

    // 4. Return success result
    return {
      success: true,
      message: "手机号更新成功",
    };
  } catch (error) {
    console.error("Update phone number error:", error);
    return {
      success: false,
      error: "更新手机号失败，请重试",
    };
  }
}

/**
 * Server action to update user's email address
 *
 * This is a thin controller that:
 * 1. Handles authentication (Next.js specific)
 * 2. Calls the service layer for business logic
 * 3. Handles revalidation (Next.js specific)
 * 4. Formats the response
 *
 * @param email - The new email address
 * @returns Result object with success status and message/error
 */
export async function updateEmailAction(email: string) {
  try {
    // 1. Verify authentication (framework-specific)
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "请先登录",
      };
    }

    // 2. Call service layer for business logic
    const result = await updateEmail(session.user.id, email);

    if (!result.success) {
      return result;
    }

    // 3. Revalidate the security page (framework-specific)
    revalidatePath("/home/security");

    // 4. Return success result
    return {
      success: true,
      message: "邮箱更新成功",
    };
  } catch (error) {
    console.error("Update email error:", error);
    return {
      success: false,
      error: "更新邮箱失败，请重试",
    };
  }
}

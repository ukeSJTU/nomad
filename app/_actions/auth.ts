"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import {
  changePassword,
  setPasswordForOAuthUser,
  unlinkSocialAccount,
} from "@/domains/auth";
import { auth } from "@/infra/auth";
import { logger } from "@/infra/logging";
import { validateAccount } from "@/lib/validation";
import {
  updateUserEmailWorkflow,
  updateUserPhoneNumberWorkflow,
} from "@/services/auth-workflow.service";
import type { ActionResult, ServiceResult } from "@/types/common";
import type { FetchOptions } from "@/types/http";
import type {
  EmailVerificationData,
  OtpLoginData,
  PasswordLoginData,
} from "@/types/validations";

function resolveAccountType(account: string) {
  const trimmedAccount = account.trim();
  const withoutCountryCode = trimmedAccount.startsWith("+86")
    ? trimmedAccount.slice(3)
    : trimmedAccount;

  const directValidation = validateAccount(trimmedAccount);
  const normalizedValidation = validateAccount(withoutCountryCode);

  const isPhone = directValidation.isPhone || normalizedValidation.isPhone;
  const isEmail = directValidation.isEmail;

  return { isPhone, isEmail, account: trimmedAccount };
}

function mergeHeaders(base: Headers, fetchOptions?: FetchOptions): HeadersInit {
  if (!fetchOptions?.headers) {
    return base;
  }

  const merged = new Headers(base);

  for (const [key, value] of Object.entries(fetchOptions.headers)) {
    merged.set(key, value);
  }

  return merged;
}

async function buildHeaders(fetchOptions?: FetchOptions): Promise<Headers> {
  const headersList = await headers();
  return new Headers(mergeHeaders(headersList, fetchOptions));
}

function hasCaptchaHeader(fetchOptions?: FetchOptions): boolean {
  const headers = fetchOptions?.headers;
  if (!headers) return false;

  return Boolean(headers["x-captcha-token"] ?? headers["X-Captcha-Token"]);
}

function ensureCaptcha(fetchOptions?: FetchOptions): ActionResult | null {
  if (hasCaptchaHeader(fetchOptions)) {
    return null;
  }

  return {
    success: false,
    error: "人机验证失败，请重新完成人机验证后再试",
  };
}

/**
 * Password-based sign-in for phone or email accounts.
 */
export async function signInWithPasswordAction(
  data: PasswordLoginData,
  fetchOptions?: FetchOptions
): Promise<ActionResult> {
  const { isPhone, isEmail, account } = resolveAccountType(data.account);

  if (!isPhone && !isEmail) {
    return { success: false, error: "请输入正确的手机号或邮箱格式" };
  }

  try {
    const headersList = await buildHeaders(fetchOptions);

    if (isPhone) {
      await auth.api.signInPhoneNumber({
        body: {
          phoneNumber: account,
          password: data.password,
          rememberMe: true,
        },
        headers: headersList,
      });
    } else {
      await auth.api.signInEmail({
        body: {
          email: account,
          password: data.password,
          rememberMe: true,
        },
        headers: headersList,
      });
    }

    return { success: true, data: undefined };
  } catch (error) {
    logger.error({ error }, "Password sign-in failed");
    return {
      success: false,
      error: "登录失败，请检查账号和密码",
    };
  }
}

/**
 * OTP-based sign-in for phone and email.
 */
export async function signInWithOtpAction(
  data: OtpLoginData,
  fetchOptions?: FetchOptions
): Promise<ActionResult> {
  const { isPhone, isEmail, account } = resolveAccountType(data.account);

  if (!isPhone && !isEmail) {
    return { success: false, error: "请输入正确的手机号或邮箱格式" };
  }

  try {
    const headersList = await buildHeaders(fetchOptions);

    if (isPhone) {
      await auth.api.verifyPhoneNumber({
        body: {
          phoneNumber: account,
          code: data.otp,
        },
        headers: headersList,
      });
    } else {
      await auth.api.signInEmailOTP({
        body: {
          email: account,
          otp: data.otp,
        },
        headers: headersList,
      });
    }

    return { success: true, data: undefined };
  } catch (error) {
    logger.error({ error }, "OTP sign-in failed");
    return {
      success: false,
      error: "验证码错误，请重试",
    };
  }
}

/**
 * Send phone OTP via server boundary.
 */
export async function sendPhoneOtpAction(
  phoneNumber: string,
  fetchOptions?: FetchOptions
): Promise<ActionResult> {
  const captchaResult = ensureCaptcha(fetchOptions);
  if (captchaResult) {
    return captchaResult;
  }

  try {
    const headersList = await buildHeaders(fetchOptions);
    await auth.api.sendPhoneNumberOTP({
      body: { phoneNumber },
      headers: headersList,
    });
    return { success: true, data: undefined };
  } catch (error) {
    logger.error({ error }, "Send phone OTP failed");
    return {
      success: false,
      error: "发送验证码失败，请重试",
    };
  }
}

/**
 * Send email OTP via server boundary.
 */
export async function sendEmailOtpAction(
  email: string,
  type: "sign-in" | "forget-password" | "email-verification",
  fetchOptions?: FetchOptions
): Promise<ActionResult> {
  const captchaResult = ensureCaptcha(fetchOptions);
  if (captchaResult) {
    return captchaResult;
  }

  try {
    const headersList = await buildHeaders(fetchOptions);
    await auth.api.sendVerificationOTP({
      body: {
        email,
        type,
      },
      headers: headersList,
    });

    return { success: true, data: undefined };
  } catch (error) {
    logger.error({ error }, "Send email OTP failed");
    return {
      success: false,
      error: "发送验证码失败，请重试",
    };
  }
}

/**
 * Verify email OTP (for verification flows).
 */
export async function verifyEmailOtpAction(
  data: EmailVerificationData,
  fetchOptions?: FetchOptions
): Promise<ActionResult> {
  try {
    const headersList = await buildHeaders(fetchOptions);
    await auth.api.verifyEmailOTP({
      body: {
        email: data.email,
        otp: data.otp,
      },
      headers: headersList,
    });

    return { success: true, data: undefined };
  } catch (error) {
    logger.error({ error }, "Verify email OTP failed");
    return {
      success: false,
      error: "验证码错误，请重试",
    };
  }
}

/**
 * Sign out current session.
 */
export async function signOutAction(): Promise<ActionResult> {
  try {
    const headersList = await headers();
    await auth.api.signOut({
      headers: headersList,
    });
    return { success: true, data: undefined };
  } catch (error) {
    logger.error({ error }, "Sign out failed");
    return {
      success: false,
      error: "退出登录失败，请重试",
    };
  }
}

/**
 * Start social linking and return redirect URL.
 */
export async function linkSocialAccountAction(
  providerId: "github" | "google",
  callbackURL = "/home/accounts"
): Promise<ActionResult<{ url: string }>> {
  try {
    const headersList = await headers();
    const result = await auth.api.linkSocialAccount({
      body: {
        provider: providerId,
        callbackURL,
        disableRedirect: true,
      },
      headers: headersList,
    });

    if (!result?.url) {
      return {
        success: false,
        error: "未能生成跳转链接，请稍后重试",
      };
    }

    return { success: true, data: { url: result.url } };
  } catch (error) {
    logger.error({ error }, "Link social account failed");
    return {
      success: false,
      error: "绑定失败，请稍后重试",
    };
  }
}

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
export async function unlinkAccountAction(
  providerId: string
): Promise<ServiceResult> {
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
    logger.error({ error }, "Failed to unlink account");
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

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Authentication required. Please complete verification first.",
      };
    }

    const validationResult = await setPasswordForOAuthUser(
      session.user.id,
      password
    );

    if (!validationResult.success) {
      return validationResult;
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
      message: validationResult.message ?? "Password set successfully",
    };
  } catch (error) {
    logger.error({ error }, "Set password error");
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
    logger.error({ error }, "Change password error");
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
    logger.error({ error }, "Set password for OAuth user error");
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
    const result = await updateUserPhoneNumberWorkflow(
      session.user.id,
      phoneNumber
    );

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
    logger.error({ error }, "Update phone number error");
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
    const result = await updateUserEmailWorkflow(session.user.id, email);

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
    logger.error({ error }, "Update email error");
    return {
      success: false,
      error: "更新邮箱失败，请重试",
    };
  }
}

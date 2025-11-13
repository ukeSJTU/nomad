"use server";

import { auth } from "@/lib/auth";
import { verifyTurnstileToken } from "@/lib/turnstile";
import logger from "@/utils/logger";

interface BaseActionResult {
  success: boolean;
  error?: string;
}

interface PhoneOtpPayload {
  phoneNumber: string;
  turnstileToken: string;
}

interface EmailOtpPayload {
  email: string;
  turnstileToken: string;
  type: "sign-in" | "forget-password" | "email-verification";
}

export async function requestPhoneOtpAction(
  payload: PhoneOtpPayload
): Promise<BaseActionResult> {
  const { phoneNumber, turnstileToken } = payload;
  const verification = await verifyTurnstileToken(turnstileToken);

  if (!verification.success) {
    return {
      success: false,
      error: verification.error ?? "人机验证失败，请刷新页面重试",
    };
  }

  try {
    await auth.api.sendPhoneNumberOTP({
      body: { phoneNumber },
      headers: {
        "x-turnstile-token": turnstileToken,
      },
    });

    return { success: true };
  } catch (error) {
    logger.error({ error }, "Failed to send phone OTP");
    return {
      success: false,
      error: "发送验证码失败，请稍后重试",
    };
  }
}

export async function requestEmailOtpAction(
  payload: EmailOtpPayload
): Promise<BaseActionResult> {
  const { email, turnstileToken, type } = payload;
  const verification = await verifyTurnstileToken(turnstileToken);

  if (!verification.success) {
    return {
      success: false,
      error: verification.error ?? "人机验证失败，请刷新页面重试",
    };
  }

  try {
    await auth.api.sendVerificationOTP({
      body: {
        email,
        type,
      },
      headers: {
        "x-turnstile-token": turnstileToken,
      },
    });

    return { success: true };
  } catch (error) {
    logger.error({ error }, "Failed to send email OTP");
    return {
      success: false,
      error: "发送验证码失败，请稍后重试",
    };
  }
}

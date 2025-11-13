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

  logger.info(
    { phoneNumber, tokenLength: turnstileToken?.length ?? 0 },
    "Received phone OTP request"
  );

  // Verify Turnstile token first
  const verification = await verifyTurnstileToken(turnstileToken);

  if (!verification.success) {
    return {
      success: false,
      error: verification.error ?? "人机验证失败，请刷新页面重试",
    };
  }

  try {
    // Turnstile verification passed, now send OTP
    // Note: We skip Turnstile check in auth.ts by not passing the token
    await auth.api.sendPhoneNumberOTP({
      body: { phoneNumber },
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

  logger.info(
    { email, type, tokenLength: turnstileToken?.length ?? 0 },
    "Received email OTP request"
  );

  // Verify Turnstile token first
  const verification = await verifyTurnstileToken(turnstileToken);

  if (!verification.success) {
    return {
      success: false,
      error: verification.error ?? "人机验证失败，请刷新页面重试",
    };
  }

  try {
    // Turnstile verification passed, now send OTP
    // Note: We skip Turnstile check in auth.ts by not passing the token
    await auth.api.sendVerificationOTP({
      body: {
        email,
        type,
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

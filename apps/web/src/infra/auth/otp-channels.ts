import "server-only";

import { getFeatureToggles, getParsedEnv } from "@/config/env";
import { sendEmailOtp, sendSmsOtp } from "@/infra/communications";
import { logger } from "@/infra/logging";

export function shouldEnableAliyunSms(): boolean {
  const { sms } = getFeatureToggles();
  return sms;
}

export function shouldEnableResend(): boolean {
  const { email } = getFeatureToggles();
  return email;
}

export async function sendAuthPhoneOtp(
  phoneNumber: string,
  code: string
): Promise<void> {
  const useAliyunSms = shouldEnableAliyunSms();

  if (!useAliyunSms) {
    logger.info(`[SMS SIMULATION] Sending OTP to ${phoneNumber}`);
    const env = getParsedEnv();
    logger.info(
      `[SMS SIMULATION] Environment: ${env.NODE_ENV}, ENABLE_ALIYUN_SMS: ${env.ENABLE_ALIYUN_SMS as unknown as string}`
    );
    return;
  }

  try {
    const success = await sendSmsOtp(phoneNumber, code);
    if (!success) {
      throw new Error("Failed to send SMS");
    }
  } catch (error) {
    logger.error({ err: error }, "Failed to send SMS OTP");
    throw new Error("Failed to send SMS");
  }

  logger.info(`OTP sent successfully to ${phoneNumber} via Aliyun SMS`);
}

export async function sendAuthEmailOtp(
  email: string,
  otp: string,
  type: string
): Promise<void> {
  const useResend = shouldEnableResend();

  if (!useResend) {
    logger.info(`[EMAIL SIMULATION] Sending OTP to ${email} (type: ${type})`);
    const env = getParsedEnv();
    logger.info(
      `[EMAIL SIMULATION] Environment: ${env.NODE_ENV}, ENABLE_RESEND: ${env.ENABLE_RESEND as unknown as string}`
    );
    return;
  }

  try {
    const success = await sendEmailOtp(email, otp);
    if (!success) {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    logger.error({ err: error }, "Failed to send Email OTP");
    throw new Error("Failed to send email");
  }

  logger.info(`OTP sent successfully to ${email} via Resend`);
}

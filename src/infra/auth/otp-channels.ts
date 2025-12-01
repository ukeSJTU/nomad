import { getEnv, getFeatures } from "@/config/env";
import { sendEmailOtp, sendSmsOtp } from "@/infra/communications";
import { logger } from "@/infra/logging";

export function shouldEnableAliyunSms(): boolean {
  return getFeatures().sms;
}

export function shouldEnableResend(): boolean {
  return getFeatures().email;
}

export async function sendAuthPhoneOtp(
  phoneNumber: string,
  code: string
): Promise<void> {
  const useAliyunSms = shouldEnableAliyunSms();

  if (!useAliyunSms) {
    const env = getEnv();

    logger.info(`[SMS SIMULATION] Sending OTP to ${phoneNumber}`);
    logger.info(
      `[SMS SIMULATION] Environment: ${env.NODE_ENV}, ENABLE_ALIYUN_SMS: ${env.ENABLE_ALIYUN_SMS}`
    );
    return;
  }

  const success = await sendSmsOtp(phoneNumber, code);

  if (!success) {
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
    const env = getEnv();

    logger.info(`[EMAIL SIMULATION] Sending OTP to ${email} (type: ${type})`);
    logger.info(
      `[EMAIL SIMULATION] Environment: ${env.NODE_ENV}, ENABLE_RESEND: ${env.ENABLE_RESEND}`
    );
    return;
  }

  const success = await sendEmailOtp(email, otp);

  if (!success) {
    throw new Error("Failed to send email");
  }

  logger.info(`OTP sent successfully to ${email} via Resend`);
}

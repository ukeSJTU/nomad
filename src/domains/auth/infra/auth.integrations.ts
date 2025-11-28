import { isProduction } from "@/config/env";
import { sendSmsOtp } from "@/integrations/aliyun-sms/client";
import { sendEmailOtp } from "@/integrations/resend/client";
import logger from "@/lib/server/logger";

export function shouldEnableAliyunSms(): boolean {
  const enableSms = process.env.ENABLE_ALIYUN_SMS?.toLowerCase();

  if (enableSms === "enabled" || enableSms === "true") {
    return true;
  }

  if (enableSms === "disabled" || enableSms === "false") {
    return false;
  }

  return isProduction();
}

export function shouldEnableResend(): boolean {
  const enableEmail = process.env.ENABLE_RESEND?.toLowerCase();

  if (enableEmail === "enabled" || enableEmail === "true") {
    return true;
  }

  if (enableEmail === "disabled" || enableEmail === "false") {
    return false;
  }

  return isProduction();
}

export async function sendAuthPhoneOtp(
  phoneNumber: string,
  code: string
): Promise<void> {
  const useAliyunSms = shouldEnableAliyunSms();

  if (!useAliyunSms) {
    logger.info(`[SMS SIMULATION] Sending OTP to ${phoneNumber}`);
    logger.info(
      `[SMS SIMULATION] Environment: ${process.env.NODE_ENV}, ENABLE_ALIYUN_SMS: ${process.env.ENABLE_ALIYUN_SMS}`
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
    logger.info(`[EMAIL SIMULATION] Sending OTP to ${email} (type: ${type})`);
    logger.info(
      `[EMAIL SIMULATION] Environment: ${process.env.NODE_ENV}, ENABLE_RESEND: ${process.env.ENABLE_RESEND}`
    );
    return;
  }

  const success = await sendEmailOtp(email, otp);

  if (!success) {
    throw new Error("Failed to send email");
  }

  logger.info(`OTP sent successfully to ${email} via Resend`);
}

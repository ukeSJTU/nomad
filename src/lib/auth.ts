import { faker } from "@faker-js/faker";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP, phoneNumber } from "better-auth/plugins";

import { db } from "@/lib/db";
import { sendEmailOtp } from "@/lib/email";
import { sendSmsOtp } from "@/lib/sms";
import { verifyTurnstileToken } from "@/lib/turnstile";
import logger from "@/utils/logger";

/**
 * Determine whether Aliyun SMS service should be enabled
 * @returns boolean
 */
export function shouldEnableAliyunSms(): boolean {
  const enableSms = process.env.ENABLE_ALIYUN_SMS?.toLowerCase();
  const isProduction = process.env.NODE_ENV === "production";

  // If explicitly set to enable
  if (enableSms === "enabled" || enableSms === "true") {
    return true;
  }

  // If explicitly set to disable
  if (enableSms === "disabled" || enableSms === "false") {
    return false;
  }

  // Default logic: enable in production, disable in development
  return isProduction;
}

/**
 * Determine whether Resend email service should be enabled
 * @returns boolean
 */
export function shouldEnableResend(): boolean {
  const enableEmail = process.env.ENABLE_RESEND?.toLowerCase();
  const isProduction = process.env.NODE_ENV === "production";

  // If explicitly set to enable
  if (enableEmail === "enabled" || enableEmail === "true") {
    return true;
  }

  // If explicitly set to disable
  if (enableEmail === "disabled" || enableEmail === "false") {
    return false;
  }

  // Default logic: enable in production, disable in development
  return isProduction;
}

function getClientIp(request?: Request): string | undefined {
  if (!request) {
    return undefined;
  }

  const forwarded =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for");

  if (!forwarded) {
    return undefined;
  }

  return forwarded.split(",")[0]?.trim();
}

async function ensureTurnstileVerified(request?: Request) {
  const token =
    request?.headers.get("x-turnstile-token") ??
    request?.headers.get("cf-turnstile-response");

  const verificationResult = await verifyTurnstileToken(
    token,
    getClientIp(request)
  );

  if (!verificationResult.success) {
    logger.warn(
      {
        errorCodes: verificationResult.errorCodes,
      },
      "Turnstile verification failed for OTP request"
    );
    throw new Error(
      verificationResult.error ?? "人机验证失败，请刷新页面后重试"
    );
  }
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }, request) => {
        const useAliyunSms = shouldEnableAliyunSms();

        await ensureTurnstileVerified(request);

        if (useAliyunSms) {
          try {
            // Use Aliyun SMS service to send OTP
            const success = await sendSmsOtp(phoneNumber, code);

            if (success) {
              logger.info(
                `OTP sent successfully to ${phoneNumber} via Aliyun SMS`
              );
            } else {
              logger.error(
                `Failed to send OTP to ${phoneNumber} via Aliyun SMS`
              );
              throw new Error("Failed to send SMS");
            }
          } catch (error) {
            logger.error({ error }, "Error sending OTP via Aliyun SMS");
            throw error;
          }
        } else {
          // Use console.log simulation (development environment or explicitly disabled)
          const simulationMessage = `[SMS SIMULATION] Sending OTP to ${phoneNumber}`;
          const environmentMessage = `[SMS SIMULATION] Environment: ${process.env.NODE_ENV}, ENABLE_ALIYUN_SMS: ${process.env.ENABLE_ALIYUN_SMS}`;

          logger.info(simulationMessage);
          logger.info(environmentMessage);

          // Simulate successful sending
          return Promise.resolve();
        }
      },
      // Allow users to sign up using their phone number
      signUpOnVerification: {
        getTempEmail: phoneNumber => {
          return `${phoneNumber}@nomad.com`;
        },
        // Use faker to generate random temporary name with last four digits
        getTempName: phoneNumber => {
          const lastFour = phoneNumber.slice(-4);
          return `${faker.person.firstName()}${lastFour}`;
        },
      },
    }),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }, request) {
        const useResend = shouldEnableResend();

        await ensureTurnstileVerified(request);

        if (useResend) {
          try {
            // Use Resend service to send OTP
            const success = await sendEmailOtp(email, otp);

            if (success) {
              logger.info(`OTP sent successfully to ${email} via Resend`);
            } else {
              logger.error(`Failed to send OTP to ${email} via Resend`);
              throw new Error("Failed to send email");
            }
          } catch (error) {
            logger.error({ error }, "Error sending OTP via Resend");
            throw error;
          }
        } else {
          // Use console.log simulation (development environment or explicitly disabled)
          const simulationMessage = `[EMAIL SIMULATION] Sending OTP to ${email} (type: ${type})`;
          const environmentMessage = `[EMAIL SIMULATION] Environment: ${process.env.NODE_ENV}, ENABLE_RESEND: ${process.env.ENABLE_RESEND}`;

          logger.info(simulationMessage);
          logger.info(environmentMessage);

          // Simulate successful sending
          return Promise.resolve();
        }
      },
    }),
  ],
  logger: {
    disabled: false,
    disableColors: false,
    level: "debug",
    log: (level, message, ...args) => {
      // Custom logging implementation
      console.log(`[${level}] ${message}`, ...args);
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});

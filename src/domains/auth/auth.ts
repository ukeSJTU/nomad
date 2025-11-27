import { faker } from "@faker-js/faker";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { captcha, emailOTP, phoneNumber } from "better-auth/plugins";

import { isProduction } from "@/config/env";
import { db } from "@/db";
import { sendSmsOtp } from "@/integrations/aliyun-sms/client";
import { sendEmailOtp } from "@/integrations/resend/client";
import {
  getTurnstileSecretKey,
  TURNSTILE_PROTECTED_ENDPOINTS,
} from "@/integrations/turnstile/client";
import logger from "@/lib/server/logger";

/**
 * Determine whether Aliyun SMS service should be enabled
 * @returns boolean
 */
export function shouldEnableAliyunSms(): boolean {
  const enableSms = process.env.ENABLE_ALIYUN_SMS?.toLowerCase();

  // If explicitly set to enable
  if (enableSms === "enabled" || enableSms === "true") {
    return true;
  }

  // If explicitly set to disable
  if (enableSms === "disabled" || enableSms === "false") {
    return false;
  }

  // Default logic: enable in production, disable in development
  return isProduction();
}

/**
 * Determine whether Resend email service should be enabled
 * @returns boolean
 */
export function shouldEnableResend(): boolean {
  const enableEmail = process.env.ENABLE_RESEND?.toLowerCase();

  // If explicitly set to enable
  if (enableEmail === "enabled" || enableEmail === "true") {
    return true;
  }

  // If explicitly set to disable
  if (enableEmail === "disabled" || enableEmail === "false") {
    return false;
  }

  // Default logic: enable in production, disable in development
  return isProduction();
}

const turnstileSecretKey = getTurnstileSecretKey();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    captcha({
      provider: "cloudflare-turnstile",
      secretKey: turnstileSecretKey,
      endpoints: Array.from(TURNSTILE_PROTECTED_ENDPOINTS),
    }),
    phoneNumber({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      sendOTP: async ({ phoneNumber, code }, request) => {
        const useAliyunSms = shouldEnableAliyunSms();

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
      async sendVerificationOTP({ email, otp, type }) {
        const useResend = shouldEnableResend();

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
    // IMPORTANT: nextCookies must be the last plugin in the array
    // It ensures that Set-Cookie headers from auth API calls in Server Actions
    // are properly forwarded to the client
    nextCookies(),
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
  rateLimit: {
    storage: "database",
    modelName: "rateLimit",
  },
});

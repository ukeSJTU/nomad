import { faker } from "@faker-js/faker";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { phoneNumber } from "better-auth/plugins";

import { db } from "@/lib/db";
import { sendSmsOtp } from "@/lib/sms";
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

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
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
                `OTP code ${code} sent successfully to ${phoneNumber} via Aliyun SMS`
              );
              console.log(
                `OTP code ${code} sent successfully to ${phoneNumber} via Aliyun SMS`
              );
            } else {
              logger.error(
                `Failed to send OTP code ${code} to ${phoneNumber} via Aliyun SMS`
              );
              console.error(
                `Failed to send OTP code ${code} to ${phoneNumber} via Aliyun SMS`
              );
              throw new Error("Failed to send SMS");
            }
          } catch (error) {
            logger.error({ error }, "Error sending OTP via Aliyun SMS");
            console.error("Error sending OTP via Aliyun SMS:", error);
            throw error;
          }
        } else {
          // Use console.log simulation (development environment or explicitly disabled)
          const simulationMessage = `[SMS SIMULATION] Sending OTP code ${code} to ${phoneNumber}`;
          const environmentMessage = `[SMS SIMULATION] Environment: ${process.env.NODE_ENV}, ENABLE_ALIYUN_SMS: ${process.env.ENABLE_ALIYUN_SMS}`;

          logger.info(simulationMessage);
          logger.info(environmentMessage);
          console.log(simulationMessage);
          console.log(environmentMessage);

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
});

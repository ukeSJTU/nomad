import { faker } from "@faker-js/faker";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { phoneNumber } from "better-auth/plugins";

import { db } from "@/lib/db";
import logger from "@/utils/logger";

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
      sendOTP: ({ phoneNumber, code }, request) => {
        // TODO: implement actual sending OTP code via SMS
        // Using logger in development for now
        logger.info(`Sending OTP code: ${code} to ${phoneNumber}`);
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

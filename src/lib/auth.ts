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
        //optionally, you can also pass `getTempName` function to generate a temporary name for the user
        getTempName: phoneNumber => {
          return phoneNumber; //by default, it will use the phone number as the name
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

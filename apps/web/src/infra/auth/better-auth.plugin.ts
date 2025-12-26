import "server-only";

import { faker } from "@faker-js/faker";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { captcha, emailOTP, phoneNumber } from "better-auth/plugins";

import { getParsedEnv } from "@/config/env";
import { db } from "@/db";
import { logger } from "@/infra/logging";

import { sendAuthEmailOtp, sendAuthPhoneOtp } from "./otp-channels";

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
      secretKey: getParsedEnv().TURNSTILE_SECRET_KEY ?? "",
      endpoints: ["/phone-number/send-otp", "/email-otp/send-verification-otp"],
    }),
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }) => {
        await sendAuthPhoneOtp(phoneNumber, code);
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
        await sendAuthEmailOtp(email, otp, type);
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
    log: (level: string, message, ...args) => {
      if (level === "error") return logger.error(message, ...args);
      if (level === "warn") return logger.warn(message, ...args);
      if (level === "debug") return logger.debug(message, ...args);
      if (level === "trace") return logger.trace(message, ...args);
      if (level === "fatal") return logger.fatal(message, ...args);
      return logger.info(message, ...args);
    },
  },
  socialProviders: (() => {
    const env = getParsedEnv();
    return env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
          },
        }
      : {};
  })(),
  rateLimit: {
    storage: "database",
    modelName: "rateLimit",
  },
});

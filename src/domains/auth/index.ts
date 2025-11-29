import { emailOTPClient, phoneNumberClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [phoneNumberClient(), emailOTPClient()],
});

export const { signIn, signUp, useSession } = authClient;

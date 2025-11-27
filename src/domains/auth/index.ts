import { authClient } from "@/domains/auth/client";

export const { signIn, signUp, useSession } = authClient;

export { auth } from "./auth";

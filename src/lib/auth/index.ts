import { authClient } from "@/lib/auth/client";

export const { signIn, signUp, useSession } = authClient;

export { auth } from "./auth";

import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/infra/auth";

// Force dynamic rendering to prevent build-time evaluation
export const dynamic = "force-dynamic";

export const { POST, GET } = toNextJsHandler(auth);

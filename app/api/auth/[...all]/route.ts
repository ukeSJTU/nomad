import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/domains/auth";

export const { POST, GET } = toNextJsHandler(auth);

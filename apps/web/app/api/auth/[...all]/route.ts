import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/infra/auth";

export const { POST, GET } = toNextJsHandler(auth);

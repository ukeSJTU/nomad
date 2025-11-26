import { desc, eq, type InferSelectModel } from "drizzle-orm";

import { db } from "@/db";
import { user, verification } from "@/db/schema";
import { auth } from "@/domains/auth";
import type { ServiceResult } from "@/domains/types";

export type DevUser = InferSelectModel<typeof user>;

export async function listDevUsers(): Promise<ServiceResult<DevUser[]>> {
  if (process.env.NODE_ENV !== "development") {
    return { success: false, error: "Not available" };
  }

  try {
    const users = await db.select().from(user).orderBy(desc(user.createdAt));
    return { success: true, data: users };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}

export async function switchUser(params: {
  userId: string;
  headers: HeadersInit;
}): Promise<ServiceResult> {
  if (process.env.NODE_ENV !== "development") {
    return { success: false, error: "Not available in production" };
  }

  try {
    const [targetUser] = await db
      .select({ email: user.email })
      .from(user)
      .where(eq(user.id, params.userId))
      .limit(1);

    if (!targetUser) {
      return { success: false, error: "User not found" };
    }

    const email = targetUser.email;

    await auth.api.sendVerificationOTP({
      body: {
        email,
        type: "sign-in",
      },
      headers: params.headers,
    });

    await new Promise(resolve => setTimeout(resolve, 100));

    const verificationRecord = await db
      .select()
      .from(verification)
      .where(eq(verification.identifier, `sign-in-otp-${email}`))
      .orderBy(desc(verification.createdAt))
      .limit(1);

    if (!verificationRecord || verificationRecord.length === 0) {
      return { success: false, error: "Verification code not found" };
    }

    const otp = verificationRecord[0].value.split(":")[0];

    const signInResult = await auth.api.signInEmailOTP({
      body: {
        email,
        otp,
      },
      headers: params.headers,
    });

    if (!signInResult) {
      return { success: false, error: "Failed to sign in with OTP" };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to switch user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to switch user",
    };
  }
}

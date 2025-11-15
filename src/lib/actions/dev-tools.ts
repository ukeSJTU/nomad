"use server";

import { desc, eq, type InferSelectModel } from "drizzle-orm";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";

import { db } from "@/lib/db";
import { session, user } from "@/lib/schema";

// ============================================================================
// Types - Using schema native types
// ============================================================================

type User = InferSelectModel<typeof user>;

export type DevUserListResult =
  | { success: true; users: User[] }
  | { success: false; error: string };

export type SwitchUserResult =
  | { success: true }
  | { success: false; error: string };

// ============================================================================
// Server Actions
// ============================================================================

/**
 * Get all users (dev only)
 */
export async function getAllUsersForDevAction(): Promise<DevUserListResult> {
  if (process.env.NODE_ENV !== "development") {
    return { success: false, error: "Not available" };
  }

  try {
    const users = await db.select().from(user).orderBy(desc(user.createdAt));
    return { success: true, users };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}

/**
 * Switch to specified user (dev only)
 */
export async function switchUserAction(
  userId: string
): Promise<SwitchUserResult> {
  if (process.env.NODE_ENV !== "development") {
    return { success: false, error: "Not available" };
  }

  try {
    // Verify user exists
    const [targetUser] = await db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (!targetUser) {
      return { success: false, error: "User not found" };
    }

    // Create session
    const sessionToken = nanoid(32);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await db.insert(session).values({
      id: nanoid(32),
      userId: targetUser.id,
      token: sessionToken,
      expiresAt,
      ipAddress: "127.0.0.1",
      userAgent: "DevUserSwitcher",
    });

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("better-auth.session_token", sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to switch user:", error);
    return { success: false, error: "Failed to switch user" };
  }
}

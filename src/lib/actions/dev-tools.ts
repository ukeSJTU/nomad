"use server";

import { desc, type InferSelectModel } from "drizzle-orm";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";

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
 * Uses Better Auth's impersonateUser API internally
 */
export async function switchUserAction(
  userId: string
): Promise<SwitchUserResult> {
  if (process.env.NODE_ENV !== "development") {
    return { success: false, error: "Not available in production" };
  }

  try {
    // Use Better Auth's impersonateUser API from server side
    // This bypasses the client-side admin permission check
    const result = await auth.api.impersonateUser({
      body: { userId },
      headers: await headers(),
    });

    if (!result) {
      return { success: false, error: "Failed to impersonate user" };
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

"use server";

import { desc, type InferSelectModel } from "drizzle-orm";

import { db } from "@/lib/db";
import { user } from "@/lib/schema";

// ============================================================================
// Types - Using schema native types
// ============================================================================

type User = InferSelectModel<typeof user>;

export type DevUserListResult =
  | { success: true; users: User[] }
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

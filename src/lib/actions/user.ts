"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { updateUserInfo } from "@/lib/services/user";
import { userInfoUpdateSchema } from "@/types/user";

/**
 * Server action to update user profile information
 *
 * This is a thin controller that:
 * 1. Handles authentication (Next.js specific)
 * 2. Validates input data
 * 3. Calls the service layer for business logic
 * 4. Formats the response
 *
 * All fields are optional - only provided fields will be updated
 *
 * @param formData - User info data to update
 * @returns Result object with success status and message/error
 */
export async function updateUserInfoAction(formData: unknown) {
  try {
    // 1. Verify authentication (framework-specific)
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Authentication required. Please log in first.",
      };
    }

    // 2. Validate input data
    const validation = userInfoUpdateSchema.safeParse(formData);

    if (!validation.success) {
      return {
        success: false,
        error: "Invalid input data",
        fieldErrors: validation.error.flatten().fieldErrors,
      };
    }

    // 3. Call service layer for business logic
    const result = await updateUserInfo(session.user.id, validation.data);

    // 4. Return the result
    return result;
  } catch (error) {
    console.error("Failed to update user info:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update user information",
    };
  }
}

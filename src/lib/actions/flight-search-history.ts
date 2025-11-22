"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { clearFlightSearchHistory, recordFlightSearch } from "@/lib/services";
import type { RecordFlightSearchData } from "@/types/validations";
import logger from "@/utils/logger";

/**
 * Server Actions for Flight Search History Management (Thin Controller Layer)
 *
 * These actions serve as thin controllers that:
 * 1. Handle authentication (Next.js specific)
 * 2. Call service layer for business logic
 * 3. Format responses
 *
 * All business logic is in the service layer (src/lib/services/flight-search-history.ts)
 * which can be tested independently without mocking Next.js runtime.
 */

/**
 * Server action to record user's flight search history
 *
 * This is a thin controller that:
 * 1. Verifies authentication (silently returns for unauthenticated users)
 * 2. Calls service layer
 * 3. Returns void (silently succeeds or fails)
 *
 * Note: This action intentionally does not throw errors or return error responses,
 * as recording search history should never break the user's search flow.
 *
 * @param data - Search parameters to record
 */
export async function recordSearchHistoryAction(
  data: RecordFlightSearchData
): Promise<void> {
  logger.debug(`Recording search history action: ${JSON.stringify(data)}`);

  try {
    // 1. Verify authentication
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });

    if (!session?.user?.id) {
      // User not logged in - silently return without recording
      logger.debug("Search history not recorded as user is not logged in");
      return;
    }

    // 2. Call service layer
    await recordFlightSearch(session.user.id, data);
  } catch (error) {
    // Silently fail - recording history should not break the search flow
    logger.error({ err: error }, "Record search history action error");
  }
}

/**
 * Server action to clear all search history for the current user
 *
 * This is a thin controller that:
 * 1. Verifies authentication
 * 2. Calls service layer
 * 3. Returns formatted response
 *
 * @returns Result object with success status and message
 */
export async function clearSearchHistoryAction(): Promise<{
  success: boolean;
  message: string;
}> {
  logger.debug("Clearing search history action");

  try {
    // 1. Verify authentication
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });

    if (!session?.user?.id) {
      return {
        success: false,
        message: "用户未登录",
      };
    }

    // 2. Call service layer
    const result = await clearFlightSearchHistory(session.user.id);

    // 3. Return result
    return {
      success: result.success,
      message: result.message || result.error || "未知错误",
    };
  } catch (error) {
    logger.error({ err: error }, "Clear search history action error");
    return {
      success: false,
      message: "清空搜索历史失败，请稍后重试",
    };
  }
}

/**
 * E2E Authentication Helpers
 *
 * These helpers provide utilities for E2E tests using the REAL test database.
 * They follow the AAA (Arrange-Act-Assert) pattern, similar to integration tests.
 *
 * Key principle: Use factories + test ID prefix for data preparation (Arrange),
 * not custom createTestXXX functions.
 */

import { Page } from "@playwright/test";

import { db } from "@/lib/db";
import { session } from "@/lib/schema";

/**
 * Clear all cookies from the browser context.
 * Use this in beforeEach to ensure tests start in an unauthenticated state.
 *
 * @param page - Playwright page object
 */
export async function clearAllCookies(page: Page): Promise<void> {
  await page.context().clearCookies();
}

/**
 * Create a session for a user in the database
 * This allows E2E tests to start with an authenticated state
 *
 * Usage:
 * ```typescript
 * // Arrange: Create user using factory
 * const testUser = userFactory.build({
 *   email: getTestEmail(testId),
 *   phone: getTestPhone(testId),
 * });
 * await db.insert(user).values(testUser);
 *
 * // Create session for the user
 * const testSession = await createTestSession(testUser.id);
 * await setSessionCookie(page, testSession.token);
 * ```
 *
 * @param userId - User ID to create session for
 * @returns Created session object
 */
export async function createTestSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
  const token = `test-session-${userId}-${Date.now()}`;
  const id = `session-${userId}-${Date.now()}`;

  const [createdSession] = await db
    .insert(session)
    .values({
      id,
      userId,
      expiresAt,
      token,
      ipAddress: "127.0.0.1",
      userAgent: "Playwright E2E Test",
    })
    .returning();

  return createdSession;
}

/**
 * Set a session cookie in the browser
 * This authenticates the user for E2E tests
 *
 * @param page - Playwright page object
 * @param sessionToken - Session token from database
 */
export async function setSessionCookie(
  page: Page,
  sessionToken: string
): Promise<void> {
  await page.context().addCookies([
    {
      name: "better-auth.session_token",
      value: sessionToken,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      expires: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
    },
  ]);
}

/**
 * Mock external services that E2E tests shouldn't actually call
 * - Turnstile CAPTCHA
 * - SMS service (Aliyun)
 * - Email service
 * - OAuth providers (GitHub, Google)
 *
 * Note: SMS and Email are already disabled in .env.test (ENABLE_ALIYUN_SMS=false)
 *
 * @param page - Playwright page object
 */
export async function mockExternalServices(page: Page): Promise<void> {
  // Mock Turnstile CAPTCHA
  await page.addInitScript(() => {
    window.turnstile = {
      render: (_container: HTMLElement, options: any) => {
        const widgetId = "mock-widget-id";
        setTimeout(() => {
          options.callback?.("mock-captcha-token");
        }, 100);
        return widgetId;
      },
      reset: () => {},
      remove: () => {},
    };
  });
}

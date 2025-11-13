import { Page } from "@playwright/test";

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
 * Set a session cookie to simulate an authenticated user.
 * This is required for middleware authentication checks.
 *
 * @param page - Playwright page object
 * @param sessionToken - Optional custom session token (defaults to a mock token)
 */
export async function setSessionCookie(
  page: Page,
  sessionToken: string = "mock-session-token-for-e2e-tests"
): Promise<void> {
  // Set the Better Auth session cookie
  // Cookie name: better-auth.session_token (default from Better Auth)
  await page.context().addCookies([
    {
      name: "better-auth.session_token",
      value: sessionToken,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      // Set expiry to 1 hour from now
      expires: Math.floor(Date.now() / 1000) + 3600,
    },
  ]);
}

/**
 * Mock an authenticated user by:
 * 1. Setting the session cookie (for middleware checks)
 * 2. Mocking the /api/auth/get-session API endpoint (for Server Component checks)
 *
 * This provides a complete authenticated state for E2E tests.
 *
 * @param page - Playwright page object
 * @param userData - Optional custom user data to return from the session API
 */
export async function mockAuthenticatedUser(
  page: Page,
  userData?: {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
  }
): Promise<void> {
  // Step 1: Set session cookie for middleware authentication
  await setSessionCookie(page);

  // Step 2: Mock the session API endpoint for Server Component authentication
  const defaultUserData = {
    id: "test-user-id",
    name: "Test User",
    email: "test@example.com",
    image: null,
    emailVerified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await page.route("**/api/auth/get-session", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        session: {
          id: "test-session-id",
          userId: userData?.id || defaultUserData.id,
          expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
          token: "mock-session-token-for-e2e-tests",
          ipAddress: "127.0.0.1",
          userAgent: "Playwright Test",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        user: {
          ...defaultUserData,
          ...userData,
        },
      }),
    });
  });
}

/**
 * Mock an unauthenticated user by:
 * 1. Clearing all cookies
 * 2. Mocking the /api/auth/get-session API endpoint to return null
 *
 * This ensures tests start in a clean, unauthenticated state.
 *
 * @param page - Playwright page object
 */
export async function mockUnauthenticatedUser(page: Page): Promise<void> {
  // Step 1: Clear all cookies
  await clearAllCookies(page);

  // Step 2: Mock the session API endpoint to return null
  await page.route("**/api/auth/get-session", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        session: null,
        user: null,
      }),
    });
  });
}

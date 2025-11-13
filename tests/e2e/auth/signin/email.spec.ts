import { expect, type Page, test } from "@playwright/test";

import { clearAllCookies } from "../../../helpers/auth-helpers";

/**
 * Helper function to mock better-auth API endpoints for email sign-in testing
 * This allows tests to bypass actual authentication and OTP sending
 */
async function mockBetterAuthApis(page: Page) {
  // Mock the email sign-in endpoint to return success
  await page.route("**/api/auth/sign-in/email", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        error: null,
        user: { id: "test-user-id", email: "test@example.com" },
      }),
    });
  });

  // Mock the send email OTP endpoint to return success
  await page.route(
    "**/api/auth/email-otp/send-verification-otp",
    async route => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ error: null }),
      });
    }
  );

  // Mock the email OTP sign-in endpoint to return success
  await page.route("**/api/auth/sign-in/email-otp", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        error: null,
        user: { id: "test-user-id", email: "test@example.com" },
      }),
    });
  });
}

/**
 * Test suite for email-based sign-in flow
 * Tests both password and OTP login methods
 */
test.describe("Email Sign-In Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Clear all cookies to ensure tests start in unauthenticated state
    await clearAllCookies(page);
    // Set up API mocks before each test
    await mockBetterAuthApis(page);
  });

  /**
   * Test email + password login flow
   * Verifies that users can sign in with email and password
   */
  test("should allow user to sign in with email and password", async ({
    page,
  }) => {
    // Navigate to sign-in page
    await page.goto("/auth/sign-in");

    // Wait for page to load
    await expect(page.locator("h1")).toContainText("账号密码登录");

    // Switch to email login method
    await page.getByRole("tab", { name: "邮箱登录" }).click();

    // Verify we're on the password tab (default)
    await expect(page.getByRole("tab", { name: "密码登录" })).toHaveAttribute(
      "data-state",
      "active"
    );

    // Fill in email
    await page.getByPlaceholder("请输入邮箱地址").fill("test@example.com");

    // Fill in password
    await page.getByPlaceholder("请输入密码").fill("TestPassword123");

    // Agree to terms
    await page.getByRole("checkbox").check();

    // Click login button
    await page.getByRole("button", { name: "登录" }).click();

    // Wait for navigation to home page
    await page.waitForURL("/");

    // Verify we're on the home page
    expect(page.url()).toContain("/");
  });

  /**
   * Test email + OTP login flow
   * Verifies that users can sign in with email and OTP
   */
  test("should allow user to sign in with email and OTP", async ({ page }) => {
    // Navigate to sign-in page
    await page.goto("/auth/sign-in");

    // Wait for page to load
    await expect(page.locator("h1")).toContainText("账号密码登录");

    // Switch to email login method
    await page.getByRole("tab", { name: "邮箱登录" }).click();

    // Switch to OTP login tab (use testid to avoid ambiguity with phone OTP tab)
    await page.getByTestId("email-otp-tab").click();

    // Verify we're on the OTP tab
    await expect(page.getByTestId("email-otp-tab")).toHaveAttribute(
      "data-state",
      "active"
    );

    // Fill in email
    await page.getByPlaceholder("请输入邮箱地址").fill("test@example.com");

    // Click send OTP button
    await page.getByRole("button", { name: "发送验证码" }).click();

    // Wait for countdown to start
    await expect(page.getByRole("button", { name: /\d+s/ })).toBeVisible();

    // Fill in OTP
    await page.getByPlaceholder("6位数字").fill("123456");

    // Agree to terms
    await page.getByRole("checkbox").check();

    // Click login button
    await page.getByRole("button", { name: "登录" }).click();

    // Wait for navigation to home page
    await page.waitForURL("/");

    // Verify we're on the home page
    expect(page.url()).toContain("/");
  });

  /**
   * Test form validation for email login
   * Verifies that proper validation messages are shown
   */
  test("should show validation errors for invalid email", async ({ page }) => {
    // Navigate to sign-in page
    await page.goto("/auth/sign-in");

    // Switch to email login method
    await page.getByRole("tab", { name: "邮箱登录" }).click();

    // Try to submit without filling in email
    await page.getByRole("button", { name: "登录" }).click();

    // Should show validation error for email
    await expect(page.getByText("请输入邮箱地址")).toBeVisible();

    // Fill in invalid email
    await page.getByPlaceholder("请输入邮箱地址").fill("invalid-email");

    // Try to submit
    await page.getByRole("button", { name: "登录" }).click();

    // Should show validation error for invalid email format
    await expect(page.getByText("请输入有效的邮箱地址")).toBeVisible();
  });

  /**
   * Test that terms checkbox is required
   * Verifies that users must agree to terms before signing in
   */
  test("should require terms agreement for email login", async ({ page }) => {
    // Navigate to sign-in page
    await page.goto("/auth/sign-in");

    // Switch to email login method
    await page.getByRole("tab", { name: "邮箱登录" }).click();

    // Fill in valid email and password
    await page.getByPlaceholder("请输入邮箱地址").fill("test@example.com");
    await page.getByPlaceholder("请输入密码").fill("TestPassword123");

    // Try to submit without agreeing to terms
    await page.getByRole("button", { name: "登录" }).click();

    // Should show validation error for terms
    await expect(page.getByText("请同意服务协议和隐私政策")).toBeVisible();
  });

  /**
   * Test switching between phone and email login methods
   * Verifies that the UI correctly switches between methods
   */
  test("should allow switching between phone and email login methods", async ({
    page,
  }) => {
    // Navigate to sign-in page
    await page.goto("/auth/sign-in");

    // Verify we start on phone login (default)
    await expect(page.getByRole("tab", { name: "手机号登录" })).toHaveAttribute(
      "data-state",
      "active"
    );

    // Should see phone number input
    await expect(page.getByPlaceholder("请输入手机号")).toBeVisible();

    // Switch to email login
    await page.getByRole("tab", { name: "邮箱登录" }).click();

    // Verify we're on email login
    await expect(page.getByRole("tab", { name: "邮箱登录" })).toHaveAttribute(
      "data-state",
      "active"
    );

    // Should see email input
    await expect(page.getByPlaceholder("请输入邮箱地址")).toBeVisible();

    // Switch back to phone login
    await page.getByRole("tab", { name: "手机号登录" }).click();

    // Should see phone number input again
    await expect(page.getByPlaceholder("请输入手机号")).toBeVisible();
  });

  /**
   * Test OTP countdown timer for email
   * Verifies that the countdown timer works correctly
   */
  test("should show countdown timer after sending email OTP", async ({
    page,
  }) => {
    // Navigate to sign-in page
    await page.goto("/auth/sign-in");

    // Switch to email login method
    await page.getByRole("tab", { name: "邮箱登录" }).click();

    // Switch to OTP login tab (use testid to avoid ambiguity with phone OTP tab)
    await page.getByTestId("email-otp-tab").click();

    // Fill in email
    await page.getByPlaceholder("请输入邮箱地址").fill("test@example.com");

    // Click send OTP button
    await page.getByRole("button", { name: "发送验证码" }).click();

    // Wait for countdown to start
    await expect(page.getByRole("button", { name: /\d+s/ })).toBeVisible();

    // Verify button is disabled during countdown
    await expect(page.getByRole("button", { name: /\d+s/ })).toBeDisabled();
  });
});

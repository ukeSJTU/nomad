import { expect, type Page, test } from "@playwright/test";

import {
  clearAllCookies,
  mockTurnstileCaptcha,
} from "../../../helpers/auth-helpers";

/**
 * Helper function to mock better-auth API endpoints for email sign-up testing
 * This allows tests to bypass actual email OTP sending and verification
 */
async function mockBetterAuthApis(page: Page) {
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
  // This is the critical mock that allows advancing to step 2
  await page.route("**/api/auth/sign-in/email-otp", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ error: null }),
    });
  });
}

/**
 * Test suite for email-based sign-up flow
 * Tests the complete registration process including:
 * - User agreement modal
 * - Email verification
 * - Password setup
 */
test.describe("Email Sign-Up Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Clear all cookies to ensure tests start in unauthenticated state
    await clearAllCookies(page);
    // Mock Turnstile CAPTCHA
    await mockTurnstileCaptcha(page);
  });

  /**
   * Test suite for user agreement modal functionality
   * The modal should be displayed on page load and handle user interactions correctly
   */
  test.describe("User Agreement Modal", () => {
    test("should display agreement modal on page load", async ({ page }) => {
      // Navigate to sign-up page
      await page.goto("/auth/sign-up");

      // Wait for the modal to be visible
      const modal = page.getByRole("dialog");
      await expect(modal).toBeVisible();

      // Verify modal content - check for service agreement text within the modal
      await expect(modal.getByText("服务协议")).toBeVisible();
      await expect(modal.getByText("个人信息保护政策")).toBeVisible();
    });

    test("should close modal and proceed to registration after clicking agree", async ({
      page,
    }) => {
      // Navigate to sign-up page
      await page.goto("/auth/sign-up");

      // Wait for modal to be visible
      const modal = page.getByRole("dialog");
      await expect(modal).toBeVisible();

      // Click the agree button
      const agreeButton = page.getByRole("button", { name: "同意并继续" });
      await agreeButton.click();

      // Modal should be closed
      await expect(modal).not.toBeVisible();

      // Should show the registration form with tabs
      // Verify the page header is visible
      await expect(page.getByText("注册账户")).toBeVisible();

      // Verify tabs are visible
      await expect(page.getByRole("tab", { name: "手机注册" })).toBeVisible();
      await expect(page.getByRole("tab", { name: "邮箱注册" })).toBeVisible();
    });
  });

  /**
   * Test suite for email verification flow
   * Tests email input, OTP sending, and verification
   */
  test.describe("Email Verification", () => {
    // Helper function to agree to terms and get to email verification step
    async function agreeToTermsAndSelectEmail(page: Page) {
      // Mock the send OTP API endpoint for all tests in this suite
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

      await page.goto("/auth/sign-up");
      const agreeButton = page.getByRole("button", { name: "同意并继续" });
      await agreeButton.click();
      // Wait for modal to close
      await expect(page.getByRole("dialog")).not.toBeVisible();

      // Click on email tab
      const emailTab = page.getByRole("tab", { name: "邮箱注册" });
      await emailTab.click();

      // Verify we're on email verification step
      await expect(page.getByText("验证邮箱")).toBeVisible();
    }

    test("should display validation error for empty email", async ({
      page,
    }) => {
      await agreeToTermsAndSelectEmail(page);

      // Try to send OTP without entering email
      const sendOtpButton = page.getByRole("button", { name: "发送验证码" });
      await sendOtpButton.click();

      // Should show error message
      await expect(page.getByText("请先输入邮箱地址")).toBeVisible();
    });

    test("should display validation error for invalid email format", async ({
      page,
    }) => {
      await agreeToTermsAndSelectEmail(page);

      // Enter invalid email
      const emailInput = page.getByPlaceholder("请输入邮箱地址");
      await emailInput.fill("invalid-email");

      // Enter OTP to trigger form validation
      const otpInput = page.getByPlaceholder("6位数字");
      await otpInput.fill("123456");

      // Check terms
      const termsCheckbox = page.getByRole("checkbox");
      await termsCheckbox.check();

      // Try to submit with invalid email
      const submitButton = page.getByRole("button", {
        name: "下一步，设置密码",
      });
      await submitButton.click();

      // Should still be on step 1 (email verification) - not advanced to password setup
      await expect(page.getByText("验证邮箱")).toBeVisible();
      await expect(page.getByPlaceholder("请输入邮箱地址")).toBeVisible();

      // Should NOT see password setup form
      await expect(page.getByText("密码要求：")).not.toBeVisible();
    });

    test("should send OTP with valid email", async ({ page }) => {
      await agreeToTermsAndSelectEmail(page);

      // Enter valid email
      const emailInput = page.getByPlaceholder("请输入邮箱地址");
      await emailInput.fill("test@example.com");

      // Click send OTP button
      const sendOtpButton = page.getByRole("button", { name: "发送验证码" });
      await sendOtpButton.click();

      // Should show countdown (button text changes)
      await expect(page.getByRole("button", { name: /\d+s/ })).toBeVisible();

      // Button should be disabled during countdown
      const disabledButton = page.getByRole("button", { name: /\d+s/ });
      await expect(disabledButton).toBeDisabled();
    });

    test("should display validation error for invalid OTP format", async ({
      page,
    }) => {
      await agreeToTermsAndSelectEmail(page);

      // Enter valid email
      const emailInput = page.getByPlaceholder("请输入邮箱地址");
      await emailInput.fill("test@example.com");

      // Enter invalid OTP (less than 6 digits)
      const otpInput = page.getByPlaceholder("6位数字");
      await otpInput.fill("123");

      // Try to submit
      const submitButton = page.getByRole("button", {
        name: "下一步，设置密码",
      });
      await submitButton.click();

      // Should show validation error
      await expect(page.getByText("验证码必须是6位数字")).toBeVisible();
    });

    test("should require terms agreement before submission", async ({
      page,
    }) => {
      await agreeToTermsAndSelectEmail(page);

      // Enter valid email
      const emailInput = page.getByPlaceholder("请输入邮箱地址");
      await emailInput.fill("test@example.com");

      // Send OTP
      const sendOtpButton = page.getByRole("button", { name: "发送验证码" });
      await sendOtpButton.click();

      // Enter valid OTP
      const otpInput = page.getByPlaceholder("6位数字");
      await otpInput.fill("123456");

      // Try to submit without checking terms
      const submitButton = page.getByRole("button", {
        name: "下一步，设置密码",
      });
      await submitButton.click();

      // Should show validation error
      await expect(page.getByText("请同意服务协议和隐私政策")).toBeVisible();
    });
  });

  /**
   * Test suite for password setup flow
   * Tests password strength validation and confirmation matching
   */
  test.describe("Password Setup", () => {
    // Helper function to complete email verification and get to password setup
    async function goToPasswordSetup(page: Page) {
      // Set up API mocks before navigation
      await mockBetterAuthApis(page);

      // Navigate to sign-up page
      await page.goto("/auth/sign-up");

      // Agree to terms
      const agreeButton = page.getByRole("button", { name: "同意并继续" });
      await agreeButton.click();
      await expect(page.getByRole("dialog")).not.toBeVisible();

      // Click on email tab
      const emailTab = page.getByRole("tab", { name: "邮箱注册" });
      await emailTab.click();

      // Complete email verification flow to advance to step 2
      // Fill in email
      const emailInput = page.getByPlaceholder("请输入邮箱地址");
      await emailInput.fill("test@example.com");

      // Send OTP (mocked to succeed)
      const sendOtpButton = page.getByRole("button", { name: "发送验证码" });
      await sendOtpButton.click();

      // Fill in OTP code (any 6-digit code will work with mocked API)
      const otpInput = page.getByPlaceholder("6位数字");
      await otpInput.fill("123456");

      // Check terms agreement
      const termsCheckbox = page.getByRole("checkbox");
      await termsCheckbox.check();

      // Submit email verification form
      const submitButton = page.getByRole("button", {
        name: "下一步，设置密码",
      });
      await submitButton.click();

      // Wait for step 2 (password setup) to be visible
      await expect(page.getByPlaceholder("请输入密码")).toBeVisible();
      await expect(page.getByText("密码要求：")).toBeVisible();
    }

    test("should display password setup form after email verification", async ({
      page,
    }) => {
      await goToPasswordSetup(page);

      // Verify password setup step is visible
      // Use more specific selectors to avoid strict mode violations
      await expect(page.getByPlaceholder("请输入密码")).toBeVisible();
      await expect(page.getByPlaceholder("请再次输入密码")).toBeVisible();
      await expect(page.getByText("密码要求：")).toBeVisible();
    });

    test("should validate password strength", async ({ page }) => {
      await goToPasswordSetup(page);

      // Enter weak password (too short)
      const passwordInput = page.getByPlaceholder("请输入密码");
      await passwordInput.fill("weak");

      const confirmPasswordInput = page.getByPlaceholder("请再次输入密码");
      await confirmPasswordInput.fill("weak");

      // Try to submit
      const submitButton = page.getByRole("button", { name: "完成注册" });
      await submitButton.click();

      // Should show validation error
      await expect(page.getByText("密码至少8位")).toBeVisible();
    });

    test("should validate password confirmation match", async ({ page }) => {
      await goToPasswordSetup(page);

      // Enter password
      const passwordInput = page.getByPlaceholder("请输入密码");
      await passwordInput.fill("Password123");

      // Enter different confirmation password
      const confirmPasswordInput = page.getByPlaceholder("请再次输入密码");
      await confirmPasswordInput.fill("DifferentPassword123");

      // Try to submit
      const submitButton = page.getByRole("button", { name: "完成注册" });
      await submitButton.click();

      // Should show validation error
      await expect(page.getByText("两次输入的密码不一致")).toBeVisible();
    });
  });
});

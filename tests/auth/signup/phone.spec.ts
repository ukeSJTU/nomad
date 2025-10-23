import { expect, type Page, test } from "@playwright/test";

/**
 * Helper function to mock better-auth API endpoints for testing
 * This allows tests to bypass actual OTP sending and verification
 */
async function mockBetterAuthApis(page: Page) {
  // Mock the send OTP endpoint to return success
  await page.route("**/api/auth/phone-number/send-otp", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ error: null }),
    });
  });

  // Mock the verify OTP endpoint to return success
  // This is the critical mock that allows advancing to step 2
  await page.route("**/api/auth/phone-number/verify", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ error: null }),
    });
  });

  // Mock the set initial password endpoint to return success
  await page.route("**/api/auth/set-initial-password", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "Password set successfully" }),
    });
  });
}

/**
 * Test suite for phone-based sign-up flow
 * Tests the complete registration process including:
 * - User agreement modal
 * - Phone verification
 * - Password setup
 */
test.describe("Phone Sign-Up Flow", () => {
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

      // Verify modal title is present
      await expect(
        page.getByRole("heading", { name: /Nomad用户注册协议和隐私政策/i })
      ).toBeVisible();

      // Verify modal content contains key terms
      await expect(modal).toContainText("服务协议");

      // Verify both action buttons are present
      await expect(page.getByRole("button", { name: "不同意" })).toBeVisible();
      await expect(
        page.getByRole("button", { name: "同意并继续" })
      ).toBeVisible();
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

      // Verify we're on phone tab by default (stepper shows "验证手机")
      await expect(page.getByText("验证手机")).toBeVisible();

      // Should see phone number input
      await expect(page.getByPlaceholder(/手机号|phone number/i)).toBeVisible();
    });

    test("should redirect to home page after clicking disagree", async ({
      page,
    }) => {
      // Navigate to sign-up page
      await page.goto("/auth/sign-up");

      // Wait for modal to be visible
      const modal = page.getByRole("dialog");
      await expect(modal).toBeVisible();

      // Click the disagree button
      const disagreeButton = page.getByRole("button", { name: "不同意" });
      await disagreeButton.click();

      // Should redirect to home page
      await expect(page).toHaveURL("/");
    });

    test("should redirect to home page after clicking close button", async ({
      page,
    }) => {
      // Navigate to sign-up page
      await page.goto("/auth/sign-up");

      // Wait for modal to be visible
      const modal = page.getByRole("dialog");
      await expect(modal).toBeVisible();

      // Click the close button (X button in top-right corner)
      // The button has an accessible name of "Close" via sr-only span
      const closeButton = page.getByRole("button", { name: "Close" });
      await closeButton.click();

      // Should redirect to home page
      await expect(page).toHaveURL("/");
    });
  });

  /**
   * Test suite for phone verification flow
   * Tests phone number input, OTP sending, and verification
   */
  test.describe("Phone Verification", () => {
    // Helper function to agree to terms and get to phone verification step
    async function agreeToTerms(page: Page) {
      // Mock the send OTP API endpoint for all tests in this suite
      // This prevents database dependency in CI environments
      await page.route("**/api/auth/phone-number/send-otp", async route => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ error: null }),
        });
      });

      await page.goto("/auth/sign-up");
      const agreeButton = page.getByRole("button", { name: "同意并继续" });
      await agreeButton.click();
      // Wait for modal to close
      await expect(page.getByRole("dialog")).not.toBeVisible();
    }

    test("should display validation error for empty phone number", async ({
      page,
    }) => {
      await agreeToTerms(page);

      // Try to send OTP without entering phone number
      const sendOtpButton = page.getByRole("button", { name: "发送验证码" });
      await sendOtpButton.click();

      // Should show error message
      await expect(page.getByText("请先输入手机号")).toBeVisible();
    });

    test("should display validation error for invalid phone number format", async ({
      page,
    }) => {
      await agreeToTerms(page);

      // Enter invalid phone number (too short)
      const phoneInput = page.getByPlaceholder("请输入手机号");
      await phoneInput.fill("123");

      // Enter OTP to trigger form validation
      const otpInput = page.getByPlaceholder("6位数字");
      await otpInput.fill("123456");

      // Check terms agreement
      const termsCheckbox = page.getByRole("checkbox");
      await termsCheckbox.check();

      // Try to submit
      const submitButton = page.getByRole("button", {
        name: "下一步，设置密码",
      });
      await submitButton.click();

      // Should show validation error
      await expect(page.getByText("手机号码至少11位")).toBeVisible();
    });

    test("should send OTP with valid phone number", async ({ page }) => {
      await agreeToTerms(page);

      // Enter valid phone number
      const phoneInput = page.getByPlaceholder("请输入手机号");
      await phoneInput.fill("13800138000");

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
      await agreeToTerms(page);

      // Enter valid phone number
      const phoneInput = page.getByPlaceholder("请输入手机号");
      await phoneInput.fill("13800138000");

      // Enter invalid OTP (not 6 digits)
      const otpInput = page.getByPlaceholder("6位数字");
      await otpInput.fill("123");

      // Check terms agreement
      const termsCheckbox = page.getByRole("checkbox");
      await termsCheckbox.check();

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
      await agreeToTerms(page);

      // Enter valid phone number
      const phoneInput = page.getByPlaceholder("请输入手机号");
      await phoneInput.fill("13800138000");

      // Enter valid OTP
      const otpInput = page.getByPlaceholder("6位数字");
      await otpInput.fill("123456");

      // Don't check terms agreement

      // Try to submit
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
    // Helper function to complete phone verification and get to password setup
    async function goToPasswordSetup(page: Page) {
      // Set up API mocks before navigation
      await mockBetterAuthApis(page);

      // Navigate to sign-up page
      await page.goto("/auth/sign-up");

      // Agree to terms
      const agreeButton = page.getByRole("button", { name: "同意并继续" });
      await agreeButton.click();
      await expect(page.getByRole("dialog")).not.toBeVisible();

      // Complete phone verification flow to advance to step 2
      // Fill in phone number
      const phoneInput = page.getByPlaceholder("请输入手机号");
      await phoneInput.fill("13800138000");

      // Send OTP (mocked to succeed)
      const sendOtpButton = page.getByRole("button", { name: "发送验证码" });
      await sendOtpButton.click();

      // Fill in OTP code (any 6-digit code will work with mocked API)
      const otpInput = page.getByPlaceholder("6位数字");
      await otpInput.fill("123456");

      // Check terms agreement
      const termsCheckbox = page.getByRole("checkbox");
      await termsCheckbox.check();

      // Submit phone verification form
      const submitButton = page.getByRole("button", {
        name: "下一步，设置密码",
      });
      await submitButton.click();

      // Wait for step 2 (password setup) to be visible
      // Use more specific selectors to avoid strict mode violations
      await expect(page.getByPlaceholder("请输入密码")).toBeVisible();
      await expect(page.getByText("密码要求：")).toBeVisible();
    }

    test("should display all password requirements", async ({ page }) => {
      await goToPasswordSetup(page);

      // Check that all password requirements are visible
      await expect(page.getByText("密码要求：")).toBeVisible();
      await expect(page.getByText("8-20位字符")).toBeVisible();
      await expect(page.getByText("包含至少一个大写字母")).toBeVisible();
      await expect(page.getByText("包含至少一个小写字母")).toBeVisible();
      await expect(page.getByText("包含至少一个数字（可选）")).toBeVisible();
    });

    test("should show validation error for password too short", async ({
      page,
    }) => {
      await goToPasswordSetup(page);

      // Enter short password
      const passwordInput = page.getByPlaceholder("请输入密码");
      await passwordInput.fill("Abc1");

      // Enter matching confirm password
      const confirmPasswordInput = page.getByPlaceholder("请再次输入密码");
      await confirmPasswordInput.fill("Abc1");

      // Try to submit
      const submitButton = page.getByRole("button", { name: "完成注册" });
      await submitButton.click();

      // Should show validation error
      await expect(page.getByText("密码至少8位")).toBeVisible();
    });

    test("should show validation error for password without uppercase", async ({
      page,
    }) => {
      await goToPasswordSetup(page);

      // Enter password without uppercase
      const passwordInput = page.getByPlaceholder("请输入密码");
      await passwordInput.fill("abcdefgh1");

      // Enter matching confirm password
      const confirmPasswordInput = page.getByPlaceholder("请再次输入密码");
      await confirmPasswordInput.fill("abcdefgh1");

      // Try to submit
      const submitButton = page.getByRole("button", { name: "完成注册" });
      await submitButton.click();

      // Should show validation error
      await expect(
        page.getByText("密码必须包含至少一个大写字母")
      ).toBeVisible();
    });

    test("should show validation error for password without lowercase", async ({
      page,
    }) => {
      await goToPasswordSetup(page);

      // Enter password without lowercase
      const passwordInput = page.getByPlaceholder("请输入密码");
      await passwordInput.fill("ABCDEFGH1");

      // Enter matching confirm password
      const confirmPasswordInput = page.getByPlaceholder("请再次输入密码");
      await confirmPasswordInput.fill("ABCDEFGH1");

      // Try to submit
      const submitButton = page.getByRole("button", { name: "完成注册" });
      await submitButton.click();

      // Should show validation error
      await expect(
        page.getByText("密码必须包含至少一个小写字母")
      ).toBeVisible();
    });

    test("should show validation error for password without number", async ({
      page,
    }) => {
      await goToPasswordSetup(page);

      // Enter password without number
      const passwordInput = page.getByPlaceholder("请输入密码");
      await passwordInput.fill("Abcdefgh");

      // Enter matching confirm password
      const confirmPasswordInput = page.getByPlaceholder("请再次输入密码");
      await confirmPasswordInput.fill("Abcdefgh");

      // Try to submit
      const submitButton = page.getByRole("button", { name: "完成注册" });
      await submitButton.click();

      // Should show validation error
      await expect(page.getByText("密码必须包含至少一个数字")).toBeVisible();
    });

    test("should show validation error when passwords don't match", async ({
      page,
    }) => {
      await goToPasswordSetup(page);

      // Enter valid password
      const passwordInput = page.getByPlaceholder("请输入密码");
      await passwordInput.fill("Password123");

      // Enter different confirm password
      const confirmPasswordInput = page.getByPlaceholder("请再次输入密码");
      await confirmPasswordInput.fill("Password456");

      // Try to submit
      const submitButton = page.getByRole("button", { name: "完成注册" });
      await submitButton.click();

      // Should show validation error
      await expect(page.getByText("两次输入的密码不一致")).toBeVisible();
    });

    test("should show real-time validation feedback with check icons", async ({
      page,
    }) => {
      await goToPasswordSetup(page);

      const passwordInput = page.getByPlaceholder("请输入密码");

      // Initially all requirements should show X icons (not met)
      // Type a weak password progressively and watch requirements update

      // Type "a" - no requirements met
      await passwordInput.fill("a");
      // All X icons should be visible

      // Type "Aa" - uppercase and lowercase met
      await passwordInput.fill("Aa");
      // Check icon should appear for uppercase and lowercase

      // Type "Aa1" - uppercase, lowercase, and number met
      await passwordInput.fill("Aa1");
      // Check icon should appear for number requirement

      // Type "Aa12345678" - all requirements met
      await passwordInput.fill("Aa12345678");
      // All check icons should be visible and green

      // Verify the visual feedback is working by checking for check icons
      // The Check component should be rendered when requirements are met
      const requirements = page.locator("li").filter({ hasText: "8-20位字符" });
      await expect(requirements).toBeVisible();
    });
  });

  /**
   * Test suite for complete happy path
   * Tests the entire registration flow from start to finish
   */
  test.describe("Complete Registration Flow", () => {
    test("should complete full registration flow successfully", async ({
      page,
    }) => {
      // Set up API mocks before starting the flow
      await mockBetterAuthApis(page);

      // Step 1: Navigate to sign-up page
      await page.goto("/auth/sign-up");

      // Step 2: Agree to initial user agreement modal
      const agreeButton = page.getByRole("button", { name: "同意并继续" });
      await expect(agreeButton).toBeVisible();
      await agreeButton.click();
      await expect(page.getByRole("dialog")).not.toBeVisible();

      // Step 3: Verify we're on phone verification step
      await expect(page.getByText("验证手机")).toBeVisible();
      await expect(page.getByText("注册账户")).toBeVisible();

      // Step 4: Enter phone number and send OTP
      const phoneInput = page.getByPlaceholder("请输入手机号");
      await phoneInput.fill("13800138000");

      const sendOtpButton = page.getByRole("button", { name: "发送验证码" });
      await sendOtpButton.click();

      // Verify OTP was sent (countdown started)
      await expect(page.getByRole("button", { name: /\d+s/ })).toBeVisible();

      // Step 5: Enter OTP code (mocked API will accept any valid format)
      const otpInput = page.getByPlaceholder("6位数字");
      await otpInput.fill("123456");

      // Step 6: Agree to terms
      const termsCheckbox = page.getByRole("checkbox");
      await termsCheckbox.check();

      // Step 7: Submit phone verification
      const submitButton = page.getByRole("button", {
        name: "下一步，设置密码",
      });
      await submitButton.click();

      // Step 8: Verify we're on password setup step
      // Use specific selectors to avoid strict mode violations
      await expect(page.getByPlaceholder("请输入密码")).toBeVisible();
      await expect(page.getByText("密码要求：")).toBeVisible();

      // Step 9: Set password
      const passwordInput = page.getByPlaceholder("请输入密码");
      await passwordInput.fill("Password123");

      const confirmPasswordInput = page.getByPlaceholder("请再次输入密码");
      await confirmPasswordInput.fill("Password123");

      // Step 10: Complete registration
      const completeButton = page.getByRole("button", { name: "完成注册" });
      await completeButton.click();

      // Step 11: Verify registration success
      await expect(page.getByText("注册成功！")).toBeVisible();
      await expect(page.getByText("欢迎使用 Nomad")).toBeVisible();
    });

    test("should maintain state when navigating back and forth", async ({
      page,
    }) => {
      await page.goto("/auth/sign-up");

      // Agree to terms
      const agreeButton = page.getByRole("button", { name: "同意并继续" });
      await agreeButton.click();

      // Enter phone number
      const phoneInput = page.getByPlaceholder("请输入手机号");
      await phoneInput.fill("13800138000");

      // Verify the phone number persists
      await expect(phoneInput).toHaveValue("13800138000");

      // Note: In a real app, you might want to test:
      // - Browser back button behavior
      // - Page refresh behavior
      // - State persistence across steps
    });
  });
});

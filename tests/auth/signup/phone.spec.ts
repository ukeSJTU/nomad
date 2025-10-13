import { expect, test } from "@playwright/test";

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

      // Should show the registration form with stepper
      // Verify we're on step 1 (phone verification) by checking the stepper
      await expect(page.getByText("验证手机")).toBeVisible();

      // Verify the page header is visible
      await expect(page.getByText("注册账户")).toBeVisible();

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
   * TODO: Implement phone verification tests
   */
  test.describe.skip("Phone Verification", () => {
    // Will be implemented in next iteration
  });

  /**
   * Test suite for password setup flow
   * TODO: Implement password setup tests
   */
  test.describe.skip("Password Setup", () => {
    // Will be implemented in next iteration
  });

  /**
   * Test suite for complete happy path
   * TODO: Implement end-to-end happy path test
   */
  test.describe.skip("Complete Registration Flow", () => {
    // Will be implemented in next iteration
  });
});

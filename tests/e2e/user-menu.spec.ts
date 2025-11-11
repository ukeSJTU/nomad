import { expect, type Page, test } from "@playwright/test";

/**
 * Helper function to mock user session for testing
 * This simulates a logged-in user by mocking the session API endpoint
 */
async function mockUserSession(page: Page) {
  // Mock the session endpoint to return a logged-in user
  await page.route("**/api/auth/get-session", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        user: {
          id: "test-user-id",
          name: "测试用户",
          email: "test@example.com",
          emailVerified: false,
          image: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        session: {
          id: "test-session-id",
          userId: "test-user-id",
          expiresAt: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
          token: "test-token",
          ipAddress: "127.0.0.1",
          userAgent: "test-agent",
        },
      }),
    });
  });
}

test.describe("UserMenu Component E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Set up mock session before navigating
    await mockUserSession(page);
    // Navigate to home page where Header with UserMenu is displayed
    await page.goto("/");
  });

  test("should navigate to /home when clicking UserMenu trigger area", async ({
    page,
  }) => {
    // Find the UserMenu link by text "尊敬的用户"
    const userMenuLink = page.getByRole("link", { name: /尊敬的用户/i });

    // Verify link exists
    await expect(userMenuLink).toBeVisible();

    // Verify link has correct href
    await expect(userMenuLink).toHaveAttribute("href", "/home");

    // Click the link
    await userMenuLink.click();

    // Verify navigation to /home
    await expect(page).toHaveURL("/home");
  });

  test("should display dropdown menu on hover", async ({ page }) => {
    // Find the UserMenu trigger
    const userMenuTrigger = page.getByRole("link", { name: /尊敬的用户/i });

    // Hover over the trigger
    await userMenuTrigger.hover();

    // Wait for HoverCard to appear (with openDelay=200ms)
    await page.waitForTimeout(300);

    // Verify dropdown menu items are visible
    await expect(page.getByRole("link", { name: /我的钱包/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /常用信息/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /退出登录/i })).toBeVisible();
  });

  test("should show ChevronDown icon in UserMenu", async ({ page }) => {
    // Find the UserMenu link
    const userMenuLink = page.getByRole("link", { name: /尊敬的用户/i });

    // Verify ChevronDown icon is present (check for svg with specific class)
    const chevronIcon = userMenuLink.locator("svg.lucide-chevron-down");
    await expect(chevronIcon).toBeVisible();
  });

  test("should display '尊敬的用户' text instead of username", async ({
    page,
  }) => {
    // Verify standardized text is displayed
    await expect(page.getByText("尊敬的用户")).toBeVisible();

    // Verify actual username is NOT displayed in Header (collapsed state)
    // Note: Username might appear in expanded menu, but not in Header text
    const headerElement = page.locator("header");
    // The mock user has name "测试用户", verify it's not shown in header
    await expect(headerElement.getByText("测试用户")).not.toBeVisible();
  });

  test("hover and click should both work without conflict", async ({
    page,
  }) => {
    const userMenuLink = page
      .getByRole("link", { name: /尊敬的用户/i })
      .first();

    // Test 1: Hover to see menu
    await userMenuLink.hover();
    await page.waitForTimeout(300);
    await expect(page.getByRole("link", { name: /我的钱包/i })).toBeVisible();

    // Move mouse away to close menu
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);

    // Test 2: Click to navigate
    // Use the trigger link specifically (not the one in dropdown)
    const triggerLink = page.locator('header a[href="/home"]').first();
    await triggerLink.click();
    await expect(page).toHaveURL("/home");
  });
});

test.describe("UserMenu - Not Logged In State", () => {
  test("should show Sign In and Sign Up buttons when not logged in", async ({
    page,
  }) => {
    // Don't mock session for this test - user should be logged out
    await page.goto("/");

    // Verify Sign In and Sign Up buttons are visible
    await expect(page.getByRole("link", { name: /sign in/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /sign up/i })).toBeVisible();

    // Verify '尊敬的用户' is NOT displayed
    await expect(page.getByText("尊敬的用户")).not.toBeVisible();
  });
});

import { expect, test } from "@playwright/test";
import { mockAuthenticatedUser } from "@tests/helpers/auth-helpers";

test.describe("UserMenu Component E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Set up authenticated user (sets cookie + mocks API)
    await mockAuthenticatedUser(page, {
      id: "test-user-id",
      name: "测试用户",
      email: "test@example.com",
    });
    // Navigate to home page where Header with UserMenu is displayed
    await page.goto("/");
  });

  test("should navigate to /home/info when clicking UserMenu trigger area", async ({
    page,
  }) => {
    // Find the UserMenu link by text "尊敬的用户"
    const userMenuLink = page.getByRole("link", { name: /尊敬的用户/i });

    // Verify link exists
    await expect(userMenuLink).toBeVisible();

    // Verify link has correct href
    await expect(userMenuLink).toHaveAttribute("href", "/home/info");

    // Click the link
    await userMenuLink.click();

    // Verify navigation to /home/info
    await expect(page).toHaveURL("/home/info");
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
    const triggerLink = page.locator('header a[href="/home/info"]').first();
    await triggerLink.click({ force: true });
    await expect(page).toHaveURL("/home/info");
  });
});

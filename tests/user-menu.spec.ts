import { expect, test } from "@playwright/test";

test.describe("UserMenu Component E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page where Header with UserMenu is displayed
    await page.goto("/");
  });

  test("should navigate to /home when clicking UserMenu trigger area", async ({
    page,
  }) => {
    // TODO: Login as a user first (implement login flow)
    // For now, this test assumes user is already logged in

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
    // TODO: Login as a user first

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
    // TODO: Login as a user first

    // Find the UserMenu link
    const userMenuLink = page.getByRole("link", { name: /尊敬的用户/i });

    // Verify ChevronDown icon is present (check for svg with specific class)
    const chevronIcon = userMenuLink.locator("svg.lucide-chevron-down");
    await expect(chevronIcon).toBeVisible();
  });

  test("should display '尊敬的用户' text instead of username", async ({
    page,
  }) => {
    // TODO: Login as a user with a known username (e.g., "张三")

    // Verify standardized text is displayed
    await expect(page.getByText("尊敬的用户")).toBeVisible();

    // Verify actual username is NOT displayed in Header (collapsed state)
    // Note: Username might appear in expanded menu, but not in Header text
    const headerElement = page.locator("header");
    await expect(headerElement.getByText("张三")).not.toBeVisible();
  });

  test("hover and click should both work without conflict", async ({
    page,
  }) => {
    // TODO: Login as a user first

    const userMenuLink = page.getByRole("link", { name: /尊敬的用户/i });

    // Test 1: Hover to see menu
    await userMenuLink.hover();
    await page.waitForTimeout(300);
    await expect(page.getByRole("link", { name: /我的钱包/i })).toBeVisible();

    // Move mouse away to close menu
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);

    // Test 2: Click to navigate
    await userMenuLink.click();
    await expect(page).toHaveURL("/home");
  });
});

test.describe("UserMenu - Not Logged In State", () => {
  test("should show Sign In and Sign Up buttons when not logged in", async ({
    page,
  }) => {
    // Navigate to a page where user is not logged in
    // TODO: Ensure user is logged out first

    await page.goto("/");

    // Verify Sign In and Sign Up buttons are visible
    await expect(page.getByRole("link", { name: /sign in/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /sign up/i })).toBeVisible();

    // Verify '尊敬的用户' is NOT displayed
    await expect(page.getByText("尊敬的用户")).not.toBeVisible();
  });
});

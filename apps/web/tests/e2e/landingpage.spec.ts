import { expect, test } from "@playwright/test";

test.describe("Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the landing page before each test
    await page.goto("/");
  });

  test("should display the main heading and subheading", async ({ page }) => {
    // Check if the main heading is visible
    await expect(
      page.getByRole("heading", { name: "探索世界，从这里开始" })
    ).toBeVisible();

    // Check if the subheading text is present
    await expect(page.getByText(/Nomad.*您的智能旅行助手/)).toBeVisible();
  });

  test("should have functional CTA buttons in hero section", async ({
    page,
  }) => {
    // Check if "立即预订机票" button exists and is clickable
    const bookFlightButton = page.getByRole("link", { name: /立即预订机票/ });
    await expect(bookFlightButton).toBeVisible();
    await expect(bookFlightButton).toHaveAttribute("href", "/flights");

    // Check if "免费注册" button exists and is clickable
    const signUpButton = page.getByRole("link", { name: "免费注册" }).first();
    await expect(signUpButton).toBeVisible();
    await expect(signUpButton).toHaveAttribute("href", "/auth/sign-up");
  });

  test("should have header and footer components", async ({ page }) => {
    // Check if header exists (assuming it has navigation or logo)
    const header = page.locator("header").first();
    await expect(header).toBeVisible();

    // Check if footer exists
    const footer = page.locator("footer").first();
    await expect(footer).toBeVisible();
  });

  test("should navigate to sign up page when clicking hero CTA button", async ({
    page,
  }) => {
    // Click on the sign up button in hero section
    await page.getByRole("link", { name: "免费注册" }).first().click();

    // Verify navigation to sign up page
    await expect(page).toHaveURL("/auth/sign-up");
  });
});

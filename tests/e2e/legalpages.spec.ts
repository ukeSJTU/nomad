import { expect, test } from "@playwright/test";

/**
 * E2E tests for legal pages navigation
 * Tests navigation flow between Terms of Service, Privacy Policy, and Disclaimer pages
 */
test.describe("Legal Pages Navigation", () => {
  test.beforeEach(async ({ page }) => {
    // Start from the home page
    await page.goto("/");
  });

  test("should navigate to all three legal pages from footer", async ({
    page,
  }) => {
    // Scroll to footer to make links visible
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Navigate to Terms of Service
    const termsLink = page
      .locator("footer")
      .getByRole("link", { name: "服务协议" });
    await termsLink.click();
    await expect(page).toHaveURL(/\/terms$/);
    await expect(page).toHaveTitle(/服务协议.*Nomad/);

    // Navigate to Privacy Policy from Terms page sidebar
    const privacyLink = page
      .getByRole("complementary")
      .getByRole("link", { name: /个人信息保护政策/ });
    await privacyLink.click();
    await expect(page).toHaveURL(/\/privacy$/);
    await expect(page).toHaveTitle(/个人信息保护政策.*Nomad/);

    // Navigate to Disclaimer from Privacy page sidebar
    const disclaimerLink = page
      .getByRole("complementary")
      .getByRole("link", { name: /免责声明/ });
    await disclaimerLink.click();
    await expect(page).toHaveURL(/\/disclaimer$/);
    await expect(page).toHaveTitle(/免责声明.*Nomad/);
  });

  test("should navigate between legal pages using sidebar", async ({
    page,
  }) => {
    // Start from Terms page
    await page.goto("/terms");

    // Navigate to Privacy
    const privacyLink = page
      .getByRole("complementary")
      .getByRole("link", { name: /个人信息保护政策/ });
    await expect(privacyLink).toBeVisible();
    await privacyLink.click();
    await expect(page).toHaveURL(/\/privacy$/);

    // Navigate to Disclaimer
    const disclaimerLink = page
      .getByRole("complementary")
      .getByRole("link", { name: /免责声明/ });
    await expect(disclaimerLink).toBeVisible();
    await disclaimerLink.click();
    await expect(page).toHaveURL(/\/disclaimer$/);

    // Navigate back to Terms
    const termsLink = page
      .getByRole("complementary")
      .getByRole("link", { name: "服务协议" });
    await expect(termsLink).toBeVisible();
    await termsLink.click();
    await expect(page).toHaveURL(/\/terms$/);
  });

  test("should navigate from Privacy to Terms and Disclaimer", async ({
    page,
  }) => {
    // Start from Privacy page
    await page.goto("/privacy");

    // Navigate to Terms
    const termsLink = page
      .getByRole("complementary")
      .getByRole("link", { name: "服务协议" });
    await termsLink.click();
    await expect(page).toHaveURL(/\/terms$/);

    // Navigate back to Privacy
    const privacyLink = page
      .getByRole("complementary")
      .getByRole("link", { name: /个人信息保护政策/ });
    await privacyLink.click();
    await expect(page).toHaveURL(/\/privacy$/);

    // Navigate to Disclaimer
    const disclaimerLink = page
      .getByRole("complementary")
      .getByRole("link", { name: /免责声明/ });
    await disclaimerLink.click();
    await expect(page).toHaveURL(/\/disclaimer$/);
  });

  test("should navigate from Disclaimer to Terms and Privacy", async ({
    page,
  }) => {
    // Start from Disclaimer page
    await page.goto("/disclaimer");

    // Navigate to Terms
    const termsLink = page
      .getByRole("complementary")
      .getByRole("link", { name: "服务协议" });
    await termsLink.click();
    await expect(page).toHaveURL(/\/terms$/);

    // Go back to Disclaimer via sidebar link
    const backToDisclaimer = page
      .getByRole("complementary")
      .getByRole("link", { name: /免责声明/ });
    await backToDisclaimer.click();
    await expect(page).toHaveURL(/\/disclaimer$/);

    // Navigate to Privacy
    const privacyLink = page
      .getByRole("complementary")
      .getByRole("link", { name: /个人信息保护政策/ });
    await privacyLink.click();
    await expect(page).toHaveURL(/\/privacy$/);
  });

  test("should maintain sidebar visibility across all legal pages", async ({
    page,
  }) => {
    // Check sidebar on Terms page
    await page.goto("/terms");
    let sidebar = page.getByRole("complementary");
    await expect(sidebar).toBeVisible();

    // Check sidebar on Privacy page
    await page.goto("/privacy");
    sidebar = page.getByRole("complementary");
    await expect(sidebar).toBeVisible();

    // Check sidebar on Disclaimer page
    await page.goto("/disclaimer");
    sidebar = page.getByRole("complementary");
    await expect(sidebar).toBeVisible();
  });
});

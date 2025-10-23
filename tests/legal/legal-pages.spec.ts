import { expect, test } from "@playwright/test";

/**
 * Test suite for legal document pages
 * Tests the Terms of Service, Privacy Policy, and Disclaimer pages
 * including page accessibility, metadata, anchor navigation, and link functionality
 */
test.describe("Legal Document Pages", () => {
  /**
   * Test suite for Terms of Service page
   */
  test.describe("Terms of Service Page", () => {
    test("should load and display terms of service page correctly", async ({
      page,
    }) => {
      await page.goto("/terms");

      // Verify page title
      await expect(page).toHaveTitle(/服务协议.*Nomad/);

      // Verify main heading
      const heading = page.getByRole("heading", {
        name: "Nomad 用户服务协议",
        level: 1,
      });
      await expect(heading).toBeVisible();

      // Verify table of contents exists
      const toc = page.getByRole("heading", { name: "目录", level: 2 });
      await expect(toc).toBeVisible();

      // Verify at least some sections are visible
      const section1 = page.getByRole("heading", { name: /1\.\s*总则/ });
      await expect(section1).toBeVisible();
    });

    test("should have working anchor navigation", async ({ page }) => {
      await page.goto("/terms");

      // Scroll to ensure TOC is visible
      await page.evaluate(() => window.scrollTo(0, 0));

      // Click on a table of contents link within the main content area (not sidebar)
      // The TOC is in a nav element within the main content
      const tocLink = page
        .locator("main nav")
        .getByRole("link", { name: /1\.\s*总则/ })
        .first();

      // Verify the link exists before clicking
      await expect(tocLink).toBeVisible();
      await tocLink.click();

      // Wait for scroll animation
      await page.waitForTimeout(1000);

      // Verify the section is in viewport (hash may or may not be in URL due to client-side routing)
      const section = page.locator("#general");
      await expect(section).toBeInViewport();
    });

    test("should have links to other legal documents", async ({ page }) => {
      await page.goto("/terms");

      // Verify links to other legal documents exist in the sidebar navigation
      const sidebar = page.getByRole("complementary");
      const privacyLink = sidebar.getByRole("link", {
        name: /个人信息保护政策/,
      });
      await expect(privacyLink).toBeVisible();

      const disclaimerLink = sidebar.getByRole("link", {
        name: /免责声明/,
      });
      await expect(disclaimerLink).toBeVisible();
    });
  });

  /**
   * Test suite for Privacy Policy page
   */
  test.describe("Privacy Policy Page", () => {
    test("should load and display privacy policy page correctly", async ({
      page,
    }) => {
      await page.goto("/privacy");

      // Verify page title
      await expect(page).toHaveTitle(/个人信息保护政策.*Nomad/);

      // Verify main heading
      const heading = page.getByRole("heading", {
        name: "Nomad 个人信息保护政策",
        level: 1,
      });
      await expect(heading).toBeVisible();

      // Verify table of contents exists
      const toc = page.getByRole("heading", { name: "目录", level: 2 });
      await expect(toc).toBeVisible();

      // Verify at least some sections are visible
      const section1 = page.getByRole("heading", {
        name: /1\.\s*引言/,
      });
      await expect(section1).toBeVisible();
    });

    test("should have working anchor navigation", async ({ page }) => {
      await page.goto("/privacy");

      // Scroll to ensure TOC is visible
      await page.evaluate(() => window.scrollTo(0, 0));

      // Click on a table of contents link within the main content area (not sidebar)
      // The TOC is in a nav element within the main content
      const tocLink = page
        .locator("main nav")
        .getByRole("link", { name: /1\.\s*引言/ })
        .first();

      // Verify the link exists before clicking
      await expect(tocLink).toBeVisible();
      await tocLink.click();

      // Wait for scroll animation
      await page.waitForTimeout(1000);

      // Verify the section is in viewport (hash may or may not be in URL due to client-side routing)
      const section = page.locator("#introduction");
      await expect(section).toBeInViewport();
    });

    test("should have links to other legal documents", async ({ page }) => {
      await page.goto("/privacy");

      // Verify links to other legal documents exist in the sidebar navigation
      const sidebar = page.getByRole("complementary");
      const termsLink = sidebar.getByRole("link", { name: /服务协议/ });
      await expect(termsLink).toBeVisible();

      // Verify link to disclaimer exists
      const disclaimerLink = sidebar.getByRole("link", { name: /免责声明/ });
      await expect(disclaimerLink).toBeVisible();
    });
  });

  /**
   * Test suite for Disclaimer page
   */
  test.describe("Disclaimer Page", () => {
    test("should load and display disclaimer page correctly", async ({
      page,
    }) => {
      await page.goto("/disclaimer");

      // Verify page title
      await expect(page).toHaveTitle(/免责声明.*Nomad/);

      // Verify main heading
      const heading = page.getByRole("heading", {
        name: "Nomad 免责声明",
        level: 1,
      });
      await expect(heading).toBeVisible();

      // Verify table of contents exists
      const toc = page.getByRole("heading", { name: "目录", level: 2 });
      await expect(toc).toBeVisible();

      // Verify at least some sections are visible
      const section1 = page.getByRole("heading", { name: /1\.\s*总则/ });
      await expect(section1).toBeVisible();

      // Verify special notice section exists
      const specialNotice = page.getByRole("heading", { name: /特别提示/ });
      await expect(specialNotice).toBeVisible();
    });

    test("should have working anchor navigation", async ({ page }) => {
      await page.goto("/disclaimer");

      // Scroll to ensure TOC is visible
      await page.evaluate(() => window.scrollTo(0, 0));

      // Click on a table of contents link within the main content area (not sidebar)
      // The TOC is in a nav element within the main content
      const tocLink = page
        .locator("main nav")
        .getByRole("link", { name: /1\.\s*总则/ })
        .first();

      // Verify the link exists before clicking
      await expect(tocLink).toBeVisible();
      await tocLink.click();

      // Wait for scroll animation
      await page.waitForTimeout(1000);

      // Verify the section is in viewport (hash may or may not be in URL due to client-side routing)
      const section = page.locator("#general");
      await expect(section).toBeInViewport();
    });

    test("should have links to other legal documents", async ({ page }) => {
      await page.goto("/disclaimer");

      // Verify links to other legal documents exist in the sidebar navigation
      const sidebar = page.getByRole("complementary");
      const termsLink = sidebar.getByRole("link", { name: /服务协议/ });
      await expect(termsLink).toBeVisible();

      // Verify link to privacy policy exists
      const privacyLink = sidebar.getByRole("link", {
        name: /个人信息保护政策/,
      });
      await expect(privacyLink).toBeVisible();
    });
  });

  /**
   * Test suite for Footer legal links
   */
  test.describe("Footer Legal Links", () => {
    test("should have legal links in footer on homepage", async ({ page }) => {
      await page.goto("/");

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      // Verify footer legal section heading
      const legalHeading = page.getByRole("heading", { name: "法律信息" });
      await expect(legalHeading).toBeVisible();

      // Verify all three legal document links exist in footer
      const termsLink = page
        .locator("footer")
        .getByRole("link", { name: "服务协议" });
      await expect(termsLink).toBeVisible();

      const privacyLink = page
        .locator("footer")
        .getByRole("link", { name: "个人信息保护政策" });
      await expect(privacyLink).toBeVisible();

      const disclaimerLink = page
        .locator("footer")
        .getByRole("link", { name: "免责声明" });
      await expect(disclaimerLink).toBeVisible();
    });

    test("should navigate to terms page from footer", async ({ page }) => {
      await page.goto("/");

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      // Click terms link in footer
      const termsLink = page
        .locator("footer")
        .getByRole("link", { name: "服务协议" });
      await termsLink.click();

      // Verify navigation to terms page
      await expect(page).toHaveURL(/\/terms$/);
      await expect(page).toHaveTitle(/服务协议.*Nomad/);
    });

    test("should navigate to privacy page from footer", async ({ page }) => {
      await page.goto("/");

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      // Click privacy link in footer
      const privacyLink = page
        .locator("footer")
        .getByRole("link", { name: "个人信息保护政策" });
      await privacyLink.click();

      // Verify navigation to privacy page
      await expect(page).toHaveURL(/\/privacy$/);
      await expect(page).toHaveTitle(/个人信息保护政策.*Nomad/);
    });

    test("should navigate to disclaimer page from footer", async ({ page }) => {
      await page.goto("/");

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      // Click disclaimer link in footer
      const disclaimerLink = page
        .locator("footer")
        .getByRole("link", { name: "免责声明" });
      await disclaimerLink.click();

      // Verify navigation to disclaimer page
      await expect(page).toHaveURL(/\/disclaimer$/);
      await expect(page).toHaveTitle(/免责声明.*Nomad/);
    });
  });
});

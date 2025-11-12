import { expect, test } from "@playwright/test";

test.describe("Flights page tabs & URL persistence", () => {
  test("switching to 'special' from non-domestic updates URL and persists", async ({
    page,
  }) => {
    // Start from a non-domestic tab to avoid DB queries in tests
    await page.goto("/flights?tab=status");

    // Verify initial active tab is 'status'
    await expect(page.getByRole("tab", { name: "航班动态" })).toHaveAttribute(
      "data-state",
      "active"
    );

    // Click Special tab via role-based locator for reliability
    await page.getByRole("tab", { name: "特价机票" }).click();
    // Verify tab becomes active by Radix/SHADCN data-state
    await expect(page.getByRole("tab", { name: "特价机票" })).toHaveAttribute(
      "data-state",
      "active"
    );

    // URL should contain ?tab=special (poll to accommodate same-document navigation)
    await expect.poll(() => page.url()).toContain("/flights?tab=special");

    // Content should show UnderConstruction
    await expect(page.getByText("未实现")).toBeVisible();

    // Reload and verify persistence
    await page.reload();
    await expect(page.getByText("未实现")).toBeVisible();
  });

  test("direct visit to /flights?tab=special shows 'special' content", async ({
    page,
  }) => {
    await page.goto("/flights?tab=special");
    await expect(page.getByText("未实现")).toBeVisible();
  });
});

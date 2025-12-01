import { defineConfig, devices } from "@playwright/test";
import { env } from "./src/config/env";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!env.CI,
  /* Retry on CI only */
  retries: env.CI ? 2 : 0,
  /* Optimize workers for CI and local development */
  workers: 4,
  // workers: env.CI ? "50%" : undefined,
  /* Timeout settings */
  timeout: 60 * 1000, // 60 seconds per test
  expect: {
    timeout: 15 * 1000, // 15 seconds for assertions
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: env.CI
    ? [["blob"], ["github"]]
    : [["html", { open: "on-failure" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: "http://localhost:3000",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    /* Take screenshot on failure */
    screenshot: "only-on-failure",
    /* Record video on failure */
    video: "retain-on-failure",
    /* Action timeout */
    actionTimeout: 10 * 1000, // 10 seconds
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "pnpm dev",
    // url: "http://localhost:3000",
    port: 3000,
    reuseExistingServer: !env.CI,
    timeout: 120 * 1000, // 2 minutes to start the server
    // Show output in CI for debugging, ignore in local development
    stdout: env.CI ? "pipe" : "ignore",
    stderr: env.CI ? "pipe" : "ignore",

    env: {
      NODE_ENV: "test",
      ENABLE_ALIYUN_SMS: "false", // Explicitly disable Aliyun SMS in tests
      // Dummy DATABASE_URL for test environment (not used for actual DB operations)
      DATABASE_URL:
        env.DATABASE_URL || "postgresql://dummy:dummy@localhost:5432/dummy",
      // Dummy auth secrets for test environment
      BETTER_AUTH_SECRET:
        env.BETTER_AUTH_SECRET || "dummy-secret-for-test-only",
      BETTER_AUTH_URL: env.BETTER_AUTH_URL || "http://localhost:3000",
      TURNSTILE_SECRET_KEY:
        env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA",
      // Only enable Next.js debug logs in CI or when explicitly requested
      ...(env.CI || env.DEBUG
        ? { DEBUG: env.DEBUG || "next:error,next:router" }
        : {}),
    },
  },
});

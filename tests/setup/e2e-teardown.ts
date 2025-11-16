/**
 * E2E Test Global Teardown
 *
 * This file is executed once after all E2E tests complete.
 * It cleans up the test environment.
 */

/**
 * Global teardown function for Playwright
 * This runs once after all tests complete
 */
export default async function globalTeardown() {
  console.log("Starting E2E test environment teardown...");

  // Optional: Clean up test data
  // Note: Individual tests should clean up their own data using test ID prefixes
  // This is just for final cleanup if needed

  console.log("E2E test environment teardown complete");
}

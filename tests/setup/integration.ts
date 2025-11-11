/**
 * Integration Test Setup
 *
 * This file is loaded before all integration tests run.
 * It sets up the test environment, including:
 * - Loading test environment variables from .env.test
 * - Database connection verification (optional)
 * - Global test hooks (optional)
 */

import { loadEnvConfig } from "@next/env";

// Load test environment variables
// When NODE_ENV=test, this loads .env.test
loadEnvConfig(process.cwd());

// Verify required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Please create a .env.test file with DATABASE_URL."
  );
}

// Optional: Add global beforeAll/afterAll hooks here
// Example:
// import { beforeAll, afterAll } from "vitest";
//
// beforeAll(async () => {
//   // Global setup for all integration tests
//   console.log("Setting up integration tests...");
// });
//
// afterAll(async () => {
//   // Global cleanup for all integration tests
//   console.log("Cleaning up integration tests...");
// });

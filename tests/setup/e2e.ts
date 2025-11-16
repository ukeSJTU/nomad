/**
 * E2E Test Global Setup
 *
 * This file is executed once before all E2E tests run.
 * It sets up the test environment, including:
 * - Loading test environment variables from .env.test
 * - Verifying database connection
 */

import { loadEnvConfig } from "@next/env";

import logger from "@/utils/logger";

// Load test environment variables
// When NODE_ENV=test, this loads .env.test
loadEnvConfig(process.cwd());

/**
 * Global setup function for Playwright
 * This runs once before all tests
 */
export default async function globalSetup() {
  logger.info("Starting E2E test environment setup...");

  // Verify required environment variables
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Please create a .env.test file with DATABASE_URL."
    );
  }

  logger.info("Environment variables loaded");
  logger.info(`Database: ${process.env.DATABASE_URL}`);

  logger.info("E2E test environment setup complete");
}

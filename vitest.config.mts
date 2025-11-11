/// <reference types="vitest/config" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    // Base configuration for all test projects
    // Each project can override these settings
    globals: true,
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
      "**/tests/**/*.spec.ts",
      // Exclude Playwright E2E tests (*.spec.ts files in tests/)
      "**/test-results/**",
      "**/playwright-report/**",
      "src/lib/fumadocs/**", // These are fumadocs configuration files
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage",
      exclude: [
        "node_modules/",
        "dist/",
        "coverage/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/*.test.*",
        "**/*.spec.*",
        "**/tests/**",
        "src/app/**",
        // Next.js app directory
        "**/.next/**",
        "**/playwright-report/**",
        "**/test-results/**",
        "src/lib/auth.ts",
        // Better Auth configuration
        "src/lib/auth/**",
        // Better Auth client
        "src/lib/db/**",
        // Database connection and seed files
        "src/lib/fumadocs/**",
        // Fumadocs configuration files
        "src/components/ui/**",
        // Shadcn/UI components (third-party)
        "src/components/fumadocs/**",
        // Fumadocs components
        "src/components/auth/index.tsx",
        // Re-export file
        "src/components/common/index.tsx",
        // Re-export file
        "src/components/passengers/index.ts",
        // Re-export file
        "src/types/index.ts",
        // Re-export file
        "src/types/api/index.ts",
        // Re-export file
        "src/hooks/**",
        // React hooks (can be tested separately if needed)
        "src/middleware.ts",
        // Next.js middleware
        "src/instrumentation.ts", // Next.js instrumentation
      ],
      include: ["src/**/*.{ts,tsx,js,jsx}"],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    outputFile: {
      json: "./coverage/vitest-results.json",
      junit: "./coverage/vitest-results.xml",
    },
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["src/**/*.{test,spec}.{ts,tsx}"],
          exclude: [
            "**/node_modules/**",
            "**/dist/**",
            "**/*.stories.tsx", // Exclude Storybook files from unit tests
          ],
          setupFiles: ["./src/tests/setup/global.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "integration",
          include: ["tests/integration/**/*.integration.test.ts"],
          environment: "node", // Integration tests use real database, no jsdom needed
          globals: true,
          setupFiles: ["./tests/setup/integration.ts"],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});

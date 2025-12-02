import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
const dirname = path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    env: {
      NODE_ENV: "test",
    },
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
        // Frontend files
        "app/(docs)/**",
        "app/(frontend)/**",
        "app/api/**",
        "app/layout.tsx",
        "app/not-found.tsx",
        // Next.js app routes and entrypoints
        "**/index.**",
        // Database connection and seed files
        "src/db/**",
        // UI components
        "app/_components/ui/**",
        "app/_components/fumadocs/**",
        // Next.js middleware
        "src/middleware.ts",
        "src/instrumentation.ts", // Next.js instrumentation
      ],
      include: ["src/**/*.{ts,tsx,js,jsx}", "app/**/*.{ts,tsx,js,jsx}"],
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
          name: { label: "unit", color: "green" },
          environment: "jsdom",
          include: ["src/**/*.test.ts", "app/**/*.test.ts"],
          exclude: [
            "**/node_modules/**",
            "**/dist/**",
            "**/*.repository.test.ts", // Integration repository tests run in the integration project
          ],
          setupFiles: ["./tests/setup/global.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: { label: "components", color: "white" },
          environment: "jsdom",
          include: ["src/**/*.test.tsx", "app/**/*.test.tsx"],
          exclude: ["**/node_modules/**", "**/dist/**"],
          setupFiles: ["./tests/setup/global.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: { label: "repository", color: "magenta" },
          environment: "node",
          include: ["src/**/*.repository.test.ts"],
          setupFiles: ["./tests/setup/integration-db.ts"],
          pool: "threads",
          sequence: {
            concurrent: false,
          },
          poolOptions: {
            threads: {
              singleThread: true,
            },
          },
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

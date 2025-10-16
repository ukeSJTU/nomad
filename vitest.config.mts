import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
      "**/tests/**", // Exclude Playwright tests
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
        "**/*.spec.*",
        "**/tests/**",
        "src/app/**", // Next.js app directory
        "**/.next/**",
        "**/playwright-report/**",
        "**/test-results/**",
        "src/lib/auth.ts", // Better Auth configuration
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
  },
});

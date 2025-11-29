// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const APP_BOUNDARY_ALLOWLIST = [
  "@/config/errors",
  "@/db/schema/ancillary",
];

const appBoundaryRule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Prevent app layer from importing domain/database modules directly",
    },
    schema: [],
  },
  create(context) {
    const restrictedPrefixes = ["@/db", "@/domains"];

    function isAllowedImport(value) {
      return APP_BOUNDARY_ALLOWLIST.some(
        allowed => value === allowed || value.startsWith(`${allowed}/`)
      );
    }

    function checkSource(node, source) {
      if (!source || typeof source.value !== "string") {
        return;
      }

      const importPath = source.value;
      const isRestricted = restrictedPrefixes.some(prefix =>
        importPath.startsWith(prefix)
      );

      if (!isRestricted || isAllowedImport(importPath)) {
        return;
      }

      context.report({
        node: source,
        message:
          "App layer should call backend through server actions or API clients instead of importing '{{path}}'. Move the logic into app/_actions or use an allowed client/constant.",
        data: {
          path: importPath,
        },
      });
    }

    return {
      ImportDeclaration(node) {
        checkSource(node, node.source);
      },
      ExportNamedDeclaration(node) {
        if (node.source) {
          checkSource(node, node.source);
        }
      },
    };
  },
};

const eslintConfig = [
  // Global ignores
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "coverage/**",
      "*.config.js",
      "*.config.mjs",
      "next-env.d.ts",
      "pnpm-lock.yaml",
      "package-lock.json",
      "yarn.lock",
      ".source/**", // Fumadocs auto-generated files
      ".storybook/**", // Storybook config files
    ],
  }, // Base configurations
  ...compat.extends("next/core-web-vitals", "next/typescript"), // TypeScript and Import plugin configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "react/no-unescaped-entities": "off",

      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",

      // Organize TypeScript import and export orders
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // General code quality rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
      "no-duplicate-imports": "error",
    },
  }, // Prettier config must be the last to override conflicting rules
  ...compat.extends("prettier"),
  ...storybook.configs["flat/recommended"],
  {
    files: ["app/**/*.{ts,tsx}"],
    ignores: ["app/_actions/**", "app/api/**"],
    plugins: {
      "app-boundary": {
        rules: {
          "no-app-boundary-leaks": appBoundaryRule,
        },
      },
    },
    rules: {
      "app-boundary/no-app-boundary-leaks": "error",
    },
  },
];

export default eslintConfig;

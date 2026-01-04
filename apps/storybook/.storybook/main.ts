import type { StorybookConfig } from "@storybook/react-vite";
import react from "@vitejs/plugin-react";
import { dirname, join } from "path";
import remarkGfm from "remark-gfm";

/**
 * Resolve absolute path for monorepo packages
 * Required for Yarn PnP and monorepo setups
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: [
    // MDX documentation files in apps/storybook
    "../src/stories/**/*.mdx",
    // Story files in apps/storybook
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // TODO: Story files remain in apps/web (will be migrated with components)
    // "../../../apps/web/app/_stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@chromatic-com/storybook"),
    {
      name: getAbsolutePath("@storybook/addon-docs"),
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-vitest"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  staticDirs: ["../public"],

  core: {
    disableTelemetry: true,
  },

  viteFinal: async config => {
    // Ensure proper workspace package resolution
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@nomad/ui": join(__dirname, "../../../packages/ui/src"),
      // Temporary alias to apps/web until component migration is complete
      "@/components": join(__dirname, "../../../apps/web/app/_components"),
      "@/config": join(__dirname, "../../../apps/web/src/config"),
      "@/infra": join(__dirname, "../../../apps/web/src/infra"),
      "@": join(__dirname, "../../../apps/web/src"),
    };

    // Add React plugin with automatic JSX runtime
    config.plugins = config.plugins || [];
    config.plugins.push(
      react({
        jsxRuntime: "automatic",
      })
    );

    return config;
  },
};

export default config;

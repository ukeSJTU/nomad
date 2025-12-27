// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

import type { WebpackOverrideFn } from "@remotion/bundler";
import { Config } from "@remotion/cli/config";

// Configure Webpack to handle Tailwind CSS v4 and PostCSS
const webpackOverride: WebpackOverrideFn = currentConfiguration => {
  return {
    ...currentConfiguration,
    module: {
      ...currentConfiguration.module,
      rules: [
        ...(currentConfiguration.module?.rules || []).filter(rule => {
          // Remove default CSS rule from Remotion
          if (typeof rule === "object" && rule && "test" in rule) {
            return rule?.test?.toString() !== "/\\.css$/i";
          }
          return true;
        }),
        // Add our custom CSS rule with PostCSS support
        {
          test: /\.css$/i,
          use: [
            {
              loader: require.resolve("style-loader"),
            },
            {
              loader: require.resolve("css-loader"),
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: require.resolve("postcss-loader"),
              options: {
                postcssOptions: {
                  // Reference external postcss.config.mjs
                  // Use process.cwd() to ensure correct working directory
                  config: process.cwd(),
                },
              },
            },
          ],
        },
      ],
    },
  };
};

Config.overrideWebpackConfig(webpackOverride);
Config.setVideoImageFormat("jpeg");

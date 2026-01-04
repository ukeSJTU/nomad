// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

// Use official Tailwind v4 support from @remotion/tailwind-v4
// Refer to https://www.remotion.dev/docs/tailwind-v4/overview for more details
Config.overrideWebpackConfig(currentConfiguration => {
  return enableTailwind(currentConfiguration);
});

Config.setVideoImageFormat("jpeg");

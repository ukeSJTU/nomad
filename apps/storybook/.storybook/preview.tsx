import { UiProvider } from "@nomad/ui/platform";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

// Import global CSS from @nomad/ui
import "@nomad/ui/styles/globals.css";

// Import system fonts (replaces next/font)
import "../src/lib/fonts.css";

const preview: Preview = {
  tags: ["autodocs"],

  parameters: {
    options: {
      storySort: {
        order: ["介绍", "颜色", "字体", "其他", "*"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo", // 'todo' | 'error' | 'off'
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      source: {
        transform: (src: string) => {
          // Remove render function wrapper to show clean JSX
          const renderMatch = src.match(/render:\s*\(\)\s*=>\s*\(([\s\S]*)\)/);
          if (renderMatch) return renderMatch[1].trim();

          const renderMatch2 = src.match(/render:\s*\(\)\s*=>\s*([\s\S]*)/);
          if (renderMatch2) {
            return renderMatch2[1]
              .trim()
              .replace(/,?\s*}?\s*$/, "")
              .trim();
          }

          return src;
        },
      },
    },
  },

  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "circlehollow", title: "Light" },
          { value: "dark", icon: "circle", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;

      useEffect(() => {
        const htmlElement = document.documentElement;
        htmlElement.classList.remove("light", "dark");
        htmlElement.classList.add(theme);
      }, [theme]);

      // Provide HTML fallbacks for Link and Image adapters
      // (Storybook doesn't need Next.js features)
      const uiComponents = {
        Link: ({ href, children, ...props }: any) => (
          <a href={href} {...props}>
            {children}
          </a>
        ),
        Image: ({ src, alt, ...props }: any) => (
          <img src={src} alt={alt} {...props} />
        ),
      };

      return (
        <ThemeProvider
          attribute="class"
          defaultTheme={theme}
          enableSystem={false}
        >
          <UiProvider components={uiComponents}>
            <div className="font-sans antialiased">
              <Story />
            </div>
          </UiProvider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;

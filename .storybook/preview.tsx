import type { Preview } from "@storybook/nextjs-vite";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from "react";

import { ThemeProvider } from "../src/components/common/theme-provider";

import "../src/app/(frontend)/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    backgrounds: {
      disable: true,
    },

    docs: {
      source: {
        transform: (src: string) => {
          // Remove the render function wrapper to show only JSX
          const renderMatch = src.match(/render:\s*\(\)\s*=>\s*\(([\s\S]*)\)/);
          if (renderMatch) {
            return renderMatch[1].trim();
          }

          // Also handle render without parentheses
          const renderMatch2 = src.match(/render:\s*\(\)\s*=>\s*([\s\S]*)/);
          if (renderMatch2) {
            const code = renderMatch2[1].trim();
            // Remove trailing comma and braces if present
            return code.replace(/,?\s*}?\s*$/, "").trim();
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

      return (
        <ThemeProvider
          attribute="class"
          defaultTheme={theme}
          enableSystem={false}
        >
          <div
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;

import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <svg
            width="36"
            height="24"
            viewBox="0 0 175 87"
            aria-label="Nomad logo"
          >
            <title>Nomad logo</title>
            <polygon points="50,0 0,87 100,87" fill="#2A64A8" />
            <polygon points="75,0 175,0 125,87" fill="#EA5B2B" />
          </svg>
          Nomad
        </>
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [],
  };
}

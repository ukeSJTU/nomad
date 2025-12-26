// Import Fumadocs styles directly
import "fumadocs-ui/style.css";
import "katex/dist/katex.css";

import { Banner } from "fumadocs-ui/components/banner";
import { Construction } from "lucide-react";
import type { ReactNode } from "react";

export default function DocsGroupLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Banner id="global-banner" variant="rainbow">
        <Construction />
        This site is under construction.
      </Banner>
      {children}
    </>
  );
}

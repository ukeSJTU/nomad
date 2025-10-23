/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Twoslash from "fumadocs-twoslash/ui";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { Mermaid } from "@/components/fumadocs/mermaid";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: props => <ImageZoom {...(props as any)} />,
    Mermaid,
    ...Twoslash,
    ...components,
  };
}

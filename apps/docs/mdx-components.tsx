/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Twoslash from "fumadocs-twoslash/ui";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { Mermaid } from "@/components/mermaid";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    // biome-ignore lint/suspicious/noExplicitAny: Prop compatibility workaround
    img: props => <ImageZoom {...(props as any)} />,
    Mermaid,
    ...Twoslash,
    ...components,
  };
}

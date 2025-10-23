/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Twoslash from "fumadocs-twoslash/ui";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { Mermaid } from "@/components/fumadocs/mermaid";
// import { headingStyles } from "@/lib/fumadocs/heading.config";

/**
 * 自定义标题组件
 * 使用 heading.config.ts 中定义的样式
 * 如需切换样式方案,请修改导入的配置对象
 */
// const customHeadings: Partial<MDXComponents> = {
//   h1: props => <h1 className={headingStyles.h1} {...props} />,
//   h2: props => <h2 className={headingStyles.h2} {...props} />,
//   h3: props => <h3 className={headingStyles.h3} {...props} />,
//   h4: props => <h4 className={headingStyles.h4} {...props} />,
//   h5: props => <h5 className={headingStyles.h5} {...props} />,
//   h6: props => <h6 className={headingStyles.h6} {...props} />,
// };

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    // ...customHeadings, // 应用自定义标题样式
    img: props => <ImageZoom {...(props as any)} />,
    Mermaid,
    ...Twoslash,
    ...components,
  };
}

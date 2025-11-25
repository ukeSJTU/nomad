/**
 * MDX 标题样式配置
 *
 * 此文件定义了 MDX 文档中各级标题的显示样式
 * 修改这些配置可以改变文档中标题的外观
 */

export const headingStyles = {
  h1: "text-3xl font-semibold mb-8 pt-12 pb-4 border-b-2 border-primary",
  h2: "text-2xl font-semibold mb-6 mt-12 pt-4 pb-3 border-b border-muted-foreground/30",
  h3: "text-xl font-semibold mb-4 mt-8 text-primary",
  h4: "text-lg font-medium mb-3 mt-6 text-foreground/90",
  h5: "text-base font-medium mb-2 mt-4 text-foreground/75 italic",
  h6: "text-sm font-medium mb-2 mt-3 text-muted-foreground uppercase tracking-wider",
} as const;

/**
 * 样式方案示例
 *
 * 您可以根据需要选择不同的样式方案:
 */

// 方案 1: 极简风格 (无边框)
export const minimalHeadingStyles = {
  h1: "text-4xl font-bold mb-6 mt-8",
  h2: "text-3xl font-semibold mb-4 mt-8",
  h3: "text-2xl font-semibold mb-3 mt-6",
  h4: "text-xl font-medium mb-2 mt-4",
  h5: "text-lg font-medium mb-2 mt-3",
  h6: "text-base font-medium mb-1 mt-2",
} as const;

// 方案 2: 彩色强调风格
export const colorfulHeadingStyles = {
  h1: "text-4xl font-bold mb-6 mt-8 pb-2 border-b-4 border-gradient-to-r from-blue-500 to-purple-500",
  h2: "text-3xl font-semibold mb-4 mt-8 text-blue-600 dark:text-blue-400",
  h3: "text-2xl font-semibold mb-3 mt-6 text-purple-600 dark:text-purple-400",
  h4: "text-xl font-medium mb-2 mt-4 text-indigo-600 dark:text-indigo-400",
  h5: "text-lg font-medium mb-2 mt-3",
  h6: "text-base font-medium mb-1 mt-2",
} as const;

// 方案 3: 左侧竖线强调风格
export const sidebarHeadingStyles = {
  h1: "text-4xl font-bold mb-6 mt-8 pl-4 border-l-4 border-primary",
  h2: "text-3xl font-semibold mb-4 mt-8 pl-3 border-l-[3px] border-primary/70",
  h3: "text-2xl font-semibold mb-3 mt-6 pl-2 border-l-2 border-primary/50",
  h4: "text-xl font-medium mb-2 mt-4",
  h5: "text-lg font-medium mb-2 mt-3",
  h6: "text-base font-medium mb-1 mt-2",
} as const;

/**
 * 使用说明:
 *
 * 1. 默认使用 `headingStyles`
 * 2. 如需切换样式方案,在 mdx-components.tsx 中导入并使用其他方案
 * 3. 也可以直接修改 `headingStyles` 对象来自定义样式
 *
 * 示例:
 * ```tsx
 * import { minimalHeadingStyles as headingStyles } from "@/integrations/fumadocs/heading.config";
 *
 * const customHeadings: Partial<MDXComponents> = {
 *   h1: props => <h1 className={headingStyles.h1} {...props} />,
 *   h2: props => <h2 className={headingStyles.h2} {...props} />,
 *   // ...
 * };
 * ```
 */

"use client";

import * as React from "react";

export type LinkProps = React.PropsWithChildren<{
  href: string;
  className?: string;
  target?: string;
  rel?: string;
  prefetch?: boolean;
  replace?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}>;

export type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  loading?: "lazy" | "eager";
};

type UiComponents = {
  Link?: React.ComponentType<LinkProps>;
  Image?: React.ComponentType<ImageProps>;
};

// 默认适配器上下文，避免组件直接依赖 Next（可在上层一次性注入 NextLink/NextImage）
const UiContext = React.createContext<Required<UiComponents>>({
  // 默认退化实现，保证非 Next 环境也能工作
  Link: ({ href, children, ...rest }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
  Image: ({ src, alt, ...rest }) => <img src={src} alt={alt} {...rest} />,
});

export function UiProvider({
  components,
  children,
}: {
  components?: UiComponents;
  children: React.ReactNode;
}) {
  // 先读取当前上下文，再用 useMemo 合并，避免在 useMemo 内调用 Hook
  const inherited = React.useContext(UiContext);
  const merged = React.useMemo(
    () => ({ ...inherited, ...components }),
    [inherited, components]
  );

  return <UiContext.Provider value={merged}>{children}</UiContext.Provider>;
}

export function useUiComponents() {
  return React.useContext(UiContext);
}

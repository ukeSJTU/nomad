"use client";

import { SiteHeader } from "@nomad/ui/components/common/site-header";
import { UiProvider } from "@nomad/ui/platform";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Remotion 环境没有 Next，提供最简的 Link/Image 适配器
const LinkStub = ({
  href,
  children,
  ...rest
}: { href: string } & React.HTMLProps<HTMLAnchorElement>) => (
  <a href={href} {...rest}>
    {children}
  </a>
);
const ImgStub = (
  props: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }
) => <Img {...props} />;

const ORDER_LINKS = [
  { label: "机票订单", href: "#" },
  { label: "酒店订单", href: "#" },
  { label: "全部订单", href: "#" },
];
const CONTACT_LINES = ["境内：95010", "其他地区：+86-21-3406-4888"];

export const SiteHeaderScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 简单动画：从上方滑入 + 渐显
  const progress = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120 },
  });
  const translateY = interpolate(progress, [0, 1], [-40, 0]);
  const opacity = progress;

  return (
    <UiProvider components={{ Link: LinkStub, Image: ImgStub }}>
      <div
        // Remotion Player 默认黑底，这里强制白底，便于看出真实布局
        className="flex h-full w-full items-start justify-start bg-white text-slate-900"
        style={{ transform: `translateY(${translateY}px)`, opacity }}
      >
        <SiteHeader
          logo={{
            src: staticFile("logo.png"),
            alt: "Nomad",
            href: "#",
            label: "Nomad",
          }}
          searchSlot={
            <div className="h-10 w-full max-w-md rounded bg-slate-200" />
          } // 占位
          userMenuSlot={<div className="h-10 w-10 rounded-full bg-slate-300" />} // 占位
          orderLinks={ORDER_LINKS}
          contactLink={{ label: "访问客服中心 →", href: "#" }}
          contactLines={CONTACT_LINES}
          theme="light"
          onToggleTheme={() => {}}
        />
      </div>
    </UiProvider>
  );
};

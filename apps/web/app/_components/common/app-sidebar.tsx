"use client";

import { AppSidebar as AppSidebarUI } from "@nomad/ui/components/common/app-sidebar";
import type {
  MenuItem,
  SubItem,
} from "@nomad/ui/components/common/app-sidebar-types";
import { Sidebar } from "@nomad/ui/components/primitives/sidebar";
import {
  Album,
  Building2,
  BusFront,
  CarTaxiFront,
  CreditCard,
  Earth,
  Flag,
  Frame,
  Gift,
  Hotel,
  Info,
  LucideIcon,
  Map,
  Plane,
  Sparkles,
  Ticket,
  Train,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

// Type definitions for data structure (without isActive/activeSubItemKey)
type DataSubItem = Omit<SubItem, "key"> & { title: string; url: string };

type DataMenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: DataSubItem[];
};

type SidebarData = {
  travel: DataMenuItem[];
  business: DataMenuItem[];
  finance: DataMenuItem[];
  extras: DataMenuItem[];
};

// Sidebar data structure
export const data: SidebarData = {
  // Travel group - 旅行相关
  travel: [
    {
      title: "酒店",
      url: "#",
      icon: Hotel,
      items: [
        { title: "国内酒店", url: "#" },
        { title: "海外酒店", url: "#" },
      ],
    },
    {
      title: "机票",
      url: "/flights",
      icon: Plane,
      items: [
        { title: "国内/国际/中国港澳台", url: "/flights" },
        { title: "特价机票", url: "/flights/special" },
        { title: "航班动态", url: "/flights/status" },
        { title: "在线选座", url: "/flights/seat" },
        { title: "退票改签", url: "/flights/refund" },
        { title: "更多服务", url: "/flights/more" },
      ],
    },
    {
      title: "火车票",
      url: "#",
      icon: Train,
      items: [
        { title: "国内火车票", url: "#" },
        { title: "国际/中国港澳台", url: "#" },
      ],
    },
    {
      title: "旅游",
      url: "#",
      icon: Flag,
      items: [
        { title: "国内游", url: "#" },
        { title: "出境游", url: "#" },
        { title: "自由行", url: "#" },
      ],
    },
    {
      title: "门票·活动",
      url: "#",
      icon: Ticket,
      items: [
        { title: "景点门票", url: "#" },
        { title: "演出活动", url: "#" },
      ],
    },
    {
      title: "汽车·船票",
      url: "#",
      icon: BusFront,
      items: [
        { title: "汽车票", url: "#" },
        { title: "船票", url: "#" },
      ],
    },
    {
      title: "用车",
      url: "#",
      icon: CarTaxiFront,
      items: [
        { title: "国内租车", url: "#" },
        { title: "境外租车", url: "#" },
        { title: "接送机站", url: "#" },
        { title: "拼车", url: "#" },
      ],
    },
  ],
  // Business group - 商务相关
  business: [
    {
      title: "企业商旅",
      url: "#",
      icon: Building2,
    },
    {
      title: "老友会",
      url: "#",
      icon: Frame,
    },
    {
      title: "关于Nomad",
      url: "/docs",
      icon: Info,
    },
  ],
  // Finance group - 金融相关
  finance: [
    {
      title: "全球购",
      url: "#",
      icon: Earth,
    },
    {
      title: "礼品卡",
      url: "#",
      icon: Gift,
    },
    {
      title: "携程金融",
      url: "#",
      icon: CreditCard,
    },
  ],
  // Extras group - 额外功能
  extras: [
    {
      title: "AI行程助手",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "攻略·景点",
      url: "#",
      icon: Album,
    },
    {
      title: "旅游地图",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper function to check if a URL matches the current location
  const isUrlActive = useCallback(
    (url: string) => {
      // Don't match "#" URLs
      if (url === "#") return false;

      try {
        const urlObj = new URL(url, window.location.origin);
        const urlPath = urlObj.pathname;
        const urlParams = urlObj.searchParams;

        // Check if pathname matches
        if (pathname !== urlPath) return false;

        // If URL has no query params, just check pathname
        if (urlParams.toString() === "") return true;

        // Check if all URL params match current search params
        for (const [key, value] of urlParams.entries()) {
          if (searchParams.get(key) !== value) return false;
        }

        return true;
      } catch {
        // If URL parsing fails, fall back to simple pathname comparison
        return pathname === url;
      }
    },
    [pathname, searchParams]
  );

  // Helper to generate key from title
  const generateKey = (title: string): string => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  // Transform data to include isActive and activeSubItemKey
  const sections = useMemo(() => {
    const transformMenuItems = (items: DataMenuItem[]): MenuItem[] => {
      return items.map(item => {
        const isMainActive = isUrlActive(item.url);
        const activeSubItem = item.items?.find(subItem =>
          isUrlActive(subItem.url)
        );
        const isActive = isMainActive || !!activeSubItem;

        return {
          key: generateKey(item.title),
          title: item.title,
          url: item.url,
          icon: item.icon,
          items: item.items?.map(subItem => ({
            key: generateKey(subItem.title),
            title: subItem.title,
            url: subItem.url,
          })),
          isActive,
          activeSubItemKey: activeSubItem
            ? generateKey(activeSubItem.title)
            : undefined,
        };
      });
    };

    return {
      travel: transformMenuItems(data.travel),
      extras: transformMenuItems(data.extras),
      business: transformMenuItems(data.business),
      finance: transformMenuItems(data.finance),
    };
  }, [isUrlActive]);

  const handleNavigate = useCallback(
    (url: string, title: string) => {
      if (url === "#") {
        toast.info(`"${title}" 功能暂未实现`, {
          description: "该功能正在开发中，敬请期待",
        });
      } else {
        router.push(url);
      }
    },
    [router]
  );

  return (
    <AppSidebarUI sections={sections} onNavigate={handleNavigate} {...props} />
  );
}

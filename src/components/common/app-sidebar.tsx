"use client";

import {
  Bed,
  Building2,
  Bus,
  Car,
  Compass,
  CreditCard,
  Frame,
  Gift,
  Globe,
  Info,
  LucideIcon,
  Map,
  Menu,
  Plane,
  ShoppingCart,
  Sparkles,
  Ticket,
  Train,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

// Type definitions
type SubItem = {
  title: string;
  url: string;
};

type MenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: SubItem[];
};

type SidebarData = {
  travel: MenuItem[];
  business: MenuItem[];
  finance: MenuItem[];
  extras: MenuItem[];
};

// Sidebar data structure
export const data: SidebarData = {
  // Travel group - 旅行相关
  travel: [
    {
      title: "酒店",
      url: "#",
      icon: Bed,
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
      icon: Globe,
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
      icon: Bus,
      items: [
        { title: "汽车票", url: "#" },
        { title: "船票", url: "#" },
      ],
    },
    {
      title: "用车",
      url: "#",
      icon: Car,
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
      icon: ShoppingCart,
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
      icon: Compass,
    },
    {
      title: "旅游地图",
      url: "#",
      icon: Map,
    },
  ],
};

// Menu item component with hover card for sub-items
function SidebarMenuItemWithHover({ item }: { item: MenuItem }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { state: sidebarState } = useSidebar();
  const Icon = item.icon;
  const hasSubItems = item.items && item.items.length > 0;

  // Helper function to check if a URL matches the current location
  const isUrlActive = useCallback(
    (url: string) => {
      // Don't match "#" URLs
      if (url === "#") return false;

      try {
        const urlObj = new URL(url, "http://localhost");
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

  // Check if current item or any of its sub-items is active
  const isMainActive = isUrlActive(item.url);
  const activeSubItem = hasSubItems
    ? item.items?.find(subItem => isUrlActive(subItem.url))
    : null;
  const isActive = isMainActive || !!activeSubItem;

  // Only expand sub-items if active AND sidebar is expanded
  const shouldExpandSubItems = isActive && sidebarState === "expanded";

  const handleClick = (url: string, title: string) => {
    if (url === "#") {
      toast.info(`"${title}" 功能暂未实现`, {
        description: "该功能正在开发中，敬请期待",
      });
    } else {
      router.push(url);
    }
  };

  const menuButton = (
    <SidebarMenuButton
      onClick={() => handleClick(item.url, item.title)}
      className={cn(
        "h-9 cursor-pointer px-2 group-data-[collapsible=icon]:grid group-data-[collapsible=icon]:place-items-center group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:[&>span:last-child]:hidden [&>svg]:size-6",
        "group-data-[collapsible=icon]:[&>svg]:-translate-x-[0.5px]",
        isActive &&
          "bg-blue-500 text-white hover:bg-blue-600 hover:text-white rounded-full"
      )}
    >
      <Icon className="size-4" strokeWidth={1.5} />
      <span className="text-sm">{item.title}</span>
    </SidebarMenuButton>
  );

  // If no sub-items, just return the button
  if (!hasSubItems) {
    return <SidebarMenuItem>{menuButton}</SidebarMenuItem>;
  }

  // If has sub-items and should expand, show sub-items below
  if (shouldExpandSubItems) {
    return (
      <div className="space-y-0">
        <SidebarMenuItem>{menuButton}</SidebarMenuItem>
        <div className="ml-2 space-y-0">
          {item.items?.map(subItem => {
            const isSubActive = isUrlActive(subItem.url);
            return (
              <Button
                key={subItem.title}
                variant="ghost"
                onClick={() => handleClick(subItem.url, subItem.title)}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm rounded-md transition-colors justify-start",
                  isSubActive
                    ? "text-blue-500 font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {subItem.title}
              </Button>
            );
          })}
        </div>
      </div>
    );
  }

  // If has sub-items but not expanded, wrap with HoverCard
  return (
    <SidebarMenuItem>
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>{menuButton}</HoverCardTrigger>
        <HoverCardContent
          side="right"
          align="start"
          className="w-56 p-2"
          sideOffset={8}
        >
          <div className="space-y-1">
            {item.items?.map(subItem => (
              <button
                key={subItem.title}
                onClick={() => handleClick(subItem.url, subItem.title)}
                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {subItem.title}
              </button>
            ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    </SidebarMenuItem>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="gap-2 p-2 pl-3 flex items-center justify-start">
        {/* Toggle sidebar button */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              aria-label="Toggle Sidebar"
              className="size-9 grid place-items-center rounded-md group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:ml-[8.5px] [&>svg]:size-6 [&>svg]:-translate-y-[3px] [&>svg]:translate-x-[-1px] 
              group-data-[collapsible=icon]:[&>svg]:translate-x-0 group-data-[collapsible=icon]:[&>svg]:translate-y-0 transition-transform duration-200 ease-linear"
              onClick={() => toggleSidebar()}
            >
              <Menu strokeWidth={1.25} className="text-black" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Travel Group */}
        <SidebarGroup className="px-1">
          <SidebarGroupContent>
            <SidebarMenu className="group-data-[collapsible=icon]:gap-3 group-data-[collapsible=icon]:grid group-data-[collapsible=icon]:place-items-center">
              {data.travel.map(item => (
                <SidebarMenuItemWithHover key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-auto w-[calc(100%-1rem)]" />

        {/* Business Group */}
        <SidebarGroup className="px-1">
          <SidebarGroupContent>
            <SidebarMenu className="group-data-[collapsible=icon]:gap-3 group-data-[collapsible=icon]:grid group-data-[collapsible=icon]:place-items-center">
              {data.business.map(item => (
                <SidebarMenuItemWithHover key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-auto w-[calc(100%-1rem)]" />

        {/* Finance Group */}
        <SidebarGroup className="px-1">
          <SidebarGroupContent>
            <SidebarMenu className="group-data-[collapsible=icon]:gap-3 group-data-[collapsible=icon]:grid group-data-[collapsible=icon]:place-items-center">
              {data.finance.map(item => (
                <SidebarMenuItemWithHover key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-auto w-[calc(100%-1rem)]" />

        {/* Extras Group */}
        <SidebarGroup className="px-1">
          <SidebarGroupContent>
            <SidebarMenu className="group-data-[collapsible=icon]:gap-3 group-data-[collapsible=icon]:grid group-data-[collapsible=icon]:place-items-center">
              {data.extras.map(item => (
                <SidebarMenuItemWithHover key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

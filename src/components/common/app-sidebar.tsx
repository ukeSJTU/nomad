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
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

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
        { title: "国内/国际/中国港澳台", url: "/flights?tab=domestic" },
        { title: "特价机票", url: "/flights?tab=special" },
        { title: "航班动态", url: "/flights?tab=status" },
        { title: "在线选座", url: "/flights?tab=seat" },
        { title: "退票改签", url: "/flights?tab=refund" },
        { title: "更多服务", url: "/flights?tab=more" },
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
      title: "关于携程",
      url: "#",
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
  const Icon = item.icon;
  const hasSubItems = item.items && item.items.length > 0;

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
      className="h-11 cursor-pointer"
      tooltip={item.title}
    >
      <Icon className="size-5" />
      <span>{item.title}</span>
    </SidebarMenuButton>
  );

  // If no sub-items, just return the button
  if (!hasSubItems) {
    return <SidebarMenuItem>{menuButton}</SidebarMenuItem>;
  }

  // If has sub-items, wrap with HoverCard
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
            {item.items?.map((subItem, index) => (
              <button
                key={index}
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
    <Sidebar collapsible="icon" className="w-48" {...props}>
      <SidebarHeader className="gap-2 p-2 flex items-center justify-center">
        {/* Toggle sidebar button */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              aria-label="Toggle Sidebar"
              className="size-11 p-3.5 justify-center rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 [&>svg]:size-7"
              onClick={() => toggleSidebar()}
            >
              <Menu strokeWidth={1.5} className="text-black" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Travel Group */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.travel.map((item, index) => (
                <SidebarMenuItemWithHover key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-2" />

        {/* Business Group */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.business.map((item, index) => (
                <SidebarMenuItemWithHover key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-2" />

        {/* Finance Group */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.finance.map((item, index) => (
                <SidebarMenuItemWithHover key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-2" />

        {/* Extras Group */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.extras.map((item, index) => (
                <SidebarMenuItemWithHover key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

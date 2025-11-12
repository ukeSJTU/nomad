"use client";

import {
  Bed,
  Car,
  Compass,
  Frame,
  Globe,
  Info,
  Map,
  Menu,
  Plane,
  Train,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/common/nav-main";
import { NavProjects } from "@/components/common/nav-projects";
// import { NavUser } from "@/components/common/nav-user"
// Removed TeamSwitcher (Acme module) as requested
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
  },
  // teams removed
  navMain: [
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
      title: "酒店",
      url: "#",
      icon: Bed,
      items: [
        { title: "国内酒店", url: "#" },
        { title: "海外酒店", url: "#" },
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
  ],
  projects: [
    { name: "行程助手", url: "#", icon: Frame },
    { name: "景点攻略", url: "#", icon: Compass },
    { name: "旅游地图", url: "#", icon: Map },
    { name: "关于Nomad", url: "#", icon: Info },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="gap-2 p-2">
        {/* First button: toggle sidebar expand/collapse */}
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
        {/* TeamSwitcher removed */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

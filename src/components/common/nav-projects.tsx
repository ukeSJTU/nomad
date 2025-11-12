"use client";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { toast } from "@/components/ui/sonner";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Guides</SidebarGroupLabel>
      <SidebarMenu className="gap-2">
        {projects.map(item => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild className="h-10">
              {item.url !== "#" ? (
                <Link href={item.url}>
                  <item.icon className="text-black" strokeWidth={1.5} />
                  <span>{item.name}</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    toast(<span className="font-semibold">功能尚未实现</span>, {
                      description: "当前模块为演示版本，敬请期待正式上线。",
                      duration: 3000,
                    })
                  }
                >
                  <item.icon className="text-black" strokeWidth={1.5} />
                  <span>{item.name}</span>
                </button>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

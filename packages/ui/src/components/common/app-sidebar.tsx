"use client";

import { Button } from "@ukesjtu/nomad-ui/components/primitives/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@ukesjtu/nomad-ui/components/primitives/hover-card";
import { Separator } from "@ukesjtu/nomad-ui/components/primitives/separator";
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
} from "@ukesjtu/nomad-ui/components/primitives/sidebar";
import { cn } from "@ukesjtu/nomad-ui/lib/utils";
import { Menu } from "lucide-react";
import type { AppSidebarProps, MenuItem } from "./app-sidebar-types";

// Menu item component with hover card for sub-items
function SidebarMenuItemWithHover({
  item,
  onNavigate,
}: {
  item: MenuItem;
  onNavigate: (url: string, title: string) => void;
}) {
  const { state: sidebarState } = useSidebar();
  const Icon = item.icon;
  const hasSubItems = item.items && item.items.length > 0;

  // Only expand sub-items if active AND sidebar is expanded
  const shouldExpandSubItems = item.isActive && sidebarState === "expanded";

  const menuButton = (
    <SidebarMenuButton
      onClick={() => onNavigate(item.url, item.title)}
      className={cn(
        "h-9 cursor-pointer px-2 group-data-[collapsible=icon]:grid group-data-[collapsible=icon]:place-items-center group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:[&>span:last-child]:hidden [&>svg]:size-6",
        "group-data-[collapsible=icon]:[&>svg]:-translate-x-[0.5px]",
        item.isActive &&
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
            const isSubActive = subItem.key === item.activeSubItemKey;
            return (
              <Button
                key={subItem.key}
                variant="ghost"
                onClick={() => onNavigate(subItem.url, subItem.title)}
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
                key={subItem.key}
                onClick={() => onNavigate(subItem.url, subItem.title)}
                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                type="button"
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

export function AppSidebar({
  sections,
  onNavigate,
  ...props
}: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
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
              {sections.travel.map(item => (
                <SidebarMenuItemWithHover
                  key={item.key}
                  item={item}
                  onNavigate={onNavigate}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-auto w-[calc(100%-1rem)]" />

        {/* Extras Group */}
        <SidebarGroup className="px-1">
          <SidebarGroupContent>
            <SidebarMenu className="group-data-[collapsible=icon]:gap-3 group-data-[collapsible=icon]:grid group-data-[collapsible=icon]:place-items-center">
              {sections.extras.map(item => (
                <SidebarMenuItemWithHover
                  key={item.key}
                  item={item}
                  onNavigate={onNavigate}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-auto w-[calc(100%-1rem)]" />

        {/* Business Group */}
        <SidebarGroup className="px-1">
          <SidebarGroupContent>
            <SidebarMenu className="group-data-[collapsible=icon]:gap-3 group-data-[collapsible=icon]:grid group-data-[collapsible=icon]:place-items-center">
              {sections.business.map(item => (
                <SidebarMenuItemWithHover
                  key={item.key}
                  item={item}
                  onNavigate={onNavigate}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-auto w-[calc(100%-1rem)]" />

        {/* Finance Group */}
        <SidebarGroup className="px-1">
          <SidebarGroupContent>
            <SidebarMenu className="group-data-[collapsible=icon]:gap-3 group-data-[collapsible=icon]:grid group-data-[collapsible=icon]:place-items-center">
              {sections.finance.map(item => (
                <SidebarMenuItemWithHover
                  key={item.key}
                  item={item}
                  onNavigate={onNavigate}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

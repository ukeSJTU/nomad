"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { toast } from "@/components/ui/sonner";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { state } = useSidebar();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [openStates, setOpenStates] = React.useState<
    Record<string, boolean | undefined>
  >({});

  const isSubItemActive = React.useCallback(
    (url: string): boolean => {
      if (!url || url === "#") return false;
      const [path, query] = url.split("?");
      if (path && path !== pathname) return false;
      if (!query) return true;
      const qs = new URLSearchParams(query);
      for (const [key, value] of qs.entries()) {
        if (searchParams.get(key) !== value) return false;
      }
      return true;
    },
    [pathname, searchParams]
  );
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Reservation</SidebarGroupLabel>
      <SidebarMenu className="gap-2">
        {items.map(item => {
          const sectionActive =
            (item.url && item.url !== "#" && pathname.startsWith(item.url)) ||
            (item.items?.some(s => isSubItemActive(s.url)) ?? false);
          const override = openStates[item.title];
          const open =
            typeof override !== "undefined" ? override : sectionActive;
          const handleOpenChange = (next: boolean) => {
            setOpenStates(prev => ({ ...prev, [item.title]: next }));
          };
          return (
            <Collapsible
              key={item.title}
              asChild
              open={open}
              onOpenChange={handleOpenChange}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <div className="flex items-center">
                  <SidebarMenuButton
                    tooltip={item.title}
                    asChild
                    isActive={sectionActive}
                    className="h-10 data-[active=true]:bg-neutral-200! dark:data-[active=true]:bg-neutral-800! data-[active=true]:text-neutral-950! dark:data-[active=true]:text-neutral-100! data-[active=true]:relative data-[active=true]:after:absolute data-[active=true]:after:left-0 data-[active=true]:after:right-0 data-[active=true]:after:bottom-0 data-[active=true]:after:h-0.5 data-[active=true]:after:bg-neutral-300 dark:data-[active=true]:after:bg-neutral-700"
                  >
                    {item.url !== "#" ? (
                      <Link
                        href={item.url}
                        prefetch={false}
                        onClick={e => {
                          e.preventDefault();
                          router.replace(item.url);
                        }}
                      >
                        {item.icon && (
                          <item.icon className="text-black" strokeWidth={1.5} />
                        )}
                        <span>{item.title}</span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          toast(
                            <span className="font-semibold">功能尚未实现</span>,
                            {
                              description:
                                "当前模块为演示版本，敬请期待正式上线。",
                              duration: 3000,
                            }
                          )
                        }
                      >
                        {item.icon && (
                          <item.icon className="text-black" strokeWidth={1.5} />
                        )}
                        <span>{item.title}</span>
                      </button>
                    )}
                  </SidebarMenuButton>
                  {state === "collapsed" ? null : (
                    <CollapsibleTrigger asChild>
                      <button
                        aria-label={`Toggle ${item.title}`}
                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-black group-data-[collapsible=icon]:hidden"
                      >
                        <ChevronRight strokeWidth={1.5} />
                      </button>
                    </CollapsibleTrigger>
                  )}
                </div>
                <CollapsibleContent>
                  <SidebarMenuSub className="translate-x-px">
                    {item.items?.map(subItem => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isSubItemActive(subItem.url)}
                          className="translate-x-0 h-auto min-h-9 py-1 pr-2 items-start overflow-visible [&>span:last-child]:whitespace-normal [&>span:last-child]:break-words [&>span:last-child]:leading-snug [&>span:last-child]:overflow-visible data-[active=true]:bg-neutral-200! dark:data-[active=true]:bg-neutral-800! data-[active=true]:text-neutral-950! dark:data-[active=true]:text-neutral-100! data-[active=true]:relative data-[active=true]:after:absolute data-[active=true]:after:left-0 data-[active=true]:after:right-0 data-[active=true]:after:bottom-0 data-[active=true]:after:h-0.5 data-[active=true]:after:bg-neutral-300 dark:data-[active=true]:after:bg-neutral-700"
                        >
                          {subItem.url !== "#" ? (
                            <Link
                              href={subItem.url}
                              prefetch={false}
                              onClick={e => {
                                e.preventDefault();
                                router.replace(subItem.url);
                              }}
                            >
                              <span>{subItem.title}</span>
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                toast(
                                  <span className="font-semibold">
                                    功能尚未实现
                                  </span>,
                                  {
                                    description:
                                      "当前模块为演示版本，敬请期待正式上线。",
                                    duration: 3000,
                                  }
                                )
                              }
                            >
                              <span>{subItem.title}</span>
                            </button>
                          )}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

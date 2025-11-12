"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

// Type definition for menu items
type MenuItem = {
  title: string;
  href?: string; // href is optional for parent items with children
  implemented?: boolean;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { title: "我的携程首页", href: "/home" },
  { title: "订单", href: "/home/orders" },
  { title: "我的消息", href: "/home/messages", implemented: false },
  {
    title: "钱包",
    children: [
      { title: "我的钱包", href: "/home/wallets", implemented: false },
      {
        title: "钱包安全设置",
        href: "/home/wallets/security",
        implemented: false,
      },
    ],
  },
  { title: "礼品卡", href: "/home/gift-cards", implemented: false },
  { title: "优惠券", href: "/home/coupons", implemented: false },
  { title: "积分", href: "/home/points", implemented: false },
  { title: "我的收藏", href: "/home/favorites", implemented: false },
  {
    title: "常用信息",
    children: [
      { title: "常用旅客信息", href: "/home/passengers" },
      { title: "常用联系人", href: "/home/contacts", implemented: false },
      { title: "常用报销凭证", href: "/home/invoices", implemented: false },
      { title: "常用地址", href: "/home/addresses", implemented: false },
    ],
  },
  {
    title: "个人中心",
    children: [
      { title: "我的信息", href: "/home/info" },
      { title: "绑定和关联", href: "/home/accounts" },
      { title: "账户安全", href: "/home/security" },
      { title: "我的社区主页", href: "/home/community", implemented: false },
    ],
  },
];

export default function UserSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Handle navigation with implementation check (only for items without children)
  const handleNavigation = (item: MenuItem, e: React.MouseEvent) => {
    // If item has children, don't navigate - let collapsible handle it
    if (item.children && item.children.length > 0) {
      return;
    }

    e.preventDefault();

    // Check if the page is implemented
    if (item.implemented === false) {
      toast.info("功能开发中", {
        description: `${item.title} 功能正在开发中,敬请期待!`,
      });
      return;
    }

    // Navigate to the page if implemented and has href
    if (item.href) {
      router.push(item.href);
    }
  };

  // Render menu item with optional children
  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      // Parent item with children - only expand/collapse, no navigation
      return (
        <Collapsible key={item.title} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <span>{item.title}</span>
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.children!.map(child => {
                  const isChildActive = pathname === child.href;
                  return (
                    <SidebarMenuSubItem key={child.title}>
                      <SidebarMenuSubButton
                        isActive={isChildActive}
                        onClick={e => handleNavigation(child, e)}
                      >
                        <span>{child.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    // Leaf item without children - can navigate
    const isActive = pathname === item.href;
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton
          isActive={isActive}
          onClick={e => handleNavigation(item, e)}
        >
          <span>{item.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <SidebarProvider>
      <Sidebar className="w-[200px]">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>{menuItems.map(renderMenuItem)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}

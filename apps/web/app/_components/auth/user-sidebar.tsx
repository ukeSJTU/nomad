"use client";

import type { UserSidebarMenuItem } from "@ukesjtu/nomad-ui/components/auth";
import { UserSidebar as UserSidebarUI } from "@ukesjtu/nomad-ui/components/auth";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const menuItems: UserSidebarMenuItem[] = [
  { title: "我的携程首页", href: "#", isImplemented: false },
  { title: "订单", href: "/home/orders" },
  { title: "我的消息", href: "/home/messages", isImplemented: false },
  {
    title: "钱包",
    children: [
      { title: "我的钱包", href: "/home/wallets" },
      {
        title: "钱包安全设置",
        href: "/home/wallets/security",
        isImplemented: false,
      },
    ],
  },
  { title: "礼品卡", href: "/home/gift-cards", isImplemented: false },
  { title: "优惠券", href: "/home/coupons", isImplemented: false },
  { title: "积分", href: "/home/points", isImplemented: false },
  { title: "我的收藏", href: "/home/favorites", isImplemented: false },
  {
    title: "常用信息",
    children: [
      { title: "常用旅客信息", href: "/home/passengers" },
      { title: "常用联系人", href: "/home/contacts", isImplemented: false },
      { title: "常用报销凭证", href: "/home/invoices", isImplemented: false },
      { title: "常用地址", href: "/home/addresses", isImplemented: false },
    ],
  },
  {
    title: "个人中心",
    children: [
      { title: "我的信息", href: "/home/info" },
      { title: "绑定和关联", href: "/home/accounts" },
      { title: "账户安全", href: "/home/security" },
      { title: "我的社区主页", href: "/home/community", isImplemented: false },
    ],
  },
];

export default function UserSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Check if a menu item is active (supports sub-paths)
  const isMenuItemActive = (href?: string): boolean => {
    if (!href) return false;
    // Exact match or starts with href followed by /
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Mark active states in menu items
  const markActiveItems = (
    items: UserSidebarMenuItem[]
  ): UserSidebarMenuItem[] => {
    return items.map(item => {
      if (item.children) {
        return {
          ...item,
          children: markActiveItems(item.children),
        };
      }
      return {
        ...item,
        isActive: isMenuItemActive(item.href),
      };
    });
  };

  const itemsWithActiveState = markActiveItems(menuItems);

  // Handle click for unimplemented features
  const handleUnimplementedClick = (title: string) => {
    toast.info("功能开发中", {
      description: `${title} 功能正在开发中,敬请期待!`,
    });
  };

  // Handle navigation
  const handleNavigate = (href: string) => {
    router.push(href);
  };

  return (
    <UserSidebarUI
      items={itemsWithActiveState}
      onNavigate={handleNavigate}
      onUnimplementedClick={handleUnimplementedClick}
    />
  );
}

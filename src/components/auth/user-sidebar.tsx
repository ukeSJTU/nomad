"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

  // Check if parent item should be open or not
  const shouldBeOpen = (item: MenuItem): boolean => {
    if (!item.children) return false;
    return item.children.some(child => child.href === pathname);
  };

  // Handle click for unimplemented features
  const handleUnimplementedClick = (title: string) => {
    toast.info("功能开发中", {
      description: `${title} 功能正在开发中,敬请期待!`,
    });
  };

  // Render menu item with optional children (recursive)
  const renderMenuItem = (item: MenuItem): React.ReactNode => {
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      const isOpen = shouldBeOpen(item);

      // Parent item with children - only expand/collapse, no navigation
      return (
        <Collapsible
          key={item.title}
          className="simple/collapsible"
          defaultOpen={isOpen}
        >
          <div>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between font-medium"
              >
                <span>{item.title}</span>
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="ml-2 space-y-1 mt-1">
                {item.children!.map(child => renderMenuItem(child))}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      );
    }

    // Leaf item without children
    const isActive = pathname === item.href;
    const isImplemented = item.implemented !== false;

    // If not implemented, use Button with onClick
    if (!isImplemented) {
      return (
        <Button
          key={item.title}
          variant="ghost"
          className="w-full justify-start pl-4"
          onClick={() => handleUnimplementedClick(item.title)}
        >
          <span>{item.title}</span>
        </Button>
      );
    }

    // If implemented and has href, use Link with Button
    if (item.href) {
      return (
        <Button
          key={item.title}
          variant={isActive ? "default" : "ghost"}
          className="w-full justify-start pl-4"
          asChild
        >
          <Link href={item.href}>
            <span>{item.title}</span>
          </Link>
        </Button>
      );
    }

    // Fallback (shouldn't happen)
    return null;
  };

  return <div className="space-y-1">{menuItems.map(renderMenuItem)}</div>;
}

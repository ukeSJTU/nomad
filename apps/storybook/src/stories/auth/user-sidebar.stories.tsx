import type { UserSidebarMenuItem } from "@nomad/ui/components/auth";
import { UserSidebar } from "@nomad/ui/components/auth";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

const meta = {
  title: "Auth/UserSidebar",
  component: UserSidebar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    items: { control: "object" },
    onNavigate: { action: "navigated" },
    onUnimplementedClick: { action: "unimplemented clicked" },
  },
  decorators: [
    Story => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseMenuItems: UserSidebarMenuItem[] = [
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

export const Default: Story = {
  args: {
    items: baseMenuItems,
    onNavigate: fn(),
    onUnimplementedClick: fn(),
  },
};

export const WithActiveItem: Story = {
  args: {
    items: baseMenuItems.map(item =>
      item.href === "/home/orders" ? { ...item, isActive: true } : item
    ),
    onNavigate: fn(),
    onUnimplementedClick: fn(),
  },
};

export const WithActiveChildItem: Story = {
  args: {
    items: baseMenuItems.map(item => {
      if (item.title === "常用信息" && item.children) {
        return {
          ...item,
          children: item.children.map(child =>
            child.href === "/home/passengers"
              ? { ...child, isActive: true }
              : child
          ),
        };
      }
      return item;
    }),
    onNavigate: fn(),
    onUnimplementedClick: fn(),
  },
};

export const WithNestedActiveItem: Story = {
  args: {
    items: baseMenuItems.map(item => {
      if (item.title === "个人中心" && item.children) {
        return {
          ...item,
          children: item.children.map(child =>
            child.href === "/home/security"
              ? { ...child, isActive: true }
              : child
          ),
        };
      }
      return item;
    }),
    onNavigate: fn(),
    onUnimplementedClick: fn(),
  },
};

export const EmptyMenu: Story = {
  args: {
    items: [],
    onNavigate: fn(),
    onUnimplementedClick: fn(),
  },
};

export const OnlyTopLevel: Story = {
  args: {
    items: [
      { title: "订单", href: "/home/orders" },
      { title: "我的消息", href: "/home/messages", isImplemented: false },
      { title: "礼品卡", href: "/home/gift-cards", isImplemented: false },
    ],
    onNavigate: fn(),
    onUnimplementedClick: fn(),
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { BreadcrumbNav } from "@ukesjtu/nomad-ui/components/common";

const meta = {
  title: "Common/BreadcrumbNav",
  component: BreadcrumbNav,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BreadcrumbNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "我的携程", href: "/home/info" },
      { label: "机票订单", href: "/home/orders" },
      { label: "订单详情" },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [{ label: "首页", href: "/" }, { label: "当前页" }],
  },
};

export const FourLevels: Story = {
  args: {
    items: [
      { label: "首页", href: "/" },
      { label: "产品", href: "/products" },
      { label: "分类", href: "/products/category" },
      { label: "商品详情" },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: "唯一页面" }],
  },
};

export const WithEnglishLabels: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Electronics", href: "/products/electronics" },
      { label: "Product Details" },
    ],
  },
};

export const LongLabels: Story = {
  args: {
    items: [
      { label: "这是一个非常长的面包屑标签示例", href: "/" },
      { label: "另一个很长的中间页面标签", href: "/long" },
      { label: "最后一个也很长的当前页面标签" },
    ],
  },
};

export const CustomAriaLabel: Story = {
  args: {
    items: [{ label: "Home", href: "/" }, { label: "Current Page" }],
    ariaLabel: "Page Navigation Trail",
  },
};

export const WithCustomClassName: Story = {
  args: {
    items: [
      { label: "首页", href: "/" },
      { label: "订单", href: "/orders" },
      { label: "订单详情" },
    ],
    className: "bg-muted/30 rounded-lg",
  },
};

export const Interactive: Story = {
  args: {
    items: [
      {
        label: "首页",
        href: "/",
        onClick: () => alert("Navigating to home"),
      },
      {
        label: "订单",
        href: "/orders",
        onClick: () => alert("Navigating to orders"),
      },
      { label: "订单详情" },
    ],
  },
};

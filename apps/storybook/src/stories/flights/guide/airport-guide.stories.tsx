import type { Meta, StoryObj } from "@storybook/react";
import { AirportGuide } from "@ukesjtu/nomad-ui/components/flights/guide";

const meta = {
  title: "Flights/Guide/AirportGuide",
  component: AirportGuide,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AirportGuide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    links: [
      { href: "/flights/guide", label: "返回机场攻略首页" },
      { href: "/flights", label: "特价机票查询" },
    ],
  },
};

export const CustomTitle: Story = {
  args: {
    title: "快速导航",
    links: [
      { href: "/flights/guide", label: "返回机场攻略首页" },
      { href: "/flights", label: "特价机票查询" },
    ],
  },
};

export const ManyLinks: Story = {
  args: {
    links: [
      { href: "/flights/guide", label: "返回机场攻略首页" },
      { href: "/flights", label: "特价机票查询" },
      { href: "/flights/guide/pek", label: "北京首都机场" },
      { href: "/flights/guide/pvg", label: "上海浦东机场" },
      { href: "/flights/guide/can", label: "广州白云机场" },
    ],
  },
};

export const Empty: Story = {
  args: {
    links: [],
  },
};

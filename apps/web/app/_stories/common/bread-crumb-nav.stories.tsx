import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BreadCrumbNav } from "@/components/common/bread-crumb-nav";

const meta = {
  title: "Common/BreadCrumbNav",
  component: BreadCrumbNav,
  parameters: {
    layout: "padded",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BreadCrumbNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default breadcrumb navigation for the order details page.
 * Shows the navigation hierarchy: 我的携程 → 机票订单 → 订单详情
 */
export const Default: Story = {};

/**
 * Breadcrumb navigation in a container to show responsive behavior.
 */
export const InContainer: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-4 bg-background">
      <BreadCrumbNav />
    </div>
  ),
};

/**
 * Breadcrumb navigation with additional content below to show typical usage.
 */
export const WithContent: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <BreadCrumbNav />
      <div className="border rounded-lg p-6 bg-card">
        <h2 className="text-2xl font-bold mb-2">订单详情</h2>
        <p className="text-muted-foreground">
          This is how the breadcrumb navigation appears on an actual page.
        </p>
      </div>
    </div>
  ),
};

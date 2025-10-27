import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Skeleton } from "@/components/ui/skeleton";

const meta = {
  title: "Shadcn/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Skeleton className="h-12 w-12 rounded-full" />,
};

export const Card: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[280px]" />
      <Skeleton className="h-4 w-[260px]" />
      <Skeleton className="h-4 w-[240px]" />
    </div>
  ),
};

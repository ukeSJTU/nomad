import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Spinner } from "@/components/ui/spinner";

const meta = {
  title: "Shadcn/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    className: "size-3",
  },
};

export const Large: Story = {
  args: {
    className: "size-8",
  },
};

export const ExtraLarge: Story = {
  args: {
    className: "size-12",
  },
};


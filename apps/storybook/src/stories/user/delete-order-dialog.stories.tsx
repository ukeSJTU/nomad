import { DeleteOrderDialog } from "@nomad/ui/components/user";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

const meta = {
  title: "User/DeleteOrderDialog",
  component: DeleteOrderDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DeleteOrderDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
    onOpenChange: fn(),
    onConfirm: fn(),
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    open: true,
    onOpenChange: fn(),
    onConfirm: fn(),
    isLoading: true,
  },
};

export const Closed: Story = {
  args: {
    open: false,
    onOpenChange: fn(),
    onConfirm: fn(),
    isLoading: false,
  },
};

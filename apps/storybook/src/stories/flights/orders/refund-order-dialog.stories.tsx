import type { Meta, StoryObj } from "@storybook/react";
import { RefundOrderDialog } from "@ukesjtu/nomad-ui/components/flights/orders";
import { fn } from "storybook/test";

const meta = {
  title: "Flights/Orders/RefundOrderDialog",
  component: RefundOrderDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onOpenChange: fn(),
    onConfirm: fn(),
  },
} satisfies Meta<typeof RefundOrderDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    refundAmount: "1,234.00",
    isLoading: false,
  },
};

export const WithoutAmount: Story = {
  args: {
    open: true,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    open: true,
    refundAmount: "1,234.00",
    isLoading: true,
  },
};

export const Closed: Story = {
  args: {
    open: false,
    refundAmount: "1,234.00",
    isLoading: false,
  },
};

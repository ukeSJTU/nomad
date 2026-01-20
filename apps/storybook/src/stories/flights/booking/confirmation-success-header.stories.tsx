import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmationSuccessHeader } from "@ukesjtu/nomad-ui/components/flights/booking";

const meta = {
  title: "Flights/Booking/ConfirmationSuccessHeader",
  component: ConfirmationSuccessHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ConfirmationSuccessHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orderNumber: "ORD-2026-12345",
  },
};

export const LongOrderNumber: Story = {
  args: {
    orderNumber: "ORD-2026-ABCDEFGHIJKLMNOP",
  },
};

export const ShortOrderNumber: Story = {
  args: {
    orderNumber: "ORD-123",
  },
};

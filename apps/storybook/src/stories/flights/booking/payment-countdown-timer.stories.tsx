import type { Meta, StoryObj } from "@storybook/react";
import { PaymentCountdownTimer } from "@ukesjtu/nomad-ui/components/flights/booking";

const meta: Meta<typeof PaymentCountdownTimer> = {
  title: "Flights/Booking/PaymentCountdownTimer",
  component: PaymentCountdownTimer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    remainingSeconds: 300, // 5 minutes
  },
};

export const TwoMinutes: Story = {
  args: {
    remainingSeconds: 120,
  },
};

export const OneMinute: Story = {
  args: {
    remainingSeconds: 60,
  },
};

export const BelowWarningThreshold: Story = {
  args: {
    remainingSeconds: 30,
  },
};

export const AlmostExpired: Story = {
  args: {
    remainingSeconds: 10,
  },
};

export const Expired: Story = {
  args: {
    remainingSeconds: 0,
  },
};

export const CustomWarningText: Story = {
  args: {
    remainingSeconds: 180,
    warningText: "Please complete payment before time expires",
  },
};

export const CustomWarningThreshold: Story = {
  args: {
    remainingSeconds: 90,
    warningThreshold: 120, // Show warning below 2 minutes
  },
};

export const LongDuration: Story = {
  args: {
    remainingSeconds: 900, // 15 minutes
  },
};

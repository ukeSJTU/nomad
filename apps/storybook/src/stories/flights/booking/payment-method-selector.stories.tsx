import type { Meta, StoryObj } from "@storybook/react";
import { PaymentMethodSelector } from "@ukesjtu/nomad-ui/components/flights/booking";

const meta = {
  title: "Flights/Booking/PaymentMethodSelector",
  component: PaymentMethodSelector,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PaymentMethodSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BalanceSelected: Story = {
  args: {
    paymentMethod: "balance",
    userBalance: "¥1,234.56",
    onPaymentMethodChange: () => {},
  },
};

export const HighBalance: Story = {
  args: {
    paymentMethod: "balance",
    userBalance: "¥10,000.00",
    onPaymentMethodChange: () => {},
  },
};

export const LowBalance: Story = {
  args: {
    paymentMethod: "balance",
    userBalance: "¥100.50",
    onPaymentMethodChange: () => {},
  },
};

export const ZeroBalance: Story = {
  args: {
    paymentMethod: "balance",
    userBalance: "¥0.00",
    onPaymentMethodChange: () => {},
  },
};

export const WechatDisabled: Story = {
  args: {
    paymentMethod: "wechat",
    userBalance: "¥1,234.56",
    onPaymentMethodChange: () => {},
  },
};

export const AlipayDisabled: Story = {
  args: {
    paymentMethod: "alipay",
    userBalance: "¥1,234.56",
    onPaymentMethodChange: () => {},
  },
};

import { PaymentPriceBreakdown } from "@nomad/ui/components/flights/booking";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Flights/Booking/PaymentPriceBreakdown",
  component: PaymentPriceBreakdown,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PaymentPriceBreakdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orderNumber: "ORD-20260118-001",
    baseAmount: "¥1,234.56",
    ancillaryAmount: "¥100.00",
    showAncillary: true,
    totalAmount: "¥1,334.56",
    paymentMethod: "card",
    userBalance: "¥2,000.00",
    balanceAfterPayment: "¥665.44",
    isBalanceInsufficient: false,
  },
};

export const NoAncillary: Story = {
  args: {
    orderNumber: "ORD-20260118-002",
    baseAmount: "¥1,234.56",
    ancillaryAmount: "¥0.00",
    showAncillary: false,
    totalAmount: "¥1,234.56",
    paymentMethod: "card",
    userBalance: "¥2,000.00",
    balanceAfterPayment: "¥765.44",
    isBalanceInsufficient: false,
  },
};

export const BalancePaymentSufficient: Story = {
  args: {
    orderNumber: "ORD-20260118-003",
    baseAmount: "¥1,234.56",
    ancillaryAmount: "¥100.00",
    showAncillary: true,
    totalAmount: "¥1,334.56",
    paymentMethod: "balance",
    userBalance: "¥2,000.00",
    balanceAfterPayment: "¥665.44",
    isBalanceInsufficient: false,
  },
};

export const BalancePaymentInsufficient: Story = {
  args: {
    orderNumber: "ORD-20260118-004",
    baseAmount: "¥1,234.56",
    ancillaryAmount: "¥100.00",
    showAncillary: true,
    totalAmount: "¥1,334.56",
    paymentMethod: "balance",
    userBalance: "¥1,000.00",
    balanceAfterPayment: "¥-334.56",
    isBalanceInsufficient: true,
  },
};

export const HighAmount: Story = {
  args: {
    orderNumber: "ORD-20260118-005",
    baseAmount: "¥12,345.67",
    ancillaryAmount: "¥1,234.56",
    showAncillary: true,
    totalAmount: "¥13,580.23",
    paymentMethod: "card",
    userBalance: "¥20,000.00",
    balanceAfterPayment: "¥6,419.77",
    isBalanceInsufficient: false,
  },
};

export const BalancePaymentBarelySufficient: Story = {
  args: {
    orderNumber: "ORD-20260118-006",
    baseAmount: "¥1,234.56",
    ancillaryAmount: "¥100.00",
    showAncillary: true,
    totalAmount: "¥1,334.56",
    paymentMethod: "balance",
    userBalance: "¥1,334.56",
    balanceAfterPayment: "¥0.00",
    isBalanceInsufficient: false,
  },
};

import { ConfirmationPaymentSummary } from "@nomad/ui/components/flights/booking/confirmation-payment-summary";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ConfirmationPaymentSummary> = {
  title: "Flights/Booking/ConfirmationPaymentSummary",
  component: ConfirmationPaymentSummary,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ConfirmationPaymentSummary>;

const mockPayment = {
  id: "pay_123456",
  amount: "1500.00",
  method: "ALIPAY",
  status: "SUCCESS" as const,
  transactionId: "txn_789012",
  createdAt: new Date("2024-01-18T14:30:00"),
};

export const BasicTicket: Story = {
  args: {
    baseAmount: "1,000.00",
    ancillaryAmount: "0.00",
    totalAmount: "1,000.00",
    payment: null,
  },
};

export const WithAncillary: Story = {
  args: {
    baseAmount: "1,000.00",
    ancillaryAmount: "500.00",
    totalAmount: "1,500.00",
    payment: null,
  },
};

export const WithPaymentInfo: Story = {
  args: {
    baseAmount: "1,000.00",
    ancillaryAmount: "500.00",
    totalAmount: "1,500.00",
    payment: mockPayment,
    formattedPaymentTime: "2024-01-18 14:30:00",
  },
};

export const LargeAmount: Story = {
  args: {
    baseAmount: "9,999.99",
    ancillaryAmount: "888.88",
    totalAmount: "10,888.87",
    payment: mockPayment,
    formattedPaymentTime: "2024-01-18 14:30:00",
  },
};

export const SmallAmount: Story = {
  args: {
    baseAmount: "99.00",
    ancillaryAmount: "1.00",
    totalAmount: "100.00",
    payment: mockPayment,
    formattedPaymentTime: "2024-01-18 14:30:00",
  },
};

export const NoAncillaryWithPayment: Story = {
  args: {
    baseAmount: "800.00",
    ancillaryAmount: "0.00",
    totalAmount: "800.00",
    payment: mockPayment,
    formattedPaymentTime: "2024-01-18 14:30:00",
  },
};

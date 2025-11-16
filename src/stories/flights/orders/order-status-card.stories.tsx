import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { OrderStatusCard } from "@/components/flights/orders";

const meta: Meta<typeof OrderStatusCard> = {
  title: "Flights/Orders/OrderStatusCard",
  component: OrderStatusCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OrderStatusCard>;

// Mock order data
const mockOrder = {
  id: "order-1",
  orderNumber: "ORD20250115001",
  userId: "user-1",
  outboundFlightSeatClassId: "seat-1",
  inboundFlightSeatClassId: null,
  status: "PENDING_PAYMENT" as const,
  paymentDeadline: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
  passengerCount: 1,
  contactPhone: "13800138000",
  contactEmail: "user@example.com",
  pricePerTicket: "1280.00",
  baseAmount: "1280.00",
  ancillaryAmount: "0.00",
  totalAmount: "1280.00",
  ancillaryDetails: null,
  deletedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  passengers: [],
  outboundFlight: {} as any,
  inboundFlight: null,
};

/**
 * Pending payment status with countdown timer
 */
export const PendingPayment: Story = {
  args: {
    order: mockOrder,
    onCancelOrder: () => console.log("Cancel order clicked"),
    onGoToPayment: () => console.log("Go to payment clicked"),
    isCancelling: false,
  },
};

/**
 * Pending payment with cancelling state
 */
export const PendingPaymentCancelling: Story = {
  args: {
    order: mockOrder,
    onCancelOrder: () => console.log("Cancel order clicked"),
    onGoToPayment: () => console.log("Go to payment clicked"),
    isCancelling: true,
  },
};

/**
 * Payment expired (deadline passed)
 */
export const PaymentExpired: Story = {
  args: {
    order: {
      ...mockOrder,
      paymentDeadline: new Date(Date.now() - 1000), // 1 second ago
    },
    onCancelOrder: () => console.log("Cancel order clicked"),
    onGoToPayment: () => console.log("Go to payment clicked"),
    isCancelling: false,
  },
};

/**
 * Confirmed order status
 */
export const Confirmed: Story = {
  args: {
    order: {
      ...mockOrder,
      status: "CONFIRMED" as const,
    },
  },
};

/**
 * Cancelled order status
 */
export const Cancelled: Story = {
  args: {
    order: {
      ...mockOrder,
      status: "CANCELLED" as const,
    },
  },
};

/**
 * Refunded order status
 */
export const Refunded: Story = {
  args: {
    order: {
      ...mockOrder,
      status: "REFUNDED" as const,
    },
  },
};

/**
 * Payment deadline in 1 minute (urgent)
 */
export const PaymentUrgent: Story = {
  args: {
    order: {
      ...mockOrder,
      paymentDeadline: new Date(Date.now() + 45 * 1000), // 45 seconds from now
    },
    onCancelOrder: () => console.log("Cancel order clicked"),
    onGoToPayment: () => console.log("Go to payment clicked"),
    isCancelling: false,
  },
};

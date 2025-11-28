import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { OrderStatusCard } from "@/components/flights/orders/order-status-card";
import type { OrderStatusCardData } from "@/types/dto";

const meta = {
  title: "Flights/Orders/OrderStatusCard",
  component: OrderStatusCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OrderStatusCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Helper function to create mock order status data
 */
const createMockStatusData = (
  overrides?: Partial<OrderStatusCardData>
): OrderStatusCardData => ({
  id: "order-123",
  orderNumber: "NMD20251118001",
  status: "PENDING_PAYMENT",
  paymentDeadline: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes from now
  createdAt: new Date().toISOString(),
  ...overrides,
});

// ============================================================================
// Stories
// ============================================================================

/**
 * Pending Payment Status
 *
 * Shows an order awaiting payment with:
 * - Orange theme (warning state)
 * - Real-time countdown timer
 * - "Go to Payment" action button
 * - "Cancel Order" action button
 * - Alert message with payment deadline
 */
export const PendingPayment: Story = {
  args: {
    data: createMockStatusData({
      status: "PENDING_PAYMENT",
      orderNumber: "NMD20251118001",
      paymentDeadline: new Date(Date.now() + 850 * 1000).toISOString(), // 14:10 remaining
    }),
    onGoToPayment: () => {
      console.log("Navigate to payment page");
    },
    onCancelOrder: () => {
      console.log("Cancel order");
    },
    isLoading: false,
  },
};

/**
 * Confirmed Status
 *
 * Shows a successfully confirmed order with:
 * - Green theme (success state)
 * - Success confirmation message
 * - "Resend Confirmation" action button
 * - "Request Refund" action button
 * - Email sent notification
 */
export const Confirmed: Story = {
  args: {
    data: createMockStatusData({
      status: "CONFIRMED",
      orderNumber: "NMD20251117003",
      paymentDeadline: new Date(Date.now() - 3600 * 1000).toISOString(), // Paid 1 hour ago
      createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
    }),
    onResendConfirmation: () => {
      console.log("Resend confirmation email");
    },
    onRequestRefund: () => {
      console.log("Request refund");
    },
    canRefund: true,
    isLoading: false,
  },
};

/**
 * Cancelled Status
 *
 * Shows a cancelled order with:
 * - Gray theme (neutral/inactive state)
 * - Cancellation reason display
 * - No action buttons
 * - Information about cancellation
 */
export const Cancelled: Story = {
  args: {
    data: createMockStatusData({
      status: "CANCELLED",
      orderNumber: "NMD20251116004",
      paymentDeadline: new Date(Date.now() - 7200 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 7200 * 1000).toISOString(),
      cancellationReason: "支付失败",
    }),
    isLoading: false,
  },
};

/**
 * Refunded Status
 *
 * Shows a refunded order with:
 * - Blue theme (informational state)
 * - Refund completion message
 * - No action buttons
 * - Estimated arrival time for refund
 */
export const Refunded: Story = {
  args: {
    data: createMockStatusData({
      status: "REFUNDED",
      orderNumber: "NMD20251115006",
      paymentDeadline: new Date(Date.now() - 86400 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 86400 * 1000).toISOString(),
    }),
    isLoading: false,
  },
};

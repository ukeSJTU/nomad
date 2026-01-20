import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  OrderStatusCard,
  type OrderStatusCardData,
} from "@ukesjtu/nomad-ui/components/flights/orders";
import storyLogger from "@/infra/logging/storybook-logger";

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
 * - Real-time countdown timer (controlled by timeLeft prop)
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
    timeLeft: 850, // 14:10 in seconds
    onGoToPayment: () => {
      storyLogger.info("Navigate to payment page");
    },
    onCancelOrder: () => {
      storyLogger.info("Cancel order");
    },
    isLoading: false,
  },
};

/**
 * Payment Expired
 *
 * Shows a pending payment order where the deadline has passed:
 * - Red alert message
 * - No action buttons visible
 * - Expiration warning
 */
export const PaymentExpired: Story = {
  args: {
    data: createMockStatusData({
      status: "PENDING_PAYMENT",
      orderNumber: "NMD20251118002",
      paymentDeadline: new Date(Date.now() - 1000).toISOString(),
    }),
    timeLeft: 0,
    onGoToPayment: () => {
      storyLogger.info("Navigate to payment page");
    },
    isLoading: false,
  },
};

/**
 * Low Time Warning
 *
 * Shows a pending payment with less than 60 seconds remaining:
 * - Warning color on countdown (red)
 * - Urgent state indication
 */
export const LowTimeWarning: Story = {
  args: {
    data: createMockStatusData({
      status: "PENDING_PAYMENT",
      orderNumber: "NMD20251118003",
      paymentDeadline: new Date(Date.now() + 45 * 1000).toISOString(),
    }),
    timeLeft: 45, // Less than 60 seconds
    onGoToPayment: () => {
      storyLogger.info("Navigate to payment page");
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
      storyLogger.info("Resend confirmation email");
    },
    onRequestRefund: () => {
      storyLogger.info("Request refund");
    },
    canRefund: true,
    isLoading: false,
  },
};

/**
 * Confirmed - No Refund Available
 *
 * Shows a confirmed order where refund is not available:
 * - Only "Resend Confirmation" button visible
 * - No refund button
 */
export const ConfirmedNoRefund: Story = {
  args: {
    data: createMockStatusData({
      status: "CONFIRMED",
      orderNumber: "NMD20251117004",
      paymentDeadline: new Date(Date.now() - 3600 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
    }),
    onResendConfirmation: () => {
      storyLogger.info("Resend confirmation email");
    },
    canRefund: false,
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
 * Cancelled - Default Reason
 *
 * Shows a cancelled order with default cancellation reason:
 * - Shows "用户主动取消" when no reason provided
 */
export const CancelledDefaultReason: Story = {
  args: {
    data: createMockStatusData({
      status: "CANCELLED",
      orderNumber: "NMD20251116005",
      paymentDeadline: new Date(Date.now() - 7200 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 7200 * 1000).toISOString(),
      cancellationReason: undefined,
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

/**
 * Loading State
 *
 * Shows the component in loading state:
 * - All buttons disabled
 * - Prevents user interaction during async operations
 */
export const Loading: Story = {
  args: {
    data: createMockStatusData({
      status: "PENDING_PAYMENT",
      orderNumber: "NMD20251118004",
    }),
    timeLeft: 850,
    onGoToPayment: () => {
      storyLogger.info("Navigate to payment page");
    },
    isLoading: true,
  },
};

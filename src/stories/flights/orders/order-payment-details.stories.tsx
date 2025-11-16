import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { OrderPaymentDetails } from "@/components/flights/orders";

const meta: Meta<typeof OrderPaymentDetails> = {
  title: "Flights/Orders/OrderPaymentDetails",
  component: OrderPaymentDetails,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OrderPaymentDetails>;

// Base mock order
const mockOrder = {
  id: "order-1",
  orderNumber: "ORD20250115001",
  userId: "user-1",
  outboundFlightSeatClassId: "seat-1",
  inboundFlightSeatClassId: null,
  status: "PENDING_PAYMENT" as const,
  paymentDeadline: new Date(Date.now() + 15 * 60 * 1000),
  passengerCount: 1,
  contactPhone: "13800138000",
  contactEmail: "user@example.com",
  pricePerTicket: "1280.00",
  baseAmount: "1280.00",
  ancillaryAmount: "0.00",
  totalAmount: "1280.00",
  ancillaryDetails: null,
  deletedAt: null,
  createdAt: new Date("2025-01-15T10:30:00Z"),
  updatedAt: new Date("2025-01-15T10:30:00Z"),
  passengers: [],
  outboundFlight: {} as any,
  inboundFlight: null,
};

/**
 * Basic order without ancillary services
 */
export const BasicOrder: Story = {
  args: {
    order: mockOrder,
  },
};

/**
 * Order with ancillary services
 */
export const WithAncillaryServices: Story = {
  args: {
    order: {
      ...mockOrder,
      baseAmount: "1280.00",
      ancillaryAmount: "150.00",
      totalAmount: "1430.00",
      ancillaryDetails: ["baggage_20kg", "meal_standard"],
    },
  },
};

/**
 * High-value order
 */
export const HighValue: Story = {
  args: {
    order: {
      ...mockOrder,
      baseAmount: "8500.00",
      ancillaryAmount: "500.00",
      totalAmount: "9000.00",
      ancillaryDetails: ["baggage_32kg", "meal_premium", "lounge_access"],
    },
  },
};

/**
 * Confirmed order (no payment deadline)
 */
export const ConfirmedOrder: Story = {
  args: {
    order: {
      ...mockOrder,
      status: "CONFIRMED" as const,
    },
  },
};

/**
 * Round-trip order with multiple passengers
 */
export const RoundTripMultiplePassengers: Story = {
  args: {
    order: {
      ...mockOrder,
      passengerCount: 3,
      baseAmount: "3840.00",
      ancillaryAmount: "300.00",
      totalAmount: "4140.00",
      ancillaryDetails: ["baggage_20kg", "meal_standard"],
    },
  },
};

/**
 * Order with all ancillary services
 */
export const AllAncillaryServices: Story = {
  args: {
    order: {
      ...mockOrder,
      baseAmount: "2500.00",
      ancillaryAmount: "850.00",
      totalAmount: "3350.00",
      ancillaryDetails: [
        "baggage_20kg",
        "baggage_32kg",
        "meal_standard",
        "meal_premium",
        "seat_selection",
        "lounge_access",
        "priority_boarding",
      ],
    },
  },
};

/**
 * Cancelled order
 */
export const CancelledOrder: Story = {
  args: {
    order: {
      ...mockOrder,
      status: "CANCELLED" as const,
    },
  },
};

/**
 * Refunded order
 */
export const RefundedOrder: Story = {
  args: {
    order: {
      ...mockOrder,
      status: "REFUNDED" as const,
    },
  },
};

/**
 * Order with long order number
 */
export const LongOrderNumber: Story = {
  args: {
    order: {
      ...mockOrder,
      orderNumber: "ORD20250115001234567890",
    },
  },
};

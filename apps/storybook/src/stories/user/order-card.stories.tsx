import type { OrderListItem } from "@nomad/ui/components/user";
import { OrderCard } from "@nomad/ui/components/user";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

// Mock order data
const mockOrder: OrderListItem = {
  id: "1",
  orderNumber: "NMD20251118001",
  status: "PENDING_PAYMENT",
  createdAt: "2025-11-18T10:30:00Z",
  totalAmount: "1000",
  passengerCount: 1,
  passengerNames: ["张三"],
  outboundFlight: {
    flightNumber: "MU5186",
    airlineName: "中国东方航空",
    airlineIataCode: "MU",
    airlineLogoUrl: null,
    departureAirportName: "首都国际机场",
    departureAirportIataCode: "PEK",
    departureCityName: "北京",
    arrivalAirportName: "虹桥国际机场",
    arrivalAirportIataCode: "SHA",
    arrivalCityName: "上海",
    departureDatetime: "2025-12-01T07:30:00Z",
    arrivalDatetime: "2025-12-01T09:45:00Z",
    seatClassType: "ECONOMY",
  },
  inboundFlight: null,
};

const mockRoundTripOrder: OrderListItem = {
  ...mockOrder,
  id: "2",
  orderNumber: "NMD20251118002",
  status: "CONFIRMED",
  totalAmount: "2388.50",
  passengerNames: ["张三", "李四"],
  passengerCount: 2,
  inboundFlight: {
    flightNumber: "MU8230",
    airlineName: "中国东方航空",
    airlineIataCode: "MU",
    airlineLogoUrl: null,
    departureAirportName: "虹桥国际机场",
    departureAirportIataCode: "SHA",
    departureCityName: "上海",
    arrivalAirportName: "首都国际机场",
    arrivalAirportIataCode: "PEK",
    arrivalCityName: "北京",
    departureDatetime: "2025-12-05T20:40:00Z",
    arrivalDatetime: "2025-12-05T22:55:00Z",
    seatClassType: "ECONOMY",
  },
};

const meta = {
  title: "User/OrderCard",
  component: OrderCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div className="max-w-4xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OrderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PendingPayment: Story = {
  args: {
    order: mockOrder,
    isChecked: false,
    onCheckChange: fn(),
    onDelete: fn(),
    onActionClick: fn(),
    onOrderClick: fn(),
  },
};

export const Confirmed: Story = {
  args: {
    order: {
      ...mockOrder,
      status: "CONFIRMED",
    },
    isChecked: false,
    onCheckChange: fn(),
    onDelete: fn(),
    onActionClick: fn(),
    onOrderClick: fn(),
  },
};

export const Cancelled: Story = {
  args: {
    order: {
      ...mockOrder,
      status: "CANCELLED",
    },
    isChecked: false,
    onCheckChange: fn(),
    onDelete: fn(),
    onActionClick: fn(),
    onOrderClick: fn(),
  },
};

export const Refunded: Story = {
  args: {
    order: {
      ...mockOrder,
      status: "REFUNDED",
    },
    isChecked: false,
    onCheckChange: fn(),
    onDelete: fn(),
    onActionClick: fn(),
    onOrderClick: fn(),
  },
};

export const RoundTrip: Story = {
  args: {
    order: mockRoundTripOrder,
    isChecked: false,
    onCheckChange: fn(),
    onDelete: fn(),
    onActionClick: fn(),
    onOrderClick: fn(),
  },
};

export const Checked: Story = {
  args: {
    order: mockOrder,
    isChecked: true,
    onCheckChange: fn(),
    onDelete: fn(),
    onActionClick: fn(),
    onOrderClick: fn(),
  },
};

export const MultiplePassengers: Story = {
  args: {
    order: {
      ...mockOrder,
      passengerNames: ["张三", "李四", "王五"],
      passengerCount: 3,
    },
    isChecked: false,
    onCheckChange: fn(),
    onDelete: fn(),
    onActionClick: fn(),
    onOrderClick: fn(),
  },
};

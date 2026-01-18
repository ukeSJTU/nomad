import { PaymentOrderSummary } from "@nomad/ui/components/flights/booking";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PaymentOrderSummary> = {
  title: "Flights/Booking/PaymentOrderSummary",
  component: PaymentOrderSummary,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockOutboundFlight = {
  flightNumber: "CA1234",
  airlineName: "中国国际航空",
  departureDate: "2026/01/20",
  departureTime: "08:00",
  departureAirport: "北京首都国际机场",
  arrivalTime: "11:30",
  arrivalAirport: "上海虹桥国际机场",
};

const mockInboundFlight = {
  flightNumber: "CA5678",
  airlineName: "中国国际航空",
  departureDate: "2026/01/27",
  departureTime: "14:00",
  departureAirport: "上海虹桥国际机场",
  arrivalTime: "17:30",
  arrivalAirport: "北京首都国际机场",
};

const mockPassengers = [
  { name: "张三", identityNumber: "110101199001011234" },
  { name: "李四", identityNumber: "110101199002021234" },
];

const mockAncillaryServices = [
  { name: "基础旅行险", price: "30" },
  { name: "机场接送服务", price: "150" },
  { name: "机上餐食（热食）", price: "80" },
];

export const OneWayTrip: Story = {
  args: {
    outboundFlight: mockOutboundFlight,
    passengers: mockPassengers,
    contactPhone: "13800138000",
    contactEmail: "zhangsan@example.com",
  },
};

export const RoundTrip: Story = {
  args: {
    outboundFlight: mockOutboundFlight,
    inboundFlight: mockInboundFlight,
    passengers: mockPassengers,
    contactPhone: "13800138000",
    contactEmail: "zhangsan@example.com",
  },
};

export const WithAncillaryServices: Story = {
  args: {
    outboundFlight: mockOutboundFlight,
    inboundFlight: mockInboundFlight,
    passengers: mockPassengers,
    contactPhone: "13800138000",
    contactEmail: "zhangsan@example.com",
    ancillaryServices: mockAncillaryServices,
  },
};

export const SinglePassenger: Story = {
  args: {
    outboundFlight: mockOutboundFlight,
    passengers: [mockPassengers[0]],
    contactPhone: "13800138000",
    contactEmail: "zhangsan@example.com",
  },
};

export const MultiplePassengers: Story = {
  args: {
    outboundFlight: mockOutboundFlight,
    passengers: [
      ...mockPassengers,
      { name: "王五", identityNumber: "110101199003031234" },
      { name: "赵六", identityNumber: "110101199004041234" },
    ],
    contactPhone: "13800138000",
    contactEmail: "zhangsan@example.com",
  },
};

export const OnlyPhone: Story = {
  args: {
    outboundFlight: mockOutboundFlight,
    passengers: mockPassengers,
    contactPhone: "13800138000",
  },
};

export const OnlyEmail: Story = {
  args: {
    outboundFlight: mockOutboundFlight,
    passengers: mockPassengers,
    contactEmail: "zhangsan@example.com",
  },
};

export const MinimalData: Story = {
  args: {
    outboundFlight: mockOutboundFlight,
    passengers: [mockPassengers[0]],
  },
};

export const CompleteData: Story = {
  args: {
    outboundFlight: mockOutboundFlight,
    inboundFlight: mockInboundFlight,
    passengers: mockPassengers,
    contactPhone: "13800138000",
    contactEmail: "zhangsan@example.com",
    ancillaryServices: mockAncillaryServices,
  },
};

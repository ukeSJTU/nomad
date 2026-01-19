import type { FlightSummaryCardFlightProps } from "@nomad/ui/components/flights/booking";

import { FlightSummaryCard } from "@nomad/ui/components/flights/booking";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FlightSummaryCard> = {
  title: "Flights/Booking/FlightSummaryCard",
  component: FlightSummaryCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FlightSummaryCard>;

// Mock formatters
const mockFormatCurrency = (price: string) => {
  const num = Number.parseFloat(price);
  return `¥${num.toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const mockFormatDateWithWeekday = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const weekday = weekdays[date.getDay()];
  return `${month}月${day}日 ${weekday}`;
};

// Mock flight data
const mockOutboundFlight: FlightSummaryCardFlightProps = {
  id: "seat-class-1",
  classType: "ECONOMY" as const,
  price: "1280.00",
  availableSeats: 50,
  totalSeats: 100,
  flight: {
    id: "flight-1",
    flightNumber: "MU5186",
    aircraftType: "330",
    airline: {
      id: "airline-1",
      name: "东方航空",
      iataCode: "MU",
      logoUrl:
        "https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff&size=256&bold=true&rounded=true&format=svg",
    },
    departure: {
      datetime: "2025-01-18T07:30:00Z",
      terminal: "T1",
      airport: {
        id: "airport-1",
        iataCode: "PEK",
        name: "大兴国际机场",
      },
      city: {
        id: "city-1",
        iataCode: "BJS",
        name: "北京",
        timezone: "Asia/Shanghai",
      },
    },
    arrival: {
      datetime: "2025-01-18T09:45:00Z",
      terminal: "T1",
      airport: {
        id: "airport-2",
        iataCode: "PVG",
        name: "浦东国际机场T1",
      },
      city: {
        id: "city-2",
        iataCode: "SHA",
        name: "上海",
        timezone: "Asia/Shanghai",
      },
    },
  },
};

const mockInboundFlight: FlightSummaryCardFlightProps = {
  id: "seat-class-2",
  classType: "ECONOMY" as const,
  price: "1350.00",
  availableSeats: 45,
  totalSeats: 100,
  flight: {
    id: "flight-2",
    flightNumber: "MU5187",
    aircraftType: "330",
    airline: {
      id: "airline-1",
      name: "东方航空",
      iataCode: "MU",
      logoUrl:
        "https://ui-avatars.com/api/?name=MU&background=0D8ABC&color=fff&size=256&bold=true&rounded=true&format=svg",
    },
    departure: {
      datetime: "2025-01-25T14:30:00Z",
      terminal: "T1",
      airport: {
        id: "airport-2",
        iataCode: "PVG",
        name: "浦东国际机场T1",
      },
      city: {
        id: "city-2",
        iataCode: "SHA",
        name: "上海",
        timezone: "Asia/Shanghai",
      },
    },
    arrival: {
      datetime: "2025-01-25T16:45:00Z",
      terminal: "T1",
      airport: {
        id: "airport-1",
        iataCode: "PEK",
        name: "大兴国际机场",
      },
      city: {
        id: "city-1",
        iataCode: "BJS",
        name: "北京",
        timezone: "Asia/Shanghai",
      },
    },
  },
};

/**
 * One-way flight with single passenger
 */
export const OneWay: Story = {
  args: {
    outboundFlight: mockOutboundFlight,
    passengerCount: 1,
    formatCurrency: mockFormatCurrency,
    formatDateWithWeekday: mockFormatDateWithWeekday,
  },
};

/**
 * Round-trip flight with single passenger
 */
export const RoundTrip: Story = {
  args: {
    outboundFlight: mockOutboundFlight,
    inboundFlight: mockInboundFlight,
    passengerCount: 1,
    formatCurrency: mockFormatCurrency,
    formatDateWithWeekday: mockFormatDateWithWeekday,
  },
};

/**
 * Round-trip flight with multiple passengers
 */
export const RoundTripMultiplePassengers: Story = {
  args: {
    outboundFlight: mockOutboundFlight,
    inboundFlight: mockInboundFlight,
    passengerCount: 3,
    formatCurrency: mockFormatCurrency,
    formatDateWithWeekday: mockFormatDateWithWeekday,
  },
};

/**
 * Business class flight
 */
export const BusinessClass: Story = {
  args: {
    outboundFlight: {
      ...mockOutboundFlight,
      classType: "BUSINESS" as const,
      price: "3280.00",
    },
    passengerCount: 1,
    formatCurrency: mockFormatCurrency,
    formatDateWithWeekday: mockFormatDateWithWeekday,
  },
};

/**
 * First class flight
 */
export const FirstClass: Story = {
  args: {
    outboundFlight: {
      ...mockOutboundFlight,
      classType: "FIRST" as const,
      price: "5280.00",
    },
    passengerCount: 1,
    formatCurrency: mockFormatCurrency,
    formatDateWithWeekday: mockFormatDateWithWeekday,
  },
};

/**
 * No flight data (null state)
 */
export const NoFlight: Story = {
  args: {
    outboundFlight: null,
    passengerCount: 1,
    formatCurrency: mockFormatCurrency,
    formatDateWithWeekday: mockFormatDateWithWeekday,
  },
};

/**
 * Flight without airline logo
 */
export const NoAirlineLogo: Story = {
  args: {
    outboundFlight: {
      ...mockOutboundFlight,
      flight: {
        ...mockOutboundFlight.flight,
        airline: {
          ...mockOutboundFlight.flight.airline,
          logoUrl: null,
        },
      },
    },
    passengerCount: 1,
    formatCurrency: mockFormatCurrency,
    formatDateWithWeekday: mockFormatDateWithWeekday,
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { OrderFlightInfo } from "@/components/flights/orders";

const meta: Meta<typeof OrderFlightInfo> = {
  title: "Flights/Orders/OrderFlightInfo",
  component: OrderFlightInfo,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OrderFlightInfo>;

// Mock flight data
const mockOutboundFlight = {
  id: "flight-1",
  flightNumber: "MU5186",
  airlineId: "airline-1",
  departureAirportId: "airport-1",
  arrivalAirportId: "airport-2",
  departureDatetime: new Date("2025-01-18T07:30:00Z"),
  arrivalDatetime: new Date("2025-01-18T10:45:00Z"),
  departureTerminal: "T1",
  arrivalTerminal: "T2",
  aircraftType: "330",
  airline: {
    id: "airline-1",
    name: "东方航空",
    iataCode: "MU",
    logoUrl: null,
  },
  departureAirport: {
    id: "airport-1",
    name: "大兴国际机场",
    iataCode: "PKX",
    cityId: "city-1",
  },
  arrivalAirport: {
    id: "airport-2",
    name: "浦东国际机场",
    iataCode: "PVG",
    cityId: "city-2",
  },
  seatClass: {
    id: "seat-1",
    flightId: "flight-1",
    classType: "ECONOMY" as const,
    price: "1280.00",
    availableSeats: 50,
    totalSeats: 100,
  },
};

const mockInboundFlight = {
  id: "flight-2",
  flightNumber: "MU5187",
  airlineId: "airline-1",
  departureAirportId: "airport-2",
  arrivalAirportId: "airport-1",
  departureDatetime: new Date("2025-01-25T14:30:00Z"),
  arrivalDatetime: new Date("2025-01-25T17:45:00Z"),
  departureTerminal: "T2",
  arrivalTerminal: "T1",
  aircraftType: "330",
  airline: {
    id: "airline-1",
    name: "东方航空",
    iataCode: "MU",
    logoUrl: null,
  },
  departureAirport: {
    id: "airport-2",
    name: "浦东国际机场",
    iataCode: "PVG",
    cityId: "city-2",
  },
  arrivalAirport: {
    id: "airport-1",
    name: "大兴国际机场",
    iataCode: "PKX",
    cityId: "city-1",
  },
  seatClass: {
    id: "seat-2",
    flightId: "flight-2",
    classType: "ECONOMY" as const,
    price: "1380.00",
    availableSeats: 45,
    totalSeats: 100,
  },
};

/**
 * One-way flight (economy class)
 */
export const OneWayEconomy: Story = {
  args: {
    outboundFlight: mockOutboundFlight,
    inboundFlight: null,
  },
};

/**
 * Round-trip flight (economy class)
 */
export const RoundTripEconomy: Story = {
  args: {
    outboundFlight: mockOutboundFlight,
    inboundFlight: mockInboundFlight,
  },
};

/**
 * Business class flight
 */
export const BusinessClass: Story = {
  args: {
    outboundFlight: {
      ...mockOutboundFlight,
      seatClass: {
        ...mockOutboundFlight.seatClass,
        classType: "BUSINESS" as const,
        price: "3280.00",
      },
    },
    inboundFlight: null,
  },
};

/**
 * First class flight
 */
export const FirstClass: Story = {
  args: {
    outboundFlight: {
      ...mockOutboundFlight,
      seatClass: {
        ...mockOutboundFlight.seatClass,
        classType: "FIRST" as const,
        price: "5280.00",
      },
    },
    inboundFlight: null,
  },
};

/**
 * Flight without terminal information
 */
export const NoTerminals: Story = {
  args: {
    outboundFlight: {
      ...mockOutboundFlight,
      departureTerminal: null,
      arrivalTerminal: null,
    },
    inboundFlight: null,
  },
};

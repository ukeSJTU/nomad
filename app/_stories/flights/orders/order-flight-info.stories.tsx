import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { OrderFlightInfo } from "@/components/flights/orders";
import type { OrderFlightCardData } from "@/types/dto";

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

/**
 * Helper function to create mock flight data
 */
const createMockFlight = (
  overrides?: Partial<OrderFlightCardData>
): OrderFlightCardData => ({
  flightNumber: "MU5186",
  airlineName: "东方航空",
  airlineIataCode: "MU",
  airlineLogoUrl:
    "https://ui-avatars.com/api/?name=MU&background=000&color=fff&size=128&bold=true&format=svg",
  departureAirportName: "大兴机场",
  departureAirportIataCode: "PKX",
  departureCityName: "北京",
  arrivalAirportName: "浦东机场",
  arrivalAirportIataCode: "PVG",
  arrivalCityName: "上海",
  departureDatetime: "2026-01-18T07:30:00Z",
  arrivalDatetime: "2026-01-18T09:45:00Z",
  seatClassType: "ECONOMY",
  duration: 135, // 2h15m
  aircraftType: "空客330(大)",
  departureTerminal: "T2",
  arrivalTerminal: "T1",
  ...overrides,
});

/**
 * One-way flight (economy class)
 * Matches the screenshot layout
 */
export const OneWayEconomy: Story = {
  args: {
    outboundFlight: createMockFlight(),
    inboundFlight: null,
  },
};

/**
 * Round-trip flight (economy class)
 * Shows both outbound and inbound flights
 */
export const RoundTripEconomy: Story = {
  args: {
    outboundFlight: createMockFlight({
      departureDatetime: "2026-01-18T07:30:00Z",
      arrivalDatetime: "2026-01-18T09:45:00Z",
    }),
    inboundFlight: createMockFlight({
      flightNumber: "MU8230",
      airlineName: "东方航空",
      departureAirportName: "虹桥机场",
      departureAirportIataCode: "SHA",
      departureCityName: "上海",
      arrivalAirportName: "大兴机场",
      arrivalAirportIataCode: "PKX",
      arrivalCityName: "北京",
      departureDatetime: "2026-01-21T20:40:00Z",
      arrivalDatetime: "2026-01-21T22:55:00Z",
      aircraftType: "波音777(中)",
      duration: 135,
    }),
  },
};

/**
 * Business class flight
 */
export const BusinessClass: Story = {
  args: {
    outboundFlight: createMockFlight({
      seatClassType: "BUSINESS",
    }),
    inboundFlight: null,
  },
};

/**
 * First class flight
 */
export const FirstClass: Story = {
  args: {
    outboundFlight: createMockFlight({
      seatClassType: "FIRST",
    }),
    inboundFlight: null,
  },
};

/**
 * Flight without terminal information
 */
export const NoTerminals: Story = {
  args: {
    outboundFlight: createMockFlight({
      departureTerminal: undefined,
      arrivalTerminal: undefined,
    }),
    inboundFlight: null,
  },
};

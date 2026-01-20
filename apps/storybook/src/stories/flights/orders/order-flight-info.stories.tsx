import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  OrderFlightInfo,
  type OrderFlightInfoFlightData,
} from "@ukesjtu/nomad-ui/components/flights/orders";

const meta = {
  title: "Flights/Orders/OrderFlightInfo",
  component: OrderFlightInfo,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OrderFlightInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Helper function to create mock flight data
 */
const createMockFlight = (
  overrides?: Partial<OrderFlightInfoFlightData>
): OrderFlightInfoFlightData => ({
  flightNumber: "MU5186",
  airlineName: "东方航空",
  airlineIataCode: "MU",
  airlineLogoUrl: null,
  departureAirportName: "大兴机场",
  departureAirportIataCode: "PKX",
  departureCityName: "北京",
  arrivalAirportName: "浦东机场",
  arrivalAirportIataCode: "PVG",
  arrivalCityName: "上海",
  departureDatetime: "2026-01-18T07:30:00Z",
  arrivalDatetime: "2026-01-18T09:45:00Z",
  seatClassType: "ECONOMY",
  duration: 135,
  aircraftType: "空客330(大)",
  departureTerminal: "T2",
  arrivalTerminal: "T1",
  ...overrides,
});

// ============================================================================
// Stories
// ============================================================================

/**
 * One-Way Flight
 *
 * Displays a single flight segment with:
 * - Timeline layout (departure -> arrival)
 * - Flight duration badge
 * - Airport and terminal information
 * - Airline logo and flight details
 * - No trip labels (去程/返程)
 */
export const OneWay: Story = {
  args: {
    outboundFlight: createMockFlight(),
    inboundFlight: null,
  },
};

/**
 * Round-Trip Flight
 *
 * Displays both outbound and inbound flight segments with:
 * - Trip labels (去程 for outbound, 返程 for inbound)
 * - Separator between flights
 * - Round-trip arrow icon in header
 * - Complete timeline for both legs
 */
export const RoundTrip: Story = {
  args: {
    outboundFlight: createMockFlight(),
    inboundFlight: createMockFlight({
      flightNumber: "MU8230",
      departureAirportName: "虹桥机场",
      departureCityName: "上海",
      arrivalAirportName: "大兴机场",
      arrivalCityName: "北京",
      departureDatetime: "2026-01-21T20:40:00Z",
      arrivalDatetime: "2026-01-21T22:55:00Z",
      departureTerminal: "T2",
      arrivalTerminal: "T1",
    }),
  },
};

/**
 * With Airline Logo
 *
 * Shows flight information with airline logo:
 * - Airline logo displayed next to airline name
 * - Image adapter handles logo rendering
 */
export const WithAirlineLogo: Story = {
  args: {
    outboundFlight: createMockFlight({
      airlineLogoUrl: "https://picsum.photos/seed/airline-mu/64/64",
    }),
    inboundFlight: null,
  },
};

/**
 * Business Class
 *
 * Displays a business class flight with:
 * - Business class (商务舱) label
 * - Premium service indicators
 */
export const BusinessClass: Story = {
  args: {
    outboundFlight: createMockFlight({
      seatClassType: "BUSINESS",
      aircraftType: "波音787(大)",
    }),
    inboundFlight: null,
  },
};

/**
 * First Class
 *
 * Displays a first class flight with:
 * - First class (头等舱) label
 * - Premium aircraft type
 */
export const FirstClass: Story = {
  args: {
    outboundFlight: createMockFlight({
      seatClassType: "FIRST",
      aircraftType: "空客380(大)",
      flightNumber: "CA981",
      airlineName: "中国国际航空",
      airlineIataCode: "CA",
    }),
    inboundFlight: null,
  },
};

/**
 * Without Terminals
 *
 * Shows flight information without terminal details:
 * - Terminal information omitted when not available
 * - Clean layout without extra spacing
 */
export const WithoutTerminals: Story = {
  args: {
    outboundFlight: createMockFlight({
      departureTerminal: undefined,
      arrivalTerminal: undefined,
    }),
    inboundFlight: null,
  },
};

/**
 * Long Flight Duration
 *
 * Displays a long-haul international flight:
 * - Extended flight duration (10+ hours)
 * - International route
 */
export const LongDuration: Story = {
  args: {
    outboundFlight: createMockFlight({
      flightNumber: "CA985",
      airlineName: "中国国际航空",
      departureCityName: "北京",
      departureAirportName: "首都机场",
      arrivalCityName: "纽约",
      arrivalAirportName: "肯尼迪机场",
      departureDatetime: "2026-01-20T13:30:00Z",
      arrivalDatetime: "2026-01-20T15:45:00Z", // 13h 15m
      seatClassType: "BUSINESS",
      aircraftType: "波音777(大)",
      duration: 795,
      departureTerminal: "T3",
      arrivalTerminal: "T1",
    }),
    inboundFlight: null,
  },
};

/**
 * Multiple Flights Same Day
 *
 * Round-trip with both flights on the same day:
 * - Tight schedule
 * - Different airports in same city
 */
export const SameDayRoundTrip: Story = {
  args: {
    outboundFlight: createMockFlight({
      flightNumber: "MU5186",
      departureDatetime: "2026-01-18T07:30:00Z",
      arrivalDatetime: "2026-01-18T09:45:00Z",
    }),
    inboundFlight: createMockFlight({
      flightNumber: "MU8230",
      departureAirportName: "虹桥机场",
      departureCityName: "上海",
      arrivalAirportName: "大兴机场",
      arrivalCityName: "北京",
      departureDatetime: "2026-01-18T20:40:00Z",
      arrivalDatetime: "2026-01-18T22:55:00Z",
    }),
  },
};

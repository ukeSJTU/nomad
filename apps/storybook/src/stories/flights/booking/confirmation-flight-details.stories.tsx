import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmationFlightDetails } from "@ukesjtu/nomad-ui/components/flights/booking";

const meta = {
  title: "Flights/Booking/ConfirmationFlightDetails",
  component: ConfirmationFlightDetails,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ConfirmationFlightDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOutboundFlight = {
  id: "1",
  flightNumber: "CA1234",
  departureDatetime: "2026-01-20 08:00",
  arrivalDatetime: "2026-01-20 11:30",
  departureTerminal: "T3",
  arrivalTerminal: "T2",
  aircraftType: "Boeing 737",
  airline: {
    id: "airline1",
    name: "中国国际航空",
    iataCode: "CA",
  },
  departureAirport: {
    id: "airport1",
    name: "北京首都国际机场",
    iataCode: "PEK",
  },
  arrivalAirport: {
    id: "airport2",
    name: "上海虹桥国际机场",
    iataCode: "SHA",
  },
  seatClass: {
    id: "seat1",
    classType: "economy" as const,
  },
};

const mockInboundFlight = {
  id: "2",
  flightNumber: "CA5678",
  departureDatetime: "2026-01-25 14:00",
  arrivalDatetime: "2026-01-25 17:30",
  departureTerminal: "T2",
  arrivalTerminal: "T3",
  aircraftType: "Airbus A320",
  airline: {
    id: "airline1",
    name: "中国国际航空",
    iataCode: "CA",
  },
  departureAirport: {
    id: "airport2",
    name: "上海虹桥国际机场",
    iataCode: "SHA",
  },
  arrivalAirport: {
    id: "airport1",
    name: "北京首都国际机场",
    iataCode: "PEK",
  },
  seatClass: {
    id: "seat2",
    classType: "business" as const,
  },
};

export const OneWay: Story = {
  args: {
    outboundFlight: mockOutboundFlight,
  },
};

export const RoundTrip: Story = {
  args: {
    outboundFlight: mockOutboundFlight,
    inboundFlight: mockInboundFlight,
  },
};

export const FirstClass: Story = {
  args: {
    outboundFlight: {
      ...mockOutboundFlight,
      seatClass: {
        id: "seat3",
        classType: "first" as const,
      },
    },
  },
};

export const WithoutTerminals: Story = {
  args: {
    outboundFlight: {
      ...mockOutboundFlight,
      departureTerminal: null,
      arrivalTerminal: null,
    },
  },
};

export const WithoutAircraftType: Story = {
  args: {
    outboundFlight: {
      ...mockOutboundFlight,
      aircraftType: null,
    },
  },
};

export const InternationalFlight: Story = {
  args: {
    outboundFlight: {
      id: "3",
      flightNumber: "CZ300",
      departureDatetime: "2026-02-15 23:45",
      arrivalDatetime: "2026-02-16 05:30",
      departureTerminal: "T2",
      arrivalTerminal: "Terminal 5",
      aircraftType: "Boeing 787",
      airline: {
        id: "airline2",
        name: "中国南方航空",
        iataCode: "CZ",
      },
      departureAirport: {
        id: "airport3",
        name: "广州白云国际机场",
        iataCode: "CAN",
      },
      arrivalAirport: {
        id: "airport4",
        name: "伦敦希思罗机场",
        iataCode: "LHR",
      },
      seatClass: {
        id: "seat4",
        classType: "business" as const,
      },
    },
  },
};

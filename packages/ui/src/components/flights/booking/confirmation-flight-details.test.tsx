import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ConfirmationFlightDetailsFlightProps } from "./confirmation-flight-details";
import { ConfirmationFlightDetails } from "./confirmation-flight-details";

describe("ConfirmationFlightDetails", () => {
  const mockOutboundFlight: ConfirmationFlightDetailsFlightProps = {
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
      classType: "economy",
    },
  };

  const mockInboundFlight: ConfirmationFlightDetailsFlightProps = {
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
      classType: "business",
    },
  };

  it("should render outbound flight details", () => {
    render(<ConfirmationFlightDetails outboundFlight={mockOutboundFlight} />);

    expect(screen.getByText("航班信息")).toBeInTheDocument();
    expect(screen.getByText("CA1234")).toBeInTheDocument();
    expect(screen.getByText("中国国际航空")).toBeInTheDocument();
    expect(screen.getByText("Boeing 737")).toBeInTheDocument();
    expect(screen.getByText("经济舱")).toBeInTheDocument();
    expect(screen.getByText("2026-01-20 08:00")).toBeInTheDocument();
    expect(screen.getByText("2026-01-20 11:30")).toBeInTheDocument();
    expect(screen.getByText(/北京首都国际机场.*T3/)).toBeInTheDocument();
    expect(screen.getByText(/上海虹桥国际机场.*T2/)).toBeInTheDocument();
  });

  it("should show '去程航班' when inbound flight exists", () => {
    render(
      <ConfirmationFlightDetails
        outboundFlight={mockOutboundFlight}
        inboundFlight={mockInboundFlight}
      />
    );

    expect(screen.getByText("去程航班")).toBeInTheDocument();
    expect(screen.queryByText("航班信息")).not.toBeInTheDocument();
  });

  it("should render inbound flight details when provided", () => {
    render(
      <ConfirmationFlightDetails
        outboundFlight={mockOutboundFlight}
        inboundFlight={mockInboundFlight}
      />
    );

    expect(screen.getByText("返程航班")).toBeInTheDocument();
    expect(screen.getByText("CA5678")).toBeInTheDocument();
    expect(screen.getByText("Airbus A320")).toBeInTheDocument();
    expect(screen.getByText("商务舱")).toBeInTheDocument();
    expect(screen.getByText("2026-01-25 14:00")).toBeInTheDocument();
    expect(screen.getByText("2026-01-25 17:30")).toBeInTheDocument();
  });

  it("should handle flights without aircraft type", () => {
    const flightWithoutAircraft = {
      ...mockOutboundFlight,
      aircraftType: null,
    };

    render(
      <ConfirmationFlightDetails outboundFlight={flightWithoutAircraft} />
    );

    expect(screen.queryByText("Boeing 737")).not.toBeInTheDocument();
    expect(screen.getByText("CA1234")).toBeInTheDocument();
  });

  it("should handle flights without terminal information", () => {
    const flightWithoutTerminals = {
      ...mockOutboundFlight,
      departureTerminal: null,
      arrivalTerminal: null,
    };

    render(
      <ConfirmationFlightDetails outboundFlight={flightWithoutTerminals} />
    );

    expect(screen.getByText("北京首都国际机场")).toBeInTheDocument();
    expect(screen.getByText("上海虹桥国际机场")).toBeInTheDocument();
    expect(screen.queryByText(/T3/)).not.toBeInTheDocument();
    expect(screen.queryByText(/T2/)).not.toBeInTheDocument();
  });

  it("should render first class seat type correctly", () => {
    const firstClassFlight = {
      ...mockOutboundFlight,
      seatClass: {
        id: "seat3",
        classType: "first" as const,
      },
    };

    render(<ConfirmationFlightDetails outboundFlight={firstClassFlight} />);

    expect(screen.getByText("头等舱")).toBeInTheDocument();
  });

  it("should not render inbound section when inboundFlight is null", () => {
    render(
      <ConfirmationFlightDetails
        outboundFlight={mockOutboundFlight}
        inboundFlight={null}
      />
    );

    expect(screen.queryByText("返程航班")).not.toBeInTheDocument();
    expect(screen.queryByText("CA5678")).not.toBeInTheDocument();
  });
});

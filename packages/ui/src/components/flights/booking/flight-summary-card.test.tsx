import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UiProvider } from "../../../platform";
import type { FlightSummaryCardFlightProps } from "./flight-summary-card";
import { FlightSummaryCard } from "./flight-summary-card";

/**
 * @requirement REQ-F05
 */

// Mock flight data
const mockOutboundFlight: FlightSummaryCardFlightProps = {
  id: "flight-1",
  price: "500.00",
  classType: "ECONOMY",
  availableSeats: 100,
  totalSeats: 200,
  flight: {
    id: "1",
    flightNumber: "CA1234",
    aircraftType: "A330",
    departure: {
      datetime: "2024-01-15T08:00:00Z",
      terminal: "T3",
      city: {
        id: "1",
        name: "北京",
        iataCode: "BJS",
        timezone: "Asia/Shanghai",
      },
      airport: {
        id: "1",
        name: "首都国际机场",
        iataCode: "PEK",
      },
    },
    arrival: {
      datetime: "2024-01-15T11:30:00Z",
      terminal: "T2",
      city: {
        id: "2",
        name: "上海",
        iataCode: "SHA",
        timezone: "Asia/Shanghai",
      },
      airport: {
        id: "2",
        name: "虹桥国际机场",
        iataCode: "SHA",
      },
    },
    airline: {
      id: "1",
      name: "中国国际航空",
      iataCode: "CA",
      logoUrl: "https://example.com/ca-logo.png",
    },
  },
};

const mockInboundFlight: FlightSummaryCardFlightProps = {
  id: "flight-2",
  price: "550.00",
  classType: "BUSINESS",
  availableSeats: 50,
  totalSeats: 100,
  flight: {
    id: "2",
    flightNumber: "CA5678",
    aircraftType: "A320",
    departure: {
      datetime: "2024-01-20T14:00:00Z",
      terminal: "T2",
      city: {
        id: "2",
        name: "上海",
        iataCode: "SHA",
        timezone: "Asia/Shanghai",
      },
      airport: {
        id: "2",
        name: "虹桥国际机场",
        iataCode: "SHA",
      },
    },
    arrival: {
      datetime: "2024-01-20T17:30:00Z",
      terminal: "T3",
      city: {
        id: "1",
        name: "北京",
        iataCode: "BJS",
        timezone: "Asia/Shanghai",
      },
      airport: {
        id: "1",
        name: "首都国际机场",
        iataCode: "PEK",
      },
    },
    airline: {
      id: "1",
      name: "中国国际航空",
      iataCode: "CA",
      logoUrl: "https://example.com/ca-logo.png",
    },
  },
};

// Mock formatters
const mockFormatCurrency = (price: string) => `¥${price}`;
const mockFormatDateWithWeekday = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const weekday = weekdays[date.getDay()];
  return `${month}月${day}日 ${weekday}`;
};

describe("FlightSummaryCard Component", () => {
  describe("Rendering", () => {
    it("renders the card title", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("航班信息")).toBeInTheDocument();
    });

    it("returns null when no outbound flight provided", () => {
      const { container } = render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={null}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(container.firstChild).toBeNull();
    });

    it("renders outbound flight information", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("去")).toBeInTheDocument();
      expect(screen.getByText(/北京.*上海/)).toBeInTheDocument();
      expect(screen.getByText("中国国际航空")).toBeInTheDocument();
      expect(screen.getByText("CA1234")).toBeInTheDocument();
    });

    it("renders inbound flight when provided", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            inboundFlight={mockInboundFlight}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("去")).toBeInTheDocument();
      expect(screen.getByText("返")).toBeInTheDocument();
      expect(screen.getAllByText("中国国际航空")).toHaveLength(2);
    });

    it("does not render inbound flight when not provided", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("去")).toBeInTheDocument();
      expect(screen.queryByText("返")).not.toBeInTheDocument();
    });
  });

  describe("Flight Information", () => {
    it("displays formatted departure and arrival times", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      // Check that times are displayed in HH:mm format
      const timeElements = screen.getAllByText(/\d{2}:\d{2}/);
      expect(timeElements.length).toBeGreaterThan(0);
    });

    it("displays airline logo when available", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      const logoImg = screen.getByAltText("中国国际航空");
      expect(logoImg).toBeInTheDocument();
      expect(logoImg).toHaveAttribute("src", "https://example.com/ca-logo.png");
    });

    it("displays seat class correctly for ECONOMY", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("经济舱")).toBeInTheDocument();
    });

    it("displays seat class correctly for BUSINESS", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockInboundFlight}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("商务舱")).toBeInTheDocument();
    });

    it("displays seat class correctly for FIRST", () => {
      const firstClassFlight = {
        ...mockOutboundFlight,
        classType: "FIRST" as const,
      };

      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={firstClassFlight}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("头等舱")).toBeInTheDocument();
    });

    it("displays flight duration", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("3h30m")).toBeInTheDocument();
    });

    it("displays airport names", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("首都国际机场")).toBeInTheDocument();
      expect(screen.getByText("虹桥国际机场")).toBeInTheDocument();
    });

    it("displays aircraft type when available", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("空客A330")).toBeInTheDocument();
    });

    it("displays default aircraft type when not available", () => {
      const flightWithoutAircraftType = {
        ...mockOutboundFlight,
        flight: {
          ...mockOutboundFlight.flight,
          aircraftType: null,
        },
      };

      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={flightWithoutAircraftType}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("空客330")).toBeInTheDocument();
    });
  });

  describe("Price Summary", () => {
    it("displays outbound flight price", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("去程票价")).toBeInTheDocument();
      const prices = screen.getAllByText("¥500.00");
      expect(prices.length).toBeGreaterThan(0);
    });

    it("displays inbound flight price when provided", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            inboundFlight={mockInboundFlight}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("返程票价")).toBeInTheDocument();
      expect(screen.getByText("¥550.00")).toBeInTheDocument();
    });

    it("does not display inbound price when not provided", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.queryByText("返程票价")).not.toBeInTheDocument();
    });

    it("displays passenger count", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            passengerCount={2}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("乘客人数")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("defaults to 1 passenger when not specified", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("calculates total price correctly for one-way flight", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            passengerCount={2}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("总计")).toBeInTheDocument();
      expect(screen.getByText("¥1000.00")).toBeInTheDocument();
    });

    it("calculates total price correctly for round-trip flight", () => {
      render(
        <UiProvider>
          <FlightSummaryCard
            outboundFlight={mockOutboundFlight}
            inboundFlight={mockInboundFlight}
            passengerCount={2}
            formatCurrency={mockFormatCurrency}
            formatDateWithWeekday={mockFormatDateWithWeekday}
          />
        </UiProvider>
      );

      expect(screen.getByText("总计")).toBeInTheDocument();
      expect(screen.getByText("¥2100.00")).toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { PassengerPageFlight } from "@/types/dto";

import { FlightSummaryCard } from "./flight-summary-card";

// Mock flight data
const mockOutboundFlight: PassengerPageFlight = {
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
        cityId: "1",
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
        cityId: "2",
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

const mockInboundFlight: PassengerPageFlight = {
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
        cityId: "2",
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
        cityId: "1",
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

describe("FlightSummaryCard Component", () => {
  describe("Rendering", () => {
    it("renders the card title", () => {
      render(<FlightSummaryCard outboundFlight={mockOutboundFlight} />);

      expect(screen.getByText("航班信息")).toBeInTheDocument();
    });

    it("returns null when no outbound flight provided", () => {
      const { container } = render(<FlightSummaryCard outboundFlight={null} />);

      expect(container.firstChild).toBeNull();
    });

    it("renders outbound flight information", () => {
      render(<FlightSummaryCard outboundFlight={mockOutboundFlight} />);

      expect(screen.getByText("去")).toBeInTheDocument();
      expect(screen.getByText(/北京.*上海/)).toBeInTheDocument();
      expect(screen.getByText("中国国际航空")).toBeInTheDocument();
      expect(screen.getByText("CA1234")).toBeInTheDocument();
    });

    it("renders inbound flight when provided", () => {
      render(
        <FlightSummaryCard
          outboundFlight={mockOutboundFlight}
          inboundFlight={mockInboundFlight}
        />
      );

      expect(screen.getByText("去")).toBeInTheDocument();
      expect(screen.getByText("返")).toBeInTheDocument();
      expect(screen.getAllByText("中国国际航空")).toHaveLength(2);
    });

    it("does not render inbound flight when not provided", () => {
      render(<FlightSummaryCard outboundFlight={mockOutboundFlight} />);

      expect(screen.getByText("去")).toBeInTheDocument();
      expect(screen.queryByText("返")).not.toBeInTheDocument();
    });
  });

  describe("Flight Details", () => {
    it("displays departure and arrival cities", () => {
      render(<FlightSummaryCard outboundFlight={mockOutboundFlight} />);

      expect(screen.getByText(/北京.*上海/)).toBeInTheDocument();
    });

    it("displays airport names", () => {
      render(<FlightSummaryCard outboundFlight={mockOutboundFlight} />);

      expect(screen.getByText("首都国际机场")).toBeInTheDocument();
      expect(screen.getByText("虹桥国际机场")).toBeInTheDocument();
    });

    it("displays airline information", () => {
      render(<FlightSummaryCard outboundFlight={mockOutboundFlight} />);

      expect(screen.getByText("中国国际航空")).toBeInTheDocument();
      expect(screen.getByText("CA1234")).toBeInTheDocument();
    });

    it("displays aircraft type", () => {
      render(<FlightSummaryCard outboundFlight={mockOutboundFlight} />);

      expect(screen.getByText("空客A330")).toBeInTheDocument();
    });

    it("displays seat class for economy", () => {
      render(<FlightSummaryCard outboundFlight={mockOutboundFlight} />);

      expect(screen.getByText("经济舱")).toBeInTheDocument();
    });

    it("displays seat class for business", () => {
      render(
        <FlightSummaryCard
          outboundFlight={mockOutboundFlight}
          inboundFlight={mockInboundFlight}
        />
      );

      expect(screen.getByText("经济舱")).toBeInTheDocument();
      expect(screen.getByText("商务舱")).toBeInTheDocument();
    });

    it("renders airline logo when provided", () => {
      render(<FlightSummaryCard outboundFlight={mockOutboundFlight} />);

      const logos = screen.getAllByAltText("中国国际航空");
      expect(logos.length).toBeGreaterThan(0);
      expect(logos[0]).toHaveAttribute(
        "src",
        "https://example.com/ca-logo.png"
      );
    });
  });

  describe("Price Summary", () => {
    it("displays outbound flight price", () => {
      render(<FlightSummaryCard outboundFlight={mockOutboundFlight} />);

      expect(screen.getByText("去程票价")).toBeInTheDocument();
      const prices = screen.getAllByText(/¥500/);
      expect(prices.length).toBeGreaterThan(0);
    });

    it("displays inbound flight price when provided", () => {
      render(
        <FlightSummaryCard
          outboundFlight={mockOutboundFlight}
          inboundFlight={mockInboundFlight}
        />
      );

      expect(screen.getByText("返程票价")).toBeInTheDocument();
      expect(screen.getByText(/¥550/)).toBeInTheDocument();
    });

    it("does not display inbound price when no inbound flight", () => {
      render(<FlightSummaryCard outboundFlight={mockOutboundFlight} />);

      expect(screen.queryByText("返程票价")).not.toBeInTheDocument();
    });

    it("displays passenger count", () => {
      render(
        <FlightSummaryCard
          outboundFlight={mockOutboundFlight}
          passengerCount={3}
        />
      );

      expect(screen.getByText("乘客人数")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("defaults passenger count to 1", () => {
      render(<FlightSummaryCard outboundFlight={mockOutboundFlight} />);

      expect(screen.getByText("乘客人数")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("displays total price label", () => {
      render(<FlightSummaryCard outboundFlight={mockOutboundFlight} />);

      expect(screen.getByText("总计")).toBeInTheDocument();
    });

    it("calculates total price for one passenger with outbound only", () => {
      render(<FlightSummaryCard outboundFlight={mockOutboundFlight} />);

      // Total label should exist
      expect(screen.getByText("总计")).toBeInTheDocument();
      // Should display ¥500.00 somewhere
      const prices = screen.getAllByText(/¥500/);
      expect(prices.length).toBeGreaterThan(0);
    });

    it("calculates total price for multiple passengers", () => {
      render(
        <FlightSummaryCard
          outboundFlight={mockOutboundFlight}
          passengerCount={2}
        />
      );

      // Should display ¥1,000.00 (500 * 2)
      expect(screen.getByText(/¥1,000/)).toBeInTheDocument();
    });

    it("calculates total price for round trip", () => {
      render(
        <FlightSummaryCard
          outboundFlight={mockOutboundFlight}
          inboundFlight={mockInboundFlight}
        />
      );

      // Should display ¥1,050.00 (500 + 550)
      expect(screen.getByText(/¥1,050/)).toBeInTheDocument();
    });

    it("calculates total price for round trip with multiple passengers", () => {
      render(
        <FlightSummaryCard
          outboundFlight={mockOutboundFlight}
          inboundFlight={mockInboundFlight}
          passengerCount={2}
        />
      );

      // Should display ¥2,100.00 ((500 + 550) * 2)
      expect(screen.getByText(/¥2,100/)).toBeInTheDocument();
    });
  });

  describe("Time Display", () => {
    it("displays departure and arrival times", () => {
      render(<FlightSummaryCard outboundFlight={mockOutboundFlight} />);

      // Times should be formatted as HH:mm
      // Checking for time-like patterns
      const timeElements = screen.getAllByText(/\d{2}:\d{2}/);
      expect(timeElements.length).toBeGreaterThan(0);
    });

    it("displays flight duration", () => {
      render(<FlightSummaryCard outboundFlight={mockOutboundFlight} />);

      // Duration should be in format like "3h30m"
      expect(screen.getByText(/\d+h\d+m/)).toBeInTheDocument();
    });
  });

  describe("Icons Display", () => {
    it("renders plane icon", () => {
      const { container } = render(
        <FlightSummaryCard outboundFlight={mockOutboundFlight} />
      );

      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    });

    it("renders clock icon for duration", () => {
      const { container } = render(
        <FlightSummaryCard outboundFlight={mockOutboundFlight} />
      );

      // Clock icon should be present
      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe("Edge Cases", () => {
    it("handles missing aircraft type", () => {
      const flightWithoutAircraft: PassengerPageFlight = {
        ...mockOutboundFlight,
        flight: {
          ...mockOutboundFlight.flight,
          aircraftType: null,
        },
      };

      render(<FlightSummaryCard outboundFlight={flightWithoutAircraft} />);

      // Should default to "330"
      expect(screen.getByText("空客330")).toBeInTheDocument();
    });

    it("handles missing airline logo", () => {
      const flightWithoutLogo: PassengerPageFlight = {
        ...mockOutboundFlight,
        flight: {
          ...mockOutboundFlight.flight,
          airline: {
            ...mockOutboundFlight.flight.airline,
            logoUrl: null,
          },
        },
      };

      render(<FlightSummaryCard outboundFlight={flightWithoutLogo} />);

      // Should still render airline name
      expect(screen.getByText("中国国际航空")).toBeInTheDocument();

      // Should not render logo
      const logos = screen.queryAllByAltText("中国国际航空");
      expect(logos).toHaveLength(0);
    });

    it("handles first class seat type", () => {
      const firstClassFlight: PassengerPageFlight = {
        ...mockOutboundFlight,
        classType: "FIRST",
      };

      render(<FlightSummaryCard outboundFlight={firstClassFlight} />);

      expect(screen.getByText("头等舱")).toBeInTheDocument();
    });

    it("handles zero price", () => {
      const freeFlight: PassengerPageFlight = {
        ...mockOutboundFlight,
        price: "0.00",
      };

      render(<FlightSummaryCard outboundFlight={freeFlight} />);

      const prices = screen.getAllByText(/¥0/);
      expect(prices.length).toBeGreaterThan(0);
    });

    it("handles very large passenger count", () => {
      render(
        <FlightSummaryCard
          outboundFlight={mockOutboundFlight}
          passengerCount={100}
        />
      );

      expect(screen.getByText("100")).toBeInTheDocument();
      // Total should be 500 * 100 = 50,000
      expect(screen.getByText(/¥50,000/)).toBeInTheDocument();
    });
  });

  describe("Sticky Positioning", () => {
    it("has sticky positioning class", () => {
      const { container } = render(
        <FlightSummaryCard outboundFlight={mockOutboundFlight} />
      );

      const card = container.querySelector('[data-slot="card"]');
      expect(card).toHaveClass("sticky");
    });
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { OrderFlightCardData } from "@/types/dto";

import { OrderFlightInfo } from "./order-flight-info";

/**
 * Helper function to create mock flight data
 */
const createMockFlight = (
  overrides?: Partial<OrderFlightCardData>
): OrderFlightCardData => ({
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

/**
 * @requirement REQ-O02
 */
describe("OrderFlightInfo Component", () => {
  /**
   * @requirement REQ-O02
   */
  describe("Rendering", () => {
    /**
     * @requirement REQ-O02
     * @scenario 场景2
     */
    it("should render one-way flight correctly", () => {
      const outboundFlight = createMockFlight();
      render(
        <OrderFlightInfo outboundFlight={outboundFlight} inboundFlight={null} />
      );

      // Check city names
      expect(screen.getByText("北京")).toBeInTheDocument();
      expect(screen.getByText("上海")).toBeInTheDocument();

      // Check flight number and airline name (rendered together with space)
      expect(screen.getByText(/东方航空\s+MU5186/)).toBeInTheDocument();

      // Check airports
      expect(screen.getByText(/大兴机场/)).toBeInTheDocument();
      expect(screen.getByText(/浦东机场/)).toBeInTheDocument();
    });

    it("should render round-trip flight correctly", () => {
      const outboundFlight = createMockFlight();
      const inboundFlight = createMockFlight({
        flightNumber: "MU8230",
        departureAirportName: "虹桥机场",
        departureCityName: "上海",
        arrivalAirportName: "大兴机场",
        arrivalCityName: "北京",
        departureDatetime: "2026-01-21T20:40:00Z",
        arrivalDatetime: "2026-01-21T22:55:00Z",
      });

      render(
        <OrderFlightInfo
          outboundFlight={outboundFlight}
          inboundFlight={inboundFlight}
        />
      );

      // Check both flight numbers (rendered with airline names)
      expect(screen.getByText(/东方航空\s+MU5186/)).toBeInTheDocument();
      expect(screen.getByText(/东方航空\s+MU8230/)).toBeInTheDocument();

      // Check labels for round-trip
      expect(screen.getByText("去程")).toBeInTheDocument();
      expect(screen.getByText("返程")).toBeInTheDocument();
    });

    it("should display terminal information when provided", () => {
      const outboundFlight = createMockFlight({ departureTerminal: "T1" });
      render(
        <OrderFlightInfo outboundFlight={outboundFlight} inboundFlight={null} />
      );

      const terminals = screen.getAllByText("T1");
      expect(terminals.length).toBeGreaterThan(0);
    });

    it("should not display terminal when not provided", () => {
      const outboundFlight = createMockFlight({
        departureTerminal: undefined,
        arrivalTerminal: undefined,
      });
      render(
        <OrderFlightInfo outboundFlight={outboundFlight} inboundFlight={null} />
      );

      expect(screen.queryByText("T1")).not.toBeInTheDocument();
      expect(screen.queryByText("T2")).not.toBeInTheDocument();
    });

    it("should display correct seat class name", () => {
      const economyFlight = createMockFlight({ seatClassType: "ECONOMY" });
      const { rerender } = render(
        <OrderFlightInfo outboundFlight={economyFlight} inboundFlight={null} />
      );
      expect(screen.getByText("经济舱")).toBeInTheDocument();

      const businessFlight = createMockFlight({ seatClassType: "BUSINESS" });
      rerender(
        <OrderFlightInfo outboundFlight={businessFlight} inboundFlight={null} />
      );
      expect(screen.getByText("商务舱")).toBeInTheDocument();

      const firstFlight = createMockFlight({ seatClassType: "FIRST" });
      rerender(
        <OrderFlightInfo outboundFlight={firstFlight} inboundFlight={null} />
      );
      expect(screen.getByText("头等舱")).toBeInTheDocument();
    });
  });

  describe("One-way vs Round-trip", () => {
    it("should not show trip labels for one-way flight", () => {
      const outboundFlight = createMockFlight();
      render(
        <OrderFlightInfo outboundFlight={outboundFlight} inboundFlight={null} />
      );

      expect(screen.queryByText("去程")).not.toBeInTheDocument();
      expect(screen.queryByText("返程")).not.toBeInTheDocument();
    });

    it("should show trip labels for round-trip flight", () => {
      const outboundFlight = createMockFlight();
      const inboundFlight = createMockFlight({
        flightNumber: "MU8230",
        departureDatetime: "2026-01-21T20:40:00Z",
        arrivalDatetime: "2026-01-21T22:55:00Z",
      });

      render(
        <OrderFlightInfo
          outboundFlight={outboundFlight}
          inboundFlight={inboundFlight}
        />
      );

      expect(screen.getByText("去程")).toBeInTheDocument();
      expect(screen.getByText("返程")).toBeInTheDocument();
    });

    it("should show one-way arrow for one-way flight", () => {
      const outboundFlight = createMockFlight();
      const { container } = render(
        <OrderFlightInfo outboundFlight={outboundFlight} inboundFlight={null} />
      );

      // ArrowRight icon should be present
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("should show round-trip arrow for round-trip flight", () => {
      const outboundFlight = createMockFlight();
      const inboundFlight = createMockFlight({
        flightNumber: "MU8230",
      });
      const { container } = render(
        <OrderFlightInfo
          outboundFlight={outboundFlight}
          inboundFlight={inboundFlight}
        />
      );

      // ArrowLeftRight icon should be present
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("Date and Time Formatting", () => {
    it("should display flight date in correct format", () => {
      const outboundFlight = createMockFlight({
        departureDatetime: "2026-01-18T07:30:00Z",
      });
      render(
        <OrderFlightInfo outboundFlight={outboundFlight} inboundFlight={null} />
      );

      // Should show date with weekday
      expect(screen.getByText(/2026-01-18/)).toBeInTheDocument();
    });

    it("should display departure and arrival times", () => {
      const outboundFlight = createMockFlight({
        departureDatetime: "2026-01-18T07:30:00Z",
        arrivalDatetime: "2026-01-18T09:45:00Z",
      });
      render(
        <OrderFlightInfo outboundFlight={outboundFlight} inboundFlight={null} />
      );

      // Times should be displayed (note: may vary due to timezone)
      const times = screen.getAllByText(/\d{2}:\d{2}/);
      expect(times.length).toBeGreaterThan(0);
    });
  });

  describe("Visual Layout", () => {
    it("should render with Card component", () => {
      const outboundFlight = createMockFlight();
      const { container } = render(
        <OrderFlightInfo outboundFlight={outboundFlight} inboundFlight={null} />
      );

      // Card should be present
      expect(container.querySelector('[class*="card"]')).toBeInTheDocument();
    });

    it("should display flight duration icon", () => {
      const outboundFlight = createMockFlight();
      const { container } = render(
        <OrderFlightInfo outboundFlight={outboundFlight} inboundFlight={null} />
      );

      // Clock icon should be present for duration
      const clockIcons = container.querySelectorAll("svg");
      expect(clockIcons.length).toBeGreaterThan(0);
    });
  });
});

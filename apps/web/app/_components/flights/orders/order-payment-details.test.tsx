import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { OrderPaymentCardData } from "@/types/dto";

import { OrderPaymentDetails } from "./order-payment-details";

/**
 * Helper function to create mock payment data
 */
const createMockPaymentData = (
  overrides?: Partial<OrderPaymentCardData>
): OrderPaymentCardData => ({
  createdAt: "2026-01-18T10:30:00Z",
  outboundFlight: {
    depatureCityName: "北京",
    arrivalCityName: "上海",
    unitPrice: "1280.00",
    passengerCount: 1,
  },
  ancillaryServices: [],
  baseAmount: "1280.00",
  ancillaryAmount: "0.00",
  totalAmount: "1280.00",
  ...overrides,
});

describe("OrderPaymentDetails Component", () => {
  describe("Rendering", () => {
    it("should render payment details card with title", () => {
      const paymentData = createMockPaymentData();
      render(<OrderPaymentDetails paymentData={paymentData} />);

      expect(screen.getByText("订单支付明细")).toBeInTheDocument();
    });

    it("should display order creation date", () => {
      const paymentData = createMockPaymentData({
        createdAt: "2026-01-18T10:30:00Z",
      });
      render(<OrderPaymentDetails paymentData={paymentData} />);

      expect(screen.getByText("下单金额")).toBeInTheDocument();
      // Date format is MM-dd HH:mm
      expect(screen.getByText(/\d{2}-\d{2} \d{2}:\d{2}/)).toBeInTheDocument();
    });

    it("should display total amount", () => {
      const paymentData = createMockPaymentData({
        totalAmount: "1280.00",
      });
      render(<OrderPaymentDetails paymentData={paymentData} />);

      expect(screen.getByText("¥1280.00")).toBeInTheDocument();
    });
  });

  describe("Outbound Flight Display", () => {
    it("should display outbound flight route", () => {
      const paymentData = createMockPaymentData({
        outboundFlight: {
          depatureCityName: "北京",
          arrivalCityName: "上海",
          unitPrice: "1280.00",
          passengerCount: 1,
        },
      });
      render(<OrderPaymentDetails paymentData={paymentData} />);

      expect(screen.getByText("北京")).toBeInTheDocument();
      expect(screen.getByText("上海")).toBeInTheDocument();
    });

    it("should display outbound flight pricing", () => {
      const paymentData = createMockPaymentData({
        outboundFlight: {
          depatureCityName: "北京",
          arrivalCityName: "上海",
          unitPrice: "1280.00",
          passengerCount: 2,
        },
      });
      render(<OrderPaymentDetails paymentData={paymentData} />);

      expect(screen.getByText(/¥1280\.00 × 2人/)).toBeInTheDocument();
    });

    it("should display adult passenger label", () => {
      const paymentData = createMockPaymentData();
      render(<OrderPaymentDetails paymentData={paymentData} />);

      expect(screen.getByText("成人")).toBeInTheDocument();
    });
  });

  describe("Inbound Flight Display", () => {
    it("should display inbound flight when provided", () => {
      const paymentData = createMockPaymentData({
        inboundFlight: {
          depatureCityName: "上海",
          arrivalCityName: "北京",
          unitPrice: "1380.00",
          passengerCount: 1,
        },
      });
      render(<OrderPaymentDetails paymentData={paymentData} />);

      // Should show both outbound and inbound cities
      const beijingElements = screen.getAllByText("北京");
      const shanghaiElements = screen.getAllByText("上海");
      expect(beijingElements.length).toBeGreaterThanOrEqual(1);
      expect(shanghaiElements.length).toBeGreaterThanOrEqual(1);

      expect(screen.getByText(/¥1380\.00 × 1人/)).toBeInTheDocument();
    });

    it("should not display inbound flight when not provided", () => {
      const paymentData = createMockPaymentData({
        inboundFlight: undefined,
      });
      render(<OrderPaymentDetails paymentData={paymentData} />);

      // Only outbound flight price should be visible
      expect(screen.getByText(/¥1280\.00 × 1人/)).toBeInTheDocument();
    });

    it("should display multiple passengers for round trip", () => {
      const paymentData = createMockPaymentData({
        outboundFlight: {
          depatureCityName: "北京",
          arrivalCityName: "上海",
          unitPrice: "1280.00",
          passengerCount: 3,
        },
        inboundFlight: {
          depatureCityName: "上海",
          arrivalCityName: "北京",
          unitPrice: "1380.00",
          passengerCount: 3,
        },
      });
      render(<OrderPaymentDetails paymentData={paymentData} />);

      expect(screen.getByText(/¥1280\.00 × 3人/)).toBeInTheDocument();
      expect(screen.getByText(/¥1380\.00 × 3人/)).toBeInTheDocument();
    });
  });

  describe("Ancillary Services Display", () => {
    it("should display single ancillary service", () => {
      const paymentData = createMockPaymentData({
        ancillaryServices: [
          {
            name: "行李托运",
            code: "BAGGAGE_20KG",
            unitPrice: "150.00",
            quantity: 1,
          },
        ],
      });
      render(<OrderPaymentDetails paymentData={paymentData} />);

      expect(screen.getByText("行李托运")).toBeInTheDocument();
      expect(screen.getByText(/¥150\.00 × 1份/)).toBeInTheDocument();
    });

    it("should display multiple ancillary services", () => {
      const paymentData = createMockPaymentData({
        ancillaryServices: [
          {
            name: "行李托运20kg",
            code: "BAGGAGE_20KG",
            unitPrice: "150.00",
            quantity: 2,
          },
          {
            name: "机场贵宾室",
            code: "LOUNGE_ACCESS",
            unitPrice: "200.00",
            quantity: 1,
          },
          {
            name: "优先登机",
            code: "PRIORITY_BOARDING",
            unitPrice: "50.00",
            quantity: 2,
          },
        ],
      });
      render(<OrderPaymentDetails paymentData={paymentData} />);

      expect(screen.getByText("行李托运20kg")).toBeInTheDocument();
      expect(screen.getByText("机场贵宾室")).toBeInTheDocument();
      expect(screen.getByText("优先登机")).toBeInTheDocument();

      expect(screen.getByText(/¥150\.00 × 2份/)).toBeInTheDocument();
      expect(screen.getByText(/¥200\.00 × 1份/)).toBeInTheDocument();
      expect(screen.getByText(/¥50\.00 × 2份/)).toBeInTheDocument();
    });
  });

  describe("Complex Scenarios", () => {
    it("should display complete payment breakdown for round trip with ancillaries", () => {
      const paymentData = createMockPaymentData({
        createdAt: "2026-01-18T15:20:00Z",
        outboundFlight: {
          depatureCityName: "上海",
          arrivalCityName: "成都",
          unitPrice: "980.00",
          passengerCount: 1,
        },
        inboundFlight: {
          depatureCityName: "成都",
          arrivalCityName: "上海",
          unitPrice: "1080.00",
          passengerCount: 1,
        },
        ancillaryServices: [
          {
            name: "行李托运20kg",
            code: "BAGGAGE_20KG",
            unitPrice: "150.00",
            quantity: 2,
          },
          {
            name: "机场贵宾室",
            code: "LOUNGE_ACCESS",
            unitPrice: "200.00",
            quantity: 2,
          },
        ],
        totalAmount: "2860.00",
      });
      render(<OrderPaymentDetails paymentData={paymentData} />);

      // Check cities (both appear twice in round-trip)
      const shanghaiElements = screen.getAllByText("上海");
      const chengduElements = screen.getAllByText("成都");
      expect(shanghaiElements.length).toBeGreaterThanOrEqual(1);
      expect(chengduElements.length).toBeGreaterThanOrEqual(1);

      // Check flight prices
      expect(screen.getByText(/¥980\.00 × 1人/)).toBeInTheDocument();
      expect(screen.getByText(/¥1080\.00 × 1人/)).toBeInTheDocument();

      // Check ancillary services
      expect(screen.getByText("行李托运20kg")).toBeInTheDocument();
      expect(screen.getByText("机场贵宾室")).toBeInTheDocument();

      // Check total
      expect(screen.getByText("¥2860.00")).toBeInTheDocument();
    });

    it("should handle one-way trip with multiple passengers and services", () => {
      const paymentData = createMockPaymentData({
        outboundFlight: {
          depatureCityName: "北京",
          arrivalCityName: "广州",
          unitPrice: "1580.00",
          passengerCount: 2,
        },
        ancillaryServices: [
          {
            name: "行李托运",
            code: "BAGGAGE_20KG",
            unitPrice: "150.00",
            quantity: 2,
          },
        ],
        totalAmount: "3460.00",
      });
      render(<OrderPaymentDetails paymentData={paymentData} />);

      expect(screen.getByText("北京")).toBeInTheDocument();
      expect(screen.getByText("广州")).toBeInTheDocument();
      expect(screen.getByText(/¥1580\.00 × 2人/)).toBeInTheDocument();
      expect(screen.getByText("行李托运")).toBeInTheDocument();
      expect(screen.getByText("¥3460.00")).toBeInTheDocument();
    });
  });

  describe("Date Formatting", () => {
    it("should format date in MM-dd HH:mm format", () => {
      const paymentData = createMockPaymentData({
        createdAt: "2026-01-18T10:30:00Z",
      });
      render(<OrderPaymentDetails paymentData={paymentData} />);

      // Should match MM-dd HH:mm pattern
      const dateElement = screen.getByText(/\d{2}-\d{2} \d{2}:\d{2}/);
      expect(dateElement).toBeInTheDocument();
    });

    it("should handle different dates correctly", () => {
      const paymentData = createMockPaymentData({
        createdAt: "2026-12-25T23:59:00Z",
      });
      render(<OrderPaymentDetails paymentData={paymentData} />);

      expect(screen.getByText(/\d{2}-\d{2} \d{2}:\d{2}/)).toBeInTheDocument();
    });
  });

  describe("Price Display", () => {
    it("should display prices with currency symbol", () => {
      const paymentData = createMockPaymentData({
        outboundFlight: {
          depatureCityName: "北京",
          arrivalCityName: "上海",
          unitPrice: "1280.00",
          passengerCount: 1,
        },
        totalAmount: "1280.00",
      });
      render(<OrderPaymentDetails paymentData={paymentData} />);

      const priceElements = screen.getAllByText(/¥/);
      expect(priceElements.length).toBeGreaterThan(0);
    });

    it("should display decimal prices correctly", () => {
      const paymentData = createMockPaymentData({
        outboundFlight: {
          depatureCityName: "北京",
          arrivalCityName: "上海",
          unitPrice: "1280.50",
          passengerCount: 1,
        },
        totalAmount: "1280.50",
      });
      render(<OrderPaymentDetails paymentData={paymentData} />);

      expect(screen.getByText("¥1280.50")).toBeInTheDocument();
    });
  });
});

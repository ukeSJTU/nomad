import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { PaymentData } from "./order-payment-details";
import { OrderPaymentDetails } from "./order-payment-details";

describe("OrderPaymentDetails", () => {
  const mockPaymentData: PaymentData = {
    totalAmount: "2,500.00",
    createdAt: "2026-01-18T10:30:00Z",
    outboundFlight: {
      depatureCityName: "北京",
      arrivalCityName: "上海",
      unitPrice: "800.00",
      passengerCount: 2,
    },
    inboundFlight: {
      depatureCityName: "上海",
      arrivalCityName: "北京",
      unitPrice: "750.00",
      passengerCount: 2,
    },
    ancillaryServices: [
      {
        name: "航空意外险",
        unitPrice: "30.00",
        quantity: 2,
      },
      {
        name: "行李托运",
        unitPrice: "70.00",
        quantity: 2,
      },
    ],
  };

  it("renders card title", () => {
    render(<OrderPaymentDetails paymentData={mockPaymentData} />);

    expect(screen.getByText("订单支付明细")).toBeInTheDocument();
  });

  it("displays total amount", () => {
    render(<OrderPaymentDetails paymentData={mockPaymentData} />);

    expect(screen.getByText("下单金额")).toBeInTheDocument();
    expect(screen.getByText("¥2,500.00")).toBeInTheDocument();
  });

  it("displays formatted date with default formatter", () => {
    render(<OrderPaymentDetails paymentData={mockPaymentData} />);

    // Default formatter should display "01-18 10:30" for UTC time
    expect(screen.getByText(/01-18/)).toBeInTheDocument();
  });

  it("uses custom formatDate function when provided", () => {
    const customFormatter = vi.fn(() => "Custom Date");

    render(
      <OrderPaymentDetails
        paymentData={mockPaymentData}
        formatDate={customFormatter}
      />
    );

    expect(customFormatter).toHaveBeenCalledWith(mockPaymentData.createdAt);
    expect(screen.getByText("Custom Date")).toBeInTheDocument();
  });

  it("displays outbound flight information", () => {
    render(<OrderPaymentDetails paymentData={mockPaymentData} />);

    // Check that city names appear
    expect(screen.getAllByText("北京").length).toBeGreaterThan(0);
    expect(screen.getAllByText("上海").length).toBeGreaterThan(0);
    expect(screen.getByText("¥800.00 × 2人")).toBeInTheDocument();
  });

  it("displays inbound flight when present", () => {
    render(<OrderPaymentDetails paymentData={mockPaymentData} />);

    // Should have both directions
    const shanghaiElements = screen.getAllByText("上海");
    const beijingElements = screen.getAllByText("北京");

    expect(shanghaiElements.length).toBeGreaterThan(1);
    expect(beijingElements.length).toBeGreaterThan(1);
    expect(screen.getByText("¥750.00 × 2人")).toBeInTheDocument();
  });

  it("does not display inbound flight when not present", () => {
    const dataWithoutInbound = {
      ...mockPaymentData,
      inboundFlight: undefined,
    };

    render(<OrderPaymentDetails paymentData={dataWithoutInbound} />);

    // Should only have one occurrence of each city
    expect(screen.getAllByText("北京")).toHaveLength(1);
    expect(screen.getAllByText("上海")).toHaveLength(1);
  });

  it("displays ancillary services", () => {
    render(<OrderPaymentDetails paymentData={mockPaymentData} />);

    expect(screen.getByText("航空意外险")).toBeInTheDocument();
    expect(screen.getByText("¥30.00 × 2份")).toBeInTheDocument();
    expect(screen.getByText("行李托运")).toBeInTheDocument();
    expect(screen.getByText("¥70.00 × 2份")).toBeInTheDocument();
  });

  it("does not display ancillary services section when empty", () => {
    const dataWithoutServices = {
      ...mockPaymentData,
      ancillaryServices: [],
    };

    render(<OrderPaymentDetails paymentData={dataWithoutServices} />);

    expect(screen.queryByText("航空意外险")).not.toBeInTheDocument();
    expect(screen.queryByText("行李托运")).not.toBeInTheDocument();
  });

  it("handles one-way trip without ancillary services", () => {
    const oneWayData: PaymentData = {
      totalAmount: "800.00",
      createdAt: "2026-01-18T10:30:00Z",
      outboundFlight: {
        depatureCityName: "北京",
        arrivalCityName: "上海",
        unitPrice: "800.00",
        passengerCount: 1,
      },
      ancillaryServices: [],
    };

    render(<OrderPaymentDetails paymentData={oneWayData} />);

    expect(screen.getByText("¥800.00")).toBeInTheDocument();
    expect(screen.getByText("¥800.00 × 1人")).toBeInTheDocument();
  });
});

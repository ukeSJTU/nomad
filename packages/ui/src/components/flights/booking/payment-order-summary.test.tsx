import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { PaymentOrderSummaryProps } from "./payment-order-summary";
import { PaymentOrderSummary } from "./payment-order-summary";

describe("PaymentOrderSummary", () => {
  const mockOutboundFlight = {
    flightNumber: "CA1234",
    airlineName: "中国国际航空",
    departureDate: "2026/01/20",
    departureTime: "08:00",
    departureAirport: "北京首都国际机场",
    arrivalTime: "11:30",
    arrivalAirport: "上海虹桥国际机场",
  };

  const mockPassengers = [
    { name: "张三", identityNumber: "110101199001011234" },
    { name: "李四", identityNumber: "110101199002021234" },
  ];

  it("should render outbound flight information", () => {
    const props: PaymentOrderSummaryProps = {
      outboundFlight: mockOutboundFlight,
      passengers: mockPassengers,
    };

    render(<PaymentOrderSummary {...props} />);

    expect(screen.getByText("订单信息")).toBeInTheDocument();
    expect(screen.getByText("去程航班")).toBeInTheDocument();
    expect(screen.getByText("CA1234 中国国际航空")).toBeInTheDocument();
    expect(
      screen.getByText(/2026\/01\/20 08:00 北京首都国际机场/)
    ).toBeInTheDocument();
  });

  it("should render inbound flight when provided", () => {
    const mockInboundFlight = {
      flightNumber: "CA5678",
      airlineName: "中国国际航空",
      departureDate: "2026/01/27",
      departureTime: "14:00",
      departureAirport: "上海虹桥国际机场",
      arrivalTime: "17:30",
      arrivalAirport: "北京首都国际机场",
    };

    const props: PaymentOrderSummaryProps = {
      outboundFlight: mockOutboundFlight,
      inboundFlight: mockInboundFlight,
      passengers: mockPassengers,
    };

    render(<PaymentOrderSummary {...props} />);

    expect(screen.getByText("返程航班")).toBeInTheDocument();
    expect(screen.getByText("CA5678 中国国际航空")).toBeInTheDocument();
    expect(
      screen.getByText(/2026\/01\/27 14:00 上海虹桥国际机场/)
    ).toBeInTheDocument();
  });

  it("should not render inbound flight section when not provided", () => {
    const props: PaymentOrderSummaryProps = {
      outboundFlight: mockOutboundFlight,
      passengers: mockPassengers,
    };

    render(<PaymentOrderSummary {...props} />);

    expect(screen.queryByText("返程航班")).not.toBeInTheDocument();
  });

  it("should render passenger information", () => {
    const props: PaymentOrderSummaryProps = {
      outboundFlight: mockOutboundFlight,
      passengers: mockPassengers,
    };

    render(<PaymentOrderSummary {...props} />);

    expect(screen.getByText("乘机人")).toBeInTheDocument();
    expect(screen.getByText("张三 (110101199001011234)")).toBeInTheDocument();
    expect(screen.getByText("李四 (110101199002021234)")).toBeInTheDocument();
  });

  it("should render contact information when provided", () => {
    const props: PaymentOrderSummaryProps = {
      outboundFlight: mockOutboundFlight,
      passengers: mockPassengers,
      contactPhone: "13800138000",
      contactEmail: "test@example.com",
    };

    render(<PaymentOrderSummary {...props} />);

    expect(screen.getByText("联系人")).toBeInTheDocument();
    expect(screen.getByText("13800138000")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("should render only phone when email is not provided", () => {
    const props: PaymentOrderSummaryProps = {
      outboundFlight: mockOutboundFlight,
      passengers: mockPassengers,
      contactPhone: "13800138000",
    };

    render(<PaymentOrderSummary {...props} />);

    expect(screen.getByText("13800138000")).toBeInTheDocument();
    expect(screen.queryByText("test@example.com")).not.toBeInTheDocument();
  });

  it("should render ancillary services when provided", () => {
    const mockAncillaryServices = [
      { name: "基础旅行险", price: "30" },
      { name: "机场接送服务", price: "150" },
    ];

    const props: PaymentOrderSummaryProps = {
      outboundFlight: mockOutboundFlight,
      passengers: mockPassengers,
      ancillaryServices: mockAncillaryServices,
    };

    render(<PaymentOrderSummary {...props} />);

    expect(screen.getByText("增值服务")).toBeInTheDocument();
    expect(screen.getByText("基础旅行险")).toBeInTheDocument();
    expect(screen.getByText("¥30")).toBeInTheDocument();
    expect(screen.getByText("机场接送服务")).toBeInTheDocument();
    expect(screen.getByText("¥150")).toBeInTheDocument();
  });

  it("should not render ancillary services section when empty", () => {
    const props: PaymentOrderSummaryProps = {
      outboundFlight: mockOutboundFlight,
      passengers: mockPassengers,
      ancillaryServices: [],
    };

    render(<PaymentOrderSummary {...props} />);

    expect(screen.queryByText("增值服务")).not.toBeInTheDocument();
  });

  it("should render all sections when all data is provided", () => {
    const mockInboundFlight = {
      flightNumber: "CA5678",
      airlineName: "中国国际航空",
      departureDate: "2026/01/27",
      departureTime: "14:00",
      departureAirport: "上海虹桥国际机场",
      arrivalTime: "17:30",
      arrivalAirport: "北京首都国际机场",
    };

    const mockAncillaryServices = [{ name: "基础旅行险", price: "30" }];

    const props: PaymentOrderSummaryProps = {
      outboundFlight: mockOutboundFlight,
      inboundFlight: mockInboundFlight,
      passengers: mockPassengers,
      contactPhone: "13800138000",
      contactEmail: "test@example.com",
      ancillaryServices: mockAncillaryServices,
    };

    render(<PaymentOrderSummary {...props} />);

    expect(screen.getByText("订单信息")).toBeInTheDocument();
    expect(screen.getByText("去程航班")).toBeInTheDocument();
    expect(screen.getByText("返程航班")).toBeInTheDocument();
    expect(screen.getByText("乘机人")).toBeInTheDocument();
    expect(screen.getByText("联系人")).toBeInTheDocument();
    expect(screen.getByText("增值服务")).toBeInTheDocument();
  });
});

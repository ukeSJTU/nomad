import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { FlightCardProps } from "../results/flight-card";
import { FlightListOneWay } from "./flight-list-one-way";

describe("FlightListOneWay", () => {
  const mockFlights: FlightCardProps[] = [
    {
      airlineLogo: "https://example.com/airline1.png",
      airlineName: "测试航空",
      flightNumber: "CA1234",
      aircraftType: "Boeing 737",
      departureTime: "08:00",
      departureAirport: "北京首都国际机场 T3",
      arrivalTime: "10:55",
      arrivalAirport: "上海浦东国际机场 T2",
      duration: "2h 55m",
      price: 850,
      formatCurrency: (value: number) => `¥${value}`,
      buttonText: "预订",
      onButtonClick: vi.fn(),
    },
    {
      airlineName: "东方航空",
      flightNumber: "MU5678",
      aircraftType: "Airbus A320",
      departureTime: "14:30",
      departureAirport: "北京首都国际机场 T2",
      arrivalTime: "17:25",
      arrivalAirport: "上海虹桥国际机场 T1",
      duration: "2h 55m",
      price: 920,
      formatCurrency: (value: number) => `¥${value}`,
      buttonText: "预订",
      onButtonClick: vi.fn(),
    },
  ];

  it("renders flight list when flights are provided", () => {
    render(<FlightListOneWay flights={mockFlights} />);

    expect(screen.getByText(/CA1234/)).toBeInTheDocument();
    expect(screen.getByText(/MU5678/)).toBeInTheDocument();
    expect(screen.getByText("测试航空")).toBeInTheDocument();
    expect(screen.getByText("东方航空")).toBeInTheDocument();
  });

  it("renders empty state when no flights are provided", () => {
    render(<FlightListOneWay flights={[]} />);

    expect(screen.getByText("未找到航班")).toBeInTheDocument();
    expect(screen.getByText("请尝试调整搜索条件")).toBeInTheDocument();
  });

  it("renders custom empty state text", () => {
    render(
      <FlightListOneWay
        flights={[]}
        noFlightsTitle="没有可用航班"
        noFlightsDescription="请修改您的搜索条件"
      />
    );

    expect(screen.getByText("没有可用航班")).toBeInTheDocument();
    expect(screen.getByText("请修改您的搜索条件")).toBeInTheDocument();
  });

  it("applies custom className to container", () => {
    const { container } = render(
      <FlightListOneWay flights={mockFlights} className="custom-class" />
    );

    const listContainer = container.querySelector(".custom-class");
    expect(listContainer).toBeInTheDocument();
  });

  it("renders all flight cards with correct data", () => {
    render(<FlightListOneWay flights={mockFlights} />);

    // Check departure and arrival times
    expect(screen.getByText("08:00")).toBeInTheDocument();
    expect(screen.getByText("10:55")).toBeInTheDocument();
    expect(screen.getByText("14:30")).toBeInTheDocument();
    expect(screen.getByText("17:25")).toBeInTheDocument();

    // Check duration
    expect(screen.getAllByText("2h 55m")).toHaveLength(2);
  });
});

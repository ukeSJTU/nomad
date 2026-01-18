import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AirportWeather } from "./airport-weather";

describe("AirportWeather", () => {
  const mockForecasts = [
    { date: "明天 (12-03)", weather: "多云", tempRange: "-7℃~0℃" },
    { date: "后天 (12-04)", weather: "晴", tempRange: "-8℃~-2℃" },
  ];

  const defaultProps = {
    cityName: "上海",
    date: "2025-12-05",
    dayOfWeek: "周四",
    currentTempRange: "8℃~15℃",
    currentWeather: "阴",
    forecasts: mockForecasts,
  };

  it("renders weather card in sidebar layout", () => {
    render(<AirportWeather {...defaultProps} />);

    expect(screen.getByText("今日天气")).toBeInTheDocument();
    expect(screen.getByText("上海")).toBeInTheDocument();
    expect(screen.getByText("8℃~15℃")).toBeInTheDocument();
  });

  it("applies correct sidebar styling", () => {
    const { container } = render(<AirportWeather {...defaultProps} />);

    const aside = container.querySelector("aside");
    expect(aside).toHaveClass("w-full", "lg:w-[280px]", "space-y-4");
  });
});

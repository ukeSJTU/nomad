import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DestinationGuide } from "./destination-guide";

describe("DestinationGuide", () => {
  const mockBoardingProcess = {
    href: "/flights/guide/process",
    title: "乘机流程",
    subtitle: "boarding procedures",
  };

  const mockWeather = {
    cityName: "北京",
    date: "2025-12-02",
    dayOfWeek: "周一",
    currentTempRange: "-3℃~5℃",
    currentWeather: "多云",
    forecasts: [
      { date: "明天 (12-03)", weather: "多云", tempRange: "-7℃~0℃" },
      { date: "后天 (12-04)", weather: "晴", tempRange: "-8℃~-2℃" },
    ],
  };

  const defaultProps = {
    boardingProcess: mockBoardingProcess,
    weather: mockWeather,
  };

  it("renders boarding process card", () => {
    render(<DestinationGuide {...defaultProps} />);

    expect(screen.getByText("乘机流程")).toBeInTheDocument();
    expect(screen.getByText("boarding procedures")).toBeInTheDocument();
  });

  it("renders weather card", () => {
    render(<DestinationGuide {...defaultProps} />);

    expect(screen.getByText("今日天气")).toBeInTheDocument();
    expect(screen.getByText("北京")).toBeInTheDocument();
    expect(screen.getByText("-3℃~5℃")).toBeInTheDocument();
  });

  it("applies sidebar layout styling", () => {
    const { container } = render(<DestinationGuide {...defaultProps} />);

    const aside = container.querySelector("aside");
    expect(aside).toHaveClass("w-full", "lg:w-[280px]", "space-y-4");
  });

  it("renders both components in correct order", () => {
    render(<DestinationGuide {...defaultProps} />);

    const aside = screen.getByRole("complementary");
    const children = aside.children;

    expect(children[0]).toContainHTML("乘机流程");
    expect(children[1]).toContainHTML("今日天气");
  });
});

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { WeatherCard } from "./weather-card";

describe("WeatherCard", () => {
  const mockForecasts = [
    { date: "明天 (12-03)", weather: "多云", tempRange: "-7℃~0℃" },
    { date: "后天 (12-04)", weather: "晴", tempRange: "-8℃~-2℃" },
  ];

  const defaultProps = {
    cityName: "北京",
    date: "2025-12-02",
    dayOfWeek: "周一",
    currentTempRange: "-3℃~5℃",
    currentWeather: "多云",
    forecasts: mockForecasts,
  };

  it("renders weather information correctly", () => {
    render(<WeatherCard {...defaultProps} />);

    expect(screen.getByText("今日天气")).toBeInTheDocument();
    expect(screen.getByText("北京")).toBeInTheDocument();
    expect(screen.getByText("2025-12-02 周一")).toBeInTheDocument();
    expect(screen.getByText("-3℃~5℃")).toBeInTheDocument();

    // Use getAllByText since "多云" appears multiple times (current weather + forecast)
    const cloudyElements = screen.getAllByText("多云");
    expect(cloudyElements.length).toBeGreaterThan(0);
  });

  it("renders forecast items", () => {
    render(<WeatherCard {...defaultProps} />);

    expect(screen.getByText("明天 (12-03)")).toBeInTheDocument();
    expect(screen.getByText("-7℃~0℃")).toBeInTheDocument();
    expect(screen.getByText("后天 (12-04)")).toBeInTheDocument();
    expect(screen.getByText("-8℃~-2℃")).toBeInTheDocument();
  });

  it("renders view more button as disabled by default", () => {
    render(<WeatherCard {...defaultProps} />);

    const viewMoreButton = screen.getByRole("button", { name: /查看更多/ });
    expect(viewMoreButton).toBeDisabled();
  });

  it("calls onViewMore when enabled and clicked", async () => {
    const user = userEvent.setup();
    const onViewMore = vi.fn();

    render(
      <WeatherCard
        {...defaultProps}
        onViewMore={onViewMore}
        viewMoreDisabled={false}
      />
    );

    const viewMoreButton = screen.getByRole("button", { name: /查看更多/ });
    expect(viewMoreButton).not.toBeDisabled();

    await user.click(viewMoreButton);
    expect(onViewMore).toHaveBeenCalledTimes(1);
  });

  it("renders empty forecasts array", () => {
    render(<WeatherCard {...defaultProps} forecasts={[]} />);

    expect(screen.getByText("北京")).toBeInTheDocument();
    expect(screen.queryByText("明天 (12-03)")).not.toBeInTheDocument();
  });
});

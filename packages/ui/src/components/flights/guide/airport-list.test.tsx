import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AirportList } from "./airport-list";

// Mock the useUiComponents hook
vi.mock("../../platform", () => ({
  useUiComponents: () => ({
    Link: ({ href, children, className }: any) => (
      <a href={href} className={className} data-testid="link">
        {children}
      </a>
    ),
  }),
}));

const mockAirports = [
  {
    cityName: "New York",
    airportName: "John F. Kennedy International Airport",
    airportCode: "JFK",
    key: "jfk",
  },
  {
    cityName: "Los Angeles",
    airportName: "Los Angeles International Airport",
    airportCode: "LAX",
    key: "lax",
  },
];

describe("AirportList", () => {
  it("应该渲染 title", () => {
    const title = "Popular Airports";
    render(
      <AirportList
        title={title}
        airports={mockAirports}
        emptyMessage="No airports found"
      />
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(title);
  });

  it("应该渲染机场列表", () => {
    render(
      <AirportList
        title="Popular Airports"
        airports={mockAirports}
        emptyMessage="No airports found"
      />
    );

    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(
      screen.getByText("John F. Kennedy International Airport")
    ).toBeInTheDocument();
    expect(screen.getByText("Los Angeles")).toBeInTheDocument();
    expect(
      screen.getByText("Los Angeles International Airport")
    ).toBeInTheDocument();
  });

  it("应该渲染正确的链接", () => {
    render(
      <AirportList
        title="Popular Airports"
        airports={mockAirports}
        emptyMessage="No airports found"
      />
    );

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/flights/guide/airport-JFK");
    expect(links[1]).toHaveAttribute("href", "/flights/guide/airport-LAX");
  });

  it("当机场列表为空的时候显示正确的文本", () => {
    const emptyMessage = "No airports available";
    render(
      <AirportList
        title="Popular Airports"
        airports={[]}
        emptyMessage={emptyMessage}
      />
    );

    expect(screen.getByText(emptyMessage)).toBeInTheDocument();
    expect(screen.queryByText("New York")).not.toBeInTheDocument();
  });

  it("当文本内容很长的时候 truncate 效果生效", () => {
    const longCityName = "Very Long City Name That Should Be Truncated";
    const longAirportName =
      "Very Long Airport Name That Should Also Be Truncated International Airport";

    render(
      <AirportList
        title="Popular Airports"
        airports={[
          {
            cityName: longCityName,
            airportName: longAirportName,
            airportCode: "ABC",
            key: "abc",
          },
        ]}
        emptyMessage="No airports found"
      />
    );

    const cityElement = screen.getByText(longCityName);
    const airportElement = screen.getByText(longAirportName);

    // Check if truncate class is applied
    expect(cityElement).toHaveClass("truncate");
    expect(airportElement).toHaveClass("truncate");
  });
});

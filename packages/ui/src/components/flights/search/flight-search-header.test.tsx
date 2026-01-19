import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FlightSearchHeader } from "./flight-search-header";
import type { CityData } from "./types";

const mockDepartureCity: CityData = {
  iataCode: "SHA",
  name: "上海",
  timezone: "Asia/Shanghai",
  pinyinFirstLetter: "S",
  continent: null,
  isPopular: true,
  displayOrder: 1,
};

const mockArrivalCity: CityData = {
  iataCode: "PEK",
  name: "北京",
  timezone: "Asia/Shanghai",
  pinyinFirstLetter: "B",
  continent: null,
  isPopular: true,
  displayOrder: 2,
};

const mockText = {
  oneWay: "单程",
  tabSelectOutbound: "选择去程",
  tabSelectReturn: "选择返程",
  lastUpdate: "最近更新",
  priceFluctuationNotice: "机票价格变动频繁,搜索结果有效期15min。",
};

const mockRoundTripSteps = {
  outbound: 1,
  return: 2,
};

describe("FlightSearchHeader", () => {
  describe("one-way trip", () => {
    it("renders trip type label", () => {
      render(
        <FlightSearchHeader
          tripType="one-way"
          departureCity={mockDepartureCity}
          arrivalCity={mockArrivalCity}
          formattedDepartureDate="10月30日 周四"
          formattedLastUpdateTime="18:11:15"
          text={mockText}
          roundTripSteps={mockRoundTripSteps}
        />
      );

      expect(screen.getByText("单程")).toBeInTheDocument();
    });

    it("renders departure and arrival city names", () => {
      render(
        <FlightSearchHeader
          tripType="one-way"
          departureCity={mockDepartureCity}
          arrivalCity={mockArrivalCity}
          formattedDepartureDate="10月30日 周四"
          formattedLastUpdateTime="18:11:15"
          text={mockText}
          roundTripSteps={mockRoundTripSteps}
        />
      );

      expect(screen.getByText("上海")).toBeInTheDocument();
      expect(screen.getByText("北京")).toBeInTheDocument();
    });

    it("renders formatted departure date", () => {
      render(
        <FlightSearchHeader
          tripType="one-way"
          departureCity={mockDepartureCity}
          arrivalCity={mockArrivalCity}
          formattedDepartureDate="10月30日 周四"
          formattedLastUpdateTime="18:11:15"
          text={mockText}
          roundTripSteps={mockRoundTripSteps}
        />
      );

      expect(screen.getByText("10月30日 周四")).toBeInTheDocument();
    });

    it("renders formatted last update time", () => {
      render(
        <FlightSearchHeader
          tripType="one-way"
          departureCity={mockDepartureCity}
          arrivalCity={mockArrivalCity}
          formattedDepartureDate="10月30日 周四"
          formattedLastUpdateTime="18:11:15"
          text={mockText}
          roundTripSteps={mockRoundTripSteps}
        />
      );

      expect(screen.getByText("18:11:15")).toBeInTheDocument();
    });
  });

  describe("round-trip", () => {
    it("renders tabs for outbound and return", () => {
      render(
        <FlightSearchHeader
          tripType="round-trip"
          departureCity={mockDepartureCity}
          arrivalCity={mockArrivalCity}
          formattedDepartureDate="10月30日 周四"
          formattedReturnDate="11月2日 周日"
          formattedLastUpdateTime="18:11:15"
          activeTab="outbound"
          text={mockText}
          roundTripSteps={mockRoundTripSteps}
        />
      );

      expect(screen.getByText("选择去程")).toBeInTheDocument();
      expect(screen.getByText("选择返程")).toBeInTheDocument();
    });

    it("renders outbound flight info", () => {
      render(
        <FlightSearchHeader
          tripType="round-trip"
          departureCity={mockDepartureCity}
          arrivalCity={mockArrivalCity}
          formattedDepartureDate="10月30日 周四"
          formattedReturnDate="11月2日 周日"
          formattedLastUpdateTime="18:11:15"
          activeTab="outbound"
          text={mockText}
          roundTripSteps={mockRoundTripSteps}
        />
      );

      // Check for outbound tab content
      const outboundTab = screen.getByRole("tab", { name: /选择去程/ });
      expect(outboundTab).toBeInTheDocument();
      expect(outboundTab).toHaveTextContent("上海");
      expect(outboundTab).toHaveTextContent("北京");
      expect(outboundTab).toHaveTextContent("10月30日 周四");
    });

    it("renders return flight info", () => {
      render(
        <FlightSearchHeader
          tripType="round-trip"
          departureCity={mockDepartureCity}
          arrivalCity={mockArrivalCity}
          formattedDepartureDate="10月30日 周四"
          formattedReturnDate="11月2日 周日"
          formattedLastUpdateTime="18:11:15"
          activeTab="outbound"
          text={mockText}
          roundTripSteps={mockRoundTripSteps}
        />
      );

      // Check for return tab content (cities are swapped)
      const returnTab = screen.getByRole("tab", { name: /选择返程/ });
      expect(returnTab).toBeInTheDocument();
      expect(returnTab).toHaveTextContent("北京");
      expect(returnTab).toHaveTextContent("上海");
      expect(returnTab).toHaveTextContent("11月2日 周日");
    });

    it("calls onTabChange when tab is clicked", async () => {
      const user = userEvent.setup();
      const onTabChange = vi.fn();

      render(
        <FlightSearchHeader
          tripType="round-trip"
          departureCity={mockDepartureCity}
          arrivalCity={mockArrivalCity}
          formattedDepartureDate="10月30日 周四"
          formattedReturnDate="11月2日 周日"
          formattedLastUpdateTime="18:11:15"
          activeTab="outbound"
          onTabChange={onTabChange}
          text={mockText}
          roundTripSteps={mockRoundTripSteps}
        />
      );

      await user.click(screen.getByRole("tab", { name: /选择返程/ }));
      expect(onTabChange).toHaveBeenCalledWith("return");
    });

    it("shows step numbers for outbound and return", () => {
      render(
        <FlightSearchHeader
          tripType="round-trip"
          departureCity={mockDepartureCity}
          arrivalCity={mockArrivalCity}
          formattedDepartureDate="10月30日 周四"
          formattedReturnDate="11月2日 周日"
          formattedLastUpdateTime="18:11:15"
          activeTab="outbound"
          text={mockText}
          roundTripSteps={mockRoundTripSteps}
        />
      );

      // Step numbers should be visible
      const outboundTab = screen.getByRole("tab", { name: /选择去程/ });
      const returnTab = screen.getByRole("tab", { name: /选择返程/ });

      expect(outboundTab).toHaveTextContent("1");
      expect(returnTab).toHaveTextContent("2");
    });
  });

  describe("tooltip", () => {
    it("renders last update label and time", () => {
      render(
        <FlightSearchHeader
          tripType="one-way"
          departureCity={mockDepartureCity}
          arrivalCity={mockArrivalCity}
          formattedDepartureDate="10月30日 周四"
          formattedLastUpdateTime="18:11:15"
          text={mockText}
          roundTripSteps={mockRoundTripSteps}
        />
      );

      expect(screen.getByText("最近更新")).toBeInTheDocument();
      expect(screen.getByText("18:11:15")).toBeInTheDocument();
    });
  });
});

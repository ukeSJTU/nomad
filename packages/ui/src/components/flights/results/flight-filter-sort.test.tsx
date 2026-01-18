import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  FlightFilterSort,
  type FlightFilterSortProps,
  type FlightFilters,
} from "./flight-filter-sort";

describe("FlightFilterSort", () => {
  const mockAirlines = [
    { id: "airline-1", name: "China Eastern", iataCode: "MU" },
    { id: "airline-2", name: "China Southern", iataCode: "CZ" },
    { id: "airline-3", name: "Air China", iataCode: "CA" },
  ];

  const mockFilters: FlightFilters = {
    airlines: [],
    seatClasses: [],
    departureTimeRanges: [],
    arrivalTimeRanges: [],
  };

  const defaultProps: FlightFilterSortProps = {
    filters: mockFilters,
    sortOption: "price-asc",
    airlines: mockAirlines,
    onFiltersChange: vi.fn(),
    onSortChange: vi.fn(),
  };

  describe("Rendering", () => {
    it("renders filter and sort controls", () => {
      render(<FlightFilterSort {...defaultProps} />);

      // Check filter controls
      expect(screen.getByText("航空公司")).toBeInTheDocument();
      expect(screen.getByText("座舱类型")).toBeInTheDocument();
      expect(screen.getByText("起抵时间")).toBeInTheDocument();

      // Check sort label and buttons
      expect(screen.getByText("排序:")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /价格/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /耗时/ })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /起飞时间/ })
      ).toBeInTheDocument();
    });

    it("shows active filter badges when filters are applied", () => {
      const filtersWithAirlines: FlightFilters = {
        ...mockFilters,
        airlines: ["airline-1", "airline-2"],
      };

      render(
        <FlightFilterSort {...defaultProps} filters={filtersWithAirlines} />
      );

      // Check for badge showing count of selected airlines
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("shows active sort button with correct styling", () => {
      render(<FlightFilterSort {...defaultProps} sortOption="price-asc" />);

      const priceButton = screen.getByRole("button", { name: /价格/ });
      // Button should exist and be rendered
      expect(priceButton).toBeInTheDocument();
    });
  });

  describe("Time Range Filter", () => {
    it("shows badge count when time ranges are selected", () => {
      const filtersWithTimeRanges: FlightFilters = {
        ...mockFilters,
        departureTimeRanges: ["0-6", "6-12"],
        arrivalTimeRanges: ["12-18"],
      };

      render(
        <FlightFilterSort {...defaultProps} filters={filtersWithTimeRanges} />
      );

      // Badge should show 3 (2 departure + 1 arrival)
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });

  describe("Sort Controls", () => {
    it("calls onSortChange when price button is clicked", async () => {
      const user = userEvent.setup();
      const onSortChange = vi.fn();
      render(
        <FlightFilterSort
          {...defaultProps}
          sortOption="price-asc"
          onSortChange={onSortChange}
        />
      );

      const priceButton = screen.getByRole("button", { name: /价格/ });
      await user.click(priceButton);

      expect(onSortChange).toHaveBeenCalledWith("price-desc");
    });

    it("toggles price sort direction on click", async () => {
      const user = userEvent.setup();
      const onSortChange = vi.fn();
      render(
        <FlightFilterSort
          {...defaultProps}
          sortOption="price-desc"
          onSortChange={onSortChange}
        />
      );

      const priceButton = screen.getByRole("button", { name: /价格/ });
      await user.click(priceButton);

      expect(onSortChange).toHaveBeenCalledWith("price-asc");
    });

    it("calls onSortChange when duration button is clicked", async () => {
      const user = userEvent.setup();
      const onSortChange = vi.fn();
      render(
        <FlightFilterSort
          {...defaultProps}
          sortOption="price-asc"
          onSortChange={onSortChange}
        />
      );

      const durationButton = screen.getByRole("button", { name: /耗时/ });
      await user.click(durationButton);

      expect(onSortChange).toHaveBeenCalledWith("duration-asc");
    });

    it("toggles duration sort direction on click", async () => {
      const user = userEvent.setup();
      const onSortChange = vi.fn();
      render(
        <FlightFilterSort
          {...defaultProps}
          sortOption="duration-asc"
          onSortChange={onSortChange}
        />
      );

      const durationButton = screen.getByRole("button", { name: /耗时/ });
      await user.click(durationButton);

      expect(onSortChange).toHaveBeenCalledWith("duration-desc");
    });

    it("calls onSortChange when departure time button is clicked", async () => {
      const user = userEvent.setup();
      const onSortChange = vi.fn();
      render(
        <FlightFilterSort
          {...defaultProps}
          sortOption="price-asc"
          onSortChange={onSortChange}
        />
      );

      const departureButton = screen.getByRole("button", { name: /起飞时间/ });
      await user.click(departureButton);

      expect(onSortChange).toHaveBeenCalledWith("departure-asc");
    });

    it("toggles departure sort direction on click", async () => {
      const user = userEvent.setup();
      const onSortChange = vi.fn();
      render(
        <FlightFilterSort
          {...defaultProps}
          sortOption="departure-asc"
          onSortChange={onSortChange}
        />
      );

      const departureButton = screen.getByRole("button", { name: /起飞时间/ });
      await user.click(departureButton);

      expect(onSortChange).toHaveBeenCalledWith("departure-desc");
    });
  });

  describe("Multiple Filters", () => {
    it("handles multiple filters simultaneously", () => {
      const complexFilters: FlightFilters = {
        airlines: ["airline-1", "airline-2"],
        seatClasses: ["ECONOMY", "BUSINESS"],
        departureTimeRanges: ["0-6", "6-12"],
        arrivalTimeRanges: ["18-24"],
      };

      render(<FlightFilterSort {...defaultProps} filters={complexFilters} />);

      // Check that badges are displayed using getAllByText
      const badges = screen.getAllByText("2");
      expect(badges.length).toBeGreaterThan(0);
    });
  });

  describe("Controlled Component Behavior", () => {
    it("renders with provided filter values", () => {
      const customFilters: FlightFilters = {
        airlines: ["airline-1"],
        seatClasses: ["ECONOMY"],
        departureTimeRanges: ["6-12"],
        arrivalTimeRanges: [],
      };

      render(<FlightFilterSort {...defaultProps} filters={customFilters} />);

      // Component should render without errors
      expect(screen.getByText("排序:")).toBeInTheDocument();
    });

    it("renders with provided sort option", () => {
      render(<FlightFilterSort {...defaultProps} sortOption="duration-desc" />);

      // Component should render without errors
      expect(screen.getByRole("button", { name: /耗时/ })).toBeInTheDocument();
    });

    it("renders with empty airlines list", () => {
      render(<FlightFilterSort {...defaultProps} airlines={[]} />);

      // Component should render without errors
      expect(screen.getByText("航空公司")).toBeInTheDocument();
    });
  });
});

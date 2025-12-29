import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  FlightCard,
  type FlightCardProps,
  type SeatClassOption,
} from "./flight-card";

// Mock the currency formatter
vi.mock("@/lib/format", () => ({
  formatCurrency: (value: number) => `¥${value.toFixed(2)}`,
}));

/**
 * @requirement REQ-F02
 * @requirement REQ-F03
 */
describe("FlightCard", () => {
  const mockSinglePriceProps: FlightCardProps = {
    airlineLogo: "https://example.com/airline-logo.png",
    airlineName: "China Eastern Airlines",
    flightNumber: "MU5117",
    aircraftType: "A320",
    departureTime: "08:30",
    departureAirport: "PVG",
    arrivalTime: "11:25",
    arrivalAirport: "PEK",
    duration: "2h 55m",
    price: 850,
    buttonText: "预订",
  };

  const mockSeatClasses: SeatClassOption[] = [
    {
      id: "economy-1",
      classType: "ECONOMY",
      totalSeats: 150,
      availableSeats: 45,
      price: 850,
    },
    {
      id: "business-1",
      classType: "BUSINESS",
      totalSeats: 30,
      availableSeats: 8,
      price: 2500,
    },
    {
      id: "first-1",
      classType: "FIRST",
      totalSeats: 10,
      availableSeats: 2,
      price: 5000,
    },
  ];

  const mockMultiSeatClassProps: FlightCardProps = {
    ...mockSinglePriceProps,
    price: undefined,
    seatClasses: mockSeatClasses,
    lowestPrice: 850,
  };

  /**
   * @requirement REQ-F02
   */
  describe("Single Price Mode", () => {
    /**
     * @requirement REQ-F02
     * @scenario 场景2
     */
    it("renders flight information correctly", () => {
      render(<FlightCard {...mockSinglePriceProps} />);

      // Check airline information
      expect(screen.getByText("China Eastern Airlines")).toBeInTheDocument();
      expect(screen.getByText(/MU5117/)).toBeInTheDocument();
      expect(screen.getByText(/A320/)).toBeInTheDocument();

      // Check departure and arrival information
      expect(screen.getByText("08:30")).toBeInTheDocument();
      expect(screen.getByText("PVG")).toBeInTheDocument();
      expect(screen.getByText("11:25")).toBeInTheDocument();
      expect(screen.getByText("PEK")).toBeInTheDocument();

      // Check duration
      expect(screen.getByText("2h 55m")).toBeInTheDocument();

      // Check price
      expect(screen.getByText("¥850.00")).toBeInTheDocument();

      // Check button
      expect(screen.getByRole("button", { name: /预订/ })).toBeInTheDocument();
    });

    it("renders with airline logo when provided", () => {
      render(<FlightCard {...mockSinglePriceProps} />);

      // When logo is provided, the airline name should still be visible
      expect(screen.getByText("China Eastern Airlines")).toBeInTheDocument();
      // The Avatar component will handle the logo rendering internally
    });

    it("displays airline initials when logo is not provided", () => {
      const propsWithoutLogo = {
        ...mockSinglePriceProps,
        airlineLogo: undefined,
      };
      render(<FlightCard {...propsWithoutLogo} />);

      // Avatar fallback should contain airline initials
      expect(screen.getByText("CE")).toBeInTheDocument();
    });

    it("displays day offset when provided", () => {
      const propsWithOffset = { ...mockSinglePriceProps, daysOffset: 1 };
      render(<FlightCard {...propsWithOffset} />);

      expect(screen.getByText("+1")).toBeInTheDocument();
    });

    it("handles multiple day offset correctly", () => {
      const propsWithOffset = { ...mockSinglePriceProps, daysOffset: 2 };
      render(<FlightCard {...propsWithOffset} />);

      expect(screen.getByText("+2")).toBeInTheDocument();
    });

    it("does not display day offset when zero or negative", () => {
      const propsWithZeroOffset = { ...mockSinglePriceProps, daysOffset: 0 };
      render(<FlightCard {...propsWithZeroOffset} />);

      expect(screen.queryByText("+0")).not.toBeInTheDocument();
    });

    it("calls onButtonClick when book button is clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <FlightCard {...mockSinglePriceProps} onButtonClick={handleClick} />
      );

      const button = screen.getByRole("button", { name: /预订/ });
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("uses custom button text when provided", () => {
      render(<FlightCard {...mockSinglePriceProps} buttonText="立即预订" />);

      expect(
        screen.getByRole("button", { name: "立即预订" })
      ).toBeInTheDocument();
    });

    it("applies custom className to card", () => {
      const { container } = render(
        <FlightCard {...mockSinglePriceProps} className="custom-class" />
      );

      const card = container.querySelector(".custom-class");
      expect(card).toBeInTheDocument();
    });
  });

  describe("Multi Seat Class Mode", () => {
    it("displays lowest price with '起' suffix", () => {
      render(<FlightCard {...mockMultiSeatClassProps} />);

      expect(screen.getByText("¥850.00")).toBeInTheDocument();
      expect(screen.getByText("起")).toBeInTheDocument();
    });

    it("shows expand button instead of book button", () => {
      render(<FlightCard {...mockMultiSeatClassProps} />);

      const expandButton = screen.getByRole("button", { name: /订票/ });
      expect(expandButton).toBeInTheDocument();

      // Should not show single book button
      const bookButtons = screen.queryAllByRole("button", { name: /预订/ });
      expect(bookButtons).toHaveLength(0);
    });

    it("expands and shows seat class options when expand button is clicked", async () => {
      const user = userEvent.setup();
      render(<FlightCard {...mockMultiSeatClassProps} />);

      // Initially seat classes should not be visible
      expect(screen.queryByText("经济舱")).not.toBeInTheDocument();
      expect(screen.queryByText("商务舱")).not.toBeInTheDocument();
      expect(screen.queryByText("头等舱")).not.toBeInTheDocument();

      // Click expand button
      const expandButton = screen.getByRole("button", { name: /订票/ });
      await user.click(expandButton);

      // Seat classes should now be visible
      expect(screen.getByText("经济舱")).toBeInTheDocument();
      expect(screen.getByText("商务舱")).toBeInTheDocument();
      expect(screen.getByText("头等舱")).toBeInTheDocument();
    });

    it("collapses when collapse button is clicked", async () => {
      const user = userEvent.setup();
      render(<FlightCard {...mockMultiSeatClassProps} />);

      // Expand first
      const expandButton = screen.getByRole("button", { name: /订票/ });
      await user.click(expandButton);

      expect(screen.getByText("经济舱")).toBeInTheDocument();

      // Collapse
      const collapseButton = screen.getByRole("button", { name: /收起/ });
      await user.click(collapseButton);

      expect(screen.queryByText("经济舱")).not.toBeInTheDocument();
    });

    it("displays correct seat class information", async () => {
      const user = userEvent.setup();
      render(<FlightCard {...mockMultiSeatClassProps} />);

      // Expand
      await user.click(screen.getByRole("button", { name: /订票/ }));

      // Check economy class
      expect(screen.getByText("经济舱")).toBeInTheDocument();
      expect(screen.getByText("剩余 45 座")).toBeInTheDocument();

      // Check business class
      expect(screen.getByText("商务舱")).toBeInTheDocument();
      expect(screen.getByText("剩余 8 座")).toBeInTheDocument();

      // Check first class
      expect(screen.getByText("头等舱")).toBeInTheDocument();
      expect(screen.getByText("剩余 2 座")).toBeInTheDocument();
    });

    it("displays correct prices for each seat class", async () => {
      const user = userEvent.setup();
      render(<FlightCard {...mockMultiSeatClassProps} />);

      // Expand
      await user.click(screen.getByRole("button", { name: /订票/ }));

      // Should have multiple prices displayed
      const prices = screen.getAllByText(/¥\d+\.\d+/);
      expect(prices.length).toBeGreaterThan(1);

      // Check specific prices (note: main price + 3 seat class prices)
      expect(screen.getByText("¥2500.00")).toBeInTheDocument();
      expect(screen.getByText("¥5000.00")).toBeInTheDocument();
    });

    it("calls onSeatClassClick when seat class button is clicked", async () => {
      const user = userEvent.setup();
      const handleSeatClassClick = vi.fn();
      render(
        <FlightCard
          {...mockMultiSeatClassProps}
          onSeatClassClick={handleSeatClassClick}
        />
      );

      // Expand
      await user.click(screen.getByRole("button", { name: /订票/ }));

      // Click on economy class button
      const buttons = screen.getAllByRole("button", { name: /预订/ });
      await user.click(buttons[0]);

      expect(handleSeatClassClick).toHaveBeenCalledTimes(1);
      expect(handleSeatClassClick).toHaveBeenCalledWith(mockSeatClasses[0]);
    });

    it("handles single seat class (edge case)", () => {
      const singleSeatClass = [mockSeatClasses[0]];
      const props = {
        ...mockMultiSeatClassProps,
        seatClasses: singleSeatClass,
      };

      render(<FlightCard {...props} />);

      // With only one seat class, should not show expand behavior
      expect(screen.getByRole("button", { name: /预订/ })).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /订票/ })
      ).not.toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles missing optional props gracefully", () => {
      const minimalProps: FlightCardProps = {
        airlineName: "Test Airline",
        flightNumber: "TA123",
        aircraftType: "B737",
        departureTime: "10:00",
        departureAirport: "SHA",
        arrivalTime: "12:00",
        arrivalAirport: "CAN",
        duration: "2h",
        price: 500,
      };

      render(<FlightCard {...minimalProps} />);

      expect(screen.getByText("Test Airline")).toBeInTheDocument();
      expect(screen.getByText("¥500.00")).toBeInTheDocument();
    });

    it("uses default button text when not provided", () => {
      const { buttonText, ...propsWithoutButtonText } = mockSinglePriceProps;
      render(<FlightCard {...propsWithoutButtonText} />);

      expect(
        screen.getByRole("button", { name: buttonText })
      ).toBeInTheDocument();
    });

    it("handles zero price correctly", () => {
      const propsWithZeroPrice = { ...mockSinglePriceProps, price: 0 };
      render(<FlightCard {...propsWithZeroPrice} />);

      expect(screen.getByText("¥0.00")).toBeInTheDocument();
    });

    it("handles airline names with single word for initials", () => {
      const props = {
        ...mockSinglePriceProps,
        airlineName: "Airline",
        airlineLogo: undefined,
      };
      render(<FlightCard {...props} />);

      // Single word names show first letter only (up to 2 chars from result)
      expect(screen.getByText("A")).toBeInTheDocument();
    });

    it("handles airline names with multiple words for initials", () => {
      const props = {
        ...mockSinglePriceProps,
        airlineName: "China Eastern Air Cargo",
        airlineLogo: undefined,
      };
      render(<FlightCard {...props} />);

      expect(screen.getByText("CE")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper button roles", () => {
      render(<FlightCard {...mockSinglePriceProps} />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("buttons are keyboard accessible", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <FlightCard {...mockSinglePriceProps} onButtonClick={handleClick} />
      );

      const button = screen.getByRole("button", { name: /预订/ });
      button.focus();
      await user.keyboard("{Enter}");

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("expand/collapse functionality is keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<FlightCard {...mockMultiSeatClassProps} />);

      const expandButton = screen.getByRole("button", { name: /订票/ });
      expandButton.focus();
      await user.keyboard("{Enter}");

      expect(screen.getByText("经济舱")).toBeInTheDocument();
    });
  });
});

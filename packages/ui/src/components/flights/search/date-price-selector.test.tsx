import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  DatePriceSelector,
  type DatePriceSelectorProps,
} from "./date-price-selector";

const mockPrices = [
  {
    date: "2024-01-01",
    formattedDate: "01/01",
    lowestPrice: 100,
    formattedPrice: "¥100",
    selected: false,
  },
  {
    date: "2024-01-02",
    formattedDate: "01/02",
    lowestPrice: 200,
    formattedPrice: "¥200",
    selected: true,
  },
  {
    date: "2024-01-03",
    formattedDate: "01/03",
    lowestPrice: null,
    formattedPrice: "",
    selected: false,
  },
];

const defaultProps: DatePriceSelectorProps = {
  prices: mockPrices,
  loading: false,
  canPrev: true,
  canNext: true,
  tripType: "one-way",
  onPrevRange: vi.fn(),
  onNextRange: vi.fn(),
  onSelect: vi.fn(),
};

describe("DatePriceSelector Component", () => {
  it("should render loading skeleton when loading is true", () => {
    render(<DatePriceSelector {...defaultProps} loading={true} />);

    // Loading state shows skeletons, not price buttons
    expect(screen.queryByText("01/01")).not.toBeInTheDocument();
  });

  it("should render price items when not loading", () => {
    render(<DatePriceSelector {...defaultProps} />);

    expect(screen.getByText("01/01")).toBeInTheDocument();
    expect(screen.getByText("01/02")).toBeInTheDocument();
    expect(screen.getByText("01/03")).toBeInTheDocument();
  });

  it("should display formatted prices", () => {
    render(<DatePriceSelector {...defaultProps} />);

    expect(screen.getByText("¥100")).toBeInTheDocument();
    expect(screen.getByText("¥200")).toBeInTheDocument();
    // Unavailable price shows "无"
    expect(screen.getByText("无")).toBeInTheDocument();
  });

  it("should call onSelect when clicking an available price", () => {
    const onSelect = vi.fn();
    render(<DatePriceSelector {...defaultProps} onSelect={onSelect} />);

    const firstPriceButton = screen.getByText("01/01").closest("button");
    fireEvent.click(firstPriceButton!);

    expect(onSelect).toHaveBeenCalledWith("2024-01-01");
  });

  it("should not allow clicking unavailable prices", () => {
    const onSelect = vi.fn();
    render(<DatePriceSelector {...defaultProps} onSelect={onSelect} />);

    const unavailableButton = screen.getByText("01/03").closest("button");
    expect(unavailableButton).toBeDisabled();
  });

  it("should call onPrevRange when clicking prev button", () => {
    const onPrevRange = vi.fn();
    render(<DatePriceSelector {...defaultProps} onPrevRange={onPrevRange} />);

    const prevButton = screen.getByRole("button", { name: "Previous range" });
    fireEvent.click(prevButton);

    expect(onPrevRange).toHaveBeenCalledTimes(1);
  });

  it("should call onNextRange when clicking next button", () => {
    const onNextRange = vi.fn();
    render(<DatePriceSelector {...defaultProps} onNextRange={onNextRange} />);

    const nextButton = screen.getByRole("button", { name: "Next range" });
    fireEvent.click(nextButton);

    expect(onNextRange).toHaveBeenCalledTimes(1);
  });

  it("should disable prev button when canPrev is false", () => {
    render(<DatePriceSelector {...defaultProps} canPrev={false} />);

    const prevButton = screen.getByRole("button", { name: "Previous range" });
    expect(prevButton).toBeDisabled();
  });

  it("should disable next button when canNext is false", () => {
    render(<DatePriceSelector {...defaultProps} canNext={false} />);

    const nextButton = screen.getByRole("button", { name: "Next range" });
    expect(nextButton).toBeDisabled();
  });

  it("should disable buttons when isPending is true", () => {
    render(<DatePriceSelector {...defaultProps} isPending={true} />);

    const prevButton = screen.getByRole("button", { name: "Previous range" });
    const nextButton = screen.getByRole("button", { name: "Next range" });

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it("should show return date for round-trip", () => {
    const roundTripPrices = [
      {
        date: "2024-01-01",
        returnDate: "2024-01-08",
        formattedDate: "01/01",
        formattedReturnDate: "01/08",
        lowestPrice: 100,
        formattedPrice: "¥100",
        selected: false,
      },
    ];

    render(
      <DatePriceSelector
        {...defaultProps}
        prices={roundTripPrices}
        tripType="round-trip"
      />
    );

    expect(screen.getByText("01/01")).toBeInTheDocument();
    expect(screen.getByText("01/08")).toBeInTheDocument();
  });

  it("should apply selected styles to selected price", () => {
    render(<DatePriceSelector {...defaultProps} />);

    const selectedButton = screen.getByText("01/02").closest("button");
    expect(selectedButton).toHaveClass("border-primary");
  });
});

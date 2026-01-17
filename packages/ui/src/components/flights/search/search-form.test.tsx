import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchForm } from "./search-form";
import type { CityData } from "./types";

const mockCities: CityData[] = [
  {
    iataCode: "SHA",
    name: "上海",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "S",
    continent: null,
    isPopular: true,
    displayOrder: 1,
  },
  {
    iataCode: "PEK",
    name: "北京",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "B",
    continent: null,
    isPopular: true,
    displayOrder: 2,
  },
];

describe("SearchForm", () => {
  it("renders trip type radio buttons", () => {
    const mockProps = {
      tripType: "one-way" as const,
      departureCity: null,
      arrivalCity: null,
      departureDate: null,
      returnDate: null,
      seatClass: "any",
      cities: mockCities,
      onTripTypeChange: vi.fn(),
      onDepartureCityChange: vi.fn(),
      onArrivalCityChange: vi.fn(),
      onDepartureDateChange: vi.fn(),
      onReturnDateChange: vi.fn(),
      onSeatClassChange: vi.fn(),
      onSwap: vi.fn(),
      cityInputSlot: <div>City Input Slot</div>,
      dateSelectorSlot: <div>Date Selector Slot</div>,
    };

    render(<SearchForm {...mockProps} />);

    expect(screen.getByLabelText("单程")).toBeInTheDocument();
    expect(screen.getByLabelText("往返")).toBeInTheDocument();
  });

  it("calls onTripTypeChange when trip type changes", async () => {
    const user = userEvent.setup();
    const onTripTypeChange = vi.fn();

    const mockProps = {
      tripType: "one-way" as const,
      departureCity: null,
      arrivalCity: null,
      departureDate: null,
      returnDate: null,
      seatClass: "any",
      cities: mockCities,
      onTripTypeChange,
      onDepartureCityChange: vi.fn(),
      onArrivalCityChange: vi.fn(),
      onDepartureDateChange: vi.fn(),
      onReturnDateChange: vi.fn(),
      onSeatClassChange: vi.fn(),
      onSwap: vi.fn(),
      cityInputSlot: <div>City Input Slot</div>,
      dateSelectorSlot: <div>Date Selector Slot</div>,
    };

    render(<SearchForm {...mockProps} />);

    await user.click(screen.getByLabelText("往返"));
    expect(onTripTypeChange).toHaveBeenCalledWith("round-trip");
  });

  it("renders seat class selector", () => {
    const mockProps = {
      tripType: "one-way" as const,
      departureCity: null,
      arrivalCity: null,
      departureDate: null,
      returnDate: null,
      seatClass: "any",
      cities: mockCities,
      onTripTypeChange: vi.fn(),
      onDepartureCityChange: vi.fn(),
      onArrivalCityChange: vi.fn(),
      onDepartureDateChange: vi.fn(),
      onReturnDateChange: vi.fn(),
      onSeatClassChange: vi.fn(),
      onSwap: vi.fn(),
      cityInputSlot: <div>City Input Slot</div>,
      dateSelectorSlot: <div>Date Selector Slot</div>,
    };

    render(<SearchForm {...mockProps} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders slots", () => {
    const mockProps = {
      tripType: "one-way" as const,
      departureCity: null,
      arrivalCity: null,
      departureDate: null,
      returnDate: null,
      seatClass: "any",
      cities: mockCities,
      onTripTypeChange: vi.fn(),
      onDepartureCityChange: vi.fn(),
      onArrivalCityChange: vi.fn(),
      onDepartureDateChange: vi.fn(),
      onReturnDateChange: vi.fn(),
      onSeatClassChange: vi.fn(),
      onSwap: vi.fn(),
      cityInputSlot: <div>City Input Slot</div>,
      dateSelectorSlot: <div>Date Selector Slot</div>,
    };

    render(<SearchForm {...mockProps} />);

    expect(screen.getByText("City Input Slot")).toBeInTheDocument();
    expect(screen.getByText("Date Selector Slot")).toBeInTheDocument();
  });

  it("renders search button when showSearchButton is true", () => {
    const onSearch = vi.fn();
    const mockProps = {
      tripType: "one-way" as const,
      departureCity: null,
      arrivalCity: null,
      departureDate: null,
      returnDate: null,
      seatClass: "any",
      cities: mockCities,
      showSearchButton: true,
      onTripTypeChange: vi.fn(),
      onDepartureCityChange: vi.fn(),
      onArrivalCityChange: vi.fn(),
      onDepartureDateChange: vi.fn(),
      onReturnDateChange: vi.fn(),
      onSeatClassChange: vi.fn(),
      onSwap: vi.fn(),
      onSearch,
      cityInputSlot: <div>City Input Slot</div>,
      dateSelectorSlot: <div>Date Selector Slot</div>,
    };

    render(<SearchForm {...mockProps} />);

    expect(screen.getByRole("button", { name: /搜 索/i })).toBeInTheDocument();
  });

  it("does not render search button when showSearchButton is false", () => {
    const mockProps = {
      tripType: "one-way" as const,
      departureCity: null,
      arrivalCity: null,
      departureDate: null,
      returnDate: null,
      seatClass: "any",
      cities: mockCities,
      showSearchButton: false,
      onTripTypeChange: vi.fn(),
      onDepartureCityChange: vi.fn(),
      onArrivalCityChange: vi.fn(),
      onDepartureDateChange: vi.fn(),
      onReturnDateChange: vi.fn(),
      onSeatClassChange: vi.fn(),
      onSwap: vi.fn(),
      cityInputSlot: <div>City Input Slot</div>,
      dateSelectorSlot: <div>Date Selector Slot</div>,
    };

    render(<SearchForm {...mockProps} />);

    expect(
      screen.queryByRole("button", { name: /搜 索/i })
    ).not.toBeInTheDocument();
  });

  it("calls onSearch when search button is clicked", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    const mockProps = {
      tripType: "one-way" as const,
      departureCity: mockCities[0],
      arrivalCity: mockCities[1],
      departureDate: new Date("2026-02-01"),
      returnDate: null,
      seatClass: "any",
      cities: mockCities,
      showSearchButton: true,
      onTripTypeChange: vi.fn(),
      onDepartureCityChange: vi.fn(),
      onArrivalCityChange: vi.fn(),
      onDepartureDateChange: vi.fn(),
      onReturnDateChange: vi.fn(),
      onSeatClassChange: vi.fn(),
      onSwap: vi.fn(),
      onSearch,
      cityInputSlot: <div>City Input Slot</div>,
      dateSelectorSlot: <div>Date Selector Slot</div>,
    };

    render(<SearchForm {...mockProps} />);

    await user.click(screen.getByRole("button", { name: /搜 索/i }));
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});

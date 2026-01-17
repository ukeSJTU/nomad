import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CityInput } from "./city-input";
import type { CityData } from "./types";

const mockCities: CityData[] = [
  {
    iataCode: "PEK",
    name: "北京",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "B",
    continent: null,
    isPopular: true,
    displayOrder: 1,
  },
  {
    iataCode: "SHA",
    name: "上海",
    timezone: "Asia/Shanghai",
    pinyinFirstLetter: "S",
    continent: null,
    isPopular: true,
    displayOrder: 2,
  },
];

describe("CityInput", () => {
  it("renders departure and arrival city buttons", () => {
    const onDepartureCityChange = vi.fn();
    const onArrivalCityChange = vi.fn();

    render(
      <CityInput
        departureCity={null}
        arrivalCity={null}
        onDepartureCityChange={onDepartureCityChange}
        onArrivalCityChange={onArrivalCityChange}
        cities={mockCities}
      />
    );

    expect(screen.getByText("出发地")).toBeInTheDocument();
    expect(screen.getByText("目的地")).toBeInTheDocument();
  });

  it("displays selected departure city", () => {
    const onDepartureCityChange = vi.fn();
    const onArrivalCityChange = vi.fn();

    render(
      <CityInput
        departureCity={mockCities[0]}
        arrivalCity={null}
        onDepartureCityChange={onDepartureCityChange}
        onArrivalCityChange={onArrivalCityChange}
        cities={mockCities}
      />
    );

    expect(screen.getByText("北京(PEK)")).toBeInTheDocument();
  });

  it("displays selected arrival city", () => {
    const onDepartureCityChange = vi.fn();
    const onArrivalCityChange = vi.fn();

    render(
      <CityInput
        departureCity={null}
        arrivalCity={mockCities[1]}
        onDepartureCityChange={onDepartureCityChange}
        onArrivalCityChange={onArrivalCityChange}
        cities={mockCities}
      />
    );

    expect(screen.getByText("上海(SHA)")).toBeInTheDocument();
  });

  it("displays placeholder when no city selected", () => {
    const onDepartureCityChange = vi.fn();
    const onArrivalCityChange = vi.fn();

    render(
      <CityInput
        departureCity={null}
        arrivalCity={null}
        onDepartureCityChange={onDepartureCityChange}
        onArrivalCityChange={onArrivalCityChange}
        cities={mockCities}
      />
    );

    expect(screen.getAllByText("请选择")).toHaveLength(2);
  });

  it("renders swap button when onSwap is provided", () => {
    const onDepartureCityChange = vi.fn();
    const onArrivalCityChange = vi.fn();
    const onSwap = vi.fn();

    render(
      <CityInput
        departureCity={null}
        arrivalCity={null}
        onDepartureCityChange={onDepartureCityChange}
        onArrivalCityChange={onArrivalCityChange}
        onSwap={onSwap}
        cities={mockCities}
      />
    );

    const swapButton = screen.getByRole("button", { name: "" });
    expect(swapButton).toBeInTheDocument();
  });

  it("does not render swap button when onSwap is not provided", () => {
    const onDepartureCityChange = vi.fn();
    const onArrivalCityChange = vi.fn();

    const { container } = render(
      <CityInput
        departureCity={null}
        arrivalCity={null}
        onDepartureCityChange={onDepartureCityChange}
        onArrivalCityChange={onArrivalCityChange}
        cities={mockCities}
      />
    );

    const buttons = container.querySelectorAll("button");
    expect(buttons).toHaveLength(2); // Only departure and arrival buttons
  });

  it("calls onSwap when swap button is clicked", async () => {
    const user = userEvent.setup();
    const onDepartureCityChange = vi.fn();
    const onArrivalCityChange = vi.fn();
    const onSwap = vi.fn();

    render(
      <CityInput
        departureCity={mockCities[0]}
        arrivalCity={mockCities[1]}
        onDepartureCityChange={onDepartureCityChange}
        onArrivalCityChange={onArrivalCityChange}
        onSwap={onSwap}
        cities={mockCities}
      />
    );

    const swapButton = screen.getAllByRole("button")[1]; // Middle button is swap
    await user.click(swapButton);

    expect(onSwap).toHaveBeenCalledTimes(1);
  });

  it("calls onDepartureCityChange when selecting departure city", async () => {
    const user = userEvent.setup();
    const onDepartureCityChange = vi.fn();
    const onArrivalCityChange = vi.fn();

    render(
      <CityInput
        departureCity={null}
        arrivalCity={null}
        onDepartureCityChange={onDepartureCityChange}
        onArrivalCityChange={onArrivalCityChange}
        cities={mockCities}
      />
    );

    // Click departure city button to open selector
    const departureButton = screen.getAllByRole("button")[0];
    await user.click(departureButton);

    // Click on a city
    const beijingButton = screen.getByText("北京");
    await user.click(beijingButton);

    expect(onDepartureCityChange).toHaveBeenCalledWith(mockCities[0]);
  });

  it("calls onArrivalCityChange when selecting arrival city", async () => {
    const user = userEvent.setup();
    const onDepartureCityChange = vi.fn();
    const onArrivalCityChange = vi.fn();

    render(
      <CityInput
        departureCity={null}
        arrivalCity={null}
        onDepartureCityChange={onDepartureCityChange}
        onArrivalCityChange={onArrivalCityChange}
        cities={mockCities}
      />
    );

    // Click arrival city button to open selector
    const arrivalButton = screen.getAllByRole("button")[1];
    await user.click(arrivalButton);

    // Click on a city
    const shanghaiButton = screen.getByText("上海");
    await user.click(shanghaiButton);

    expect(onArrivalCityChange).toHaveBeenCalledWith(mockCities[1]);
  });
});

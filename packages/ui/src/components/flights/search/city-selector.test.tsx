import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CitySelector } from "./city-selector";
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
  {
    iataCode: "TYO",
    name: "东京",
    timezone: "Asia/Tokyo",
    pinyinFirstLetter: null,
    continent: "Asia",
    isPopular: true,
    displayOrder: 100,
  },
  {
    iataCode: "NYC",
    name: "纽约",
    timezone: "America/New_York",
    pinyinFirstLetter: null,
    continent: "America",
    isPopular: true,
    displayOrder: 101,
  },
];

describe("CitySelector", () => {
  it("renders the trigger children", () => {
    const onSelect = vi.fn();
    render(
      <CitySelector onSelect={onSelect} cities={mockCities}>
        <button type="button">Select City</button>
      </CitySelector>
    );

    expect(
      screen.getByRole("button", { name: "Select City" })
    ).toBeInTheDocument();
  });

  it("opens dropdown when trigger is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <CitySelector onSelect={onSelect} cities={mockCities}>
        <button type="button">Select City</button>
      </CitySelector>
    );

    await user.click(screen.getByRole("button", { name: "Select City" }));

    expect(screen.getByText("国内")).toBeInTheDocument();
    expect(screen.getByText("国际及港澳台")).toBeInTheDocument();
  });

  it("displays popular domestic cities by default", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <CitySelector onSelect={onSelect} cities={mockCities}>
        <button type="button">Select City</button>
      </CitySelector>
    );

    await user.click(screen.getByRole("button", { name: "Select City" }));

    expect(screen.getByText("北京")).toBeInTheDocument();
    expect(screen.getByText("上海")).toBeInTheDocument();
  });

  it("switches to international cities when clicking international button", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <CitySelector onSelect={onSelect} cities={mockCities}>
        <button type="button">Select City</button>
      </CitySelector>
    );

    await user.click(screen.getByRole("button", { name: "Select City" }));
    await user.click(screen.getByRole("button", { name: "国际及港澳台" }));

    expect(screen.getByText("东京")).toBeInTheDocument();
    expect(screen.getByText("纽约")).toBeInTheDocument();
  });

  it("calls onSelect when a city is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <CitySelector onSelect={onSelect} cities={mockCities}>
        <button type="button">Select City</button>
      </CitySelector>
    );

    await user.click(screen.getByRole("button", { name: "Select City" }));
    await user.click(screen.getByText("北京"));

    expect(onSelect).toHaveBeenCalledWith(mockCities[0]);
  });

  it("highlights selected city", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <CitySelector
        onSelect={onSelect}
        selectedCity={mockCities[0]}
        cities={mockCities}
      >
        <button type="button">Select City</button>
      </CitySelector>
    );

    await user.click(screen.getByRole("button", { name: "Select City" }));

    const beijingButton = screen.getByRole("button", { name: /北京/ });
    expect(beijingButton.className).toContain("bg-primary");
  });

  it("displays custom title", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <CitySelector onSelect={onSelect} cities={mockCities} title="选择目的地">
        <button type="button">Select City</button>
      </CitySelector>
    );

    await user.click(screen.getByRole("button", { name: "Select City" }));

    expect(screen.getByText("选择目的地")).toBeInTheDocument();
  });

  it("displays empty state when no cities match filter", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const noCities: CityData[] = [];

    render(
      <CitySelector onSelect={onSelect} cities={noCities}>
        <button type="button">Select City</button>
      </CitySelector>
    );

    await user.click(screen.getByRole("button", { name: "Select City" }));

    expect(screen.getByText("暂无城市数据")).toBeInTheDocument();
  });

  it("resets to popular tab when switching regions", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <CitySelector onSelect={onSelect} cities={mockCities}>
        <button type="button">Select City</button>
      </CitySelector>
    );

    await user.click(screen.getByRole("button", { name: "Select City" }));

    // Switch to ABCDEF tab
    await user.click(screen.getByRole("tab", { name: "ABCDEF" }));

    // Switch to international
    await user.click(screen.getByRole("button", { name: "国际及港澳台" }));

    // Should show popular international cities
    expect(screen.getByText("东京")).toBeInTheDocument();
  });
});

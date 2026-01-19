import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SearchHistorySection } from "./search-history-section";
import type { SearchHistoryRecord } from "./types";

describe("SearchHistorySection", () => {
  const mockSearchHistory: SearchHistoryRecord[] = [
    {
      id: "1",
      departureCityIata: "PEK",
      departureCityName: "北京",
      arrivalCityIata: "SHA",
      arrivalCityName: "上海",
      tripType: "one-way",
      departureDate: "2025-10-30",
      returnDate: null,
      seatClass: "economy",
      lowestPriceAtSearch: "1000.00",
      currentLowestPrice: "900.00",
      lastSearchedAt: new Date("2025-10-20"),
    },
    {
      id: "2",
      departureCityIata: "SHA",
      departureCityName: "上海",
      arrivalCityIata: "CAN",
      arrivalCityName: "广州",
      tripType: "round-trip",
      departureDate: "2025-11-01",
      returnDate: "2025-11-05",
      seatClass: "business",
      lowestPriceAtSearch: "2000.00",
      currentLowestPrice: "2100.00",
      lastSearchedAt: new Date("2025-10-21"),
    },
  ];

  const mockFormatPrice = (price: string) => price;
  const mockFormatDate = (
    date: string,
    tripType: "one-way" | "round-trip",
    returnDate?: string | null
  ) => {
    if (tripType === "one-way") {
      return `${date} 周四`;
    }
    return `${date} - ${returnDate}`;
  };
  const mockGetPriceStatus = (
    lowestPriceAtSearch: string | null,
    currentLowestPrice: string | null
  ) => {
    if (!lowestPriceAtSearch || !currentLowestPrice) return null;
    const diff =
      Number.parseFloat(currentLowestPrice) -
      Number.parseFloat(lowestPriceAtSearch);
    if (diff < 0)
      return { label: "已降价", colorClass: "bg-green-100 text-green-700" };
    if (diff > 0)
      return { label: "已涨价", colorClass: "bg-red-100 text-red-700" };
    return { label: "价格稳定", colorClass: "bg-gray-100 text-gray-600" };
  };

  it("renders search history section title", () => {
    const handleHistoryClick = vi.fn();
    const handleClearHistory = vi.fn();

    render(
      <SearchHistorySection
        searchHistory={mockSearchHistory}
        formatPrice={mockFormatPrice}
        formatDate={mockFormatDate}
        getPriceStatus={mockGetPriceStatus}
        onHistoryClick={handleHistoryClick}
        onClearHistory={handleClearHistory}
        isClearing={false}
      />
    );

    expect(screen.getByText("你搜索过的机票")).toBeInTheDocument();
  });

  it("renders all search history records", () => {
    const handleHistoryClick = vi.fn();
    const handleClearHistory = vi.fn();

    render(
      <SearchHistorySection
        searchHistory={mockSearchHistory}
        formatPrice={mockFormatPrice}
        formatDate={mockFormatDate}
        getPriceStatus={mockGetPriceStatus}
        onHistoryClick={handleHistoryClick}
        onClearHistory={handleClearHistory}
        isClearing={false}
      />
    );

    expect(screen.getByText("北京")).toBeInTheDocument();
    expect(screen.getAllByText("上海")).toHaveLength(2);
    expect(screen.getByText("广州")).toBeInTheDocument();
  });

  it("renders empty state when no search history", () => {
    const handleHistoryClick = vi.fn();
    const handleClearHistory = vi.fn();

    render(
      <SearchHistorySection
        searchHistory={[]}
        formatPrice={mockFormatPrice}
        formatDate={mockFormatDate}
        getPriceStatus={mockGetPriceStatus}
        onHistoryClick={handleHistoryClick}
        onClearHistory={handleClearHistory}
        isClearing={false}
      />
    );

    expect(screen.getByText("暂无搜索历史")).toBeInTheDocument();
    expect(
      screen.getByText("开始搜索航班后，您的搜索记录将显示在这里")
    ).toBeInTheDocument();
  });

  it("handles clear history button click", async () => {
    const user = userEvent.setup();
    const handleHistoryClick = vi.fn();
    const handleClearHistory = vi.fn();

    render(
      <SearchHistorySection
        searchHistory={mockSearchHistory}
        formatPrice={mockFormatPrice}
        formatDate={mockFormatDate}
        getPriceStatus={mockGetPriceStatus}
        onHistoryClick={handleHistoryClick}
        onClearHistory={handleClearHistory}
        isClearing={false}
      />
    );

    const clearButton = screen.getByText("清空历史");
    await user.click(clearButton);

    expect(handleClearHistory).toHaveBeenCalledTimes(1);
  });

  it("disables clear button when clearing", () => {
    const handleHistoryClick = vi.fn();
    const handleClearHistory = vi.fn();

    render(
      <SearchHistorySection
        searchHistory={mockSearchHistory}
        formatPrice={mockFormatPrice}
        formatDate={mockFormatDate}
        getPriceStatus={mockGetPriceStatus}
        onHistoryClick={handleHistoryClick}
        onClearHistory={handleClearHistory}
        isClearing={true}
      />
    );

    const clearButton = screen.getByText("清空中...");
    expect(clearButton).toBeDisabled();
  });

  it("disables clear button when no search history", () => {
    const handleHistoryClick = vi.fn();
    const handleClearHistory = vi.fn();

    render(
      <SearchHistorySection
        searchHistory={[]}
        formatPrice={mockFormatPrice}
        formatDate={mockFormatDate}
        getPriceStatus={mockGetPriceStatus}
        onHistoryClick={handleHistoryClick}
        onClearHistory={handleClearHistory}
        isClearing={false}
      />
    );

    const clearButton = screen.getByText("清空历史");
    expect(clearButton).toBeDisabled();
  });

  it("handles history card click", async () => {
    const user = userEvent.setup();
    const handleHistoryClick = vi.fn();
    const handleClearHistory = vi.fn();

    render(
      <SearchHistorySection
        searchHistory={mockSearchHistory}
        formatPrice={mockFormatPrice}
        formatDate={mockFormatDate}
        getPriceStatus={mockGetPriceStatus}
        onHistoryClick={handleHistoryClick}
        onClearHistory={handleClearHistory}
        isClearing={false}
      />
    );

    const firstCard = screen.getByText("北京").closest("div.cursor-pointer");
    expect(firstCard).toBeInTheDocument();

    if (firstCard) {
      await user.click(firstCard);
      expect(handleHistoryClick).toHaveBeenCalledTimes(1);
      expect(handleHistoryClick).toHaveBeenCalledWith(mockSearchHistory[0]);
    }
  });
});

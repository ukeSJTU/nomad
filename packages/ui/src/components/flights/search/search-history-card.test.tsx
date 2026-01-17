import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SearchHistoryCard } from "./search-history-card";
import type { SearchHistoryRecord } from "./types";

describe("SearchHistoryCard", () => {
  const mockRecord: SearchHistoryRecord = {
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
  };

  it("renders one-way flight search history", () => {
    const handleClick = vi.fn();

    render(
      <SearchHistoryCard
        record={mockRecord}
        formattedPrice="900"
        priceStatus={{
          label: "已降价",
          colorClass: "bg-green-100 text-green-700",
        }}
        formattedDate="2025-10-30 周四"
        onClick={handleClick}
      />
    );

    expect(screen.getByText("北京")).toBeInTheDocument();
    expect(screen.getByText("上海")).toBeInTheDocument();
    expect(screen.getByText("2025-10-30 周四")).toBeInTheDocument();
    expect(screen.getByText("¥900")).toBeInTheDocument();
    expect(screen.getByText("已降价")).toBeInTheDocument();
  });

  it("renders round-trip flight search history", () => {
    const roundTripRecord: SearchHistoryRecord = {
      ...mockRecord,
      tripType: "round-trip",
      returnDate: "2025-11-02",
    };

    const handleClick = vi.fn();

    render(
      <SearchHistoryCard
        record={roundTripRecord}
        formattedPrice="1,800"
        priceStatus={{
          label: "价格稳定",
          colorClass: "bg-gray-100 text-gray-600",
        }}
        formattedDate="10-30 去  11-02 回"
        onClick={handleClick}
      />
    );

    expect(screen.getByText(/10-30 去/)).toBeInTheDocument();
    expect(screen.getByText(/11-02 回/)).toBeInTheDocument();
  });

  it("handles click event", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <SearchHistoryCard
        record={mockRecord}
        formattedPrice="900"
        priceStatus={{
          label: "已降价",
          colorClass: "bg-green-100 text-green-700",
        }}
        formattedDate="2025-10-30 周四"
        onClick={handleClick}
      />
    );

    const card = screen.getByText("北京").closest("div.cursor-pointer");
    expect(card).toBeInTheDocument();

    if (card) {
      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });

  it("does not render price when currentLowestPrice is null", () => {
    const recordWithoutPrice: SearchHistoryRecord = {
      ...mockRecord,
      currentLowestPrice: null,
    };

    const handleClick = vi.fn();

    render(
      <SearchHistoryCard
        record={recordWithoutPrice}
        formattedPrice="0"
        priceStatus={null}
        formattedDate="2025-10-30 周四"
        onClick={handleClick}
      />
    );

    expect(screen.queryByText(/¥/)).not.toBeInTheDocument();
  });

  it("does not render price when currentLowestPrice is 0", () => {
    const recordWithZeroPrice: SearchHistoryRecord = {
      ...mockRecord,
      currentLowestPrice: "0",
    };

    const handleClick = vi.fn();

    render(
      <SearchHistoryCard
        record={recordWithZeroPrice}
        formattedPrice="0"
        priceStatus={null}
        formattedDate="2025-10-30 周四"
        onClick={handleClick}
      />
    );

    expect(screen.queryByText(/¥/)).not.toBeInTheDocument();
  });

  it("does not render price status badge when priceStatus is null", () => {
    const handleClick = vi.fn();

    render(
      <SearchHistoryCard
        record={mockRecord}
        formattedPrice="900"
        priceStatus={null}
        formattedDate="2025-10-30 周四"
        onClick={handleClick}
      />
    );

    expect(screen.queryByText("已降价")).not.toBeInTheDocument();
    expect(screen.queryByText("已涨价")).not.toBeInTheDocument();
    expect(screen.queryByText("价格稳定")).not.toBeInTheDocument();
  });

  it("renders price increase status correctly", () => {
    const handleClick = vi.fn();

    render(
      <SearchHistoryCard
        record={mockRecord}
        formattedPrice="1,100"
        priceStatus={{ label: "已涨价", colorClass: "bg-red-100 text-red-700" }}
        formattedDate="2025-10-30 周四"
        onClick={handleClick}
      />
    );

    const badge = screen.getByText("已涨价");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-red-100", "text-red-700");
  });
});

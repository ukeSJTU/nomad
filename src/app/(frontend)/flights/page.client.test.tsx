import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { FlightsPageClient } from "./page.client";

const mockReplace = vi.fn();
const mockPush = vi.fn();
let params = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace, push: mockPush }),
  usePathname: () => "/flights",
  useSearchParams: () => params,
}));

describe("FlightsPageClient tabs & URL sync", () => {
  beforeEach(() => {
    mockReplace.mockReset();
    mockPush.mockReset();
    params = new URLSearchParams();
  });

  it("activates initial tab from searchParams (special)", () => {
    params = new URLSearchParams("tab=special");

    render(<FlightsPageClient cities={[]} searchHistory={[]} />);

    // UnderConstruction content for special tab
    expect(screen.getByText("未实现")).toBeVisible();
  });

  it("updates URL when switching tabs via TabsTrigger", async () => {
    render(<FlightsPageClient cities={[]} searchHistory={[]} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("tab", { name: "特价机票" }));

    // Should replace URL with ?tab=special (may trigger more than once in tests)
    expect(mockReplace).toHaveBeenCalled();
    const lastCall = mockReplace.mock.calls.at(-1);
    expect(lastCall?.[0]).toBe("/flights?tab=special");
  });
});

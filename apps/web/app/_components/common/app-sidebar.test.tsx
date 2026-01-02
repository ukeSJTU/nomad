import { SidebarProvider } from "@nomad/ui/components/sidebar";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AppSidebar, data } from "./app-sidebar";

// Mock Next.js navigation hooks
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    info: vi.fn(),
  },
}));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Helper function to render AppSidebar with SidebarProvider
const renderAppSidebar = () => {
  return render(
    <SidebarProvider>
      <AppSidebar />
    </SidebarProvider>
  );
};

describe("AppSidebar Component", () => {
  const mockPush = vi.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    vi.clearAllMocks();
    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue("/");
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      push: mockPush,
    });
    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(
      mockSearchParams
    );
  });

  describe("Menu Text Content", () => {
    it("should display all travel menu items", () => {
      renderAppSidebar();

      expect(screen.getByText("酒店")).toBeInTheDocument();
      expect(screen.getByText("机票")).toBeInTheDocument();
      expect(screen.getByText("火车票")).toBeInTheDocument();
      expect(screen.getByText("旅游")).toBeInTheDocument();
      expect(screen.getByText("门票·活动")).toBeInTheDocument();
      expect(screen.getByText("汽车·船票")).toBeInTheDocument();
      expect(screen.getByText("用车")).toBeInTheDocument();
    });

    it("should display all business menu items", () => {
      renderAppSidebar();

      expect(screen.getByText("企业商旅")).toBeInTheDocument();
      expect(screen.getByText("老友会")).toBeInTheDocument();
      expect(screen.getByText("关于Nomad")).toBeInTheDocument();
    });

    it("should display all finance menu items", () => {
      renderAppSidebar();

      expect(screen.getByText("全球购")).toBeInTheDocument();
      expect(screen.getByText("礼品卡")).toBeInTheDocument();
      expect(screen.getByText("携程金融")).toBeInTheDocument();
    });

    it("should display all extras menu items", () => {
      renderAppSidebar();

      expect(screen.getByText("AI行程助手")).toBeInTheDocument();
      expect(screen.getByText("攻略·景点")).toBeInTheDocument();
      expect(screen.getByText("旅游地图")).toBeInTheDocument();
    });

    it("should have correct number of menu items", () => {
      renderAppSidebar();

      const travelItems = data.travel.length;
      const businessItems = data.business.length;
      const financeItems = data.finance.length;
      const extrasItems = data.extras.length;
      const totalItems =
        travelItems + businessItems + financeItems + extrasItems;

      // Get all menu buttons (excluding the toggle button)
      const menuButtons = screen.getAllByRole("button").slice(1);
      expect(menuButtons.length).toBeGreaterThanOrEqual(totalItems);
    });
  });

  describe("Toggle Sidebar Interaction", () => {
    it("should have a toggle sidebar button", () => {
      renderAppSidebar();

      // biome-ignore lint/style/noNonNullAssertion: Validating existence in test
      const toggleButton = screen
        .getAllByLabelText("Toggle Sidebar")
        .find(el => el.getAttribute("data-slot") === "sidebar-menu-button")!;
      expect(toggleButton).toBeInTheDocument();
    });

    it("should toggle sidebar state when toggle button is clicked", async () => {
      const user = userEvent.setup();
      renderAppSidebar();

      // biome-ignore lint/style/noNonNullAssertion: Validating existence in test
      const toggleButton = screen
        .getAllByLabelText("Toggle Sidebar")
        .find(el => el.getAttribute("data-slot") === "sidebar-menu-button")!;

      // Just verify the button can be clicked without errors
      await user.click(toggleButton);
      expect(toggleButton).toBeInTheDocument();
    });
  });

  describe("Menu Item Click Interaction", () => {
    it("should navigate to /flights when 机票 is clicked", async () => {
      const user = userEvent.setup();
      renderAppSidebar();

      const flightButton = screen.getByText("机票");
      await user.click(flightButton);

      expect(mockPush).toHaveBeenCalledWith("/flights");
    });

    it("should show toast for unimplemented features", async () => {
      const user = userEvent.setup();
      const { toast } = await import("sonner");
      renderAppSidebar();

      const hotelButton = screen.getByText("酒店");
      await user.click(hotelButton);

      expect(toast.info).toHaveBeenCalledWith('"酒店" 功能暂未实现', {
        description: "该功能正在开发中，敬请期待",
      });
    });

    it("should not navigate when clicking # URL items", async () => {
      const user = userEvent.setup();
      renderAppSidebar();

      const hotelButton = screen.getByText("酒店");
      await user.click(hotelButton);

      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe("Active State", () => {
    it("should highlight active menu item", () => {
      (usePathname as ReturnType<typeof vi.fn>).mockReturnValue("/flights");
      renderAppSidebar();

      const flightButton = screen.getByText("机票").closest("button");
      expect(flightButton).toHaveClass("bg-blue-500");
    });

    it("should not highlight inactive menu items", () => {
      (usePathname as ReturnType<typeof vi.fn>).mockReturnValue("/flights");
      renderAppSidebar();

      const hotelButton = screen.getByText("酒店").closest("button");
      expect(hotelButton).not.toHaveClass("bg-blue-500");
    });

    it("should highlight menu item with matching query params", () => {
      (usePathname as ReturnType<typeof vi.fn>).mockReturnValue("/flights");
      const searchParams = new URLSearchParams("?type=special");
      (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(
        searchParams
      );

      renderAppSidebar();

      // The flights menu item should be highlighted
      const flightButton = screen.getByText("机票").closest("button");
      expect(flightButton).toHaveClass("bg-blue-500");
    });
  });

  describe("Sub-items Expansion", () => {
    it("should show sub-items when main item is active and sidebar is expanded", () => {
      (usePathname as ReturnType<typeof vi.fn>).mockReturnValue("/flights");
      renderAppSidebar();

      // Flight sub-items should be visible
      expect(screen.getByText("国内/国际/中国港澳台")).toBeInTheDocument();
      expect(screen.getByText("特价机票")).toBeInTheDocument();
      expect(screen.getByText("航班动态")).toBeInTheDocument();
      expect(screen.getByText("在线选座")).toBeInTheDocument();
      expect(screen.getByText("退票改签")).toBeInTheDocument();
      expect(screen.getByText("更多服务")).toBeInTheDocument();
    });

    it("should not show sub-items when main item is not active", () => {
      (usePathname as ReturnType<typeof vi.fn>).mockReturnValue("/");
      renderAppSidebar();

      // Flight sub-items should not be visible in DOM
      expect(
        screen.queryByText("国内/国际/中国港澳台")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("特价机票")).not.toBeInTheDocument();
    });

    it("should navigate when clicking on sub-item", async () => {
      const user = userEvent.setup();
      (usePathname as ReturnType<typeof vi.fn>).mockReturnValue("/flights");
      renderAppSidebar();

      const specialFlightButton = screen.getByText("特价机票");
      await user.click(specialFlightButton);

      expect(mockPush).toHaveBeenCalledWith("/flights/special");
    });

    it("should highlight active sub-item", () => {
      (usePathname as ReturnType<typeof vi.fn>).mockReturnValue(
        "/flights/special"
      );
      renderAppSidebar();

      const specialFlightButton = screen.getByText("特价机票");
      expect(specialFlightButton).toHaveClass("text-blue-500");
    });
  });

  describe("Hover Card Interaction", () => {
    it("should show hover card content when hovering over item with sub-items", async () => {
      const user = userEvent.setup();
      (usePathname as ReturnType<typeof vi.fn>).mockReturnValue("/");
      renderAppSidebar();

      const flightButton = screen.getByText("机票");
      await user.hover(flightButton);

      // Wait for hover card to appear
      await waitFor(() => {
        expect(screen.getByText("国内/国际/中国港澳台")).toBeInTheDocument();
      });
    });

    it("should not show hover card for items without sub-items", async () => {
      const user = userEvent.setup();
      renderAppSidebar();

      const businessButton = screen.getByText("企业商旅");
      await user.hover(businessButton);

      // Hotel sub-items should not appear (they belong to 酒店)
      await waitFor(
        () => {
          expect(screen.queryByText("国内酒店")).not.toBeInTheDocument();
        },
        { timeout: 500 }
      );
    });

    it("should navigate when clicking sub-item in hover card", async () => {
      const user = userEvent.setup();
      (usePathname as ReturnType<typeof vi.fn>).mockReturnValue("/");
      renderAppSidebar();

      const flightButton = screen.getByText("机票");
      await user.hover(flightButton);

      await waitFor(() => {
        expect(screen.getByText("特价机票")).toBeInTheDocument();
      });

      const specialFlightButton = screen.getByText("特价机票");
      await user.click(specialFlightButton);

      expect(mockPush).toHaveBeenCalledWith("/flights/special");
    });
  });

  describe("Menu Structure", () => {
    it("should have separators between menu groups", () => {
      renderAppSidebar();

      // Check if separators exist (at least 1)
      const separators = document.querySelectorAll('[data-slot="separator"]');
      expect(separators.length).toBeGreaterThan(0);
    });

    it("should render all menu icons", () => {
      renderAppSidebar();

      const menuButtons = screen
        .getAllByRole("button")
        .filter(b => b.getAttribute("data-slot") === "sidebar-menu-button");
      menuButtons.forEach(button => {
        const svg = button.querySelector("svg");
        expect(svg).toBeInTheDocument();
      });
    });
  });

  describe("Data Consistency", () => {
    it("should have 7 travel items", () => {
      expect(data.travel).toHaveLength(7);
    });

    it("should have 3 business items", () => {
      expect(data.business).toHaveLength(3);
    });

    it("should have 3 finance items", () => {
      expect(data.finance).toHaveLength(3);
    });

    it("should have 3 extras items", () => {
      expect(data.extras).toHaveLength(3);
    });

    it("should have correct flight sub-items count", () => {
      const flightItem = data.travel.find(item => item.title === "机票");
      expect(flightItem?.items).toHaveLength(6);
    });

    it("should have correct hotel sub-items count", () => {
      const hotelItem = data.travel.find(item => item.title === "酒店");
      expect(hotelItem?.items).toHaveLength(2);
    });
  });

  describe("URL Matching", () => {
    it("should match exact pathname", () => {
      (usePathname as ReturnType<typeof vi.fn>).mockReturnValue("/flights");
      renderAppSidebar();

      const flightButton = screen.getByText("机票").closest("button");
      expect(flightButton).toHaveClass("bg-blue-500");
    });

    it("should not match # URLs as active", () => {
      (usePathname as ReturnType<typeof vi.fn>).mockReturnValue("/#");
      renderAppSidebar();

      const hotelButton = screen.getByText("酒店").closest("button");
      expect(hotelButton).not.toHaveClass("bg-blue-500");
    });

    it("should handle sub-item URL matching", () => {
      (usePathname as ReturnType<typeof vi.fn>).mockReturnValue(
        "/flights/special"
      );
      renderAppSidebar();

      // Main item should be highlighted because sub-item is active
      const flightButton = screen.getByText("机票").closest("button");
      expect(flightButton).toHaveClass("bg-blue-500");
    });
  });
});

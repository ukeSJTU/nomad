import { SidebarProvider } from "@nomad/ui/components/primitives/sidebar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Hotel, Info, Plane } from "lucide-react";
import { describe, expect, it, vi } from "vitest";
import { AppSidebar } from "./app-sidebar";
import type { MenuItem } from "./app-sidebar-types";

const mockMenuItems: MenuItem[] = [
  {
    key: "flights",
    title: "机票",
    url: "/flights",
    icon: Plane,
    isActive: false,
    items: [
      { key: "domestic", title: "国内机票", url: "/flights/domestic" },
      {
        key: "international",
        title: "国际机票",
        url: "/flights/international",
      },
    ],
  },
  {
    key: "hotel",
    title: "酒店",
    url: "/hotel",
    icon: Hotel,
    isActive: false,
  },
];

const mockActiveMenuItems: MenuItem[] = [
  {
    key: "flights",
    title: "机票",
    url: "/flights",
    icon: Plane,
    isActive: true,
    activeSubItemKey: "domestic",
    items: [
      { key: "domestic", title: "国内机票", url: "/flights/domestic" },
      {
        key: "international",
        title: "国际机票",
        url: "/flights/international",
      },
    ],
  },
  {
    key: "info",
    title: "关于Nomad",
    url: "/docs",
    icon: Info,
    isActive: false,
  },
];

const mockSections = {
  travel: mockMenuItems,
  extras: [],
  business: [],
  finance: [],
};

describe("AppSidebar", () => {
  it("should render all sections", () => {
    const onNavigate = vi.fn();
    render(
      <SidebarProvider>
        <AppSidebar sections={mockSections} onNavigate={onNavigate} />
      </SidebarProvider>
    );

    expect(screen.getByText("机票")).toBeInTheDocument();
    expect(screen.getByText("酒店")).toBeInTheDocument();
  });

  it("should call onNavigate when menu item is clicked", async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(
      <SidebarProvider>
        <AppSidebar sections={mockSections} onNavigate={onNavigate} />
      </SidebarProvider>
    );

    const hotelButton = screen.getByText("酒店");
    await user.click(hotelButton);

    expect(onNavigate).toHaveBeenCalledWith("/hotel", "酒店");
  });

  it("should apply active styling to active menu items", () => {
    const onNavigate = vi.fn();
    const activeSections = {
      travel: mockActiveMenuItems,
      extras: [],
      business: [],
      finance: [],
    };
    render(
      <SidebarProvider>
        <AppSidebar sections={activeSections} onNavigate={onNavigate} />
      </SidebarProvider>
    );

    const flightsButton = screen.getByText("机票").closest("button");
    expect(flightsButton).toHaveClass("bg-blue-500");
  });

  it("should render sub-items when menu item is active and expanded", () => {
    const onNavigate = vi.fn();
    const activeSections = {
      travel: mockActiveMenuItems,
      extras: [],
      business: [],
      finance: [],
    };
    render(
      <SidebarProvider>
        <AppSidebar sections={activeSections} onNavigate={onNavigate} />
      </SidebarProvider>
    );

    expect(screen.getByText("国内机票")).toBeInTheDocument();
    expect(screen.getByText("国际机票")).toBeInTheDocument();
  });

  it("should highlight active sub-item", () => {
    const onNavigate = vi.fn();
    const activeSections = {
      travel: mockActiveMenuItems,
      extras: [],
      business: [],
      finance: [],
    };
    render(
      <SidebarProvider>
        <AppSidebar sections={activeSections} onNavigate={onNavigate} />
      </SidebarProvider>
    );

    const domesticButton = screen.getByText("国内机票");
    expect(domesticButton).toHaveClass("text-blue-500");
  });

  it("should call onNavigate when sub-item is clicked", async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    const activeSections = {
      travel: mockActiveMenuItems,
      extras: [],
      business: [],
      finance: [],
    };
    render(
      <SidebarProvider>
        <AppSidebar sections={activeSections} onNavigate={onNavigate} />
      </SidebarProvider>
    );

    const internationalButton = screen.getByText("国际机票");
    await user.click(internationalButton);

    expect(onNavigate).toHaveBeenCalledWith(
      "/flights/international",
      "国际机票"
    );
  });

  it("should render menu items without sub-items correctly", () => {
    const onNavigate = vi.fn();
    const activeSections = {
      travel: mockActiveMenuItems,
      extras: [],
      business: [],
      finance: [],
    };
    render(
      <SidebarProvider>
        <AppSidebar sections={activeSections} onNavigate={onNavigate} />
      </SidebarProvider>
    );

    expect(screen.getByText("关于Nomad")).toBeInTheDocument();
  });
});

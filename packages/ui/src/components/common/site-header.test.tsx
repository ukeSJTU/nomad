import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SiteHeader } from "./site-header";

const defaultProps = {
  logo: {
    src: "/logo.png",
    alt: "Test Logo",
    label: "Test App",
    href: "/",
  },
  theme: "light" as const,
  onToggleTheme: vi.fn(),
};

describe("SiteHeader Component", () => {
  it("should render logo with image and label", () => {
    render(<SiteHeader {...defaultProps} />);

    const logo = screen.getByAltText("Test Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo.png");

    expect(screen.getByText("Test App")).toBeInTheDocument();
  });

  it("should render logo without label when not provided", () => {
    const propsWithoutLabel = {
      ...defaultProps,
      logo: { ...defaultProps.logo, label: undefined },
    };

    render(<SiteHeader {...propsWithoutLabel} />);

    const logo = screen.getByAltText("Test Logo");
    expect(logo).toBeInTheDocument();
    expect(screen.queryByText("Test App")).not.toBeInTheDocument();
  });

  it("should render search slot when provided", () => {
    render(
      <SiteHeader
        {...defaultProps}
        searchSlot={<input placeholder="Search" />}
      />
    );

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("should render user menu slot when provided", () => {
    render(
      <SiteHeader {...defaultProps} userMenuSlot={<button>User Menu</button>} />
    );

    expect(
      screen.getByRole("button", { name: "User Menu" })
    ).toBeInTheDocument();
  });

  it("should render theme toggle button", () => {
    render(<SiteHeader {...defaultProps} />);

    const toggleButton = screen.getByRole("button", { name: "Toggle theme" });
    expect(toggleButton).toBeInTheDocument();
  });

  it("should call onToggleTheme when theme button is clicked", () => {
    const onToggleTheme = vi.fn();
    render(<SiteHeader {...defaultProps} onToggleTheme={onToggleTheme} />);

    const toggleButton = screen.getByRole("button", { name: "Toggle theme" });
    fireEvent.click(toggleButton);

    expect(onToggleTheme).toHaveBeenCalledTimes(1);
  });

  it("should show correct sr-only text based on theme", () => {
    const { rerender } = render(<SiteHeader {...defaultProps} theme="light" />);

    expect(screen.getByText("Switch to dark theme")).toBeInTheDocument();

    rerender(<SiteHeader {...defaultProps} theme="dark" />);

    expect(screen.getByText("Switch to light theme")).toBeInTheDocument();
  });

  it("should render order links when provided", () => {
    const orderLinks = [
      { label: "Order 1", href: "/order/1" },
      { label: "Order 2", href: "/order/2" },
    ];

    render(<SiteHeader {...defaultProps} orderLinks={orderLinks} />);

    expect(
      screen.getByRole("button", { name: "我的订单" })
    ).toBeInTheDocument();
  });

  it("should render contact section when contactLink is provided", () => {
    const contactLink = { label: "Support", href: "/support" };

    render(<SiteHeader {...defaultProps} contactLink={contactLink} />);

    expect(
      screen.getByRole("button", { name: "联系客服" })
    ).toBeInTheDocument();
  });

  it("should render contact section when contactLines are provided", () => {
    const contactLines = ["Phone: 123-456", "Email: test@test.com"];

    render(<SiteHeader {...defaultProps} contactLines={contactLines} />);

    expect(
      screen.getByRole("button", { name: "联系客服" })
    ).toBeInTheDocument();
  });

  it("should have header element with appropriate classes", () => {
    const { container } = render(<SiteHeader {...defaultProps} />);

    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("w-full");
    expect(header).toHaveClass("border-b");
  });
});

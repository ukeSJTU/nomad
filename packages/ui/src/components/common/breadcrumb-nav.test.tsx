import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { BreadcrumbItem } from "./breadcrumb-nav";
import { BreadcrumbNav } from "./breadcrumb-nav";

describe("BreadcrumbNav", () => {
  const mockItems: BreadcrumbItem[] = [
    { label: "我的携程", href: "/home/info" },
    { label: "机票订单", href: "/home/orders" },
    { label: "订单详情" },
  ];

  it("renders all breadcrumb items with correct text", () => {
    render(<BreadcrumbNav items={mockItems} />);

    expect(screen.getByText("我的携程")).toBeInTheDocument();
    expect(screen.getByText("机票订单")).toBeInTheDocument();
    expect(screen.getByText("订单详情")).toBeInTheDocument();
  });

  it("renders links with correct href attributes", () => {
    render(<BreadcrumbNav items={mockItems} />);

    const myCtripLink = screen.getByRole("link", { name: "我的携程" });
    expect(myCtripLink).toHaveAttribute("href", "/home/info");

    const ordersLink = screen.getByRole("link", { name: "机票订单" });
    expect(ordersLink).toHaveAttribute("href", "/home/orders");
  });

  it("renders last item as non-clickable text", () => {
    render(<BreadcrumbNav items={mockItems} />);

    const currentPage = screen.getByText("订单详情");
    expect(currentPage).toBeInTheDocument();
    expect(currentPage.tagName).not.toBe("A");
  });

  it("has proper navigation landmark with default aria-label", () => {
    render(<BreadcrumbNav items={mockItems} />);

    const nav = screen.getByRole("navigation", {
      name: "Breadcrumb Navigation",
    });
    expect(nav).toBeInTheDocument();
  });

  it("supports custom aria-label", () => {
    render(<BreadcrumbNav items={mockItems} ariaLabel="Custom Navigation" />);

    const nav = screen.getByRole("navigation", { name: "Custom Navigation" });
    expect(nav).toBeInTheDocument();
  });

  it("renders item without href as current page even if not last", () => {
    const items: BreadcrumbItem[] = [
      { label: "首页", href: "/" },
      { label: "当前页" },
      { label: "子页", href: "/sub" },
    ];

    render(<BreadcrumbNav items={items} />);

    const currentPage = screen.getByText("当前页");
    expect(currentPage.tagName).not.toBe("A");
  });

  it("accepts onClick prop for items", () => {
    const handleClick = vi.fn();
    const items: BreadcrumbItem[] = [
      { label: "首页", href: "/", onClick: handleClick },
      { label: "当前页" },
    ];

    render(<BreadcrumbNav items={items} />);

    // Verify the item with onClick is rendered as a link
    const link = screen.getByRole("link", { name: "首页" });
    expect(link).toBeInTheDocument();
    // The onClick handler is passed to the Link adapter
    // Testing actual click behavior depends on the Link adapter implementation
  });

  it("renders nothing when items array is empty", () => {
    const { container } = render(<BreadcrumbNav items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("applies custom className to nav wrapper", () => {
    const { container } = render(
      <BreadcrumbNav items={mockItems} className="custom-class" />
    );

    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("custom-class");
  });

  it("renders separators between items but not after last", () => {
    const { container } = render(<BreadcrumbNav items={mockItems} />);

    // Should have 2 separators for 3 items
    // The separator uses chevron-right SVG icon with data-slot="breadcrumb-separator"
    const separators = container.querySelectorAll(
      '[data-slot="breadcrumb-separator"]'
    );
    expect(separators).toHaveLength(2);
  });

  it("renders single item without separator", () => {
    const { container } = render(
      <BreadcrumbNav items={[{ label: "唯一项" }]} />
    );

    expect(screen.getByText("唯一项")).toBeInTheDocument();
    const separators = container.querySelectorAll(
      '[data-slot="breadcrumb-separator"]'
    );
    expect(separators).toHaveLength(0);
  });
});

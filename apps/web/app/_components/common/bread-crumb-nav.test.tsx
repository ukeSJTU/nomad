import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BreadCrumbNav } from "./bread-crumb-nav";

describe("BreadCrumbNav Container", () => {
  it("renders all breadcrumb items with correct text", () => {
    render(<BreadCrumbNav />);

    // Verify all navigation items are displayed
    expect(screen.getByText("我的携程")).toBeInTheDocument();
    expect(screen.getByText("机票订单")).toBeInTheDocument();
    expect(screen.getByText("订单详情")).toBeInTheDocument();
  });

  it("renders links with correct href attributes", () => {
    render(<BreadCrumbNav />);

    // Verify navigation links have correct href
    const myCtripLink = screen.getByRole("link", { name: "我的携程" });
    expect(myCtripLink).toHaveAttribute("href", "/home/info");

    const ordersLink = screen.getByRole("link", { name: "机票订单" });
    expect(ordersLink).toHaveAttribute("href", "/home/orders");
  });

  it("renders current page as non-clickable text", () => {
    render(<BreadCrumbNav />);

    // Current page should not be a link
    const currentPage = screen.getByText("订单详情");
    expect(currentPage).toBeInTheDocument();
    expect(currentPage.tagName).not.toBe("A");
  });

  it("has proper navigation landmark with aria-label", () => {
    render(<BreadCrumbNav />);

    // Check for nav element with proper aria-label
    const nav = screen.getByRole("navigation", {
      name: "Breadcrumb Navigation",
    });
    expect(nav).toBeInTheDocument();
  });
});

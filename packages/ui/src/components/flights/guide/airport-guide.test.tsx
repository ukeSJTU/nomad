import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AirportGuide } from "./airport-guide";

describe("AirportGuide", () => {
  const mockLinks = [
    { href: "/flights/guide", label: "返回机场攻略首页" },
    { href: "/flights", label: "特价机票查询" },
  ];

  it("renders title correctly", () => {
    render(<AirportGuide links={mockLinks} />);

    expect(screen.getByText("相关链接")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<AirportGuide links={mockLinks} title="快速导航" />);

    expect(screen.getByText("快速导航")).toBeInTheDocument();
  });

  it("renders all links", () => {
    render(<AirportGuide links={mockLinks} />);

    expect(screen.getByText("返回机场攻略首页")).toBeInTheDocument();
    expect(screen.getByText("特价机票查询")).toBeInTheDocument();
  });

  it("renders links with correct hrefs", () => {
    render(<AirportGuide links={mockLinks} />);

    const guideLink = screen.getByText("返回机场攻略首页");
    expect(guideLink).toHaveAttribute("href", "/flights/guide");

    const flightsLink = screen.getByText("特价机票查询");
    expect(flightsLink).toHaveAttribute("href", "/flights");
  });

  it("renders empty links array", () => {
    render(<AirportGuide links={[]} />);

    expect(screen.getByText("相关链接")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});

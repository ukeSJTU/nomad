/**
 * @vitest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FlightSearchError } from "./flight-search-error";

describe("FlightSearchError", () => {
  it("renders default error message", () => {
    render(<FlightSearchError />);

    expect(screen.getByText("搜索失败")).toBeInTheDocument();
    expect(
      screen.getByText("搜索航班时出现错误，请稍后重试")
    ).toBeInTheDocument();
  });

  it("renders custom error message", () => {
    const customMessage = "网络连接失败，请检查网络设置";
    render(<FlightSearchError message={customMessage} />);

    expect(screen.getByText("搜索失败")).toBeInTheDocument();
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it("does not render retry button when onRetry is not provided", () => {
    render(<FlightSearchError />);

    expect(
      screen.queryByRole("button", { name: "重新搜索" })
    ).not.toBeInTheDocument();
  });

  it("renders retry button when onRetry is provided", () => {
    const onRetry = vi.fn();
    render(<FlightSearchError onRetry={onRetry} />);

    expect(
      screen.getByRole("button", { name: "重新搜索" })
    ).toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<FlightSearchError onRetry={onRetry} />);

    const retryButton = screen.getByRole("button", { name: "重新搜索" });
    await user.click(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("displays alert with destructive variant", () => {
    const { container } = render(<FlightSearchError />);

    const alert = container.querySelector('[role="alert"]');
    expect(alert).toBeInTheDocument();
  });

  it("displays alert icon", () => {
    const { container } = render(<FlightSearchError />);

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});

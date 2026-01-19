import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ConfirmationSuccessHeader } from "./confirmation-success-header";

describe("ConfirmationSuccessHeader", () => {
  it("should render success message and order number", () => {
    render(<ConfirmationSuccessHeader orderNumber="ORD-2026-12345" />);

    expect(screen.getByText("预订成功！")).toBeInTheDocument();
    expect(
      screen.getByText("您的订单已确认，我们已向您填写的联系方式发送订单详情")
    ).toBeInTheDocument();
    expect(screen.getByText("订单号")).toBeInTheDocument();
    expect(screen.getByText("ORD-2026-12345")).toBeInTheDocument();
  });

  it("should have correct styling classes for success state", () => {
    const { container } = render(
      <ConfirmationSuccessHeader orderNumber="ORD-2026-12345" />
    );

    const card = container.querySelector(".border-green-200");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("bg-green-50");
  });

  it("should render success icon", () => {
    const { container } = render(
      <ConfirmationSuccessHeader orderNumber="ORD-2026-12345" />
    );

    const icon = container.querySelector(".text-green-600");
    expect(icon).toBeInTheDocument();
  });

  it("should render order number in monospace font", () => {
    render(<ConfirmationSuccessHeader orderNumber="ORD-2026-99999" />);

    const orderNumber = screen.getByText("ORD-2026-99999");
    expect(orderNumber).toHaveClass("font-mono");
    expect(orderNumber).toHaveClass("font-bold");
  });
});

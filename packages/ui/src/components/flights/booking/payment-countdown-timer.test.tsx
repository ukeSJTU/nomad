import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PaymentCountdownTimer } from "./payment-countdown-timer";

describe("PaymentCountdownTimer", () => {
  it("should render countdown timer with formatted time", () => {
    render(<PaymentCountdownTimer remainingSeconds={125} />);

    expect(screen.getByText("02:05")).toBeInTheDocument();
  });

  it("should format time with leading zeros", () => {
    render(<PaymentCountdownTimer remainingSeconds={65} />);

    expect(screen.getByText("01:05")).toBeInTheDocument();
  });

  it("should format zero time correctly", () => {
    render(<PaymentCountdownTimer remainingSeconds={0} />);

    expect(screen.getByText("00:00")).toBeInTheDocument();
  });

  it("should display default warning text", () => {
    render(<PaymentCountdownTimer remainingSeconds={120} />);

    expect(
      screen.getByText("请在最晚支付时间前完成支付，超时订单将自动取消")
    ).toBeInTheDocument();
  });

  it("should display custom warning text", () => {
    render(
      <PaymentCountdownTimer
        remainingSeconds={120}
        warningText="Custom warning message"
      />
    );

    expect(screen.getByText("Custom warning message")).toBeInTheDocument();
  });

  it("should apply warning style when below threshold", () => {
    render(
      <PaymentCountdownTimer remainingSeconds={30} warningThreshold={60} />
    );

    const timeDisplay = screen.getByText("00:30");
    expect(timeDisplay).toHaveClass("text-destructive");
  });

  it("should not apply warning style when above threshold", () => {
    render(
      <PaymentCountdownTimer remainingSeconds={90} warningThreshold={60} />
    );

    const timeDisplay = screen.getByText("01:30");
    expect(timeDisplay).toHaveClass("text-secondary");
    expect(timeDisplay).not.toHaveClass("text-destructive");
  });

  it("should call onExpire when time is 0", () => {
    const onExpire = vi.fn();
    render(<PaymentCountdownTimer remainingSeconds={0} onExpire={onExpire} />);

    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  it("should not call onExpire when time is not 0", () => {
    const onExpire = vi.fn();
    render(<PaymentCountdownTimer remainingSeconds={30} onExpire={onExpire} />);

    expect(onExpire).not.toHaveBeenCalled();
  });

  it("should render clock icon", () => {
    const { container } = render(
      <PaymentCountdownTimer remainingSeconds={120} />
    );

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("should use custom warning threshold", () => {
    const { rerender } = render(
      <PaymentCountdownTimer remainingSeconds={150} warningThreshold={120} />
    );

    let timeDisplay = screen.getByText("02:30");
    expect(timeDisplay).not.toHaveClass("text-destructive");

    rerender(
      <PaymentCountdownTimer remainingSeconds={100} warningThreshold={120} />
    );

    timeDisplay = screen.getByText("01:40");
    expect(timeDisplay).toHaveClass("text-destructive");
  });
});

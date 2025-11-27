import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { OrderStatusCardData } from "@/types/dto/orders";

import { OrderStatusCard } from "./order-status-card";

/**
 * Helper function to create mock order status data
 */
const createMockStatusData = (
  overrides?: Partial<OrderStatusCardData>
): OrderStatusCardData => ({
  id: "order-123",
  orderNumber: "NMD20251118001",
  status: "PENDING_PAYMENT",
  paymentDeadline: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
  createdAt: new Date().toISOString(),
  ...overrides,
});

describe("OrderStatusCard Component", () => {
  const mockOnGoToPayment = vi.fn();
  const mockOnResendConfirmation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render order status card with order number", () => {
      const data = createMockStatusData();
      render(<OrderStatusCard data={data} />);

      expect(screen.getByText("待支付")).toBeInTheDocument();
      expect(screen.getByText(/订单号: NMD20251118001/)).toBeInTheDocument();
    });

    it("should display correct status for PENDING_PAYMENT", () => {
      const data = createMockStatusData({ status: "PENDING_PAYMENT" });
      render(<OrderStatusCard data={data} />);

      expect(screen.getByText("待支付")).toBeInTheDocument();
      expect(screen.getByText("去付款")).toBeInTheDocument();
    });

    it("should display correct status for CONFIRMED", () => {
      const data = createMockStatusData({ status: "CONFIRMED" });
      render(<OrderStatusCard data={data} />);

      expect(screen.getByText("已确认")).toBeInTheDocument();
      expect(screen.getByText("重发确认信息")).toBeInTheDocument();
    });

    it("should display correct status for CANCELLED", () => {
      const data = createMockStatusData({
        status: "CANCELLED",
        cancellationReason: "支付失败",
      });
      render(<OrderStatusCard data={data} />);

      expect(screen.getByText("已取消")).toBeInTheDocument();
      expect(screen.getByText(/取消原因/)).toBeInTheDocument();
      expect(screen.getByText(/支付失败/)).toBeInTheDocument();
    });

    it("should display correct status for REFUNDED", () => {
      const data = createMockStatusData({ status: "REFUNDED" });
      render(<OrderStatusCard data={data} />);

      expect(screen.getByText("已退款")).toBeInTheDocument();
      expect(screen.getByText(/退款已完成/)).toBeInTheDocument();
    });

    it("should display default cancellation reason when not provided", () => {
      const data = createMockStatusData({
        status: "CANCELLED",
        cancellationReason: undefined,
      });
      render(<OrderStatusCard data={data} />);

      expect(screen.getByText(/用户主动取消/)).toBeInTheDocument();
    });
  });

  describe("Action Buttons", () => {
    it('should render "Go to Payment" button for PENDING_PAYMENT status', () => {
      const data = createMockStatusData({ status: "PENDING_PAYMENT" });
      render(<OrderStatusCard data={data} onGoToPayment={mockOnGoToPayment} />);

      const button = screen.getByRole("button", { name: "去付款" });
      expect(button).toBeInTheDocument();
    });

    it('should render "Resend Confirmation" button for CONFIRMED status', () => {
      const data = createMockStatusData({ status: "CONFIRMED" });
      render(
        <OrderStatusCard
          data={data}
          onResendConfirmation={mockOnResendConfirmation}
        />
      );

      const button = screen.getByRole("button", { name: "重发确认信息" });
      expect(button).toBeInTheDocument();
    });

    it("should not render action buttons for CANCELLED status", () => {
      const data = createMockStatusData({ status: "CANCELLED" });
      render(<OrderStatusCard data={data} />);

      expect(
        screen.queryByRole("button", { name: "去付款" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "重发确认信息" })
      ).not.toBeInTheDocument();
    });

    it("should not render action buttons for REFUNDED status", () => {
      const data = createMockStatusData({ status: "REFUNDED" });
      render(<OrderStatusCard data={data} />);

      expect(
        screen.queryByRole("button", { name: "去付款" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "重发确认信息" })
      ).not.toBeInTheDocument();
    });

    it('should call onGoToPayment when "Go to Payment" button is clicked', async () => {
      const user = userEvent.setup();
      const data = createMockStatusData({ status: "PENDING_PAYMENT" });
      render(<OrderStatusCard data={data} onGoToPayment={mockOnGoToPayment} />);

      const button = screen.getByRole("button", { name: "去付款" });
      await user.click(button);

      expect(mockOnGoToPayment).toHaveBeenCalledTimes(1);
    });

    it('should call onResendConfirmation when "Resend Confirmation" button is clicked', async () => {
      const user = userEvent.setup();
      const data = createMockStatusData({ status: "CONFIRMED" });
      render(
        <OrderStatusCard
          data={data}
          onResendConfirmation={mockOnResendConfirmation}
        />
      );

      const button = screen.getByRole("button", { name: "重发确认信息" });
      await user.click(button);

      expect(mockOnResendConfirmation).toHaveBeenCalledTimes(1);
    });

    it("should disable buttons when isLoading is true", () => {
      const data = createMockStatusData({ status: "PENDING_PAYMENT" });
      render(
        <OrderStatusCard
          data={data}
          onGoToPayment={mockOnGoToPayment}
          isLoading={true}
        />
      );

      const button = screen.getByRole("button", { name: "去付款" });
      expect(button).toBeDisabled();
    });
  });

  describe("Countdown Timer", () => {
    it("should display countdown timer for PENDING_PAYMENT status", () => {
      const data = createMockStatusData({
        status: "PENDING_PAYMENT",
        paymentDeadline: new Date(Date.now() + 850 * 1000).toISOString(), // 14:10 remaining
      });
      render(<OrderStatusCard data={data} />);

      // Check for countdown format (MM:SS)
      expect(screen.getByText(/\d{2}:\d{2}/)).toBeInTheDocument();
    });

    it("should show expiration message when payment deadline passed", () => {
      const data = createMockStatusData({
        status: "PENDING_PAYMENT",
        paymentDeadline: new Date(Date.now() - 1000).toISOString(), // Already expired
      });
      render(<OrderStatusCard data={data} />);

      expect(
        screen.getByText(/支付时间已过期，订单将自动取消/)
      ).toBeInTheDocument();
    });

    it("should not display payment button when deadline expired", () => {
      const data = createMockStatusData({
        status: "PENDING_PAYMENT",
        paymentDeadline: new Date(Date.now() - 1000).toISOString(),
      });
      render(<OrderStatusCard data={data} onGoToPayment={mockOnGoToPayment} />);

      expect(
        screen.queryByRole("button", { name: "去付款" })
      ).not.toBeInTheDocument();
    });
  });

  describe("Status Messages", () => {
    it("should display payment deadline warning for PENDING_PAYMENT", () => {
      const data = createMockStatusData({ status: "PENDING_PAYMENT" });
      render(<OrderStatusCard data={data} />);

      expect(
        screen.getByText(/请在最晚支付时间前完成支付/)
      ).toBeInTheDocument();
    });

    it("should display success message for CONFIRMED status", () => {
      const data = createMockStatusData({ status: "CONFIRMED" });
      render(<OrderStatusCard data={data} />);

      expect(
        screen.getByText(/订单预订成功，确认信息已发送至您的邮箱/)
      ).toBeInTheDocument();
    });

    it("should display refund message for REFUNDED status", () => {
      const data = createMockStatusData({ status: "REFUNDED" });
      render(<OrderStatusCard data={data} />);

      expect(
        screen.getByText(/退款已完成，预计 1-7 个工作日到账/)
      ).toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { OrderStatusCardData } from "@/types/dto";

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

/**
 * Container Integration Tests
 * Tests the container's responsibility: countdown timer management
 * UI logic is tested in packages/ui
 */
describe("OrderStatusCard Container", () => {
  const mockOnGoToPayment = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render with data from container", () => {
    const data = createMockStatusData();
    render(<OrderStatusCard data={data} />);

    expect(screen.getByText("待支付")).toBeInTheDocument();
    expect(screen.getByText(/订单号: NMD20251118001/)).toBeInTheDocument();
  });

  it("should calculate initial time left for PENDING_PAYMENT", () => {
    const data = createMockStatusData({
      status: "PENDING_PAYMENT",
      paymentDeadline: new Date(Date.now() + 850 * 1000).toISOString(),
    });
    render(<OrderStatusCard data={data} />);

    // Container calculates timeLeft and passes to UI
    // UI should display countdown
    expect(screen.getByText(/\d{2}:\d{2}/)).toBeInTheDocument();
  });

  it("should pass callbacks to UI component", async () => {
    const user = userEvent.setup();
    const data = createMockStatusData({ status: "PENDING_PAYMENT" });
    render(<OrderStatusCard data={data} onGoToPayment={mockOnGoToPayment} />);

    const button = screen.getByRole("button", { name: "去付款" });
    await user.click(button);

    expect(mockOnGoToPayment).toHaveBeenCalledTimes(1);
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RefundOrderDialog } from "./refund-order-dialog";

describe("RefundOrderDialog", () => {
  const defaultProps = {
    open: true,
    onOpenChange: vi.fn(),
    onConfirm: vi.fn(),
  };

  it("renders dialog when open", () => {
    render(<RefundOrderDialog {...defaultProps} />);

    expect(screen.getByText("申请退款")).toBeInTheDocument();
    expect(screen.getByText("确定要申请退款吗？")).toBeInTheDocument();
  });

  it("does not render dialog when closed", () => {
    render(<RefundOrderDialog {...defaultProps} open={false} />);

    expect(screen.queryByText("申请退款")).not.toBeInTheDocument();
  });

  it("displays refund amount when provided", () => {
    render(<RefundOrderDialog {...defaultProps} refundAmount="1000.00" />);

    expect(screen.getByText("退款金额：¥1000.00")).toBeInTheDocument();
  });

  it("does not display refund amount when not provided", () => {
    render(<RefundOrderDialog {...defaultProps} />);

    expect(screen.queryByText(/退款金额/)).not.toBeInTheDocument();
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(<RefundOrderDialog {...defaultProps} onConfirm={onConfirm} />);

    const confirmButton = screen.getByRole("button", { name: "确认退款" });
    await user.click(confirmButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onOpenChange when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(<RefundOrderDialog {...defaultProps} onOpenChange={onOpenChange} />);

    const cancelButton = screen.getByRole("button", { name: "取消" });
    await user.click(cancelButton);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("disables buttons when loading", () => {
    render(<RefundOrderDialog {...defaultProps} isLoading={true} />);

    const cancelButton = screen.getByRole("button", { name: "取消" });
    const confirmButton = screen.getByRole("button", { name: "退款中..." });

    expect(cancelButton).toBeDisabled();
    expect(confirmButton).toBeDisabled();
  });

  it("shows loading text when loading", () => {
    render(<RefundOrderDialog {...defaultProps} isLoading={true} />);

    expect(screen.getByText("退款中...")).toBeInTheDocument();
  });

  it("displays warning message", () => {
    render(<RefundOrderDialog {...defaultProps} />);

    expect(
      screen.getByText("退款将退回到您的账户余额，座位将立即释放。")
    ).toBeInTheDocument();
  });
});

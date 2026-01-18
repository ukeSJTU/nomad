import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RefundOrderDialog } from "./refund-order-dialog";

describe("RefundOrderDialog", () => {
  it("renders when open", () => {
    const handleOpenChange = vi.fn();
    const handleConfirm = vi.fn();

    render(
      <RefundOrderDialog
        open={true}
        onOpenChange={handleOpenChange}
        onConfirm={handleConfirm}
      />
    );

    expect(screen.getByText("申请退款")).toBeInTheDocument();
    expect(screen.getByText("确定要申请退款吗？")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    const handleOpenChange = vi.fn();
    const handleConfirm = vi.fn();

    render(
      <RefundOrderDialog
        open={false}
        onOpenChange={handleOpenChange}
        onConfirm={handleConfirm}
      />
    );

    expect(screen.queryByText("申请退款")).not.toBeInTheDocument();
  });

  it("displays refund amount when provided", () => {
    const handleOpenChange = vi.fn();
    const handleConfirm = vi.fn();

    render(
      <RefundOrderDialog
        open={true}
        onOpenChange={handleOpenChange}
        onConfirm={handleConfirm}
        refundAmount="1,234.00"
      />
    );

    expect(screen.getByText("退款金额：¥1,234.00")).toBeInTheDocument();
  });

  it("does not display refund amount when not provided", () => {
    const handleOpenChange = vi.fn();
    const handleConfirm = vi.fn();

    render(
      <RefundOrderDialog
        open={true}
        onOpenChange={handleOpenChange}
        onConfirm={handleConfirm}
      />
    );

    expect(screen.queryByText(/退款金额/)).not.toBeInTheDocument();
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();
    const handleConfirm = vi.fn();

    render(
      <RefundOrderDialog
        open={true}
        onOpenChange={handleOpenChange}
        onConfirm={handleConfirm}
      />
    );

    const confirmButton = screen.getByRole("button", { name: "确认退款" });
    await user.click(confirmButton);

    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it("shows loading state when isLoading is true", () => {
    const handleOpenChange = vi.fn();
    const handleConfirm = vi.fn();

    render(
      <RefundOrderDialog
        open={true}
        onOpenChange={handleOpenChange}
        onConfirm={handleConfirm}
        isLoading={true}
      />
    );

    expect(screen.getByText("退款中...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "退款中..." })).toBeDisabled();
    expect(screen.getByRole("button", { name: "取消" })).toBeDisabled();
  });

  it("disables buttons when loading", () => {
    const handleOpenChange = vi.fn();
    const handleConfirm = vi.fn();

    render(
      <RefundOrderDialog
        open={true}
        onOpenChange={handleOpenChange}
        onConfirm={handleConfirm}
        isLoading={true}
      />
    );

    const confirmButton = screen.getByRole("button", { name: "退款中..." });
    const cancelButton = screen.getByRole("button", { name: "取消" });

    expect(confirmButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });
});

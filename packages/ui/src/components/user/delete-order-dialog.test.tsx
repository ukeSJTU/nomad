import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DeleteOrderDialog } from "./delete-order-dialog";

describe("DeleteOrderDialog", () => {
  const mockOnOpenChange = vi.fn();
  const mockOnConfirm = vi.fn();

  const defaultProps = {
    open: true,
    onOpenChange: mockOnOpenChange,
    onConfirm: mockOnConfirm,
    isLoading: false,
  };

  it("should render dialog when open", () => {
    render(<DeleteOrderDialog {...defaultProps} />);

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(
      screen.getByText("您确定要删除这个订单吗？删除后将无法恢复。")
    ).toBeInTheDocument();
  });

  it("should not render dialog when closed", () => {
    render(<DeleteOrderDialog {...defaultProps} open={false} />);

    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("should render cancel and confirm buttons", () => {
    render(<DeleteOrderDialog {...defaultProps} />);

    expect(screen.getByRole("button", { name: "取消" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "确认删除" })
    ).toBeInTheDocument();
  });

  it("should call onConfirm when confirm button is clicked", async () => {
    const user = userEvent.setup();
    render(<DeleteOrderDialog {...defaultProps} />);

    const confirmButton = screen.getByRole("button", { name: "确认删除" });
    await user.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("should disable buttons when loading", () => {
    render(<DeleteOrderDialog {...defaultProps} isLoading={true} />);

    const cancelButton = screen.getByRole("button", { name: "取消" });
    const confirmButton = screen.getByRole("button", { name: "删除中..." });

    expect(cancelButton).toBeDisabled();
    expect(confirmButton).toBeDisabled();
  });

  it("should display loading text when isLoading is true", () => {
    render(<DeleteOrderDialog {...defaultProps} isLoading={true} />);

    expect(
      screen.getByRole("button", { name: "删除中..." })
    ).toBeInTheDocument();
  });

  it("should display normal text when isLoading is false", () => {
    render(<DeleteOrderDialog {...defaultProps} isLoading={false} />);

    expect(
      screen.getByRole("button", { name: "确认删除" })
    ).toBeInTheDocument();
  });
});

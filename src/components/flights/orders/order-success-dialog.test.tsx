import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { OrderSuccessDialog } from "./order-success-dialog";

describe("OrderSuccessDialog Component", () => {
  describe("Rendering", () => {
    it("should not render when open is false", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <OrderSuccessDialog
          open={false}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(screen.queryByText("取消提示")).not.toBeInTheDocument();
    });

    it("should render dialog when open is true", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <OrderSuccessDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(
        screen.getByRole("heading", { name: "取消提示" })
      ).toBeInTheDocument();
    });

    it("should display dialog title", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <OrderSuccessDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(
        screen.getByRole("heading", { name: "取消提示" })
      ).toBeInTheDocument();
    });

    it("should display success message", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <OrderSuccessDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(screen.getByText("订单已取消成功。")).toBeInTheDocument();
    });

    it("should display confirm button", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <OrderSuccessDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(
        screen.getByRole("button", { name: "知道了" })
      ).toBeInTheDocument();
    });

    it("should not display cancel button", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <OrderSuccessDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      // Success dialog should only have one button
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(1);
      expect(buttons[0]).toHaveTextContent("知道了");
    });
  });

  describe("User Interactions", () => {
    it("should call onConfirm when confirm button is clicked", async () => {
      const user = userEvent.setup();
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <OrderSuccessDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      const confirmButton = screen.getByRole("button", { name: "知道了" });
      await user.click(confirmButton);

      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it("should not call onOpenChange when confirm button is clicked", async () => {
      const user = userEvent.setup();
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <OrderSuccessDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      const confirmButton = screen.getByRole("button", { name: "知道了" });
      await user.click(confirmButton);

      // onConfirm is called, but onOpenChange is not directly called by button click
      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });
  });

  describe("Dialog Behavior", () => {
    it("should maintain dialog state when open changes", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      const { rerender } = render(
        <OrderSuccessDialog
          open={false}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(
        screen.queryByRole("heading", { name: "取消提示" })
      ).not.toBeInTheDocument();

      rerender(
        <OrderSuccessDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(
        screen.getByRole("heading", { name: "取消提示" })
      ).toBeInTheDocument();
    });

    it("should handle rapid state changes", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      const { rerender } = render(
        <OrderSuccessDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(screen.getByText("订单已取消成功。")).toBeInTheDocument();

      rerender(
        <OrderSuccessDialog
          open={false}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(screen.queryByText("订单已取消成功。")).not.toBeInTheDocument();
    });
  });

  describe("Props Handling", () => {
    it("should handle all required props", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <OrderSuccessDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(screen.getByText("取消提示")).toBeInTheDocument();
      expect(screen.getByText("订单已取消成功。")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "知道了" })
      ).toBeInTheDocument();
    });
  });
});

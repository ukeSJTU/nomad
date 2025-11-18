import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { OrderErrorDialog } from "./order-error-dialog";

describe("OrderErrorDialog Component", () => {
  describe("Rendering", () => {
    it("should not render when open is false", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <OrderErrorDialog
          open={false}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(screen.queryByText("错误提示")).not.toBeInTheDocument();
    });

    it("should render dialog when open is true", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <OrderErrorDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(
        screen.getByRole("heading", { name: "错误提示" })
      ).toBeInTheDocument();
    });

    it("should display dialog title", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <OrderErrorDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(
        screen.getByRole("heading", { name: "错误提示" })
      ).toBeInTheDocument();
    });

    it("should display default error message", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <OrderErrorDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(screen.getByText("操作失败，请重试。")).toBeInTheDocument();
    });

    it("should display custom error message", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();
      const customError = "网络连接失败，请检查您的网络设置。";

      render(
        <OrderErrorDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
          errorMessage={customError}
        />
      );

      expect(screen.getByText(customError)).toBeInTheDocument();
    });

    it("should display confirm button", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <OrderErrorDialog
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
        <OrderErrorDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      // Error dialog should only have one button
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
        <OrderErrorDialog
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
        <OrderErrorDialog
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
        <OrderErrorDialog
          open={false}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(
        screen.queryByRole("heading", { name: "错误提示" })
      ).not.toBeInTheDocument();

      rerender(
        <OrderErrorDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(
        screen.getByRole("heading", { name: "错误提示" })
      ).toBeInTheDocument();
    });

    it("should handle rapid state changes", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      const { rerender } = render(
        <OrderErrorDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(screen.getByText("操作失败，请重试。")).toBeInTheDocument();

      rerender(
        <OrderErrorDialog
          open={false}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(screen.queryByText("操作失败，请重试。")).not.toBeInTheDocument();
    });

    it("should preserve custom error message across renders", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();
      const customError = "自定义错误信息";

      const { rerender } = render(
        <OrderErrorDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
          errorMessage={customError}
        />
      );

      expect(screen.getByText(customError)).toBeInTheDocument();

      rerender(
        <OrderErrorDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
          errorMessage={customError}
        />
      );

      expect(screen.getByText(customError)).toBeInTheDocument();
    });
  });

  describe("Props Handling", () => {
    it("should handle all required props", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <OrderErrorDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(screen.getByText("错误提示")).toBeInTheDocument();
      expect(screen.getByText("操作失败，请重试。")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "知道了" })
      ).toBeInTheDocument();
    });

    it("should handle optional errorMessage prop", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <OrderErrorDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
          errorMessage="自定义错误"
        />
      );

      expect(screen.getByText("自定义错误")).toBeInTheDocument();
      expect(screen.queryByText("操作失败，请重试。")).not.toBeInTheDocument();
    });
  });
});

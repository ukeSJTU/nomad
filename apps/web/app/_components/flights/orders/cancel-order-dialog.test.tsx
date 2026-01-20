import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CancelOrderDialog } from "@ukesjtu/nomad-ui/components/flights/orders";
import { describe, expect, it, vi } from "vitest";

/**
 * @requirement REQ-O04
 */
describe("CancelOrderDialog Component", () => {
  /**
   * @requirement REQ-O04
   */
  describe("Rendering", () => {
    /**
     * @requirement REQ-O04
     * @scenario 场景1
     */
    it("should not render when open is false", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <CancelOrderDialog
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
        <CancelOrderDialog
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
        <CancelOrderDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(
        screen.getByRole("heading", { name: "取消提示" })
      ).toBeInTheDocument();
    });

    it("should display warning message", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <CancelOrderDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(screen.getByText(/确定要取消订单吗？/)).toBeInTheDocument();
    });

    it("should display cancel button", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <CancelOrderDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(screen.getByText("再想想")).toBeInTheDocument();
    });

    it("should display confirm button", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <CancelOrderDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(
        screen.getByRole("button", { name: "继续取消" })
      ).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("should call onConfirm when confirm button is clicked", async () => {
      const user = userEvent.setup();
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <CancelOrderDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      const confirmButton = screen.getByRole("button", {
        name: "继续取消",
      });
      await user.click(confirmButton);

      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it("should call onOpenChange when cancel button is clicked", async () => {
      const user = userEvent.setup();
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <CancelOrderDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      const cancelButton = screen.getByText("再想想");
      await user.click(cancelButton);

      expect(mockOnOpenChange).toHaveBeenCalled();
      expect(mockOnConfirm).not.toHaveBeenCalled();
    });

    it("should not call onConfirm when cancel button is clicked", async () => {
      const user = userEvent.setup();
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <CancelOrderDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      const cancelButton = screen.getByText("再想想");
      await user.click(cancelButton);

      expect(mockOnConfirm).not.toHaveBeenCalled();
    });
  });

  describe("Loading State", () => {
    it("should display loading text when isLoading is true", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <CancelOrderDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
          isLoading={true}
        />
      );

      expect(screen.getByText("取消中...")).toBeInTheDocument();
    });

    it("should disable buttons when isLoading is true", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <CancelOrderDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
          isLoading={true}
        />
      );

      const confirmButton = screen.getByRole("button", { name: "取消中..." });
      expect(confirmButton).toBeDisabled();

      const cancelButton = screen.getByText("再想想").closest("button");
      expect(cancelButton).toBeDisabled();
    });

    it("should not disable buttons when isLoading is false", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <CancelOrderDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
          isLoading={false}
        />
      );

      const confirmButton = screen.getByRole("button", {
        name: "继续取消",
      });
      expect(confirmButton).not.toBeDisabled();
    });

    it("should show normal text when isLoading is false", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <CancelOrderDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
          isLoading={false}
        />
      );

      expect(
        screen.getByRole("button", { name: "继续取消" })
      ).toBeInTheDocument();
      expect(screen.queryByText("取消中...")).not.toBeInTheDocument();
    });
  });

  describe("Default Props", () => {
    it("should default isLoading to false", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <CancelOrderDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(
        screen.getByRole("button", { name: "继续取消" })
      ).toBeInTheDocument();
      expect(screen.queryByText("取消中...")).not.toBeInTheDocument();
    });
  });

  describe("Dialog Behavior", () => {
    it("should maintain dialog state when open changes", () => {
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      const { rerender } = render(
        <CancelOrderDialog
          open={false}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(
        screen.queryByRole("heading", { name: "取消提示" })
      ).not.toBeInTheDocument();

      rerender(
        <CancelOrderDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
        />
      );

      expect(
        screen.getByRole("heading", { name: "取消提示" })
      ).toBeInTheDocument();
    });

    it("should prevent interaction during loading", async () => {
      const user = userEvent.setup();
      const mockOnConfirm = vi.fn();
      const mockOnOpenChange = vi.fn();

      render(
        <CancelOrderDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          onConfirm={mockOnConfirm}
          isLoading={true}
        />
      );

      const confirmButton = screen.getByRole("button", { name: "取消中..." });
      await user.click(confirmButton);

      // Should not call onConfirm because button is disabled
      expect(mockOnConfirm).not.toHaveBeenCalled();
    });
  });
});

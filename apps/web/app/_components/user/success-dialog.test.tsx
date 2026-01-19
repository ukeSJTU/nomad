import { SuccessDialog } from "@nomad/ui/components/user";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

describe("SuccessDialog Component", () => {
  const defaultProps = {
    open: true,
    onOpenChange: vi.fn(),
  };

  describe("Rendering", () => {
    it("should render the dialog when open is true", () => {
      render(<SuccessDialog {...defaultProps} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("should render the title", () => {
      render(<SuccessDialog {...defaultProps} />);
      expect(screen.getByText("保存成功")).toBeInTheDocument();
    });

    it("should render the description", () => {
      render(<SuccessDialog {...defaultProps} />);
      expect(screen.getByText("您的个人信息已成功更新。")).toBeInTheDocument();
    });

    it("should render the confirm button", () => {
      render(<SuccessDialog {...defaultProps} />);
      expect(screen.getByRole("button", { name: "确定" })).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("should call onOpenChange with false when confirm button is clicked", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(<SuccessDialog open={true} onOpenChange={onOpenChange} />);

      const button = screen.getByRole("button", { name: "确定" });
      await user.click(button);

      expect(onOpenChange).toHaveBeenCalledWith(false);
      expect(onOpenChange).toHaveBeenCalledTimes(1);
    });
  });
});

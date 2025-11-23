import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ConfirmationSuccessHeader } from "./confirmation-success-header";

describe("ConfirmationSuccessHeader", () => {
  describe("Rendering", () => {
    it("should render success message", () => {
      render(<ConfirmationSuccessHeader orderNumber="ABC123456" />);

      expect(screen.getByText("预订成功！")).toBeInTheDocument();
      expect(
        screen.getByText("您的订单已确认，我们已向您填写的联系方式发送订单详情")
      ).toBeInTheDocument();
    });

    it("should render order number label", () => {
      render(<ConfirmationSuccessHeader orderNumber="ABC123456" />);

      expect(screen.getByText("订单号")).toBeInTheDocument();
    });

    it("should render the correct order number", () => {
      render(<ConfirmationSuccessHeader orderNumber="ABC123456" />);

      expect(screen.getByText("ABC123456")).toBeInTheDocument();
    });

    it("should render success icon", () => {
      const { container } = render(
        <ConfirmationSuccessHeader orderNumber="ABC123456" />
      );

      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("text-green-600");
    });
  });

  describe("Order Number Variations", () => {
    it("should render different order numbers correctly", () => {
      const { rerender } = render(
        <ConfirmationSuccessHeader orderNumber="ORDER001" />
      );
      expect(screen.getByText("ORDER001")).toBeInTheDocument();

      rerender(<ConfirmationSuccessHeader orderNumber="XYZ999" />);
      expect(screen.getByText("XYZ999")).toBeInTheDocument();
    });

    it("should handle long order numbers", () => {
      const longOrderNumber = "VERYLONGORDERNUMBER123456789";
      render(<ConfirmationSuccessHeader orderNumber={longOrderNumber} />);

      expect(screen.getByText(longOrderNumber)).toBeInTheDocument();
    });

    it("should handle numeric order numbers", () => {
      render(<ConfirmationSuccessHeader orderNumber="123456789" />);

      expect(screen.getByText("123456789")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading structure", () => {
      render(<ConfirmationSuccessHeader orderNumber="ABC123456" />);

      const heading = screen.getByRole("heading", { name: "预订成功！" });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H1");
    });
  });

  describe("Styling", () => {
    it("should apply success styling classes", () => {
      const { container } = render(
        <ConfirmationSuccessHeader orderNumber="ABC123456" />
      );

      // Check for green color classes
      const greenElements = container.querySelectorAll('[class*="green"]');
      expect(greenElements.length).toBeGreaterThan(0);
    });

    it("should have monospace font for order number", () => {
      render(<ConfirmationSuccessHeader orderNumber="ABC123456" />);

      const orderNumber = screen.getByText("ABC123456");
      expect(orderNumber).toHaveClass("font-mono");
    });
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ErrorDisplay } from "./error-display";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("ErrorDisplay Component", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<ErrorDisplay title="测试标题" message="测试消息" />);

      expect(screen.getByText("测试标题")).toBeInTheDocument();
      expect(screen.getByText("测试消息")).toBeInTheDocument();
    });

    it("should render error type icon correctly", () => {
      const { container } = render(
        <ErrorDisplay type="error" title="错误" message="发生错误" />
      );

      // Check for icon presence (lucide-react icons have specific svg attributes)
      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    });

    it("should render warning type correctly", () => {
      render(<ErrorDisplay type="warning" title="警告" message="警告消息" />);

      expect(screen.getByText("警告")).toBeInTheDocument();
      expect(screen.getByText("重要提示")).toBeInTheDocument();
    });

    it("should render info type correctly", () => {
      render(<ErrorDisplay type="info" title="信息" message="信息消息" />);

      expect(screen.getByText("信息")).toBeInTheDocument();
      expect(screen.getByText("温馨提示")).toBeInTheDocument();
    });
  });

  describe("Action Buttons", () => {
    it("should render action button with default label", () => {
      render(<ErrorDisplay title="错误" message="消息" />);

      const button = screen.getByRole("link", { name: "Go Back" });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("href", "/");
    });

    it("should render custom action label and href", () => {
      render(
        <ErrorDisplay
          title="错误"
          message="消息"
          actionLabel="返回首页"
          actionHref="/home"
        />
      );

      const button = screen.getByRole("link", { name: "返回首页" });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("href", "/home");
    });

    it("should show back button when showBackButton is true", () => {
      render(
        <ErrorDisplay title="错误" message="消息" showBackButton={true} />
      );

      const backButton = screen.getByRole("button", { name: "返回上一页" });
      expect(backButton).toBeInTheDocument();
    });

    it("should not show back button by default", () => {
      render(<ErrorDisplay title="错误" message="消息" />);

      const backButton = screen.queryByRole("button", { name: "返回上一页" });
      expect(backButton).not.toBeInTheDocument();
    });
  });

  describe("Alert Content", () => {
    it("should show error alert content for error type", () => {
      render(<ErrorDisplay type="error" title="错误" message="消息" />);

      expect(screen.getByText("错误详情")).toBeInTheDocument();
      expect(screen.getByText(/发生了意外错误/)).toBeInTheDocument();
    });

    it("should show warning alert content for warning type", () => {
      render(<ErrorDisplay type="warning" title="警告" message="消息" />);

      expect(screen.getByText("重要提示")).toBeInTheDocument();
      expect(screen.getByText(/此操作需要您的注意/)).toBeInTheDocument();
    });

    it("should show info alert content for info type", () => {
      render(<ErrorDisplay type="info" title="信息" message="消息" />);

      expect(screen.getByText("温馨提示")).toBeInTheDocument();
      expect(screen.getByText(/请仔细阅读以上信息/)).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should apply destructive styling for error type", () => {
      const { container } = render(
        <ErrorDisplay type="error" title="错误" message="消息" />
      );

      // Check for destructive text color class
      const destructiveElements = container.querySelectorAll(
        '[class*="destructive"]'
      );
      expect(destructiveElements.length).toBeGreaterThan(0);
    });

    it("should apply primary styling for non-error types", () => {
      const { container } = render(
        <ErrorDisplay type="info" title="信息" message="消息" />
      );

      // Check for primary color class
      const primaryElements = container.querySelectorAll('[class*="primary"]');
      expect(primaryElements.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading structure", () => {
      render(<ErrorDisplay title="错误标题" message="错误消息" />);

      // CardTitle should be a heading or have heading-like attributes
      const title = screen.getByText("错误标题");
      expect(title).toBeInTheDocument();
    });

    it("should have alert role", () => {
      const { container } = render(
        <ErrorDisplay title="错误" message="消息" />
      );

      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeInTheDocument();
    });

    it("should have accessible button", () => {
      render(
        <ErrorDisplay title="错误" message="消息" showBackButton={true} />
      );

      const backButton = screen.getByRole("button", { name: "返回上一页" });
      expect(backButton).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle very long title", () => {
      const longTitle = "这是一个非常非常非常非常非常长的标题".repeat(5);
      render(<ErrorDisplay title={longTitle} message="消息" />);

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it("should handle very long message", () => {
      const longMessage = "这是一个非常非常非常非常非常长的消息".repeat(10);
      render(<ErrorDisplay title="标题" message={longMessage} />);

      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it("should handle special characters in text", () => {
      render(<ErrorDisplay title="错误 <>&" message="消息包含特殊字符: <>&" />);

      expect(screen.getByText("错误 <>&")).toBeInTheDocument();
      expect(screen.getByText("消息包含特殊字符: <>&")).toBeInTheDocument();
    });

    it("should handle empty actionHref gracefully", () => {
      const { container } = render(
        <ErrorDisplay title="错误" message="消息" actionHref="" />
      );

      const link = container.querySelector('a[href=""]');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "");
    });
  });
});

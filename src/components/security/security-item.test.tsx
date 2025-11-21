import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import SecurityItem from "@/components/security/security-item";

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("SecurityItem Component", () => {
  const defaultProps = {
    title: "登录密码",
    description: "安全性高的密码以便账号更安全。",
    isSet: false,
    actionHref: "/home/security/password",
    actionLabel: "设置登录密码",
  };

  describe("Rendering", () => {
    it("should render the title", () => {
      render(<SecurityItem {...defaultProps} />);
      expect(screen.getByText("登录密码")).toBeInTheDocument();
    });

    it("should render the description", () => {
      render(<SecurityItem {...defaultProps} />);
      expect(
        screen.getByText("安全性高的密码以便账号更安全。")
      ).toBeInTheDocument();
    });

    it("should render the action button with correct label", () => {
      render(<SecurityItem {...defaultProps} />);
      const button = screen.getByRole("link", { name: "设置登录密码" });
      expect(button).toBeInTheDocument();
    });

    it("should render the action button with correct href", () => {
      render(<SecurityItem {...defaultProps} />);
      const button = screen.getByRole("link", { name: "设置登录密码" });
      expect(button).toHaveAttribute("href", "/home/security/password");
    });
  });

  describe("Status Display - Not Set", () => {
    it("should display '未绑定' when isSet is false", () => {
      render(<SecurityItem {...defaultProps} isSet={false} />);
      expect(screen.getByText("未绑定")).toBeInTheDocument();
    });
  });

  describe("Status Display - Set", () => {
    it("should display '已绑定' when isSet is true without value", () => {
      render(<SecurityItem {...defaultProps} isSet={true} />);
      expect(screen.getByText("已绑定")).toBeInTheDocument();
    });

    it("should display '已绑定' with value when provided", () => {
      render(
        <SecurityItem {...defaultProps} isSet={true} value="+86138****5678" />
      );
      expect(screen.getByText("已绑定+86138****5678")).toBeInTheDocument();
    });
  });

  describe("Different Security Items", () => {
    it("should render phone security item correctly", () => {
      render(
        <SecurityItem
          title="绑定手机"
          description="绑定手机后，您即可享受手机号登录。"
          isSet={true}
          value="+86138****5678"
          actionHref="/home/security/phone"
          actionLabel="修改"
        />
      );

      expect(screen.getByText("绑定手机")).toBeInTheDocument();
      expect(
        screen.getByText("绑定手机后，您即可享受手机号登录。")
      ).toBeInTheDocument();
      expect(screen.getByText("已绑定+86138****5678")).toBeInTheDocument();
      const button = screen.getByRole("link", { name: "修改" });
      expect(button).toHaveAttribute("href", "/home/security/phone");
    });

    it("should render email security item correctly", () => {
      render(
        <SecurityItem
          title="绑定邮箱"
          description="绑定邮箱后，您即可使用邮箱登录账号。"
          isSet={true}
          value="user@example.com"
          actionHref="/home/security/email"
          actionLabel="修改"
        />
      );

      expect(screen.getByText("绑定邮箱")).toBeInTheDocument();
      expect(
        screen.getByText("绑定邮箱后，您即可使用邮箱登录账号。")
      ).toBeInTheDocument();
      expect(screen.getByText("已绑定user@example.com")).toBeInTheDocument();
      const button = screen.getByRole("link", { name: "修改" });
      expect(button).toHaveAttribute("href", "/home/security/email");
    });

    it("should render password security item without value when set", () => {
      render(
        <SecurityItem
          title="登录密码"
          description="安全性高的密码以便账号更安全。"
          isSet={true}
          actionHref="/home/security/password"
          actionLabel="修改"
        />
      );

      expect(screen.getByText("登录密码")).toBeInTheDocument();
      expect(screen.getByText("已绑定")).toBeInTheDocument();
      const button = screen.getByRole("link", { name: "修改" });
      expect(button).toHaveAttribute("href", "/home/security/password");
    });
  });

  describe("Action Button States", () => {
    it("should show '设置' action when not set", () => {
      render(
        <SecurityItem
          {...defaultProps}
          isSet={false}
          actionLabel="设置登录密码"
        />
      );
      expect(
        screen.getByRole("link", { name: "设置登录密码" })
      ).toBeInTheDocument();
    });

    it("should show '修改' action when already set", () => {
      render(
        <SecurityItem {...defaultProps} isSet={true} actionLabel="修改" />
      );
      expect(screen.getByRole("link", { name: "修改" })).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic structure with heading", () => {
      render(<SecurityItem {...defaultProps} />);
      const heading = screen.getByRole("heading", { name: "登录密码" });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H3");
    });

    it("should have accessible link with proper role", () => {
      render(<SecurityItem {...defaultProps} />);
      const link = screen.getByRole("link", { name: "设置登录密码" });
      expect(link).toBeInTheDocument();
    });
  });
});

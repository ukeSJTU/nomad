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
    status: "notSet" as const,
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
    it("should display '未设置' when status is notSet", () => {
      render(<SecurityItem {...defaultProps} status="notSet" />);
      expect(screen.getByText("未设置")).toBeInTheDocument();
    });
  });

  describe("Status Display - Unverified", () => {
    it("should display '已设置但未验证' when status is unverified", () => {
      render(<SecurityItem {...defaultProps} status="unverified" />);
      expect(screen.getByText("已设置但未验证")).toBeInTheDocument();
    });

    it("should display '已设置但未验证' with value when provided", () => {
      render(
        <SecurityItem
          {...defaultProps}
          status="unverified"
          value="+86138****5678"
        />
      );
      expect(
        screen.getByText("已设置但未验证 +86138****5678")
      ).toBeInTheDocument();
    });
  });

  describe("Status Display - Verified", () => {
    it("should display '已绑定' when status is verified without value", () => {
      render(<SecurityItem {...defaultProps} status="verified" />);
      expect(screen.getByText("已绑定")).toBeInTheDocument();
    });

    it("should display '已绑定' with value when provided", () => {
      render(
        <SecurityItem
          {...defaultProps}
          status="verified"
          value="+86138****5678"
        />
      );
      expect(screen.getByText("已绑定 +86138****5678")).toBeInTheDocument();
    });
  });

  describe("Different Security Items", () => {
    it("should render phone security item correctly when verified", () => {
      render(
        <SecurityItem
          title="绑定手机"
          description="绑定手机后，您即可享受手机号登录。"
          status="verified"
          value="+86138****5678"
          actionHref="/home/security/phone"
          actionLabel="修改"
        />
      );

      expect(screen.getByText("绑定手机")).toBeInTheDocument();
      expect(
        screen.getByText("绑定手机后，您即可享受手机号登录。")
      ).toBeInTheDocument();
      expect(screen.getByText("已绑定 +86138****5678")).toBeInTheDocument();
      const button = screen.getByRole("link", { name: "修改" });
      expect(button).toHaveAttribute("href", "/home/security/phone");
    });

    it("should render phone security item correctly when unverified", () => {
      render(
        <SecurityItem
          title="绑定手机"
          description="绑定手机后，您即可享受手机号登录。"
          status="unverified"
          value="+86138****5678"
          actionHref="/home/security/phone"
          actionLabel="验证"
        />
      );

      expect(screen.getByText("绑定手机")).toBeInTheDocument();
      expect(
        screen.getByText("已设置但未验证 +86138****5678")
      ).toBeInTheDocument();
      const button = screen.getByRole("link", { name: "验证" });
      expect(button).toHaveAttribute("href", "/home/security/phone");
    });

    it("should render email security item correctly", () => {
      render(
        <SecurityItem
          title="绑定邮箱"
          description="绑定邮箱后，您即可使用邮箱登录账号。"
          status="verified"
          value="user@example.com"
          actionHref="/home/security/email"
          actionLabel="修改"
        />
      );

      expect(screen.getByText("绑定邮箱")).toBeInTheDocument();
      expect(
        screen.getByText("绑定邮箱后，您即可使用邮箱登录账号。")
      ).toBeInTheDocument();
      expect(screen.getByText("已绑定 user@example.com")).toBeInTheDocument();
      const button = screen.getByRole("link", { name: "修改" });
      expect(button).toHaveAttribute("href", "/home/security/email");
    });

    it("should render password security item without value when set", () => {
      render(
        <SecurityItem
          title="登录密码"
          description="安全性高的密码以便账号更安全。"
          status="verified"
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
          status="notSet"
          actionLabel="设置登录密码"
        />
      );
      expect(
        screen.getByRole("link", { name: "设置登录密码" })
      ).toBeInTheDocument();
    });

    it("should show '修改' action when already set", () => {
      render(
        <SecurityItem {...defaultProps} status="verified" actionLabel="修改" />
      );
      expect(screen.getByRole("link", { name: "修改" })).toBeInTheDocument();
    });

    it("should show '验证' action when unverified", () => {
      render(
        <SecurityItem
          {...defaultProps}
          status="unverified"
          actionLabel="验证"
        />
      );
      expect(screen.getByRole("link", { name: "验证" })).toBeInTheDocument();
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

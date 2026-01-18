import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UiProvider } from "../../platform";
import { SecurityItem } from "./security-item";

// Create mock Link component
const MockLink = ({
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
);

// Helper to render SecurityItem with mock Link adapter
const renderSecurityItem = (
  props: React.ComponentProps<typeof SecurityItem>
) => {
  return render(<SecurityItem {...props} />, {
    wrapper: ({ children }) => (
      <UiProvider components={{ Link: MockLink }}>{children}</UiProvider>
    ),
  });
};

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
      renderSecurityItem(defaultProps);
      expect(screen.getByText("登录密码")).toBeInTheDocument();
    });

    it("should render the description", () => {
      renderSecurityItem(defaultProps);
      expect(
        screen.getByText("安全性高的密码以便账号更安全。")
      ).toBeInTheDocument();
    });

    it("should render the action button with correct label", () => {
      renderSecurityItem(defaultProps);
      const button = screen.getByRole("link", { name: "设置登录密码" });
      expect(button).toBeInTheDocument();
    });

    it("should render the action button with correct href", () => {
      renderSecurityItem(defaultProps);
      const button = screen.getByRole("link", { name: "设置登录密码" });
      expect(button).toHaveAttribute("href", "/home/security/password");
    });
  });

  describe("Status Display - Not Set", () => {
    it("should display '未设置' when status is notSet", () => {
      renderSecurityItem({ ...defaultProps, status: "notSet" });
      expect(screen.getByText("未设置")).toBeInTheDocument();
    });
  });

  describe("Status Display - Unverified", () => {
    it("should display '已设置但未验证' when status is unverified", () => {
      renderSecurityItem({ ...defaultProps, status: "unverified" });
      expect(screen.getByText("已设置但未验证")).toBeInTheDocument();
    });

    it("should display '已设置但未验证' with value when provided", () => {
      renderSecurityItem({
        ...defaultProps,
        status: "unverified",
        value: "138****5678",
      });
      expect(
        screen.getByText("已设置但未验证 138****5678")
      ).toBeInTheDocument();
    });
  });

  describe("Status Display - Verified", () => {
    it("should display '已绑定' when status is verified without value", () => {
      renderSecurityItem({ ...defaultProps, status: "verified" });
      expect(screen.getByText("已绑定")).toBeInTheDocument();
    });

    it("should display '已绑定' with value when provided", () => {
      renderSecurityItem({
        ...defaultProps,
        status: "verified",
        value: "138****5678",
      });
      expect(screen.getByText("已绑定 138****5678")).toBeInTheDocument();
    });
  });

  describe("Different Security Items", () => {
    it("should render phone security item correctly when verified", () => {
      renderSecurityItem({
        title: "手机号码",
        description: "用于登录和接收验证码",
        status: "verified",
        value: "138****5678",
        actionHref: "/home/security/phone",
        actionLabel: "修改手机号",
      });

      expect(screen.getByText("手机号码")).toBeInTheDocument();
      expect(screen.getByText("用于登录和接收验证码")).toBeInTheDocument();
      expect(screen.getByText("已绑定 138****5678")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "修改手机号" })).toHaveAttribute(
        "href",
        "/home/security/phone"
      );
    });

    it("should render email security item correctly when unverified", () => {
      renderSecurityItem({
        title: "邮箱地址",
        description: "用于接收重要通知和找回密码",
        status: "unverified",
        value: "test@example.com",
        actionHref: "/home/security/email",
        actionLabel: "验证邮箱",
      });

      expect(screen.getByText("邮箱地址")).toBeInTheDocument();
      expect(
        screen.getByText("用于接收重要通知和找回密码")
      ).toBeInTheDocument();
      expect(
        screen.getByText("已设置但未验证 test@example.com")
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "验证邮箱" })).toHaveAttribute(
        "href",
        "/home/security/email"
      );
    });

    it("should render password security item correctly when not set", () => {
      renderSecurityItem({
        title: "登录密码",
        description: "安全性高的密码以便账号更安全。",
        status: "notSet",
        actionHref: "/home/security/password",
        actionLabel: "设置登录密码",
      });

      expect(screen.getByText("登录密码")).toBeInTheDocument();
      expect(
        screen.getByText("安全性高的密码以便账号更安全。")
      ).toBeInTheDocument();
      expect(screen.getByText("未设置")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "设置登录密码" })
      ).toHaveAttribute("href", "/home/security/password");
    });
  });
});

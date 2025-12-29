import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import UnifiedLoginForm from "./unified-login";

// Mock the TurnstileWidget component
vi.mock("../turnstile", () => ({
  TurnstileWidget: vi.fn(({ ref }) => {
    // Simulate ref methods for testing
    if (ref) {
      ref.current = {
        getResponsePromise: vi.fn().mockResolvedValue("test-captcha-token"),
        reset: vi.fn(),
      };
    }
    return null;
  }),
}));

/**
 * UnifiedLoginForm Component Tests
 *
 * This test suite covers the following aspects:
 * 1. Sequential validation flow (account → password/OTP → terms)
 * 2. Text content and UI elements (titles, placeholders, links, buttons)
 * 3. OTP send functionality (validation before sending)
 * 4. Loading states (disabled inputs when isLoading=true)
 * 5. Input validation (email, phone, OTP format, password strength)
 * 6. Error display (proper error messages and clearing)
 * 7. Form toggle (switching between password and OTP login)
 * 8. Checkbox interaction (terms agreement)
 *
 * Note: CAPTCHA-related tests (countdown, verification flow) are excluded
 * as they require complex Turnstile mocking and are better suited for
 * integration or E2E tests.
 *
 * @requirement REQ-U04
 * @requirement REQ-U05
 * @requirement REQ-U06
 * @requirement REQ-U07
 */

/**
 * @requirement REQ-U04
 * @requirement REQ-U06
 */
describe("UnifiedLoginForm - Sequential Validation", () => {
  /**
   * @requirement REQ-U04
   */
  describe("PasswordLoginForm - Sequential Error Display", () => {
    /**
     * @requirement REQ-U04
     * @scenario 场景2
     */
    it("should only show account error when all fields are empty", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      // Click login button without filling any fields
      const loginButton = screen.getByRole("button", { name: "登 录" });
      await user.click(loginButton);

      // Should only show account error
      await waitFor(() => {
        expect(screen.getByText("请输入手机号或邮箱")).toBeInTheDocument();
      });

      // Should NOT show password error
      expect(screen.queryByText("请输入登录密码")).not.toBeInTheDocument();

      // Should NOT show terms error (tooltip or main area)
      expect(screen.queryByText("请先阅读并勾选协议")).not.toBeInTheDocument();
      expect(
        screen.queryByText("请同意服务协议和隐私政策")
      ).not.toBeInTheDocument();

      // Should not call submit
      expect(onPasswordSubmit).not.toHaveBeenCalled();
    });

    /**
     * @requirement REQ-U04
     * @scenario 场景2
     */
    it("should only show password error when account is filled but password is empty", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      // Fill account field
      const accountInput = screen.getByPlaceholderText(
        "国内手机号/用户名/邮箱"
      );
      await user.type(accountInput, "test@example.com");

      // Click login button without filling password
      const loginButton = screen.getByRole("button", { name: "登 录" });
      await user.click(loginButton);

      // Should NOT show account error (account is valid)
      await waitFor(() => {
        expect(
          screen.queryByText("请输入手机号或邮箱")
        ).not.toBeInTheDocument();
      });

      // Should show password error
      await waitFor(() => {
        expect(screen.getByText("请输入登录密码")).toBeInTheDocument();
      });

      // Should NOT show terms error (not yet at that validation step)
      expect(screen.queryByText("请先阅读并勾选协议")).not.toBeInTheDocument();
      expect(
        screen.queryByText("请同意服务协议和隐私政策")
      ).not.toBeInTheDocument();

      // Should not call submit
      expect(onPasswordSubmit).not.toHaveBeenCalled();
    });

    it("should only show terms error via tooltip when account and password are filled but terms not agreed", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      // Fill account field
      const accountInput = screen.getByPlaceholderText(
        "国内手机号/用户名/邮箱"
      );
      await user.type(accountInput, "test@example.com");

      // Fill password field
      const passwordInput = screen.getByPlaceholderText("登录密码");
      await user.type(passwordInput, "Password123!");

      // Click login button without checking terms
      const loginButton = screen.getByRole("button", { name: "登 录" });
      await user.click(loginButton);

      // Wait for validation
      await waitFor(() => {
        // Should NOT show account error
        expect(
          screen.queryByText("请输入手机号或邮箱")
        ).not.toBeInTheDocument();

        // Should NOT show password error
        expect(screen.queryByText("请输入登录密码")).not.toBeInTheDocument();
      });

      // Should NOT show terms error in main error area
      expect(
        screen.queryByText("请同意服务协议和隐私政策")
      ).not.toBeInTheDocument();

      // Should show terms error via tooltip (now that account & password are valid)
      await waitFor(() => {
        expect(
          screen.getAllByText("请先阅读并勾选协议").length
        ).toBeGreaterThan(0);
      });

      // Should not call submit
      expect(onPasswordSubmit).not.toHaveBeenCalled();
    });

    it("should submit when all fields are valid", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      // Fill account field
      const accountInput = screen.getByPlaceholderText(
        "国内手机号/用户名/邮箱"
      );
      await user.type(accountInput, "test@example.com");

      // Fill password field
      const passwordInput = screen.getByPlaceholderText("登录密码");
      await user.type(passwordInput, "Password123!");

      // Check terms checkbox
      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      // Click login button
      const loginButton = screen.getByRole("button", { name: "登 录" });
      await user.click(loginButton);

      // Should not show any errors
      await waitFor(() => {
        expect(
          screen.queryByText("请输入手机号或邮箱")
        ).not.toBeInTheDocument();
        expect(screen.queryByText("请输入登录密码")).not.toBeInTheDocument();
        expect(
          screen.queryByText("请同意服务协议和隐私政策")
        ).not.toBeInTheDocument();
      });

      // Should call submit with correct data (no captcha token for login submit)
      await waitFor(() => {
        expect(onPasswordSubmit).toHaveBeenCalledWith({
          account: "test@example.com",
          password: "Password123!",
          agreedToTerms: true,
        });
      });
    });

    it("should validate password format and stop at password validation", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      // Fill account field
      const accountInput = screen.getByPlaceholderText(
        "国内手机号/用户名/邮箱"
      );
      await user.type(accountInput, "test@example.com");

      // Fill password field with invalid format (too short)
      const passwordInput = screen.getByPlaceholderText("登录密码");
      await user.type(passwordInput, "Pass1!");

      // Click login button
      const loginButton = screen.getByRole("button", { name: "登 录" });
      await user.click(loginButton);

      // Should show password validation error
      await waitFor(() => {
        expect(screen.getByText("密码至少8位")).toBeInTheDocument();
      });

      // Should NOT show terms error (not yet at that validation step)
      expect(
        screen.queryByText("请同意服务协议和隐私政策")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("请先阅读并勾选协议")).not.toBeInTheDocument();

      // Should not call submit
      expect(onPasswordSubmit).not.toHaveBeenCalled();
    });
  });

  describe("OtpLoginForm - Sequential Error Display", () => {
    it("should only show account error when all fields are empty", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="otp"
        />
      );

      // Click login button without filling any fields
      const loginButton = screen.getByRole("button", { name: "登 录" });
      await user.click(loginButton);

      // Should only show account error
      await waitFor(() => {
        expect(screen.getByText("请输入手机号或邮箱")).toBeInTheDocument();
      });

      // Should NOT show OTP error
      expect(screen.queryByText("验证码必须是6位数字")).not.toBeInTheDocument();

      // Should NOT show terms error (not yet at that validation step)
      expect(
        screen.queryByText("请同意服务协议和隐私政策")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("请先阅读并勾选协议")).not.toBeInTheDocument();

      // Should not call submit
      expect(onOtpSubmit).not.toHaveBeenCalled();
    });

    it("should only show OTP error when account is filled but OTP is empty", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="otp"
        />
      );

      // Fill account field
      const accountInput = screen.getByPlaceholderText("国内手机号/邮箱");
      await user.type(accountInput, "test@example.com");

      // Click login button without filling OTP
      const loginButton = screen.getByRole("button", { name: "登 录" });
      await user.click(loginButton);

      // Should NOT show account error (account is valid)
      await waitFor(() => {
        expect(
          screen.queryByText("请输入手机号或邮箱")
        ).not.toBeInTheDocument();
      });

      // Should show OTP error
      await waitFor(() => {
        expect(screen.getByText("验证码必须是6位数字")).toBeInTheDocument();
      });

      // Should NOT show terms error (not yet at that validation step)
      expect(
        screen.queryByText("请同意服务协议和隐私政策")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("请先阅读并勾选协议")).not.toBeInTheDocument();

      // Should not call submit
      expect(onOtpSubmit).not.toHaveBeenCalled();
    });

    it("should only show terms error via tooltip when account and OTP are filled but terms not agreed", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="otp"
        />
      );

      // Fill account field
      const accountInput = screen.getByPlaceholderText("国内手机号/邮箱");
      await user.type(accountInput, "test@example.com");

      // Fill OTP field
      const otpInput = screen.getByPlaceholderText("短信验证码");
      await user.type(otpInput, "123456");

      // Click login button without checking terms
      const loginButton = screen.getByRole("button", { name: "登 录" });
      await user.click(loginButton);

      // Wait for validation
      await waitFor(() => {
        // Should NOT show account error
        expect(
          screen.queryByText("请输入手机号或邮箱")
        ).not.toBeInTheDocument();

        // Should NOT show OTP error
        expect(
          screen.queryByText("验证码必须是6位数字")
        ).not.toBeInTheDocument();
      });

      // Should NOT show terms error in main error area
      expect(
        screen.queryByText("请同意服务协议和隐私政策")
      ).not.toBeInTheDocument();

      // Should show terms error via tooltip (now that account & OTP are valid)
      await waitFor(() => {
        expect(
          screen.getAllByText("请先阅读并勾选协议").length
        ).toBeGreaterThan(0);
      });

      // Should not call submit
      expect(onOtpSubmit).not.toHaveBeenCalled();
    });

    it("should submit when all fields are valid", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="otp"
        />
      );

      // Fill account field
      const accountInput = screen.getByPlaceholderText("国内手机号/邮箱");
      await user.type(accountInput, "test@example.com");

      // Fill OTP field
      const otpInput = screen.getByPlaceholderText("短信验证码");
      await user.type(otpInput, "123456");

      // Check terms checkbox
      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      // Click login button
      const loginButton = screen.getByRole("button", { name: "登 录" });
      await user.click(loginButton);

      // Should not show any errors
      await waitFor(() => {
        expect(
          screen.queryByText("请输入手机号或邮箱")
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText("验证码必须是6位数字")
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText("请同意服务协议和隐私政策")
        ).not.toBeInTheDocument();
      });

      // Should call submit with correct data (no captcha token for login submit, only for OTP send)
      await waitFor(() => {
        expect(onOtpSubmit).toHaveBeenCalledWith({
          account: "test@example.com",
          otp: "123456",
          agreedToTerms: true,
        });
      });
    });
  });

  describe("Form Toggle", () => {
    it("should switch between password and OTP login forms", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      // Should show password login form initially
      expect(screen.getByText("账号密码登录")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("登录密码")).toBeInTheDocument();

      // Click "验证码登录" to switch to OTP form
      const switchToOtpButton = screen.getByRole("button", {
        name: "验证码登录",
      });
      await user.click(switchToOtpButton);

      // Should show OTP login form
      await waitFor(() => {
        expect(screen.getByText("验证码登录")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("短信验证码")).toBeInTheDocument();
      });

      // Click "账号登录" to switch back to password form
      const switchToPasswordButton = screen.getByRole("button", {
        name: "账号登录",
      });
      await user.click(switchToPasswordButton);

      // Should show password login form again
      await waitFor(() => {
        expect(screen.getByText("账号密码登录")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("登录密码")).toBeInTheDocument();
      });
    });
  });

  describe("Text Content and UI Elements", () => {
    it("should display correct title for password login", () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      expect(screen.getByText("账号密码登录")).toBeInTheDocument();
    });

    it("should display correct title for OTP login", () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="otp"
        />
      );

      expect(screen.getByText("验证码登录")).toBeInTheDocument();
    });

    it("should display correct placeholder for password login account field", () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      expect(
        screen.getByPlaceholderText("国内手机号/用户名/邮箱")
      ).toBeInTheDocument();
    });

    it("should display correct placeholder for OTP login account field", () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="otp"
        />
      );

      expect(
        screen.getByPlaceholderText("国内手机号/邮箱")
      ).toBeInTheDocument();
    });

    it("should display password placeholder in password login", () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      expect(screen.getByPlaceholderText("登录密码")).toBeInTheDocument();
    });

    it("should display OTP placeholder in OTP login", () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="otp"
        />
      );

      expect(screen.getByPlaceholderText("短信验证码")).toBeInTheDocument();
    });

    it('should display "忘记密码" link in password login', () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      const forgotPasswordLink = screen.getByRole("link", {
        name: "忘记密码",
      });
      expect(forgotPasswordLink).toBeInTheDocument();
      expect(forgotPasswordLink).toHaveAttribute(
        "href",
        "/auth/forgot-password"
      );
    });

    it('should display "免费注册" link in password login', () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      const signUpLink = screen.getByRole("link", { name: "免费注册" });
      expect(signUpLink).toBeInTheDocument();
      expect(signUpLink).toHaveAttribute("href", "/auth/sign-up");
    });

    it("should display terms agreement text with links", () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      expect(screen.getByText(/阅读并同意Nomad的/)).toBeInTheDocument();

      const termsLink = screen.getByRole("link", { name: "服务协议" });
      expect(termsLink).toBeInTheDocument();
      expect(termsLink).toHaveAttribute("href", "/terms");

      const privacyLink = screen.getByRole("link", {
        name: "个人信息保护政策",
      });
      expect(privacyLink).toBeInTheDocument();
      expect(privacyLink).toHaveAttribute("href", "/privacy");
    });

    it('should display "登 录" button', () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      expect(screen.getByRole("button", { name: "登 录" })).toBeInTheDocument();
    });

    it('should display "验证码登录" button in password login', () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      expect(
        screen.getByRole("button", { name: "验证码登录" })
      ).toBeInTheDocument();
    });

    it('should display "账号登录" button in OTP login', () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="otp"
        />
      );

      expect(
        screen.getByRole("button", { name: "账号登录" })
      ).toBeInTheDocument();
    });

    it('should display "发送验证码" button in OTP login', () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="otp"
        />
      );

      expect(
        screen.getByRole("button", { name: "发送验证码" })
      ).toBeInTheDocument();
    });

    it("should display GitHub icon in password login", () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      const { container } = render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      // Check for GitHub icon by looking for the svg element
      const githubIcon = container.querySelector("svg");
      expect(githubIcon).toBeInTheDocument();
    });

    it("should not display GitHub icon in OTP login", () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      const { container } = render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="otp"
        />
      );

      // In OTP mode, GitHub icon should not be present
      // Note: Turnstile might have SVG, so we check for Github specifically
      const githubContainer = container.querySelector(".rounded-full.bg-black");
      expect(githubContainer).not.toBeInTheDocument();
    });
  });

  describe("OTP Send Functionality", () => {
    it("should validate account before sending OTP", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="otp"
        />
      );

      // Click send OTP without filling account
      const sendOtpButton = screen.getByRole("button", {
        name: "发送验证码",
      });
      await user.click(sendOtpButton);

      // Should show account validation error
      await waitFor(() => {
        expect(screen.getByText("请输入手机号或邮箱")).toBeInTheDocument();
      });

      // Should not call onSendOtp
      expect(onSendOtp).not.toHaveBeenCalled();
    });

    // Note: Tests for countdown and CAPTCHA flow behavior are complex
    // and require proper Turnstile mocking. These are better tested in
    // integration or E2E tests where the full CAPTCHA flow can be simulated.
  });

  describe("Loading States", () => {
    it("should disable all inputs when isLoading is true in password login", () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
          isLoading={true}
        />
      );

      const accountInput = screen.getByPlaceholderText(
        "国内手机号/用户名/邮箱"
      );
      const passwordInput = screen.getByPlaceholderText("登录密码");
      const loginButton = screen.getByRole("button", { name: "登 录" });
      const switchButton = screen.getByRole("button", { name: "验证码登录" });
      const checkbox = screen.getByRole("checkbox");

      expect(accountInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
      expect(loginButton).toBeDisabled();
      expect(switchButton).toBeDisabled();
      expect(checkbox).toBeDisabled();
    });

    it("should disable all inputs when isLoading is true in OTP login", () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="otp"
          isLoading={true}
        />
      );

      const accountInput = screen.getByPlaceholderText("国内手机号/邮箱");
      const otpInput = screen.getByPlaceholderText("短信验证码");
      const loginButton = screen.getByRole("button", { name: "登 录" });
      const sendOtpButton = screen.getByRole("button", { name: "发送验证码" });
      const switchButton = screen.getByRole("button", { name: "账号登录" });
      const checkbox = screen.getByRole("checkbox");

      expect(accountInput).toBeDisabled();
      expect(otpInput).toBeDisabled();
      expect(loginButton).toBeDisabled();
      expect(sendOtpButton).toBeDisabled();
      expect(switchButton).toBeDisabled();
      expect(checkbox).toBeDisabled();
    });

    it("should enable all inputs when isLoading is false", () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
          isLoading={false}
        />
      );

      const accountInput = screen.getByPlaceholderText(
        "国内手机号/用户名/邮箱"
      );
      const passwordInput = screen.getByPlaceholderText("登录密码");
      const loginButton = screen.getByRole("button", { name: "登 录" });
      const switchButton = screen.getByRole("button", { name: "验证码登录" });
      const checkbox = screen.getByRole("checkbox");

      expect(accountInput).not.toBeDisabled();
      expect(passwordInput).not.toBeDisabled();
      expect(loginButton).not.toBeDisabled();
      expect(switchButton).not.toBeDisabled();
      expect(checkbox).not.toBeDisabled();
    });
  });

  describe("Input Validation", () => {
    it("should limit OTP input to 6 characters", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="otp"
        />
      );

      const otpInput = screen.getByPlaceholderText("短信验证码");

      // Try to type more than 6 characters
      await user.type(otpInput, "1234567890");

      // Input should have maxLength attribute set to 6
      expect(otpInput).toHaveAttribute("maxLength", "6");
    });

    it("should show invalid account format error", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      // Fill account with invalid format
      const accountInput = screen.getByPlaceholderText(
        "国内手机号/用户名/邮箱"
      );
      await user.type(accountInput, "invalid");

      // Click login button
      const loginButton = screen.getByRole("button", { name: "登 录" });
      await user.click(loginButton);

      // Should show account format error (the actual validation message)
      await waitFor(() => {
        expect(
          screen.getByText("请输入正确的手机号或邮箱格式")
        ).toBeInTheDocument();
      });
    });

    it("should accept valid email format", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      // Fill valid email
      const accountInput = screen.getByPlaceholderText(
        "国内手机号/用户名/邮箱"
      );
      await user.type(accountInput, "test@example.com");

      // Fill password
      const passwordInput = screen.getByPlaceholderText("登录密码");
      await user.type(passwordInput, "Password123!");

      // Check terms
      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      // Click login button
      const loginButton = screen.getByRole("button", { name: "登 录" });
      await user.click(loginButton);

      // Should not show account error
      await waitFor(() => {
        expect(
          screen.queryByText("请输入手机号或邮箱")
        ).not.toBeInTheDocument();
      });

      // Should call submit
      expect(onPasswordSubmit).toHaveBeenCalled();
    });

    it("should accept valid phone number format", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      // Fill valid phone number
      const accountInput = screen.getByPlaceholderText(
        "国内手机号/用户名/邮箱"
      );
      await user.type(accountInput, "13800138000");

      // Fill password
      const passwordInput = screen.getByPlaceholderText("登录密码");
      await user.type(passwordInput, "Password123!");

      // Check terms
      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      // Click login button
      const loginButton = screen.getByRole("button", { name: "登 录" });
      await user.click(loginButton);

      // Should not show account error
      await waitFor(() => {
        expect(
          screen.queryByText("请输入手机号或邮箱")
        ).not.toBeInTheDocument();
      });

      // Should call submit
      await waitFor(() => {
        expect(onPasswordSubmit).toHaveBeenCalled();
      });
    });

    it("should show error for invalid OTP format (less than 6 digits)", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="otp"
        />
      );

      // Fill account
      const accountInput = screen.getByPlaceholderText("国内手机号/邮箱");
      await user.type(accountInput, "test@example.com");

      // Fill invalid OTP (less than 6 digits)
      const otpInput = screen.getByPlaceholderText("短信验证码");
      await user.type(otpInput, "12345");

      // Click login button
      const loginButton = screen.getByRole("button", { name: "登 录" });
      await user.click(loginButton);

      // Should show OTP format error
      await waitFor(() => {
        expect(screen.getByText("验证码必须是6位数字")).toBeInTheDocument();
      });
    });

    it("should show error for invalid OTP format (non-numeric)", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="otp"
        />
      );

      // Fill account
      const accountInput = screen.getByPlaceholderText("国内手机号/邮箱");
      await user.type(accountInput, "test@example.com");

      // Fill invalid OTP (non-numeric)
      const otpInput = screen.getByPlaceholderText("短信验证码");
      await user.type(otpInput, "abcdef");

      // Click login button
      const loginButton = screen.getByRole("button", { name: "登 录" });
      await user.click(loginButton);

      // Should show OTP format error (the actual validation message for non-numeric)
      await waitFor(() => {
        expect(screen.getByText("验证码必须是6位数字")).toBeInTheDocument();
      });
    });
  });

  describe("Error Display", () => {
    it("should display error message when present", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      // Trigger error by not filling fields
      const loginButton = screen.getByRole("button", { name: "登 录" });
      await user.click(loginButton);

      // Error should be displayed with AlertCircle icon
      await waitFor(() => {
        const errorMessage = screen.getByText("请输入手机号或邮箱");
        expect(errorMessage).toBeInTheDocument();

        // Check that error display has proper styling
        const errorContainer = errorMessage.closest("div");
        expect(errorContainer).toBeInTheDocument();
      });
    });

    it("should not display error area when no error", () => {
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      // Should not show any error initially
      expect(screen.queryByText("请输入手机号或邮箱")).not.toBeInTheDocument();
      expect(screen.queryByText("请输入登录密码")).not.toBeInTheDocument();
    });

    it("should clear previous errors when switching login methods", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      // Trigger an error in password login
      const loginButton = screen.getByRole("button", { name: "登 录" });
      await user.click(loginButton);

      // Error should be displayed
      await waitFor(() => {
        expect(screen.getByText("请输入手机号或邮箱")).toBeInTheDocument();
      });

      // Switch to OTP login
      const switchButton = screen.getByRole("button", {
        name: "验证码登录",
      });
      await user.click(switchButton);

      // Previous error should be cleared
      await waitFor(() => {
        expect(
          screen.queryByText("请输入手机号或邮箱")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Checkbox Interaction", () => {
    it("should toggle checkbox state when clicked", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
        />
      );

      const checkbox = screen.getByRole("checkbox");

      // Initially unchecked
      expect(checkbox).not.toBeChecked();

      // Click to check
      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      // Click to uncheck
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it("should not allow checkbox toggle when disabled", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn().mockResolvedValue({ success: true });
      const onOtpSubmit = vi.fn().mockResolvedValue({ success: true });
      const onSendOtp = vi
        .fn()
        .mockResolvedValue({ success: true, data: undefined });

      render(
        <UnifiedLoginForm
          onPasswordSubmit={onPasswordSubmit}
          onOtpSubmit={onOtpSubmit}
          onSendOtp={onSendOtp}
          initialLoginMethod="password"
          isLoading={true}
        />
      );

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeDisabled();
      expect(checkbox).not.toBeChecked();

      // Try to click (should not work)
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });
});

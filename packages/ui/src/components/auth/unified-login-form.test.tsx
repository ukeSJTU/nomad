import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import {
  type LoginMethod,
  type OtpLoginFormData,
  type PasswordLoginFormData,
  UnifiedLoginForm,
} from "./unified-login-form";

function UnifiedLoginFormWrapper(
  props: Partial<React.ComponentProps<typeof UnifiedLoginForm>> & {
    initialMethod?: LoginMethod;
  }
) {
  const { initialMethod = "password", ...restProps } = props;

  const passwordForm = useForm<PasswordLoginFormData>({
    defaultValues: {
      account: "",
      password: "",
      agreedToTerms: false,
    },
  });

  const otpForm = useForm<OtpLoginFormData>({
    defaultValues: {
      account: "",
      otp: "",
      agreedToTerms: false,
    },
  });

  return (
    <UnifiedLoginForm
      loginMethod={initialMethod}
      onLoginMethodChange={vi.fn()}
      passwordForm={passwordForm}
      otpForm={otpForm}
      onPasswordSubmit={vi.fn(e => e?.preventDefault())}
      onOtpSubmit={vi.fn(e => e?.preventDefault())}
      onSendOtp={vi.fn()}
      countdown={0}
      {...restProps}
    />
  );
}

describe("UnifiedLoginForm", () => {
  describe("Password mode", () => {
    it("should render password login title", () => {
      render(<UnifiedLoginFormWrapper initialMethod="password" />);

      expect(screen.getByText("账号密码登录")).toBeInTheDocument();
    });

    it("should render account input with correct placeholder", () => {
      render(<UnifiedLoginFormWrapper initialMethod="password" />);

      expect(
        screen.getByPlaceholderText("国内手机号/用户名/邮箱")
      ).toBeInTheDocument();
    });

    it("should render password input", () => {
      render(<UnifiedLoginFormWrapper initialMethod="password" />);

      expect(screen.getByPlaceholderText("登录密码")).toBeInTheDocument();
    });

    it("should render forgot password link", () => {
      render(<UnifiedLoginFormWrapper initialMethod="password" />);

      expect(screen.getByText("忘记密码")).toBeInTheDocument();
    });

    it("should render register link", () => {
      render(<UnifiedLoginFormWrapper initialMethod="password" />);

      expect(screen.getByText("免费注册")).toBeInTheDocument();
    });

    it("should render GitHub login button", () => {
      render(<UnifiedLoginFormWrapper initialMethod="password" />);

      // GitHub button contains an icon
      const githubButton = document.querySelector("svg.lucide-github");
      expect(githubButton).toBeInTheDocument();
    });

    it("should render switch to OTP login button", () => {
      render(<UnifiedLoginFormWrapper initialMethod="password" />);

      expect(
        screen.getByRole("button", { name: "验证码登录" })
      ).toBeInTheDocument();
    });

    it("should call onLoginMethodChange when switch button is clicked", async () => {
      const user = userEvent.setup();
      const onLoginMethodChange = vi.fn();
      render(
        <UnifiedLoginFormWrapper
          initialMethod="password"
          onLoginMethodChange={onLoginMethodChange}
        />
      );

      await user.click(screen.getByRole("button", { name: "验证码登录" }));
      expect(onLoginMethodChange).toHaveBeenCalledWith("otp");
    });

    it("should call onForgotPasswordClick when forgot password link is clicked", async () => {
      const user = userEvent.setup();
      const onForgotPasswordClick = vi.fn();
      render(
        <UnifiedLoginFormWrapper
          initialMethod="password"
          onForgotPasswordClick={onForgotPasswordClick}
        />
      );

      await user.click(screen.getByText("忘记密码"));
      expect(onForgotPasswordClick).toHaveBeenCalledTimes(1);
    });

    it("should call onRegisterClick when register link is clicked", async () => {
      const user = userEvent.setup();
      const onRegisterClick = vi.fn();
      render(
        <UnifiedLoginFormWrapper
          initialMethod="password"
          onRegisterClick={onRegisterClick}
        />
      );

      await user.click(screen.getByText("免费注册"));
      expect(onRegisterClick).toHaveBeenCalledTimes(1);
    });

    it("should call onPasswordSubmit when form is submitted", async () => {
      const user = userEvent.setup();
      const onPasswordSubmit = vi.fn(e => e?.preventDefault());
      render(
        <UnifiedLoginFormWrapper
          initialMethod="password"
          onPasswordSubmit={onPasswordSubmit}
        />
      );

      await user.click(screen.getByRole("button", { name: "登 录" }));
      expect(onPasswordSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe("OTP mode", () => {
    it("should render OTP login title", () => {
      render(<UnifiedLoginFormWrapper initialMethod="otp" />);

      expect(screen.getByText("验证码登录")).toBeInTheDocument();
    });

    it("should render account input with correct placeholder", () => {
      render(<UnifiedLoginFormWrapper initialMethod="otp" />);

      expect(
        screen.getByPlaceholderText("国内手机号/邮箱")
      ).toBeInTheDocument();
    });

    it("should render OTP input", () => {
      render(<UnifiedLoginFormWrapper initialMethod="otp" />);

      expect(screen.getByPlaceholderText("短信验证码")).toBeInTheDocument();
    });

    it("should not render forgot password link", () => {
      render(<UnifiedLoginFormWrapper initialMethod="otp" />);

      expect(screen.queryByText("忘记密码")).not.toBeInTheDocument();
    });

    it("should not render register link", () => {
      render(<UnifiedLoginFormWrapper initialMethod="otp" />);

      expect(screen.queryByText("免费注册")).not.toBeInTheDocument();
    });

    it("should not render GitHub login button", () => {
      render(<UnifiedLoginFormWrapper initialMethod="otp" />);

      const githubButton = document.querySelector("svg.lucide-github");
      expect(githubButton).not.toBeInTheDocument();
    });

    it("should render switch to password login button", () => {
      render(<UnifiedLoginFormWrapper initialMethod="otp" />);

      expect(
        screen.getByRole("button", { name: "账号登录" })
      ).toBeInTheDocument();
    });

    it("should call onLoginMethodChange when switch button is clicked", async () => {
      const user = userEvent.setup();
      const onLoginMethodChange = vi.fn();
      render(
        <UnifiedLoginFormWrapper
          initialMethod="otp"
          onLoginMethodChange={onLoginMethodChange}
        />
      );

      await user.click(screen.getByRole("button", { name: "账号登录" }));
      expect(onLoginMethodChange).toHaveBeenCalledWith("password");
    });

    it("should call onOtpSubmit when form is submitted", async () => {
      const user = userEvent.setup();
      const onOtpSubmit = vi.fn(e => e?.preventDefault());
      render(
        <UnifiedLoginFormWrapper
          initialMethod="otp"
          onOtpSubmit={onOtpSubmit}
        />
      );

      await user.click(screen.getByRole("button", { name: "登 录" }));
      expect(onOtpSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe("Common functionality", () => {
    it("should render submit button", () => {
      render(<UnifiedLoginFormWrapper />);

      expect(screen.getByRole("button", { name: "登 录" })).toBeInTheDocument();
    });

    it("should render terms checkbox", () => {
      render(<UnifiedLoginFormWrapper />);

      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(screen.getByText("服务协议")).toBeInTheDocument();
      expect(screen.getByText("个人信息保护政策")).toBeInTheDocument();
    });

    it("should disable inputs when isLoading is true", () => {
      render(<UnifiedLoginFormWrapper isLoading={true} />);

      const submitButton = screen.getByRole("button", { name: "登 录" });
      expect(submitButton).toBeDisabled();

      const input = screen.getByPlaceholderText("国内手机号/用户名/邮箱");
      expect(input).toBeDisabled();
    });

    it("should display error message when currentError is provided", () => {
      render(<UnifiedLoginFormWrapper currentError="请输入手机号或邮箱" />);

      expect(screen.getByText("请输入手机号或邮箱")).toBeInTheDocument();
    });

    it("should call onTermsClick when terms link is clicked", async () => {
      const user = userEvent.setup();
      const onTermsClick = vi.fn();
      render(<UnifiedLoginFormWrapper onTermsClick={onTermsClick} />);

      await user.click(screen.getByText("服务协议"));
      expect(onTermsClick).toHaveBeenCalledTimes(1);
    });

    it("should call onPrivacyClick when privacy link is clicked", async () => {
      const user = userEvent.setup();
      const onPrivacyClick = vi.fn();
      render(<UnifiedLoginFormWrapper onPrivacyClick={onPrivacyClick} />);

      await user.click(screen.getByText("个人信息保护政策"));
      expect(onPrivacyClick).toHaveBeenCalledTimes(1);
    });

    it("should toggle checkbox when clicked", async () => {
      const user = userEvent.setup();
      render(<UnifiedLoginFormWrapper />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });
});

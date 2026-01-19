import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { type SignupMethod, UnifiedSignupForm } from "./unified-signup-form";
import type { VerificationFormData } from "./verification-form";

function UnifiedSignupFormWrapper(
  props: Partial<React.ComponentProps<typeof UnifiedSignupForm>> & {
    initialMethod?: SignupMethod;
  }
) {
  const { initialMethod = "phone", ...restProps } = props;

  const phoneForm = useForm<VerificationFormData>({
    defaultValues: {
      contact: "",
      otp: "",
      agreedToTerms: false,
    },
  });

  const emailForm = useForm<VerificationFormData>({
    defaultValues: {
      contact: "",
      otp: "",
      agreedToTerms: false,
    },
  });

  return (
    <UnifiedSignupForm
      method={initialMethod}
      onMethodChange={vi.fn()}
      phoneForm={phoneForm}
      onPhoneSubmit={vi.fn(e => e?.preventDefault())}
      onSendPhoneOtp={vi.fn()}
      phoneCountdown={0}
      emailForm={emailForm}
      onEmailSubmit={vi.fn(e => e?.preventDefault())}
      onSendEmailOtp={vi.fn()}
      emailCountdown={0}
      {...restProps}
    />
  );
}

describe("UnifiedSignupForm", () => {
  describe("Phone mode", () => {
    it("should render phone tab as active", () => {
      render(<UnifiedSignupFormWrapper initialMethod="phone" />);

      const phoneTab = screen.getByRole("tab", { name: "手机注册" });
      expect(phoneTab).toHaveAttribute("data-state", "active");
    });

    it("should render phone-specific labels", () => {
      render(<UnifiedSignupFormWrapper initialMethod="phone" />);

      expect(screen.getByText("手机号")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("请输入手机号")).toBeInTheDocument();
      expect(screen.getByText("短信验证码")).toBeInTheDocument();
    });

    it("should call onMethodChange when email tab is clicked", async () => {
      const user = userEvent.setup();
      const onMethodChange = vi.fn();
      render(
        <UnifiedSignupFormWrapper
          initialMethod="phone"
          onMethodChange={onMethodChange}
        />
      );

      await user.click(screen.getByRole("tab", { name: "邮箱注册" }));
      expect(onMethodChange).toHaveBeenCalledWith("email");
    });
  });

  describe("Email mode", () => {
    it("should render email tab as active", () => {
      render(<UnifiedSignupFormWrapper initialMethod="email" />);

      const emailTab = screen.getByRole("tab", { name: "邮箱注册" });
      expect(emailTab).toHaveAttribute("data-state", "active");
    });

    it("should render email-specific labels", () => {
      render(<UnifiedSignupFormWrapper initialMethod="email" />);

      expect(screen.getByText("邮箱地址")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("请输入邮箱地址")).toBeInTheDocument();
      expect(screen.getByText("邮箱验证码")).toBeInTheDocument();
    });

    it("should call onMethodChange when phone tab is clicked", async () => {
      const user = userEvent.setup();
      const onMethodChange = vi.fn();
      render(
        <UnifiedSignupFormWrapper
          initialMethod="email"
          onMethodChange={onMethodChange}
        />
      );

      await user.click(screen.getByRole("tab", { name: "手机注册" }));
      expect(onMethodChange).toHaveBeenCalledWith("phone");
    });
  });

  describe("Common functionality", () => {
    it("should render both tab triggers", () => {
      render(<UnifiedSignupFormWrapper />);

      expect(screen.getByRole("tab", { name: "手机注册" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "邮箱注册" })).toBeInTheDocument();
    });

    it("should render submit button", () => {
      render(<UnifiedSignupFormWrapper />);

      expect(
        screen.getByRole("button", { name: "下一步，设置密码" })
      ).toBeInTheDocument();
    });

    it("should render terms checkbox", () => {
      render(<UnifiedSignupFormWrapper />);

      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(screen.getByText("服务协议")).toBeInTheDocument();
      expect(screen.getByText("隐私政策")).toBeInTheDocument();
    });

    it("should render enterprise registration link", () => {
      render(<UnifiedSignupFormWrapper />);

      expect(
        screen.getByRole("button", { name: "企业客户注册" })
      ).toBeInTheDocument();
    });

    it("should disable tabs when isLoading is true", () => {
      render(<UnifiedSignupFormWrapper isLoading={true} />);

      const phoneTab = screen.getByRole("tab", { name: "手机注册" });
      const emailTab = screen.getByRole("tab", { name: "邮箱注册" });

      expect(phoneTab).toBeDisabled();
      expect(emailTab).toBeDisabled();
    });

    it("should call onTermsClick when terms link is clicked", async () => {
      const user = userEvent.setup();
      const onTermsClick = vi.fn();
      render(<UnifiedSignupFormWrapper onTermsClick={onTermsClick} />);

      await user.click(screen.getByText("服务协议"));
      expect(onTermsClick).toHaveBeenCalledTimes(1);
    });

    it("should call onPrivacyClick when privacy link is clicked", async () => {
      const user = userEvent.setup();
      const onPrivacyClick = vi.fn();
      render(<UnifiedSignupFormWrapper onPrivacyClick={onPrivacyClick} />);

      await user.click(screen.getByText("隐私政策"));
      expect(onPrivacyClick).toHaveBeenCalledTimes(1);
    });

    it("should call onEnterpriseClick when enterprise link is clicked", async () => {
      const user = userEvent.setup();
      const onEnterpriseClick = vi.fn();
      render(
        <UnifiedSignupFormWrapper onEnterpriseClick={onEnterpriseClick} />
      );

      await user.click(screen.getByRole("button", { name: "企业客户注册" }));
      expect(onEnterpriseClick).toHaveBeenCalledTimes(1);
    });
  });
});

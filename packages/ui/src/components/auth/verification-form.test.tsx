import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "@ukesjtu/nomad-ui/components/primitives/form";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import {
  VerificationForm,
  type VerificationFormData,
} from "./verification-form";

function VerificationFormWrapper(
  props: Partial<React.ComponentProps<typeof VerificationForm>>
) {
  const form = useForm<VerificationFormData>({
    defaultValues: {
      contact: "",
      otp: "",
      agreedToTerms: false,
    },
  });

  return (
    <Form {...form}>
      <VerificationForm
        mode="phone"
        control={form.control}
        errors={form.formState.errors}
        onSubmit={vi.fn()}
        onSendOtp={vi.fn()}
        countdown={0}
        {...props}
      />
    </Form>
  );
}

describe("VerificationForm", () => {
  describe("Phone mode", () => {
    it("should render phone-specific labels and input", () => {
      render(<VerificationFormWrapper mode="phone" />);

      expect(screen.getByText("手机号")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("请输入手机号")).toBeInTheDocument();
      expect(screen.getByText("短信验证码")).toBeInTheDocument();
    });

    it("should set correct input type for phone", () => {
      render(<VerificationFormWrapper mode="phone" />);

      const input = screen.getByPlaceholderText("请输入手机号");
      expect(input).toHaveAttribute("type", "tel");
      expect(input).toHaveAttribute("maxLength", "11");
    });
  });

  describe("Email mode", () => {
    it("should render email-specific labels and input", () => {
      render(<VerificationFormWrapper mode="email" />);

      expect(screen.getByText("邮箱地址")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("请输入邮箱地址")).toBeInTheDocument();
      expect(screen.getByText("邮箱验证码")).toBeInTheDocument();
    });

    it("should set correct input type for email", () => {
      render(<VerificationFormWrapper mode="email" />);

      const input = screen.getByPlaceholderText("请输入邮箱地址");
      expect(input).toHaveAttribute("type", "email");
      expect(input).not.toHaveAttribute("maxLength");
    });
  });

  describe("Common functionality", () => {
    it("should render OTP input with placeholder", () => {
      render(<VerificationFormWrapper />);

      expect(screen.getByPlaceholderText("6位数字")).toBeInTheDocument();
    });

    it("should render terms checkbox", () => {
      render(<VerificationFormWrapper />);

      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(screen.getByText("服务协议")).toBeInTheDocument();
      expect(screen.getByText("隐私政策")).toBeInTheDocument();
    });

    it("should render submit button", () => {
      render(<VerificationFormWrapper />);

      expect(
        screen.getByRole("button", { name: "下一步，设置密码" })
      ).toBeInTheDocument();
    });

    it("should render enterprise registration link", () => {
      render(<VerificationFormWrapper />);

      expect(
        screen.getByRole("button", { name: "企业客户注册" })
      ).toBeInTheDocument();
    });

    it("should disable input and show loading text when isLoading is true", () => {
      render(<VerificationFormWrapper isLoading={true} />);

      const submitButton = screen.getByRole("button", { name: "验证中..." });
      expect(submitButton).toBeDisabled();

      const input = screen.getByPlaceholderText("请输入手机号");
      expect(input).toBeDisabled();
    });

    it("should call onSubmit when form is submitted", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn(e => e.preventDefault());
      render(<VerificationFormWrapper onSubmit={onSubmit} />);

      await user.click(
        screen.getByRole("button", { name: "下一步，设置密码" })
      );
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it("should call onTermsClick when terms link is clicked", async () => {
      const user = userEvent.setup();
      const onTermsClick = vi.fn();
      render(<VerificationFormWrapper onTermsClick={onTermsClick} />);

      await user.click(screen.getByText("服务协议"));
      expect(onTermsClick).toHaveBeenCalledTimes(1);
    });

    it("should call onPrivacyClick when privacy link is clicked", async () => {
      const user = userEvent.setup();
      const onPrivacyClick = vi.fn();
      render(<VerificationFormWrapper onPrivacyClick={onPrivacyClick} />);

      await user.click(screen.getByText("隐私政策"));
      expect(onPrivacyClick).toHaveBeenCalledTimes(1);
    });

    it("should call onEnterpriseClick when enterprise link is clicked", async () => {
      const user = userEvent.setup();
      const onEnterpriseClick = vi.fn();
      render(<VerificationFormWrapper onEnterpriseClick={onEnterpriseClick} />);

      await user.click(screen.getByRole("button", { name: "企业客户注册" }));
      expect(onEnterpriseClick).toHaveBeenCalledTimes(1);
    });

    it("should toggle checkbox when clicked", async () => {
      const user = userEvent.setup();
      render(<VerificationFormWrapper />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });
});

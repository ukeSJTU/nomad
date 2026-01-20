import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "@ukesjtu/nomad-ui/components/primitives/form";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { PasswordSetupForm } from "./password-setup-form";

function PasswordSetupFormWrapper(
  props: Partial<React.ComponentProps<typeof PasswordSetupForm>>
) {
  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");

  return (
    <Form {...form}>
      <PasswordSetupForm
        control={form.control}
        errors={form.formState.errors}
        onSubmit={vi.fn()}
        passwordValue={password}
        strengthScore={0}
        {...props}
      />
    </Form>
  );
}

/**
 * @requirement REQ-U01
 * @requirement REQ-U02
 */
describe("PasswordSetupForm", () => {
  /**
   * @requirement REQ-U01
   * @scenario 场景1
   */
  it("should render all form fields correctly", () => {
    render(<PasswordSetupFormWrapper />);

    expect(screen.getByLabelText("设置密码")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入密码")).toBeInTheDocument();
    expect(screen.getByLabelText("确认密码")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请再次输入密码")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "完成注册" })
    ).toBeInTheDocument();
  });

  it("should display masked identifier when provided", () => {
    render(<PasswordSetupFormWrapper maskedIdentifier="138****5678" />);

    expect(screen.getByText("138****5678")).toBeInTheDocument();
  });

  it("should show password requirements", () => {
    render(<PasswordSetupFormWrapper />);

    expect(screen.getByText("8-20位字符")).toBeInTheDocument();
    expect(screen.getByText("包含至少一个大写字母")).toBeInTheDocument();
    expect(screen.getByText("包含至少一个小写字母")).toBeInTheDocument();
    expect(screen.getByText(/包含至少一个数字/)).toBeInTheDocument();
    expect(screen.getByText(/包含至少一个特殊符号/)).toBeInTheDocument();
  });

  it("should toggle password visibility when eye icon is clicked", async () => {
    const user = userEvent.setup();
    render(<PasswordSetupFormWrapper />);

    const passwordInput = screen.getByPlaceholderText("请输入密码");
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click the eye icon to show password
    const toggleButtons = screen.getAllByRole("button", { name: "显示密码" });
    await user.click(toggleButtons[0]);

    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("should disable form when isLoading is true", () => {
    render(<PasswordSetupFormWrapper isLoading={true} />);

    expect(screen.getByRole("button", { name: "设置中..." })).toBeDisabled();
  });

  it("should toggle confirm password visibility when eye icon is clicked", async () => {
    const user = userEvent.setup();
    render(<PasswordSetupFormWrapper />);

    const confirmPasswordInput = screen.getByPlaceholderText("请再次输入密码");
    expect(confirmPasswordInput).toHaveAttribute("type", "password");

    // Click the eye icon to show confirm password
    const toggleButtons = screen.getAllByRole("button", { name: "显示密码" });
    await user.click(toggleButtons[1]); // Second toggle button is for confirm password

    expect(confirmPasswordInput).toHaveAttribute("type", "text");

    // Click again to hide
    const hideButtons = screen.getAllByRole("button", { name: "隐藏密码" });
    await user.click(hideButtons[1]);

    expect(confirmPasswordInput).toHaveAttribute("type", "password");
  });

  it("should update password requirements in real-time as user types", () => {
    render(
      <PasswordSetupFormWrapper passwordValue="Password123" strengthScore={2} />
    );

    // Password meets all required requirements
    expect(screen.getByText("8-20位字符")).toHaveClass("text-chart-5");
    expect(screen.getByText("包含至少一个大写字母")).toHaveClass(
      "text-chart-5"
    );
    expect(screen.getByText("包含至少一个小写字母")).toHaveClass(
      "text-chart-5"
    );
    expect(screen.getByText(/包含至少一个数字/)).toHaveClass("text-chart-5");
  });

  it("should display password strength indicator correctly", () => {
    // Weak password: score 0
    const { rerender } = render(
      <PasswordSetupFormWrapper passwordValue="1q2w3e4r5t" strengthScore={0} />
    );
    expect(screen.getByText("弱")).toBeInTheDocument();

    // Weak password: score 1
    rerender(
      <PasswordSetupFormWrapper passwordValue="1Q2w3e4r5t" strengthScore={1} />
    );
    expect(screen.getByText("弱")).toBeInTheDocument();

    // Medium password: score 2
    rerender(
      <PasswordSetupFormWrapper passwordValue="Tiger@0177" strengthScore={2} />
    );
    expect(screen.getByText("中")).toBeInTheDocument();

    // Strong password: score 3
    rerender(
      <PasswordSetupFormWrapper
        passwordValue="zxcftzuio!@#"
        strengthScore={3}
      />
    );
    expect(screen.getByText("强")).toBeInTheDocument();

    // Strong password: score 4
    rerender(
      <PasswordSetupFormWrapper
        passwordValue="zxcftzuio!@#456"
        strengthScore={4}
      />
    );
    expect(screen.getByText("强")).toBeInTheDocument();
  });

  it("should show optional requirements with different styling", () => {
    render(<PasswordSetupFormWrapper />);

    // Optional requirements should have gray text when not met
    expect(screen.getByText(/包含至少一个数字/)).toHaveClass(
      "text-muted-foreground"
    );
    expect(screen.getByText(/包含至少一个特殊符号/)).toHaveClass(
      "text-muted-foreground"
    );
  });

  it("should use custom submit button text when provided", () => {
    render(<PasswordSetupFormWrapper submitButtonText="设置密码" />);

    expect(
      screen.getByRole("button", { name: "设置密码" })
    ).toBeInTheDocument();
  });

  it("should hide help link when showHelpLink is false", () => {
    render(<PasswordSetupFormWrapper showHelpLink={false} />);

    expect(screen.queryByText("注册遇到问题？")).not.toBeInTheDocument();
  });

  it("should call onHelpClick when help link is clicked", async () => {
    const user = userEvent.setup();
    const onHelpClick = vi.fn();
    render(<PasswordSetupFormWrapper onHelpClick={onHelpClick} />);

    await user.click(screen.getByText("注册遇到问题？"));
    expect(onHelpClick).toHaveBeenCalledTimes(1);
  });

  it("should call onSubmit when form is submitted", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <PasswordSetupFormWrapper
        onSubmit={onSubmit}
        passwordValue="Password123"
        strengthScore={3}
      />
    );

    await user.click(screen.getByRole("button", { name: "完成注册" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import PasswordSetupForm from "./password-setup";

describe("PasswordSetupForm", () => {
  it("should render all form fields correctly", () => {
    const onSubmit = vi.fn();
    render(<PasswordSetupForm onSubmit={onSubmit} />);

    expect(screen.getByLabelText("设置密码")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入密码")).toBeInTheDocument();
    expect(screen.getByLabelText("确认密码")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请再次输入密码")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "完成注册" })
    ).toBeInTheDocument();
  });

  it("should display masked identifier when provided", () => {
    const onSubmit = vi.fn();
    render(
      <PasswordSetupForm onSubmit={onSubmit} maskedIdentifier="138****5678" />
    );

    expect(screen.getByText("138****5678")).toBeInTheDocument();
  });

  it("should show password requirements", () => {
    const onSubmit = vi.fn();
    render(<PasswordSetupForm onSubmit={onSubmit} />);

    expect(screen.getByText("8-20位字符")).toBeInTheDocument();
    expect(screen.getByText("包含至少一个大写字母")).toBeInTheDocument();
    expect(screen.getByText("包含至少一个小写字母")).toBeInTheDocument();
    expect(screen.getByText(/包含至少一个数字/)).toBeInTheDocument();
    expect(screen.getByText(/包含至少一个特殊符号/)).toBeInTheDocument();
  });

  it("should show validation error for empty password", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PasswordSetupForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByPlaceholderText("请再次输入密码"),
      "Password123"
    );
    await user.click(screen.getByRole("button", { name: "完成注册" }));

    await waitFor(() => {
      expect(screen.getByText("密码至少8位")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show validation error for short password", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PasswordSetupForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("请输入密码"), "Pass1");
    await user.type(screen.getByPlaceholderText("请再次输入密码"), "Pass1");
    await user.click(screen.getByRole("button", { name: "完成注册" }));

    await waitFor(() => {
      expect(screen.getByText("密码至少8位")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show validation error when passwords do not match", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PasswordSetupForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("请输入密码"), "Password123");
    await user.type(
      screen.getByPlaceholderText("请再次输入密码"),
      "Password456"
    );
    await user.click(screen.getByRole("button", { name: "完成注册" }));

    await waitFor(() => {
      expect(screen.getByText("两次输入的密码不一致")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show validation error for password without uppercase letter", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PasswordSetupForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("请输入密码"), "password123");
    await user.type(
      screen.getByPlaceholderText("请再次输入密码"),
      "password123"
    );
    await user.click(screen.getByRole("button", { name: "完成注册" }));

    await waitFor(() => {
      expect(
        screen.getByText("密码必须包含至少一个大写字母")
      ).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show validation error for password without lowercase letter", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PasswordSetupForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("请输入密码"), "PASSWORD123");
    await user.type(
      screen.getByPlaceholderText("请再次输入密码"),
      "PASSWORD123"
    );
    await user.click(screen.getByRole("button", { name: "完成注册" }));

    await waitFor(() => {
      expect(
        screen.getByText("密码必须包含至少一个小写字母")
      ).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should call onSubmit with correct data when form is valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PasswordSetupForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("请输入密码"), "Password123");
    await user.type(
      screen.getByPlaceholderText("请再次输入密码"),
      "Password123"
    );
    await user.click(screen.getByRole("button", { name: "完成注册" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        password: "Password123",
        confirmPassword: "Password123",
      });
    });
  });

  it("should toggle password visibility when eye icon is clicked", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PasswordSetupForm onSubmit={onSubmit} />);

    const passwordInput = screen.getByPlaceholderText("请输入密码");
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click the eye icon to show password
    const toggleButtons = screen.getAllByRole("button", { name: "显示密码" });
    await user.click(toggleButtons[0]);

    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("should disable form when isLoading is true", () => {
    const onSubmit = vi.fn();
    render(<PasswordSetupForm onSubmit={onSubmit} isLoading={true} />);

    expect(screen.getByRole("button", { name: "创建中..." })).toBeDisabled();
  });

  it("should show validation error for password longer than 20 characters", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PasswordSetupForm onSubmit={onSubmit} />);

    const longPassword = "Password123456789012345"; // 25 characters
    await user.type(screen.getByPlaceholderText("请输入密码"), longPassword);
    await user.type(
      screen.getByPlaceholderText("请再次输入密码"),
      longPassword
    );
    await user.click(screen.getByRole("button", { name: "完成注册" }));

    await waitFor(() => {
      expect(screen.getByText("密码最多20位")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show validation error for password without number", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PasswordSetupForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("请输入密码"), "PasswordABC");
    await user.type(
      screen.getByPlaceholderText("请再次输入密码"),
      "PasswordABC"
    );
    await user.click(screen.getByRole("button", { name: "完成注册" }));

    await waitFor(() => {
      expect(screen.getByText("密码必须包含至少一个数字")).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should toggle confirm password visibility when eye icon is clicked", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PasswordSetupForm onSubmit={onSubmit} />);

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

  it("should update password requirements in real-time as user types", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PasswordSetupForm onSubmit={onSubmit} />);

    const passwordInput = screen.getByPlaceholderText("请输入密码");

    // Initially, all required requirements should show X icon (gray)
    expect(screen.getByText("8-20位字符")).toHaveClass("text-gray-600");
    expect(screen.getByText("包含至少一个大写字母")).toHaveClass(
      "text-gray-600"
    );
    expect(screen.getByText("包含至少一个小写字母")).toHaveClass(
      "text-gray-600"
    );

    // Type a password that meets length requirement
    await user.type(passwordInput, "password");
    await waitFor(() => {
      expect(screen.getByText("8-20位字符")).toHaveClass("text-green-600");
    });

    // Add uppercase letter
    await user.clear(passwordInput);
    await user.type(passwordInput, "Password");
    await waitFor(() => {
      expect(screen.getByText("包含至少一个大写字母")).toHaveClass(
        "text-green-600"
      );
      expect(screen.getByText("包含至少一个小写字母")).toHaveClass(
        "text-green-600"
      );
    });

    // Add number to meet all required requirements
    await user.clear(passwordInput);
    await user.type(passwordInput, "Password123");
    await waitFor(() => {
      expect(screen.getByText("8-20位字符")).toHaveClass("text-green-600");
      expect(screen.getByText("包含至少一个大写字母")).toHaveClass(
        "text-green-600"
      );
      expect(screen.getByText("包含至少一个小写字母")).toHaveClass(
        "text-green-600"
      );
      // Number requirement is optional, so it should show green when met
      expect(screen.getByText(/包含至少一个数字/)).toHaveClass(
        "text-green-600"
      );
    });
  });

  it("should display password strength indicator", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PasswordSetupForm onSubmit={onSubmit} />);

    const passwordInput = screen.getByPlaceholderText("请输入密码");

    // Weak password
    await user.type(passwordInput, "Pass1");
    await waitFor(() => {
      expect(screen.getByText("弱")).toBeInTheDocument();
    });

    // Medium password
    await user.clear(passwordInput);
    await user.type(passwordInput, "Password1");
    await waitFor(() => {
      expect(screen.getByText("中")).toBeInTheDocument();
    });

    // Strong password
    await user.clear(passwordInput);
    await user.type(passwordInput, "Password123!@#");
    await waitFor(() => {
      expect(screen.getByText("强")).toBeInTheDocument();
    });
  });

  it("should show optional requirements with different styling", () => {
    const onSubmit = vi.fn();
    render(<PasswordSetupForm onSubmit={onSubmit} />);

    // Optional requirements should have gray text when not met
    expect(screen.getByText(/包含至少一个数字/)).toHaveClass("text-gray-500");
    expect(screen.getByText(/包含至少一个特殊符号/)).toHaveClass(
      "text-gray-500"
    );
  });
});

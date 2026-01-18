import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { Form } from "../primitives/form";
import { ChangePasswordForm } from "./change-password-form";

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Mock wrapper component to provide form context
function TestWrapper({
  onSubmit,
  isLoading = false,
  initialValues,
}: {
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  isLoading?: boolean;
  initialValues?: Partial<ChangePasswordFormData>;
}) {
  const form = useForm<ChangePasswordFormData>({
    defaultValues: {
      currentPassword: initialValues?.currentPassword || "",
      newPassword: initialValues?.newPassword || "",
      confirmPassword: initialValues?.confirmPassword || "",
    },
  });

  const newPassword = form.watch("newPassword");

  return (
    <Form {...form}>
      <ChangePasswordForm
        control={form.control}
        errors={form.formState.errors}
        onSubmit={onSubmit}
        newPasswordValue={newPassword}
        isLoading={isLoading}
      />
    </Form>
  );
}

describe("ChangePasswordForm", () => {
  describe("Rendering", () => {
    it("should render all password fields", () => {
      render(<TestWrapper onSubmit={vi.fn()} />);

      expect(screen.getByText("当前密码")).toBeInTheDocument();
      expect(screen.getByText("新密码")).toBeInTheDocument();
      expect(screen.getByText("确认新密码")).toBeInTheDocument();
    });

    it("should render submit button", () => {
      render(<TestWrapper onSubmit={vi.fn()} />);

      expect(
        screen.getByRole("button", { name: "修改密码" })
      ).toBeInTheDocument();
    });

    it("should render password input fields with correct placeholders", () => {
      render(<TestWrapper onSubmit={vi.fn()} />);

      expect(screen.getByPlaceholderText("请输入当前密码")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("请输入新密码")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("请再次输入新密码")
      ).toBeInTheDocument();
    });
  });

  describe("Password Requirements", () => {
    it("should not show password requirements when newPasswordValue is empty", () => {
      render(<TestWrapper onSubmit={vi.fn()} />);

      expect(screen.queryByText("密码要求：")).not.toBeInTheDocument();
    });

    it("should show password requirements when newPasswordValue has content", () => {
      render(
        <TestWrapper
          onSubmit={vi.fn()}
          initialValues={{ newPassword: "test" }}
        />
      );

      expect(screen.getByText("密码要求：")).toBeInTheDocument();
      expect(screen.getByText("至少 8 个字符")).toBeInTheDocument();
      expect(screen.getByText("包含至少一个数字")).toBeInTheDocument();
      expect(screen.getByText("包含至少一个字母")).toBeInTheDocument();
    });

    it("should mark length requirement as met when password is 8+ characters", () => {
      render(
        <TestWrapper
          onSubmit={vi.fn()}
          initialValues={{ newPassword: "abcd1234" }}
        />
      );

      expect(screen.getByText("至少 8 个字符")).toHaveClass("text-chart-5");
    });

    it("should mark number requirement as met when password contains digits", () => {
      render(
        <TestWrapper
          onSubmit={vi.fn()}
          initialValues={{ newPassword: "abc123" }}
        />
      );

      expect(screen.getByText("包含至少一个数字")).toHaveClass("text-chart-5");
    });

    it("should mark letter requirement as met when password contains letters", () => {
      render(
        <TestWrapper
          onSubmit={vi.fn()}
          initialValues={{ newPassword: "abc123" }}
        />
      );

      expect(screen.getByText("包含至少一个字母")).toHaveClass("text-chart-5");
    });

    it("should mark all requirements as met for valid password", () => {
      render(
        <TestWrapper
          onSubmit={vi.fn()}
          initialValues={{ newPassword: "Test1234" }}
        />
      );

      expect(screen.getByText("至少 8 个字符")).toHaveClass("text-chart-5");
      expect(screen.getByText("包含至少一个数字")).toHaveClass("text-chart-5");
      expect(screen.getByText("包含至少一个字母")).toHaveClass("text-chart-5");
    });
  });

  describe("Password Visibility Toggle", () => {
    it("should toggle current password visibility", async () => {
      const user = userEvent.setup();
      const { container } = render(<TestWrapper onSubmit={vi.fn()} />);

      const currentPasswordInput =
        screen.getByPlaceholderText("请输入当前密码");
      expect(currentPasswordInput).toHaveAttribute("type", "password");

      const toggleButtons = container.querySelectorAll('button[type="button"]');
      await user.click(toggleButtons[0]);

      expect(currentPasswordInput).toHaveAttribute("type", "text");
    });

    it("should toggle new password visibility", async () => {
      const user = userEvent.setup();
      const { container } = render(<TestWrapper onSubmit={vi.fn()} />);

      const newPasswordInput = screen.getByPlaceholderText("请输入新密码");
      expect(newPasswordInput).toHaveAttribute("type", "password");

      const toggleButtons = container.querySelectorAll('button[type="button"]');
      await user.click(toggleButtons[1]);

      expect(newPasswordInput).toHaveAttribute("type", "text");
    });

    it("should toggle confirm password visibility", async () => {
      const user = userEvent.setup();
      const { container } = render(<TestWrapper onSubmit={vi.fn()} />);

      const confirmPasswordInput =
        screen.getByPlaceholderText("请再次输入新密码");
      expect(confirmPasswordInput).toHaveAttribute("type", "password");

      const toggleButtons = container.querySelectorAll('button[type="button"]');
      await user.click(toggleButtons[2]);

      expect(confirmPasswordInput).toHaveAttribute("type", "text");
    });
  });

  describe("Loading State", () => {
    it("should disable inputs and button when loading", () => {
      render(<TestWrapper onSubmit={vi.fn()} isLoading={true} />);

      expect(screen.getByPlaceholderText("请输入当前密码")).toBeDisabled();
      expect(screen.getByPlaceholderText("请输入新密码")).toBeDisabled();
      expect(screen.getByPlaceholderText("请再次输入新密码")).toBeDisabled();
      expect(screen.getByRole("button", { name: "修改中..." })).toBeDisabled();
    });

    it("should show loading text when isLoading is true", () => {
      render(<TestWrapper onSubmit={vi.fn()} isLoading={true} />);

      expect(screen.getByText("修改中...")).toBeInTheDocument();
    });
  });

  describe("Form Submission", () => {
    it("should call onSubmit when form is submitted", async () => {
      const mockOnSubmit = vi.fn(e => e?.preventDefault());
      const user = userEvent.setup();

      render(<TestWrapper onSubmit={mockOnSubmit} />);

      const submitButton = screen.getByRole("button", { name: "修改密码" });
      await user.click(submitButton);

      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "@ukesjtu/nomad-ui/components/primitives/form";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import {
  UserInfoEditForm,
  type UserInfoFormValues,
} from "./user-info-edit-form";

// Wrapper component to provide form context
function TestWrapper({
  onSubmit,
  onCancel,
  defaultValues,
  isLoading = false,
  errorMessage,
  submitLabel,
}: {
  onSubmit: (data: UserInfoFormValues) => void;
  onCancel?: () => void;
  defaultValues?: Partial<UserInfoFormValues>;
  isLoading?: boolean;
  errorMessage?: string;
  submitLabel?: string;
}) {
  const form = useForm<UserInfoFormValues>({
    defaultValues: {
      nickname: defaultValues?.nickname || "",
      name: defaultValues?.name || "",
      gender: defaultValues?.gender || undefined,
      birthday: defaultValues?.birthday || "",
    },
  });

  return (
    <Form {...form}>
      <UserInfoEditForm
        control={form.control}
        errors={form.formState.errors}
        onSubmit={form.handleSubmit(onSubmit)}
        onCancel={onCancel}
        isLoading={isLoading}
        errorMessage={errorMessage}
        submitLabel={submitLabel}
      />
    </Form>
  );
}

describe("UserInfoEditForm Component", () => {
  const mockDefaultValues: UserInfoFormValues = {
    nickname: "小张",
    name: "张三",
    gender: "male",
    birthday: "1990-01-01",
  };

  describe("Rendering", () => {
    it("should render the title", () => {
      const onSubmit = vi.fn();
      render(<TestWrapper onSubmit={onSubmit} />);
      expect(screen.getByText("编辑个人信息")).toBeInTheDocument();
    });

    it("should render all form fields", () => {
      const onSubmit = vi.fn();
      render(<TestWrapper onSubmit={onSubmit} />);
      expect(screen.getByLabelText("昵称")).toBeInTheDocument();
      expect(screen.getByLabelText("姓名")).toBeInTheDocument();
      expect(screen.getByText("性别")).toBeInTheDocument();
      expect(screen.getByLabelText("生日")).toBeInTheDocument();
    });

    it("should render save and cancel buttons", () => {
      const onSubmit = vi.fn();
      render(<TestWrapper onSubmit={onSubmit} />);
      expect(screen.getByRole("button", { name: "保存" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "取消" })).toBeInTheDocument();
    });
  });

  describe("Form Initialization", () => {
    it("should populate form with initial values", () => {
      const onSubmit = vi.fn();
      render(
        <TestWrapper onSubmit={onSubmit} defaultValues={mockDefaultValues} />
      );
      expect(screen.getByDisplayValue("小张")).toBeInTheDocument();
      expect(screen.getByDisplayValue("张三")).toBeInTheDocument();
      expect(screen.getByDisplayValue("1990-01-01")).toBeInTheDocument();
    });

    it("should handle empty initial values", () => {
      const onSubmit = vi.fn();
      render(<TestWrapper onSubmit={onSubmit} />);
      const nicknameInput = screen.getByLabelText("昵称");
      const nameInput = screen.getByLabelText("姓名");
      const birthdayInput = screen.getByLabelText("生日");
      expect(nicknameInput).toHaveValue("");
      expect(nameInput).toHaveValue("");
      expect(birthdayInput).toHaveValue("");
    });
  });

  describe("Gender Selection", () => {
    it("should render all gender options", () => {
      const onSubmit = vi.fn();
      render(<TestWrapper onSubmit={onSubmit} />);
      expect(screen.getByLabelText("男")).toBeInTheDocument();
      expect(screen.getByLabelText("女")).toBeInTheDocument();
      expect(screen.getByLabelText("其他")).toBeInTheDocument();
    });

    it("should pre-select the initial gender", () => {
      const onSubmit = vi.fn();
      render(
        <TestWrapper onSubmit={onSubmit} defaultValues={mockDefaultValues} />
      );
      const maleRadio = screen.getByRole("radio", { name: "男" });
      expect(maleRadio).toBeChecked();
    });
  });

  describe("User Interactions", () => {
    it("should call onCancel when cancel button is clicked", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      const onCancel = vi.fn();
      render(<TestWrapper onSubmit={onSubmit} onCancel={onCancel} />);

      const cancelButton = screen.getByRole("button", { name: "取消" });
      await user.click(cancelButton);

      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it("should allow editing form fields", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(
        <TestWrapper onSubmit={onSubmit} defaultValues={mockDefaultValues} />
      );

      const nicknameInput = screen.getByLabelText("昵称");
      await user.clear(nicknameInput);
      await user.type(nicknameInput, "新昵称");

      expect(nicknameInput).toHaveValue("新昵称");
    });

    it("should allow changing gender selection", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(
        <TestWrapper onSubmit={onSubmit} defaultValues={mockDefaultValues} />
      );

      const femaleRadio = screen.getByRole("radio", { name: "女" });
      await user.click(femaleRadio);

      await waitFor(() => {
        expect(femaleRadio).toBeChecked();
      });
    });
  });

  describe("Form Submission", () => {
    it("should call onSubmit when form is submitted", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(
        <TestWrapper onSubmit={onSubmit} defaultValues={mockDefaultValues} />
      );

      const saveButton = screen.getByRole("button", { name: "保存" });
      await user.click(saveButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled();
      });
    });

    it("should display error message when provided", () => {
      const onSubmit = vi.fn();
      render(
        <TestWrapper onSubmit={onSubmit} errorMessage="更新失败，请重试" />
      );
      expect(screen.getByText("更新失败，请重试")).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("should disable all inputs when loading", () => {
      const onSubmit = vi.fn();
      render(
        <TestWrapper
          onSubmit={onSubmit}
          defaultValues={mockDefaultValues}
          isLoading={true}
        />
      );

      expect(screen.getByLabelText("昵称")).toBeDisabled();
      expect(screen.getByLabelText("姓名")).toBeDisabled();
      expect(screen.getByLabelText("生日")).toBeDisabled();
      expect(screen.getByRole("button", { name: "保存中..." })).toBeDisabled();
      expect(screen.getByRole("button", { name: "取消" })).toBeDisabled();
    });

    it("should show loading text on submit button", () => {
      const onSubmit = vi.fn();
      render(<TestWrapper onSubmit={onSubmit} isLoading={true} />);
      expect(
        screen.getByRole("button", { name: "保存中..." })
      ).toBeInTheDocument();
    });
  });

  describe("Custom Labels", () => {
    it("should use custom submit label when provided", () => {
      const onSubmit = vi.fn();
      render(
        <TestWrapper
          onSubmit={onSubmit}
          defaultValues={mockDefaultValues}
          submitLabel="确认更新"
        />
      );

      expect(
        screen.getByRole("button", { name: "确认更新" })
      ).toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import PassengerForm from "./passenger-form";

describe("PassengerForm Component", () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  it("renders the form with all required fields", () => {
    render(<PassengerForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    // Check for section heading
    expect(screen.getByText("旅客信息")).toBeInTheDocument();

    // Check for name fields
    expect(screen.getByLabelText("中文名")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("LastName(姓)")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("FirstName(名)")).toBeInTheDocument();

    // Check for "Set as Myself" checkbox
    expect(screen.getByLabelText("设置为本人")).toBeInTheDocument();

    // Check for nationality field
    expect(screen.getByLabelText(/国籍/)).toBeInTheDocument();

    // Check for gender field
    expect(screen.getByText("性别")).toBeInTheDocument();

    // Check for date of birth field (label is "生日")
    expect(screen.getByText("生日")).toBeInTheDocument();

    // Check for submit and cancel buttons
    expect(
      screen.getByRole("button", { name: /提交|保存|确认/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /取消/i })).toBeInTheDocument();
  });

  it("handles cancel button click", async () => {
    const user = userEvent.setup();

    render(<PassengerForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const cancelButton = screen.getByRole("button", { name: /取消/i });
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("fills in Chinese name correctly", async () => {
    const user = userEvent.setup();

    render(<PassengerForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const chineseNameInput = screen.getByLabelText("中文名");
    await user.type(chineseNameInput, "张三");

    expect(chineseNameInput).toHaveValue("张三");
  });

  it("fills in English name correctly", async () => {
    const user = userEvent.setup();

    render(<PassengerForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const lastNameInput = screen.getByPlaceholderText("LastName(姓)");
    const firstNameInput = screen.getByPlaceholderText("FirstName(名)");

    await user.type(lastNameInput, "Zhang");
    await user.type(firstNameInput, "San");

    expect(lastNameInput).toHaveValue("Zhang");
    expect(firstNameInput).toHaveValue("San");
  });

  it("toggles 'Set as Myself' checkbox", async () => {
    const user = userEvent.setup();

    render(<PassengerForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const checkbox = screen.getByRole("checkbox", { name: /设置为本人/i });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("loads initial data when provided", () => {
    const initialData = {
      chineseName: "李四",
      englishLastName: "Li",
      englishFirstName: "Si",
      setAsMyself: true,
      nationality: "中国大陆",
      gender: "male" as const,
      documentType: "passport" as const,
      documentNumber: "E12345678",
    };

    render(
      <PassengerForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        initialData={initialData}
      />
    );

    const chineseNameInput = screen.getByLabelText("中文名");
    expect(chineseNameInput).toHaveValue("李四");

    const lastNameInput = screen.getByPlaceholderText("LastName(姓)");
    expect(lastNameInput).toHaveValue("Li");

    const firstNameInput = screen.getByPlaceholderText("FirstName(名)");
    expect(firstNameInput).toHaveValue("Si");

    const checkbox = screen.getByRole("checkbox", { name: /设置为本人/i });
    expect(checkbox).toBeChecked();
  });

  it("disables submit button when form is loading", () => {
    render(
      <PassengerForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={true}
      />
    );

    const submitButton = screen.getByRole("button", {
      name: /提交|保存|确认/i,
    });
    expect(submitButton).toBeDisabled();
  });
});

import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { PassengerForm, type PassengerFormData } from "./passenger-form";

// Mock wrapper component to provide form context
function TestWrapper({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: PassengerFormData) => void;
  onCancel: () => void;
}) {
  const form = useForm<PassengerFormData>({
    defaultValues: {
      name: "",
      documentType: "id_card",
      documentNumber: "",
    },
  });

  return <PassengerForm form={form} onSubmit={onSubmit} onCancel={onCancel} />;
}

describe("PassengerForm", () => {
  it("renders form sections", () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();

    render(<TestWrapper onSubmit={onSubmit} onCancel={onCancel} />);

    expect(screen.getByText("旅客信息")).toBeInTheDocument();
    expect(screen.getByText("证件信息")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();

    render(<TestWrapper onSubmit={onSubmit} onCancel={onCancel} />);

    expect(
      screen.getByPlaceholderText("请输入姓名（中文或英文）")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("中文/英文")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入出生地")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入手机号")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入邮箱地址")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入证件号码")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();

    render(<TestWrapper onSubmit={onSubmit} onCancel={onCancel} />);

    expect(screen.getByRole("button", { name: "保存" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "取消" })).toBeInTheDocument();
  });

  it("shows loading state", () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();
    const form = useForm<PassengerFormData>({
      defaultValues: {
        name: "",
        documentType: "id_card",
        documentNumber: "",
      },
    });

    render(
      <PassengerForm
        form={form}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isLoading={true}
      />
    );

    expect(screen.getByText("保存中...")).toBeInTheDocument();
  });
});

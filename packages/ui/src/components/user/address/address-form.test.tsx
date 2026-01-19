import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { Form } from "../../primitives/form";
import { AddressForm, type AddressFormValues } from "./address-form";

// Mock wrapper component to provide form context
function TestWrapper({
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel,
  initialValues,
}: {
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
  initialValues?: Partial<AddressFormValues>;
}) {
  const form = useForm<AddressFormValues>({
    defaultValues: {
      recipientName: initialValues?.recipientName || "",
      phoneNumber: initialValues?.phoneNumber || "",
      province: initialValues?.province || "",
      city: initialValues?.city || "",
      district: initialValues?.district || "",
      town: initialValues?.town || "",
      detailAddress: initialValues?.detailAddress || "",
      isDefault: initialValues?.isDefault || false,
    },
  });

  return (
    <Form {...form}>
      <AddressForm
        control={form.control}
        errors={form.formState.errors}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isLoading={isLoading}
        submitLabel={submitLabel}
      />
    </Form>
  );
}

describe("AddressForm", () => {
  describe("Rendering", () => {
    it("should render all form fields", () => {
      render(<TestWrapper onSubmit={vi.fn()} />);

      expect(screen.getByLabelText("收件人")).toBeInTheDocument();
      expect(screen.getByLabelText("手机号码")).toBeInTheDocument();
      expect(screen.getByLabelText("省/直辖市")).toBeInTheDocument();
      expect(screen.getByLabelText("城市")).toBeInTheDocument();
      expect(screen.getByLabelText("区/县")).toBeInTheDocument();
      expect(screen.getByLabelText("详细地址")).toBeInTheDocument();
      expect(screen.getByLabelText("设为默认地址")).toBeInTheDocument();
    });

    it("should render input fields with correct placeholders", () => {
      render(<TestWrapper onSubmit={vi.fn()} />);

      expect(screen.getByPlaceholderText("姓名")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("11位手机号")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("省份")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("城市")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("区县")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("街道门牌信息")).toBeInTheDocument();
    });

    it("should render submit button with default label", () => {
      render(<TestWrapper onSubmit={vi.fn()} />);

      expect(screen.getByRole("button", { name: "保存" })).toBeInTheDocument();
    });

    it("should render submit button with custom label", () => {
      render(<TestWrapper onSubmit={vi.fn()} submitLabel="添加地址" />);

      expect(
        screen.getByRole("button", { name: "添加地址" })
      ).toBeInTheDocument();
    });

    it("should render cancel button when onCancel is provided", () => {
      render(<TestWrapper onSubmit={vi.fn()} onCancel={vi.fn()} />);

      expect(screen.getByRole("button", { name: "取消" })).toBeInTheDocument();
    });

    it("should not render cancel button when onCancel is not provided", () => {
      render(<TestWrapper onSubmit={vi.fn()} />);

      expect(
        screen.queryByRole("button", { name: "取消" })
      ).not.toBeInTheDocument();
    });

    it("should render default address checkbox description", () => {
      render(<TestWrapper onSubmit={vi.fn()} />);

      expect(
        screen.getByText("每次购物时会优先使用该地址")
      ).toBeInTheDocument();
    });
  });

  describe("Initial Values", () => {
    it("should populate fields with initial values", () => {
      const initialValues: AddressFormValues = {
        recipientName: "张三",
        phoneNumber: "13800138000",
        province: "北京市",
        city: "北京市",
        district: "朝阳区",
        town: "望京街道",
        detailAddress: "望京街道100号",
        isDefault: true,
      };

      render(<TestWrapper onSubmit={vi.fn()} initialValues={initialValues} />);

      expect(screen.getByDisplayValue("张三")).toBeInTheDocument();
      expect(screen.getByDisplayValue("13800138000")).toBeInTheDocument();
      expect(screen.getAllByDisplayValue("北京市")).toHaveLength(2); // province and city
      expect(screen.getByDisplayValue("朝阳区")).toBeInTheDocument();
      expect(screen.getByDisplayValue("望京街道100号")).toBeInTheDocument();
      expect(screen.getByRole("checkbox")).toBeChecked();
    });
  });

  describe("User Interaction", () => {
    it("should allow typing in recipient name field", async () => {
      const user = userEvent.setup();
      render(<TestWrapper onSubmit={vi.fn()} />);

      const input = screen.getByPlaceholderText("姓名");
      await user.type(input, "李四");

      expect(input).toHaveValue("李四");
    });

    it("should allow typing in phone number field", async () => {
      const user = userEvent.setup();
      render(<TestWrapper onSubmit={vi.fn()} />);

      const input = screen.getByPlaceholderText("11位手机号");
      await user.type(input, "13900139000");

      expect(input).toHaveValue("13900139000");
    });

    it("should allow typing in address fields", async () => {
      const user = userEvent.setup();
      render(<TestWrapper onSubmit={vi.fn()} />);

      await user.type(screen.getByPlaceholderText("省份"), "上海市");
      await user.type(screen.getByPlaceholderText("城市"), "上海市");
      await user.type(screen.getByPlaceholderText("区县"), "浦东新区");
      await user.type(
        screen.getByPlaceholderText("街道门牌信息"),
        "世纪大道1号"
      );

      expect(screen.getAllByDisplayValue("上海市")).toHaveLength(2);
      expect(screen.getByDisplayValue("浦东新区")).toBeInTheDocument();
      expect(screen.getByDisplayValue("世纪大道1号")).toBeInTheDocument();
    });

    it("should toggle default address checkbox", async () => {
      const user = userEvent.setup();
      render(<TestWrapper onSubmit={vi.fn()} />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it("should call onCancel when cancel button is clicked", async () => {
      const user = userEvent.setup();
      const onCancel = vi.fn();
      render(<TestWrapper onSubmit={vi.fn()} onCancel={onCancel} />);

      await user.click(screen.getByRole("button", { name: "取消" }));

      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it("should call onSubmit when form is submitted", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<TestWrapper onSubmit={onSubmit} />);

      await user.type(screen.getByPlaceholderText("姓名"), "王五");
      await user.type(screen.getByPlaceholderText("11位手机号"), "13700137000");
      await user.type(screen.getByPlaceholderText("省份"), "广东省");
      await user.type(screen.getByPlaceholderText("城市"), "广州市");
      await user.type(screen.getByPlaceholderText("区县"), "天河区");
      await user.type(screen.getByPlaceholderText("街道门牌信息"), "天河路1号");

      await user.click(screen.getByRole("button", { name: "保存" }));

      expect(onSubmit).toHaveBeenCalled();
    });
  });

  describe("Loading State", () => {
    it("should disable all inputs when loading", () => {
      render(<TestWrapper onSubmit={vi.fn()} isLoading={true} />);

      expect(screen.getByPlaceholderText("姓名")).toBeDisabled();
      expect(screen.getByPlaceholderText("11位手机号")).toBeDisabled();
      expect(screen.getByPlaceholderText("省份")).toBeDisabled();
      expect(screen.getByPlaceholderText("城市")).toBeDisabled();
      expect(screen.getByPlaceholderText("区县")).toBeDisabled();
      expect(screen.getByPlaceholderText("街道门牌信息")).toBeDisabled();
      expect(screen.getByRole("checkbox")).toBeDisabled();
    });

    it("should disable submit button when loading", () => {
      render(<TestWrapper onSubmit={vi.fn()} isLoading={true} />);

      expect(screen.getByRole("button", { name: /保存/ })).toBeDisabled();
    });

    it("should disable cancel button when loading", () => {
      render(
        <TestWrapper onSubmit={vi.fn()} onCancel={vi.fn()} isLoading={true} />
      );

      expect(screen.getByRole("button", { name: "取消" })).toBeDisabled();
    });

    it("should show loading spinner when loading", () => {
      render(<TestWrapper onSubmit={vi.fn()} isLoading={true} />);

      // The Loader2 icon is rendered when loading
      const submitButton = screen.getByRole("button", { name: /保存/ });
      expect(submitButton.querySelector("svg")).toBeInTheDocument();
    });
  });
});

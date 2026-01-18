import {
  PassengerForm,
  type PassengerFormData,
} from "@nomad/ui/components/passengers";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useForm } from "react-hook-form";

// Wrapper component to provide form context
function PassengerFormWrapper(props: {
  onSubmit: (data: PassengerFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<PassengerFormData>;
}) {
  const form = useForm<PassengerFormData>({
    defaultValues: {
      name: props.initialData?.name ?? "",
      nationality: props.initialData?.nationality ?? "",
      gender: props.initialData?.gender,
      dateOfBirth: props.initialData?.dateOfBirth,
      placeOfBirth: props.initialData?.placeOfBirth ?? "",
      phone: props.initialData?.phone ?? "",
      email: props.initialData?.email ?? "",
      documentType: props.initialData?.documentType ?? "id_card",
      documentNumber: props.initialData?.documentNumber ?? "",
      documentExpiryDate: props.initialData?.documentExpiryDate,
    },
  });

  return (
    <PassengerForm
      form={form}
      onSubmit={props.onSubmit}
      onCancel={props.onCancel}
      isLoading={props.isLoading}
    />
  );
}

const meta = {
  title: "Passengers/PassengerForm",
  component: PassengerFormWrapper,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    onSubmit: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof PassengerFormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    isLoading: false,
  },
};

export const WithInitialData: Story = {
  args: {
    isLoading: false,
    initialData: {
      name: "张三",
      nationality: "中国",
      gender: "male",
      dateOfBirth: new Date("1990-01-01"),
      placeOfBirth: "北京",
      phone: "13800138000",
      email: "zhangsan@example.com",
      documentType: "id_card",
      documentNumber: "110101199001011234",
      documentExpiryDate: new Date("2030-12-31"),
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    initialData: {
      name: "李四",
      documentType: "passport",
      documentNumber: "E12345678",
    },
  },
};

export const PassportDocument: Story = {
  args: {
    isLoading: false,
    initialData: {
      name: "John Doe",
      nationality: "USA",
      gender: "male",
      documentType: "passport",
      documentNumber: "AB1234567",
    },
  },
};

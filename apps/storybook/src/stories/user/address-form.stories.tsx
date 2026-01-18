import { Form } from "@nomad/ui/components/primitives/form";
import { AddressForm } from "@nomad/ui/components/user/address";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { fn } from "storybook/test";

const meta = {
  title: "User/AddressForm",
  component: AddressForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AddressForm>;

export default meta;
type Story = StoryObj<typeof meta>;

function AddressFormWrapper(
  props: Partial<React.ComponentProps<typeof AddressForm>>
) {
  const form = useForm({
    defaultValues: {
      recipientName: "",
      phoneNumber: "",
      province: "",
      city: "",
      district: "",
      town: "",
      detailAddress: "",
      isDefault: false,
    },
  });

  return (
    <Form {...form}>
      <AddressForm
        control={form.control}
        errors={form.formState.errors}
        onSubmit={fn()}
        onCancel={fn()}
        isLoading={false}
        {...props}
      />
    </Form>
  );
}

export const Default: Story = {
  render: () => <AddressFormWrapper />,
};

export const WithData: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        recipientName: "张三",
        phoneNumber: "13800138000",
        province: "北京市",
        city: "北京市",
        district: "朝阳区",
        town: "",
        detailAddress: "望京街道100号",
        isDefault: true,
      },
    });

    return (
      <Form {...form}>
        <AddressForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          onCancel={fn()}
          isLoading={false}
        />
      </Form>
    );
  },
};

export const Loading: Story = {
  render: () => <AddressFormWrapper isLoading={true} />,
};

export const WithErrors: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        recipientName: "",
        phoneNumber: "123",
        province: "",
        city: "",
        district: "",
        town: "",
        detailAddress: "",
        isDefault: false,
      },
    });

    // Trigger validation
    form.trigger();

    return (
      <Form {...form}>
        <AddressForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          onCancel={fn()}
          isLoading={false}
        />
      </Form>
    );
  },
};

export const WithoutCancelButton: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        recipientName: "",
        phoneNumber: "",
        province: "",
        city: "",
        district: "",
        town: "",
        detailAddress: "",
        isDefault: false,
      },
    });

    return (
      <Form {...form}>
        <AddressForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          isLoading={false}
          submitLabel="添加地址"
        />
      </Form>
    );
  },
};

import { Form } from "@nomad/ui/components/primitives/form";
import { UpdatePhoneForm } from "@nomad/ui/components/security";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { fn } from "storybook/test";

const meta = {
  title: "Security/UpdatePhoneForm",
  component: UpdatePhoneForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UpdatePhoneForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BindMode: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        phoneNumber: "",
        otp: "",
      },
    });

    const phoneNumber = form.watch("phoneNumber");

    return (
      <Form {...form}>
        <UpdatePhoneForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          onSendOtp={fn()}
          phoneNumberValue={phoneNumber}
          mode="bind"
          countdown={0}
          hasSent={false}
        />
      </Form>
    );
  },
};

export const VerifyMode: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        phoneNumber: "13800138000",
        otp: "",
      },
    });

    const phoneNumber = form.watch("phoneNumber");

    return (
      <Form {...form}>
        <UpdatePhoneForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          onSendOtp={fn()}
          currentPhoneNumber="13800138000"
          phoneNumberValue={phoneNumber}
          mode="verify"
          countdown={0}
          hasSent={false}
        />
      </Form>
    );
  },
};

export const UpdateMode: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        phoneNumber: "",
        otp: "",
      },
    });

    const phoneNumber = form.watch("phoneNumber");

    return (
      <Form {...form}>
        <UpdatePhoneForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          onSendOtp={fn()}
          currentPhoneNumber="13800138000"
          phoneNumberValue={phoneNumber}
          mode="update"
          countdown={0}
          hasSent={false}
        />
      </Form>
    );
  },
};

export const WithCountdown: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        phoneNumber: "13912345678",
        otp: "",
      },
    });

    const phoneNumber = form.watch("phoneNumber");

    return (
      <Form {...form}>
        <UpdatePhoneForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          onSendOtp={fn()}
          phoneNumberValue={phoneNumber}
          mode="bind"
          countdown={45}
          hasSent={true}
        />
      </Form>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        phoneNumber: "13912345678",
        otp: "123456",
      },
    });

    const phoneNumber = form.watch("phoneNumber");

    return (
      <Form {...form}>
        <UpdatePhoneForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          onSendOtp={fn()}
          phoneNumberValue={phoneNumber}
          mode="bind"
          isLoading={true}
          countdown={0}
          hasSent={false}
        />
      </Form>
    );
  },
};

export const Verifying: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        phoneNumber: "13912345678",
        otp: "",
      },
    });

    const phoneNumber = form.watch("phoneNumber");

    return (
      <Form {...form}>
        <UpdatePhoneForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          onSendOtp={fn()}
          phoneNumberValue={phoneNumber}
          mode="bind"
          isVerifying={true}
          countdown={0}
          hasSent={false}
        />
      </Form>
    );
  },
};

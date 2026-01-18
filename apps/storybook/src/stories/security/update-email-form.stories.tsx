import { Form } from "@nomad/ui/components/primitives/form";
import { UpdateEmailForm } from "@nomad/ui/components/security";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { fn } from "storybook/test";

const meta = {
  title: "Security/UpdateEmailForm",
  component: UpdateEmailForm,
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
} satisfies Meta<typeof UpdateEmailForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BindMode: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        email: "",
        otp: "",
      },
    });

    const email = form.watch("email");

    return (
      <Form {...form}>
        <UpdateEmailForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          onSendOtp={fn()}
          emailValue={email}
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
        email: "user@example.com",
        otp: "",
      },
    });

    const email = form.watch("email");

    return (
      <Form {...form}>
        <UpdateEmailForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          onSendOtp={fn()}
          currentEmail="user@example.com"
          emailValue={email}
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
        email: "",
        otp: "",
      },
    });

    const email = form.watch("email");

    return (
      <Form {...form}>
        <UpdateEmailForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          onSendOtp={fn()}
          currentEmail="old@example.com"
          emailValue={email}
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
        email: "test@example.com",
        otp: "",
      },
    });

    const email = form.watch("email");

    return (
      <Form {...form}>
        <UpdateEmailForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          onSendOtp={fn()}
          emailValue={email}
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
        email: "test@example.com",
        otp: "123456",
      },
    });

    const email = form.watch("email");

    return (
      <Form {...form}>
        <UpdateEmailForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          onSendOtp={fn()}
          emailValue={email}
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
        email: "test@example.com",
        otp: "",
      },
    });

    const email = form.watch("email");

    return (
      <Form {...form}>
        <UpdateEmailForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          onSendOtp={fn()}
          emailValue={email}
          mode="bind"
          isVerifying={true}
          countdown={0}
          hasSent={false}
        />
      </Form>
    );
  },
};

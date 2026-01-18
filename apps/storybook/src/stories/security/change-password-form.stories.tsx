import { Form } from "@nomad/ui/components/primitives/form";
import { ChangePasswordForm } from "@nomad/ui/components/security";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { fn } from "storybook/test";

const meta = {
  title: "Security/ChangePasswordForm",
  component: ChangePasswordForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChangePasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

function ChangePasswordFormWrapper(
  props: Partial<React.ComponentProps<typeof ChangePasswordForm>>
) {
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = form.watch("newPassword");

  return (
    <Form {...form}>
      <ChangePasswordForm
        control={form.control}
        errors={form.formState.errors}
        onSubmit={fn()}
        newPasswordValue={newPassword}
        isLoading={false}
        {...props}
      />
    </Form>
  );
}

export const Default: Story = {
  render: () => <ChangePasswordFormWrapper />,
};

export const WithPassword: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        currentPassword: "oldPassword123",
        newPassword: "NewPass123",
        confirmPassword: "NewPass123",
      },
    });

    const newPassword = form.watch("newPassword");

    return (
      <Form {...form}>
        <ChangePasswordForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          newPasswordValue={newPassword}
          isLoading={false}
        />
      </Form>
    );
  },
};

export const Loading: Story = {
  render: () => <ChangePasswordFormWrapper isLoading={true} />,
};

export const WithWeakPassword: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        currentPassword: "",
        newPassword: "weak",
        confirmPassword: "",
      },
    });

    const newPassword = form.watch("newPassword");

    return (
      <Form {...form}>
        <ChangePasswordForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          newPasswordValue={newPassword}
          isLoading={false}
        />
      </Form>
    );
  },
};

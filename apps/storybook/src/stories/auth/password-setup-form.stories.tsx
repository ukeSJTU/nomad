import { PasswordSetupForm } from "@nomad/ui/components/auth";
import { Form } from "@nomad/ui/components/primitives/form";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { fn } from "storybook/test";
import zxcvbn from "zxcvbn";

const meta = {
  title: "Auth/PasswordSetupForm",
  component: PasswordSetupForm,
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
} satisfies Meta<typeof PasswordSetupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

function PasswordSetupFormWrapper(
  props: Partial<React.ComponentProps<typeof PasswordSetupForm>>
) {
  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");
  const strengthScore = zxcvbn(password).score;

  return (
    <Form {...form}>
      <PasswordSetupForm
        control={form.control}
        errors={form.formState.errors}
        onSubmit={fn()}
        passwordValue={password}
        strengthScore={strengthScore}
        isLoading={false}
        {...props}
      />
    </Form>
  );
}

export const Default: Story = {
  render: () => <PasswordSetupFormWrapper />,
};

export const WithMaskedIdentifier: Story = {
  render: () => <PasswordSetupFormWrapper maskedIdentifier="138****5678" />,
};

export const WithPassword: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        password: "Password123",
        confirmPassword: "Password123",
      },
    });

    const password = form.watch("password");
    const strengthScore = zxcvbn(password).score;

    return (
      <Form {...form}>
        <PasswordSetupForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          passwordValue={password}
          strengthScore={strengthScore}
          isLoading={false}
        />
      </Form>
    );
  },
};

export const Loading: Story = {
  render: () => <PasswordSetupFormWrapper isLoading={true} />,
};

export const WithWeakPassword: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        password: "weak",
        confirmPassword: "",
      },
    });

    const password = form.watch("password");
    const strengthScore = zxcvbn(password).score;

    return (
      <Form {...form}>
        <PasswordSetupForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          passwordValue={password}
          strengthScore={strengthScore}
          isLoading={false}
        />
      </Form>
    );
  },
};

export const WithMediumPassword: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        password: "Tiger@0177",
        confirmPassword: "",
      },
    });

    const password = form.watch("password");
    const strengthScore = zxcvbn(password).score;

    return (
      <Form {...form}>
        <PasswordSetupForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          passwordValue={password}
          strengthScore={strengthScore}
          isLoading={false}
        />
      </Form>
    );
  },
};

export const WithStrongPassword: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        password: "zxcftzuio!@#",
        confirmPassword: "",
      },
    });

    const password = form.watch("password");
    const strengthScore = zxcvbn(password).score;

    return (
      <Form {...form}>
        <PasswordSetupForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={fn()}
          passwordValue={password}
          strengthScore={strengthScore}
          isLoading={false}
        />
      </Form>
    );
  },
};

export const WithCustomSubmitButtonText: Story = {
  render: () => <PasswordSetupFormWrapper submitButtonText="设置密码" />,
};

export const WithoutHelpLink: Story = {
  render: () => <PasswordSetupFormWrapper showHelpLink={false} />,
};

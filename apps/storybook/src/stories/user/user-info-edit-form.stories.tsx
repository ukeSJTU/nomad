import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "@ukesjtu/nomad-ui/components/primitives/form";
import { UserInfoEditForm } from "@ukesjtu/nomad-ui/components/user";
import { useForm } from "react-hook-form";
import { fn } from "storybook/test";

const meta = {
  title: "User/UserInfoEditForm",
  component: UserInfoEditForm,
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
} satisfies Meta<typeof UserInfoEditForm>;

export default meta;
type Story = StoryObj<typeof meta>;

function UserInfoEditFormWrapper(
  props: Partial<React.ComponentProps<typeof UserInfoEditForm>>
) {
  const form = useForm({
    defaultValues: {
      nickname: "",
      name: "",
      gender: undefined,
      birthday: "",
    },
  });

  return (
    <Form {...form}>
      <UserInfoEditForm
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
  render: () => <UserInfoEditFormWrapper />,
};

export const WithData: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        nickname: "小张",
        name: "张三",
        gender: "male" as const,
        birthday: "1990-01-01",
      },
    });

    return (
      <Form {...form}>
        <UserInfoEditForm
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

export const WithFemaleGender: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        nickname: "小李",
        name: "李四",
        gender: "female" as const,
        birthday: "1995-06-15",
      },
    });

    return (
      <Form {...form}>
        <UserInfoEditForm
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

export const WithOtherGender: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        nickname: "小王",
        name: "王五",
        gender: "other" as const,
        birthday: "2000-12-31",
      },
    });

    return (
      <Form {...form}>
        <UserInfoEditForm
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
  render: () => <UserInfoEditFormWrapper isLoading={true} />,
};

export const WithError: Story = {
  render: () => <UserInfoEditFormWrapper errorMessage="更新失败，请稍后重试" />,
};

export const WithCustomSubmitLabel: Story = {
  render: () => <UserInfoEditFormWrapper submitLabel="确认更新" />,
};

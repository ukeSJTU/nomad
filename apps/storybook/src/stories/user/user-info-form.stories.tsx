import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "@ukesjtu/nomad-ui/components/primitives/form";
import {
  UserInfoEditForm,
  UserInfoForm,
} from "@ukesjtu/nomad-ui/components/user";
import { useForm } from "react-hook-form";
import { fn } from "storybook/test";

const meta = {
  title: "User/UserInfoForm",
  component: UserInfoForm,
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
} satisfies Meta<typeof UserInfoForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DisplayMode: Story = {
  args: {
    userData: {
      nickname: "小张",
      name: "张三",
      gender: "male",
      birthday: "1990-01-01",
    },
    editFormSlot: <div>Edit Form Placeholder</div>,
    onEditStart: fn(),
    onEditCancel: fn(),
    onEditSuccess: fn(),
    showSuccessDialog: false,
    isEditMode: false,
  },
};

export const EditMode: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        nickname: "小张",
        name: "张三",
        gender: "male" as const,
        birthday: "1990-01-01",
      },
    });

    const editFormSlot = (
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

    return (
      <UserInfoForm
        userData={{
          nickname: "小张",
          name: "张三",
          gender: "male",
          birthday: "1990-01-01",
        }}
        editFormSlot={editFormSlot}
        onEditStart={fn()}
        onEditCancel={fn()}
        onEditSuccess={fn()}
        showSuccessDialog={false}
        isEditMode={true}
      />
    );
  },
};

export const WithSuccessDialog: Story = {
  args: {
    userData: {
      nickname: "小张",
      name: "张三",
      gender: "male",
      birthday: "1990-01-01",
    },
    editFormSlot: <div>Edit Form Placeholder</div>,
    onEditStart: fn(),
    onEditCancel: fn(),
    onEditSuccess: fn(),
    showSuccessDialog: true,
    isEditMode: false,
  },
};

export const WithoutOptionalFields: Story = {
  args: {
    userData: {
      name: "李四",
      nickname: null,
      gender: null,
      birthday: null,
    },
    editFormSlot: <div>Edit Form Placeholder</div>,
    onEditStart: fn(),
    onEditCancel: fn(),
    onEditSuccess: fn(),
    showSuccessDialog: false,
    isEditMode: false,
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const meta = {
  title: "Forms/Field",
  component: Field,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Field>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

// Basic vertical field
export const VerticalField: Story = {
  render: () => (
    <Field orientation="vertical" className="w-[400px]">
      <FieldLabel htmlFor="name">姓名</FieldLabel>
      <FieldContent>
        <Input id="name" placeholder="请输入姓名" />
        <FieldDescription>请输入您的真实姓名</FieldDescription>
      </FieldContent>
    </Field>
  ),
};

// Horizontal field
export const HorizontalField: Story = {
  render: () => (
    <Field orientation="horizontal" className="w-[600px]">
      <FieldLabel htmlFor="email">邮箱地址</FieldLabel>
      <FieldContent>
        <Input id="email" type="email" placeholder="请输入邮箱" />
        <FieldDescription>我们会向此邮箱发送验证码</FieldDescription>
      </FieldContent>
    </Field>
  ),
};

// Responsive field
export const ResponsiveField: Story = {
  render: () => (
    <FieldGroup>
      <Field orientation="responsive" className="w-[600px]">
        <FieldLabel htmlFor="username">用户名</FieldLabel>
        <FieldContent>
          <Input id="username" placeholder="请输入用户名" />
          <FieldDescription>
            用户名将用于登录，只能包含字母、数字和下划线
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

// Field with error
export const WithError: Story = {
  render: () => (
    <Field orientation="vertical" className="w-[400px]" data-invalid={true}>
      <FieldLabel htmlFor="password">密码</FieldLabel>
      <FieldContent>
        <Input
          id="password"
          type="password"
          placeholder="请输入密码"
          aria-invalid={true}
        />
        <FieldError>密码至少需要 8 个字符</FieldError>
      </FieldContent>
    </Field>
  ),
};

// Field with multiple errors
export const WithMultipleErrors: Story = {
  render: () => (
    <Field orientation="vertical" className="w-[400px]" data-invalid={true}>
      <FieldLabel htmlFor="password2">密码</FieldLabel>
      <FieldContent>
        <Input
          id="password2"
          type="password"
          placeholder="请输入密码"
          aria-invalid={true}
        />
        <FieldError
          errors={[
            { message: "密码至少需要 8 个字符" },
            { message: "密码必须包含至少一个大写字母" },
            { message: "密码必须包含至少一个数字" },
          ]}
        />
      </FieldContent>
    </Field>
  ),
};

// FieldGroup with multiple fields
export const FieldGroupExample: Story = {
  render: () => (
    <FieldGroup className="w-[500px]">
      <Field orientation="vertical">
        <FieldLabel htmlFor="first-name">名</FieldLabel>
        <Input id="first-name" placeholder="请输入名" />
      </Field>

      <Field orientation="vertical">
        <FieldLabel htmlFor="last-name">姓</FieldLabel>
        <Input id="last-name" placeholder="请输入姓" />
      </Field>

      <Field orientation="vertical">
        <FieldLabel htmlFor="email-group">邮箱</FieldLabel>
        <FieldContent>
          <Input id="email-group" type="email" placeholder="请输入邮箱" />
          <FieldDescription>我们不会分享您的邮箱地址</FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

// FieldSet with legend
export const FieldSetExample: Story = {
  render: () => (
    <FieldSet className="w-[500px]">
      <FieldLegend>个人信息</FieldLegend>

      <Field orientation="vertical">
        <FieldLabel htmlFor="fullname">全名</FieldLabel>
        <Input id="fullname" placeholder="请输入全名" />
      </Field>

      <Field orientation="vertical">
        <FieldLabel htmlFor="phone">电话</FieldLabel>
        <Input id="phone" type="tel" placeholder="请输入电话号码" />
      </Field>
    </FieldSet>
  ),
};

// Field with separator
export const WithSeparator: Story = {
  render: () => (
    <FieldGroup className="w-[500px]">
      <Field orientation="vertical">
        <FieldLabel htmlFor="account-name">账户名称</FieldLabel>
        <Input id="account-name" placeholder="请输入账户名称" />
      </Field>

      <FieldSeparator>账户设置</FieldSeparator>

      <Field orientation="vertical">
        <FieldLabel htmlFor="account-email">账户邮箱</FieldLabel>
        <Input id="account-email" type="email" placeholder="请输入邮箱" />
      </Field>

      <Field orientation="vertical">
        <FieldLabel htmlFor="account-phone">账户电话</FieldLabel>
        <Input id="account-phone" type="tel" placeholder="请输入电话" />
      </Field>
    </FieldGroup>
  ),
};

// Field with checkbox
export const WithCheckbox: Story = {
  render: () => (
    <Field orientation="horizontal" className="w-[500px]">
      <Checkbox id="terms" />
      <FieldContent>
        <FieldLabel htmlFor="terms">同意条款和条件</FieldLabel>
        <FieldDescription>您必须同意我们的条款和条件才能继续</FieldDescription>
      </FieldContent>
    </Field>
  ),
};

// Field with radio group
export const WithRadioGroup: Story = {
  render: () => (
    <FieldSet className="w-[500px]">
      <FieldLegend variant="label">选择通知方式</FieldLegend>
      <FieldDescription>选择您希望接收通知的方式</FieldDescription>

      <RadioGroup defaultValue="email">
        <Field orientation="horizontal">
          <RadioGroupItem value="email" id="notify-email" />
          <FieldContent>
            <FieldLabel htmlFor="notify-email">邮箱</FieldLabel>
            <FieldDescription>通过邮箱接收通知</FieldDescription>
          </FieldContent>
        </Field>

        <Field orientation="horizontal">
          <RadioGroupItem value="sms" id="notify-sms" />
          <FieldContent>
            <FieldLabel htmlFor="notify-sms">短信</FieldLabel>
            <FieldDescription>通过短信接收通知</FieldDescription>
          </FieldContent>
        </Field>

        <Field orientation="horizontal">
          <RadioGroupItem value="push" id="notify-push" />
          <FieldContent>
            <FieldLabel htmlFor="notify-push">推送通知</FieldLabel>
            <FieldDescription>通过应用推送接收通知</FieldDescription>
          </FieldContent>
        </Field>
      </RadioGroup>
    </FieldSet>
  ),
};

// Field with FieldTitle
export const WithFieldTitle: Story = {
  render: () => (
    <Field orientation="vertical" className="w-[400px]">
      <FieldTitle>账户设置</FieldTitle>
      <FieldContent>
        <Input placeholder="请输入设置值" />
        <FieldDescription>配置您的账户设置</FieldDescription>
      </FieldContent>
    </Field>
  ),
};

// Disabled field
export const DisabledField: Story = {
  render: () => (
    <Field orientation="vertical" className="w-[400px]" data-disabled={true}>
      <FieldLabel htmlFor="disabled-input">禁用字段</FieldLabel>
      <FieldContent>
        <Input id="disabled-input" placeholder="此字段已禁用" disabled />
        <FieldDescription>此字段当前不可编辑</FieldDescription>
      </FieldContent>
    </Field>
  ),
};

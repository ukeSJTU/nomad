import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  type ContactInfo,
  ContactInfoCard,
  type ContactInfoValidationErrors,
} from "@ukesjtu/nomad-ui/components/flights/booking";
import { useState } from "react";

const meta: Meta<typeof ContactInfoCard> = {
  title: "Flights/Booking/ContactInfoCard",
  component: ContactInfoCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContactInfoCard>;

/**
 * Wrapper component to handle state in Storybook
 */
function ContactInfoCardWrapper({
  initialValue,
  errors,
}: {
  initialValue: ContactInfo;
  errors?: ContactInfoValidationErrors;
}) {
  const [value, setValue] = useState<ContactInfo>(initialValue);

  return <ContactInfoCard value={value} onChange={setValue} errors={errors} />;
}

/**
 * Default state with email selected
 */
export const Default: Story = {
  render: () => (
    <ContactInfoCardWrapper
      initialValue={{
        method: "email",
        email: "",
        phone: "",
      }}
    />
  ),
};

/**
 * Email method selected with filled data
 */
export const EmailFilled: Story = {
  render: () => (
    <ContactInfoCardWrapper
      initialValue={{
        method: "email",
        email: "zhangsan@example.com",
        phone: "",
      }}
    />
  ),
};

/**
 * Phone method selected
 */
export const PhoneSelected: Story = {
  render: () => (
    <ContactInfoCardWrapper
      initialValue={{
        method: "phone",
        email: "",
        phone: "",
      }}
    />
  ),
};

/**
 * Phone method with filled data
 */
export const PhoneFilled: Story = {
  render: () => (
    <ContactInfoCardWrapper
      initialValue={{
        method: "phone",
        email: "",
        phone: "13800138000",
      }}
    />
  ),
};

/**
 * Email method with validation errors
 */
export const EmailWithErrors: Story = {
  render: () => (
    <ContactInfoCardWrapper
      initialValue={{
        method: "email",
        email: "invalid-email",
        phone: "",
      }}
      errors={{
        email: "请输入有效的邮箱地址",
      }}
    />
  ),
};

/**
 * Phone method with validation errors
 */
export const PhoneWithErrors: Story = {
  render: () => (
    <ContactInfoCardWrapper
      initialValue={{
        method: "phone",
        email: "",
        phone: "123",
      }}
      errors={{
        phone: "请输入有效的手机号码",
      }}
    />
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import {
  type SignupMethod,
  UnifiedSignupForm,
  type VerificationFormData,
} from "@ukesjtu/nomad-ui/components/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fn } from "storybook/test";

const meta = {
  title: "Auth/UnifiedSignupForm",
  component: UnifiedSignupForm,
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
} satisfies Meta<typeof UnifiedSignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

function UnifiedSignupFormWrapper(
  props: Partial<React.ComponentProps<typeof UnifiedSignupForm>> & {
    initialMethod?: SignupMethod;
  }
) {
  const { initialMethod = "phone", ...restProps } = props;
  const [method, setMethod] = useState<SignupMethod>(initialMethod);

  const phoneForm = useForm<VerificationFormData>({
    defaultValues: {
      contact: "",
      otp: "",
      agreedToTerms: false,
    },
  });

  const emailForm = useForm<VerificationFormData>({
    defaultValues: {
      contact: "",
      otp: "",
      agreedToTerms: false,
    },
  });

  return (
    <UnifiedSignupForm
      method={method}
      onMethodChange={setMethod}
      phoneForm={phoneForm}
      onPhoneSubmit={fn()}
      onSendPhoneOtp={fn()}
      phoneCountdown={0}
      emailForm={emailForm}
      onEmailSubmit={fn()}
      onSendEmailOtp={fn()}
      emailCountdown={0}
      onTermsClick={fn()}
      onPrivacyClick={fn()}
      onEnterpriseClick={fn()}
      {...restProps}
    />
  );
}

export const Default: Story = {
  render: () => <UnifiedSignupFormWrapper />,
};

export const PhoneMode: Story = {
  render: () => <UnifiedSignupFormWrapper initialMethod="phone" />,
};

export const EmailMode: Story = {
  render: () => <UnifiedSignupFormWrapper initialMethod="email" />,
};

export const Loading: Story = {
  render: () => <UnifiedSignupFormWrapper isLoading={true} />,
};

export const PhoneModeWithCountdown: Story = {
  render: () => (
    <UnifiedSignupFormWrapper initialMethod="phone" phoneCountdown={45} />
  ),
};

export const EmailModeWithCountdown: Story = {
  render: () => (
    <UnifiedSignupFormWrapper initialMethod="email" emailCountdown={30} />
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import {
  type LoginMethod,
  type OtpLoginFormData,
  type PasswordLoginFormData,
  UnifiedLoginForm,
} from "@ukesjtu/nomad-ui/components/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fn } from "storybook/test";

const meta = {
  title: "Auth/UnifiedLoginForm",
  component: UnifiedLoginForm,
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
} satisfies Meta<typeof UnifiedLoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

function UnifiedLoginFormWrapper(
  props: Partial<React.ComponentProps<typeof UnifiedLoginForm>> & {
    initialMethod?: LoginMethod;
  }
) {
  const { initialMethod = "password", ...restProps } = props;
  const [loginMethod, setLoginMethod] = useState<LoginMethod>(initialMethod);

  const passwordForm = useForm<PasswordLoginFormData>({
    defaultValues: {
      account: "",
      password: "",
      agreedToTerms: false,
    },
  });

  const otpForm = useForm<OtpLoginFormData>({
    defaultValues: {
      account: "",
      otp: "",
      agreedToTerms: false,
    },
  });

  return (
    <UnifiedLoginForm
      loginMethod={loginMethod}
      onLoginMethodChange={setLoginMethod}
      passwordForm={passwordForm}
      otpForm={otpForm}
      onPasswordSubmit={fn()}
      onOtpSubmit={fn()}
      onSendOtp={fn()}
      countdown={0}
      onForgotPasswordClick={fn()}
      onRegisterClick={fn()}
      onTermsClick={fn()}
      onPrivacyClick={fn()}
      onGithubLoginClick={fn()}
      {...restProps}
    />
  );
}

export const Default: Story = {
  render: () => <UnifiedLoginFormWrapper />,
};

export const PasswordMode: Story = {
  render: () => <UnifiedLoginFormWrapper initialMethod="password" />,
};

export const OtpMode: Story = {
  render: () => <UnifiedLoginFormWrapper initialMethod="otp" />,
};

export const Loading: Story = {
  render: () => <UnifiedLoginFormWrapper isLoading={true} />,
};

export const WithError: Story = {
  render: () => (
    <UnifiedLoginFormWrapper currentError="请输入正确的手机号或邮箱格式" />
  ),
};

export const WithTermsTooltip: Story = {
  render: () => <UnifiedLoginFormWrapper showTermsTooltip={true} />,
};

export const OtpModeWithCountdown: Story = {
  render: () => <UnifiedLoginFormWrapper initialMethod="otp" countdown={45} />,
};

export const OtpModeVerifying: Story = {
  render: () => (
    <UnifiedLoginFormWrapper initialMethod="otp" isVerifying={true} />
  ),
};

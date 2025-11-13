import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// Wrapper component for controlled OTP input
function OTPExample({
  maxLength = 6,
  withSeparator = false,
  disabled = false,
  pattern,
}: {
  maxLength?: number;
  withSeparator?: boolean;
  disabled?: boolean;
  pattern?: string;
}) {
  const [value, setValue] = useState("");

  const slots = Array.from({ length: maxLength }, (_, i) => i);
  const midPoint = Math.floor(maxLength / 2);

  return (
    <div className="space-y-4">
      <InputOTP
        maxLength={maxLength}
        value={value}
        onChange={setValue}
        disabled={disabled}
        pattern={pattern}
      >
        {withSeparator ? (
          <>
            <InputOTPGroup>
              {slots.slice(0, midPoint).map(index => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {slots.slice(midPoint).map(index => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </>
        ) : (
          <InputOTPGroup>
            {slots.map(index => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        )}
      </InputOTP>
      <div className="text-center text-sm text-muted-foreground">
        当前值: {value || "(空)"}
      </div>
    </div>
  );
}

// Wrapper with error state
function OTPWithError() {
  const [value, setValue] = useState("123");

  return (
    <div className="space-y-4">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          {Array.from({ length: 6 }, (_, i) => (
            <InputOTPSlot key={i} index={i} aria-invalid={true} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm text-destructive">
        验证码错误，请重新输入
      </div>
    </div>
  );
}

const meta = {
  title: "Forms/InputOTP",
  component: InputOTP,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

// Default 6-digit OTP
export const Default: Story = {
  render: () => <OTPExample maxLength={6} />,
};

// 4-digit OTP
export const FourDigits: Story = {
  render: () => <OTPExample maxLength={4} />,
};

// 6-digit OTP with separator
export const WithSeparator: Story = {
  render: () => <OTPExample maxLength={6} withSeparator={true} />,
};

// 8-digit OTP with separator
export const EightDigitsWithSeparator: Story = {
  render: () => <OTPExample maxLength={8} withSeparator={true} />,
};

// Disabled state
export const Disabled: Story = {
  render: () => <OTPExample maxLength={6} disabled={true} />,
};

// Error state
export const WithError: Story = {
  render: () => <OTPWithError />,
};

// Digits only pattern
export const DigitsOnly: Story = {
  render: () => (
    <OTPExample maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} />
  ),
};

// Custom pattern example (alphanumeric)
export const Alphanumeric: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="space-y-4">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={setValue}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        >
          <InputOTPGroup>
            {Array.from({ length: 6 }, (_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <div className="text-center text-sm text-muted-foreground">
          支持数字和字母: {value || "(空)"}
        </div>
      </div>
    );
  },
};

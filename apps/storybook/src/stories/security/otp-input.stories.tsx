import type { Meta, StoryObj } from "@storybook/react";
import { OtpInput } from "@ukesjtu/nomad-ui/components/security/otp-input";
import { useState } from "react";
import { fn } from "storybook/test";

const meta = {
  title: "Security/OtpInput",
  component: OtpInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Current OTP value",
    },
    countdown: {
      control: { type: "number", min: 0, max: 60 },
      description: "Countdown timer in seconds (0 = can send)",
    },
    hasSent: {
      control: "boolean",
      description: "Has OTP been sent at least once",
    },
    isLoading: {
      control: "boolean",
      description: "Loading state for form submission",
    },
    isVerifying: {
      control: "boolean",
      description: "Verifying state for captcha",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    placeholder: {
      control: "text",
      description: "Input placeholder",
    },
    maxLength: {
      control: "number",
      description: "Maximum length for OTP",
    },
  },
} satisfies Meta<typeof OtpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper for stateful demos
function InteractiveOtpInput(props: React.ComponentProps<typeof OtpInput>) {
  const [value, setValue] = useState(props.value || "");

  return <OtpInput {...props} value={value} onChange={setValue} />;
}

export const Default: Story = {
  args: {
    value: "",
    onChange: fn(),
    onSendOtp: fn(),
    countdown: 0,
    hasSent: false,
    placeholder: "验证码",
    maxLength: 6,
  },
  render: args => <InteractiveOtpInput {...args} />,
};

export const InitialSend: Story = {
  args: {
    ...Default.args,
    hasSent: false,
    countdown: 0,
  },
  render: args => <InteractiveOtpInput {...args} />,
};

export const AfterSent: Story = {
  args: {
    ...Default.args,
    hasSent: true,
    countdown: 0,
  },
  render: args => <InteractiveOtpInput {...args} />,
};

export const Countdown: Story = {
  args: {
    ...Default.args,
    countdown: 30,
    hasSent: true,
  },
  render: args => <InteractiveOtpInput {...args} />,
};

export const Verifying: Story = {
  args: {
    ...Default.args,
    isVerifying: true,
  },
  render: args => <InteractiveOtpInput {...args} />,
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
  render: args => <InteractiveOtpInput {...args} />,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  render: args => <InteractiveOtpInput {...args} />,
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: "123456",
  },
  render: args => <InteractiveOtpInput {...args} />,
};

export const CustomPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: "6位数字",
  },
  render: args => <InteractiveOtpInput {...args} />,
};

export const ShortMaxLength: Story = {
  args: {
    ...Default.args,
    maxLength: 4,
    placeholder: "4位验证码",
  },
  render: args => <InteractiveOtpInput {...args} />,
};

// Workflow simulation
export const WorkflowSimulation: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [hasSent, setHasSent] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const handleSendOtp = () => {
      setIsVerifying(true);

      // Simulate captcha verification
      setTimeout(() => {
        setIsVerifying(false);
        setHasSent(true);
        setCountdown(60);

        // Start countdown
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 1500);
    };

    return (
      <div className="w-80 space-y-4">
        <OtpInput
          value={value}
          onChange={setValue}
          onSendOtp={handleSendOtp}
          countdown={countdown}
          hasSent={hasSent}
          isVerifying={isVerifying}
          placeholder="6位数字验证码"
        />
        <div className="text-sm text-muted-foreground">
          <p>
            状态:{" "}
            {isVerifying
              ? "验证中"
              : countdown > 0
                ? `倒计时 ${countdown}秒`
                : hasSent
                  ? "可重发"
                  : "可发送"}
          </p>
          <p>输入值: {value || "(空)"}</p>
        </div>
      </div>
    );
  },
};

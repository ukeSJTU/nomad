import type { Meta, StoryObj } from "@storybook/react";
import { LinkButton } from "@ukesjtu/nomad-ui/components/auth";
import { fn } from "storybook/test";

const meta = {
  title: "Auth/LinkButton",
  component: LinkButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state of the link button
 */
export const Default: Story = {
  args: {
    loading: false,
    disabled: false,
  },
};

/**
 * Link button in loading state
 */
export const Loading: Story = {
  args: {
    loading: true,
  },
};

/**
 * Link button in disabled state
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Interactive example showing state transition
 */
export const Interactive: Story = {
  args: {},
  render: args => {
    const [loading, setLoading] = React.useState(false);

    const handleClick = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        args.onClick();
      }, 2000);
    };

    return <LinkButton {...args} loading={loading} onClick={handleClick} />;
  },
};

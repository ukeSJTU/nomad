import type { Meta, StoryObj } from "@storybook/react-vite";
import { UnderConstruction } from "@ukesjtu/nomad-ui/components/common";

const meta = {
  title: "Common/UnderConstruction",
  component: UnderConstruction,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A component to display when a page or feature is under construction. Shows a construction icon with a customizable title and description, and optionally accepts children content.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The main title text to display",
    },
    description: {
      control: "text",
      description: "The description text explaining the construction status",
    },
    children: {
      control: false,
      description: "Optional content to display below the description",
    },
  },
} satisfies Meta<typeof UnderConstruction>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default under construction state with basic title and description.
 */
export const Default: Story = {
  args: {
    title: "Under Construction",
    description:
      "This page is currently under construction. Please check back later.",
  },
};

/**
 * Under construction with custom messaging for a specific feature.
 */
export const CustomMessage: Story = {
  args: {
    title: "Coming Soon",
    description:
      "We're working hard to bring you this exciting new feature. Stay tuned!",
  },
};

/**
 * Under construction with additional content/actions.
 */
export const WithChildren: Story = {
  args: {
    title: "Page Under Development",
    description:
      "This page is being built. Want to be notified when it's ready?",
    children: (
      <button
        type="button"
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Notify Me
      </button>
    ),
  },
};

/**
 * Short and concise message for maintenance pages.
 */
export const Maintenance: Story = {
  args: {
    title: "Scheduled Maintenance",
    description: "We'll be back shortly. Thank you for your patience.",
  },
};

/**
 * Feature-specific construction message with action button.
 */
export const FeaturePreview: Story = {
  args: {
    title: "New Feature Preview",
    description:
      "Get early access to our upcoming features. Sign up to be notified!",
    children: (
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Sign Up
        </button>
        <button
          type="button"
          className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          Learn More
        </button>
      </div>
    ),
  },
};

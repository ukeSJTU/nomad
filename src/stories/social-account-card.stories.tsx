import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SocialAccountCard from "@/components/auth/social-account-card";

/**
 * SocialAccountCard displays a social provider with binding status.
 *
 * Used in the account binding page to show GitHub and Google account links.
 * Users can bind or unbind their social accounts for quick sign-in.
 */
const meta = {
  title: "Auth/SocialAccountCard",
  component: SocialAccountCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    provider: {
      control: "select",
      options: ["github", "google"],
      description: "Social provider identifier",
    },
    providerName: {
      control: "text",
      description: "Display name of the provider",
    },
    isLinked: {
      control: "boolean",
      description: "Whether the account is currently linked",
    },
    accountId: {
      control: "text",
      description: "Account identifier if linked (e.g., username or email)",
    },
    onLink: {
      action: "link clicked",
      description: "Callback when user clicks bind button",
    },
    onUnlink: {
      action: "unlink clicked",
      description: "Callback when user clicks unbind button",
    },
  },
} satisfies Meta<typeof SocialAccountCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * GitHub account that is not linked yet
 */
export const GitHubUnlinked: Story = {
  args: {
    provider: "github",
    providerName: "GitHub",
    isLinked: false,
  },
};

/**
 * GitHub account that is already linked
 */
export const GitHubLinked: Story = {
  args: {
    provider: "github",
    providerName: "GitHub",
    isLinked: true,
    accountId: "octocat",
  },
};

/**
 * Google account that is not linked yet
 */
export const GoogleUnlinked: Story = {
  args: {
    provider: "google",
    providerName: "Google",
    isLinked: false,
  },
};

/**
 * Google account that is already linked
 */
export const GoogleLinked: Story = {
  args: {
    provider: "google",
    providerName: "Google",
    isLinked: true,
    accountId: "user@gmail.com",
  },
};

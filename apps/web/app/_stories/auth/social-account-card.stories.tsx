import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SocialAccountCard from "@/components/auth/social-account-card";
import { Button } from "@/components/ui/button";

/**
 * SocialAccountCard displays a social provider with binding status.
 *
 * Used in the account binding page to show GitHub and Google account links.
 * Users can bind or unbind their social accounts for quick sign-in.
 *
 * Features:
 * - Compact vertical layout
 * - Shows "已绑定" (Linked) status with checkmark when linked
 * - Hover over linked card to reveal unlink button
 * - Shows link button when not linked
 *
 * Note: In Storybook, we use simple Button components for visual presentation.
 * In the actual app, LinkButton and UnlinkButton components are used with
 * real OAuth and Server Action functionality.
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
    linkButton: (
      <Button variant="outline" size="sm" className="text-sm">
        绑定账号
      </Button>
    ),
  },
};

/**
 * GitHub account that is already linked
 * Hover over the card to see the unlink button
 */
export const GitHubLinked: Story = {
  args: {
    provider: "github",
    providerName: "GitHub",
    isLinked: true,
    unlinkButton: (
      <Button variant="outline" size="sm" className="text-sm">
        取消绑定
      </Button>
    ),
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
    linkButton: (
      <Button variant="outline" size="sm" className="text-sm">
        绑定账号
      </Button>
    ),
  },
};

/**
 * Google account that is already linked
 * Hover over the card to see the unlink button
 */
export const GoogleLinked: Story = {
  args: {
    provider: "google",
    providerName: "Google",
    isLinked: true,
    unlinkButton: (
      <Button variant="outline" size="sm" className="text-sm">
        取消绑定
      </Button>
    ),
  },
};

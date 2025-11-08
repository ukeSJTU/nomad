import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import UserMenu from "@/components/common/user-menu";

const meta = {
  title: "Common/UserMenu",
  component: UserMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "UserMenu component displays user authentication status and provides access to user-related actions. Shows 'Sign In' and 'Sign Up' buttons when not authenticated, or user menu with profile access when authenticated.",
      },
    },
  },
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

/**
 * Default story showing the UserMenu component.
 * Note: This component relies on Better Auth session state.
 * In a real application, it will show different states based on authentication status:
 * - Loading state: Shows skeleton loader while checking session
 * - Not logged in: Shows "Sign In" and "Sign Up" buttons
 * - Logged in: Shows "尊敬的用户" text with dropdown menu on hover
 *
 * Features when logged in:
 * - Displays standardized text "尊敬的用户" (instead of username)
 * - ChevronDown icon indicates dropdown availability
 * - Click to navigate to /home page
 * - Hover to view user menu with options (wallet, passenger info, sign out)
 */
export const Default: Story = {
  render: () => <UserMenu />,
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import UserMenuDemo from "@/components/common/user-menu-demo";

const meta = {
  title: "Common/UserMenu",
  component: UserMenuDemo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "UserMenu component displays user authentication status and provides access to user-related actions. Shows 'Sign In' and 'Sign Up' buttons when not authenticated, or user menu with profile access when authenticated.",
      },
    },
  },
  argTypes: {
    state: {
      control: "select",
      options: ["not-logged-in", "logged-in", "loading"],
      description: "The authentication state to display",
    },
  },
} satisfies Meta<typeof UserMenuDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story showing the UserMenu component in not logged in state.
 * Displays "Sign In" and "Sign Up" buttons.
 */
export const Default: Story = {
  args: {
    state: "not-logged-in",
  },
};

/**
 * Story showing the UserMenu component when user is logged in.
 *
 * Features when logged in:
 * - Displays standardized text "尊敬的用户" (instead of username)
 * - Shows user avatar with image
 * - ChevronDown icon indicates dropdown availability
 * - Click to navigate to /home page
 * - Hover to view user menu with options (wallet, passenger info, sign out)
 */
export const LoggedIn: Story = {
  args: {
    state: "logged-in",
    user: {
      id: "user-123",
      name: "张三",
      email: "zhangsan@example.com",
      image: "https://github.com/shadcn.png",
    },
  },
};

/**
 * Story showing the UserMenu component when user is logged in without avatar image.
 * Shows fallback with user initials (张).
 */
export const LoggedInWithoutAvatar: Story = {
  args: {
    state: "logged-in",
    user: {
      id: "user-456",
      name: "李四",
      email: "lisi@example.com",
    },
  },
};

/**
 * Story showing the UserMenu component in loading state.
 * Displays a skeleton loader while checking session.
 */
export const Loading: Story = {
  args: {
    state: "loading",
  },
};

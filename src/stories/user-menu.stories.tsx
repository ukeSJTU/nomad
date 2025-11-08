import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { vi } from "vitest";

import UserMenu from "@/components/common/user-menu";

// Mock auth client
const mockUseSession = vi.fn();
vi.mock("@/lib/auth/client", () => ({
  authClient: {
    useSession: () => mockUseSession(),
    signOut: vi.fn(),
  },
}));

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
 * Default story showing the UserMenu component in not logged in state.
 * Displays "Sign In" and "Sign Up" buttons.
 */
export const Default: Story = {
  render: () => {
    mockUseSession.mockReturnValue({
      data: null,
      isPending: false,
    });
    return <UserMenu />;
  },
};

/**
 * Story showing the UserMenu component when user is logged in.
 *
 * Features when logged in:
 * - Displays standardized text "尊敬的用户" (instead of username)
 * - Shows user avatar with fallback initials
 * - ChevronDown icon indicates dropdown availability
 * - Click to navigate to /home page
 * - Hover to view user menu with options (wallet, passenger info, sign out)
 */
export const LoggedIn: Story = {
  render: () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          id: "user-123",
          name: "张三",
          email: "zhangsan@example.com",
          image: "https://github.com/shadcn.png",
        },
        session: {
          token: "mock-token",
          expiresAt: new Date(Date.now() + 86400000),
        },
      },
      isPending: false,
    });
    return <UserMenu />;
  },
};

/**
 * Story showing the UserMenu component when user is logged in without avatar image.
 * Shows fallback with user initials.
 */
export const LoggedInWithoutAvatar: Story = {
  render: () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          id: "user-456",
          name: "李四",
          email: "lisi@example.com",
        },
        session: {
          token: "mock-token",
          expiresAt: new Date(Date.now() + 86400000),
        },
      },
      isPending: false,
    });
    return <UserMenu />;
  },
};

/**
 * Story showing the UserMenu component in loading state.
 * Displays a skeleton loader while checking session.
 */
export const Loading: Story = {
  render: () => {
    mockUseSession.mockReturnValue({
      data: null,
      isPending: true,
    });
    return <UserMenu />;
  },
};

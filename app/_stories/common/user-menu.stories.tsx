import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChevronDown, LogOut, User, Wallet } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/string";

// Mock component for Storybook that accepts controlled props
interface UserMenuProps {
  isPending?: boolean;
  session?: {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
  } | null;
}

function UserMenuStory({ isPending = false, session = null }: UserMenuProps) {
  const handleSignOut = async () => {
    console.log("Sign out clicked");
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="size-8 animate-pulse rounded-full bg-muted" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/auth/sign-in">Sign In</Link>
        </Button>
        <Button variant="secondary" size="sm" asChild>
          <Link href="/auth/sign-up">Sign Up</Link>
        </Button>
      </div>
    );
  }

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link href="/home" className="flex items-center gap-2 cursor-pointer">
          <Avatar className="size-8">
            <AvatarImage
              src={session.user.image || undefined}
              alt={session.user.name || "User"}
            />
            <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium md:inline-block">
            尊敬的用户
          </span>
          <ChevronDown className="hidden size-3.5 text-muted-foreground md:inline-block" />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent align="end" className="w-52 p-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <Avatar className="size-10">
              <AvatarImage
                src={session.user.image || undefined}
                alt={session.user.name || "User"}
              />
              <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <Link
                href="/home"
                className="text-sm font-medium hover:underline cursor-pointer"
              >
                尊敬的用户
              </Link>
              <Badge className="w-fit">贵宾</Badge>
            </div>
          </div>

          <Separator className="my-1" />

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="justify-start gap-2"
          >
            <Link href="/wallet">
              <Wallet className="size-4" />
              我的钱包
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="justify-start gap-2"
          >
            <Link href="/home/passengers">
              <User className="size-4" />
              常用信息
            </Link>
          </Button>

          <Separator className="my-1" />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="justify-start gap-2"
          >
            <LogOut className="size-4" />
            退出登录
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

const meta = {
  title: "Common/UserMenu",
  component: UserMenuStory,
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
    isPending: {
      control: "boolean",
      description: "Loading state while checking session",
    },
    session: {
      control: "object",
      description: "User session data (null for logged out)",
    },
  },
} satisfies Meta<typeof UserMenuStory>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story showing the UserMenu component in not logged in state.
 * Displays "Sign In" and "Sign Up" buttons.
 */
export const Default: Story = {
  args: {
    isPending: false,
    session: null,
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
    isPending: false,
    session: {
      user: {
        id: "user-123",
        name: "张三",
        email: "zhangsan@example.com",
        image: "https://github.com/shadcn.png",
      },
    },
  },
};

/**
 * Story showing the UserMenu component when user is logged in without avatar image.
 * Shows fallback with user initials (张).
 */
export const LoggedInWithoutAvatar: Story = {
  args: {
    isPending: false,
    session: {
      user: {
        id: "user-456",
        name: "李四",
        email: "lisi@example.com",
      },
    },
  },
};

/**
 * Story showing the UserMenu component in loading state.
 * Displays a skeleton loader while checking session.
 */
export const Loading: Story = {
  args: {
    isPending: true,
    session: null,
  },
};

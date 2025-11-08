"use client";

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

const getInitials = (name?: string) => {
  if (!name) return "A"; // Anonymous
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

type UserMenuDemoProps = {
  /**
   * The state to display
   * - "not-logged-in": Shows Sign In and Sign Up buttons
   * - "logged-in": Shows user menu with avatar and dropdown
   * - "loading": Shows skeleton loader
   */
  state: "not-logged-in" | "logged-in" | "loading";
  /**
   * User data for logged-in state
   */
  user?: {
    id: string;
    name?: string;
    email: string;
    image?: string;
  };
};

/**
 * UserMenuDemo component for Storybook demonstration purposes.
 * This is a controllable version of UserMenu that accepts props instead of using auth hooks.
 *
 * @description
 * This component shows different states based on the `state` prop:
 * - Loading state: Shows a skeleton loader
 * - Not logged in: Displays "Sign In" and "Sign Up" buttons
 * - Logged in: Shows "尊敬的用户" (Respected User) with dropdown menu on hover
 *
 * Features when logged in:
 * - Displays standardized greeting text "尊敬的用户"
 * - ChevronDown icon indicates dropdown availability
 * - Click trigger area to navigate to /home page
 * - Hover to view user menu with options: wallet, passenger info, sign out
 * - Avatar shows user image or fallback with user initials
 *
 * @param {UserMenuDemoProps} props - Component props
 * @returns {JSX.Element} The rendered UserMenuDemo component
 *
 * @example
 * ```tsx
 * <UserMenuDemo state="logged-in" user={{ id: "123", name: "张三", email: "test@example.com" }} />
 * ```
 */
export default function UserMenuDemo({ state, user }: UserMenuDemoProps) {
  const handleSignOut = async () => {
    // Demo only - no actual sign out
    console.log("Sign out clicked (demo mode)");
  };

  if (state === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div className="size-8 animate-pulse rounded-full bg-muted" />
      </div>
    );
  }

  if (state === "not-logged-in") {
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

  // logged-in state
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link href="/home" className="flex items-center gap-2 cursor-pointer">
          <Avatar className="size-8">
            <AvatarImage
              src={user?.image || undefined}
              alt={user?.name || "User"}
            />
            <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
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
                src={user?.image || undefined}
                alt={user?.name || "User"}
              />
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
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

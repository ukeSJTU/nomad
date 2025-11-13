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
import { authClient } from "@/lib/auth/client";

export const getInitials = (name?: string) => {
  if (!name) return "A"; // Anonymous
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

/**
 * UserMenu component displays user authentication status and navigation options.
 *
 * @description
 * This component shows different states based on authentication status:
 * - Loading state: Shows a skeleton loader while checking session
 * - Not logged in: Displays "Sign In" and "Sign Up" buttons
 * - Logged in: Shows "尊敬的用户" (Respected User) with dropdown menu on hover
 *
 * Features when logged in:
 * - Displays standardized greeting text "尊敬的用户" (complies with course requirements)
 * - ChevronDown icon indicates dropdown availability
 * - Click trigger area to navigate to /home page
 * - Hover to view user menu with options: wallet, passenger info, sign out
 * - Avatar shows user image or fallback with user initials
 *
 * @returns {JSX.Element} The rendered UserMenu component
 *
 * @example
 * ```tsx
 * <Header>
 *   <UserMenu />
 * </Header>
 * ```
 */
export default function UserMenu() {
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
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
        <Link
          href="/home/info"
          className="flex items-center gap-2 cursor-pointer"
        >
          <Avatar className="size-8">
            <AvatarImage
              src={session.user?.image || undefined}
              alt={session.user?.name || "User"}
            />
            <AvatarFallback>
              {getInitials(session.user?.name || undefined)}
            </AvatarFallback>
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
                src={session.user?.image || undefined}
                alt={session.user?.name || "User"}
              />
              <AvatarFallback>
                {getInitials(session.user?.name || undefined)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <Link
                href="/home/info"
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

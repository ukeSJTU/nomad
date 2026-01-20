"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ukesjtu/nomad-ui/components/primitives/avatar";
import { Badge } from "@ukesjtu/nomad-ui/components/primitives/badge";
import { Button } from "@ukesjtu/nomad-ui/components/primitives/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@ukesjtu/nomad-ui/components/primitives/hover-card";
import { Separator } from "@ukesjtu/nomad-ui/components/primitives/separator";
import { ChevronDown, LogOut, User, Wallet } from "lucide-react";
import { useUiComponents } from "../../platform";
import { getInitials } from "./utils";

export type UserMenuSession = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type UserMenuProps = {
  session: UserMenuSession | null;
  isPending: boolean;
  onSignOut: () => void;
  signInHref?: string;
  signUpHref?: string;
  userInfoHref?: string;
  walletsHref?: string;
  passengersHref?: string;
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
 * <UserMenu
 *   session={session}
 *   isPending={false}
 *   onSignOut={handleSignOut}
 *   signInHref="/auth/sign-in"
 *   signUpHref="/auth/sign-up"
 *   userInfoHref="/home/info"
 *   walletsHref="/home/wallets"
 *   passengersHref="/home/passengers"
 * />
 * ```
 */
export function UserMenu({
  session,
  isPending,
  onSignOut,
  signInHref = "/auth/sign-in",
  signUpHref = "/auth/sign-up",
  userInfoHref = "/home/info",
  walletsHref = "/home/wallets",
  passengersHref = "/home/passengers",
}: UserMenuProps) {
  const { Link } = useUiComponents();

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
          <Link href={signInHref}>登录</Link>
        </Button>
        <Button variant="secondary" size="sm" asChild>
          <Link href={signUpHref}>注册</Link>
        </Button>
      </div>
    );
  }

  const userInitials = getInitials(session.name || undefined);

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link
          href={userInfoHref}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Avatar className="size-8">
            <AvatarImage
              src={session.image || undefined}
              alt={session.name || "User"}
            />
            <AvatarFallback>{userInitials}</AvatarFallback>
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
                src={session.image || undefined}
                alt={session.name || "User"}
              />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <Link
                href={userInfoHref}
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
            <Link href={walletsHref}>
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
            <Link href={passengersHref}>
              <User className="size-4" />
              常用信息
            </Link>
          </Button>

          <Separator className="my-1" />

          <Button
            variant="ghost"
            size="sm"
            onClick={onSignOut}
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

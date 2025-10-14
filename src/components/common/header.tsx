"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

import SearchBar from "@/components/common/search-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth/client";

export const getInitials = (name?: string) => {
  if (!name) return "A";
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-4">
        {/* Left section: Favicon/Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
            N
          </div>
          <span className="hidden font-semibold sm:inline-block">Nomad</span>
        </Link>

        {/* Center section: Search bar */}
        <SearchBar />

        {/* Right section: Auth, Orders, Contact, Theme */}
        <div className="flex items-center gap-3">
          {/* Auth Section */}
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="size-8 animate-pulse rounded-full bg-muted" />
            </div>
          ) : session ? (
            <Link href="/profile" className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage
                  src={session.user.image || undefined}
                  alt={session.user.name || "User"}
                />
                <AvatarFallback>
                  {getInitials(session.user.name)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline-block">
                {session.user.name}
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          <Separator orientation="vertical" className="h-6!" />

          {/* My Orders */}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/orders">My Orders</Link>
          </Button>

          <Separator orientation="vertical" className="h-6!" />

          {/* Contact Service */}
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="sm">
                联系客服
              </Button>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="w-64">
              <div className="space-y-3">
                <Link
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-medium text-primary hover:underline"
                >
                  访问客服中心 →
                </Link>
                <Separator />
                <div className="space-y-1 text-sm">
                  <p className="font-medium">境内：</p>
                  <p>95010</p>
                  <p>或 400-830-6666</p>
                  <p className="font-medium mt-2">中国香港：</p>
                  <p>+852-3008-3295</p>
                  <p className="font-medium mt-2">中国澳门：</p>
                  <p>+86-21 3406-4888</p>
                  <p className="font-medium mt-2">中国台湾：</p>
                  <p>+86-21 3406-4888</p>
                  <p className="font-medium mt-2">其他国家和地区：</p>
                  <p>+86-21-3406-4888</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <Separator orientation="vertical" className="h-6!" />

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

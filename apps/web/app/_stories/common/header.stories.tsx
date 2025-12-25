import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChevronDown, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import SearchBar from "@/components/common/search-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import storyLogger from "@/infra/logging/storybook-logger";
import { getInitials } from "@/lib/format";

// Mock component that accepts props to control login state
interface HeaderStoryProps {
  isLoggedIn?: boolean;
  userName?: string;
  userImage?: string;
}

function HeaderStory({
  isLoggedIn = false,
  userName = "张三",
  userImage = "https://github.com/shadcn.png",
}: HeaderStoryProps) {
  const handleThemeToggle = () => {
    storyLogger.info("Theme toggle clicked");
  };

  const handleSignOut = () => {
    storyLogger.info("Sign out clicked");
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-4">
        {/* Left section: Favicon/Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Nomad Logo"
            width={64}
            height={64}
            className="rounded-lg"
          />
          <span className="hidden font-semibold sm:inline-block">Nomad</span>
        </Link>

        {/* Center section: Search bar */}
        <SearchBar />

        {/* Right section: Auth, Orders, Contact, Theme */}
        <div className="flex items-center gap-3">
          {/* Auth Section - UserMenu */}
          {isLoggedIn ? (
            <HoverCard openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Link
                  href="/home/info"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Avatar className="size-8">
                    <AvatarImage src={userImage} alt={userName} />
                    <AvatarFallback>{getInitials(userName)}</AvatarFallback>
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
                      <AvatarImage src={userImage} alt={userName} />
                      <AvatarFallback>{getInitials(userName)}</AvatarFallback>
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
                    <Link href="/wallet">我的钱包</Link>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="justify-start gap-2"
                  >
                    <Link href="/home/passengers">常用信息</Link>
                  </Button>

                  <Separator className="my-1" />

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="justify-start gap-2"
                  >
                    退出登录
                  </Button>
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth/sign-in">登录</Link>
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/auth/sign-up">注册</Link>
              </Button>
            </div>
          )}

          <Separator orientation="vertical" className="h-6!" />

          {/* My Orders */}
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="sm" className="cursor-pointer">
                我的订单
              </Button>
            </HoverCardTrigger>
            <HoverCardContent align="center" className="w-40 p-2">
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="justify-start"
                >
                  <Link href="/home/orders">机票订单</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="justify-start"
                >
                  <Link href="#">酒店订单</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="justify-start"
                >
                  <Link href="/home/orders">全部订单</Link>
                </Button>
                <Separator className="my-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="justify-start"
                >
                  <Link href="#">手机号查订单</Link>
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>

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
                  <p className="font-medium">境内：95010 或 400-830-6666</p>
                  <p className="font-medium mt-2">中国香港：+852-3008-3295</p>
                  <p className="font-medium mt-2">中国澳门：+86-21 3406-4888</p>
                  <p className="font-medium mt-2">中国台湾：+86-21 3406-4888</p>
                  <p className="font-medium mt-2">
                    其他国家和地区：+86-21-3406-4888
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <Separator orientation="vertical" className="h-6!" />

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
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

const meta = {
  title: "Common/Header",
  component: HeaderStory,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    isLoggedIn: {
      control: "boolean",
      description: "Whether the user is logged in",
    },
    userName: {
      control: "text",
      description: "Name of the logged-in user",
    },
    userImage: {
      control: "text",
      description: "Profile image URL of the logged-in user",
    },
  },
} satisfies Meta<typeof HeaderStory>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default state showing the header when user is not logged in.
 * Displays "登录" (Sign In) and "注册" (Sign Up) buttons.
 */
export const NotLoggedIn: Story = {
  args: {
    isLoggedIn: false,
  },
};

/**
 * State showing the header when user is logged in.
 * Displays user avatar, "尊敬的用户" (Respected User) text, and dropdown menu.
 */
export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    userName: "张三",
    userImage: "https://github.com/shadcn.png",
  },
};

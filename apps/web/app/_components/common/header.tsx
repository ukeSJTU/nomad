"use client";

import { Button } from "@nomad/ui/components/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@nomad/ui/components/hover-card";
import { Separator } from "@nomad/ui/components/separator";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import SearchBar from "@/components/common/search-bar";
import UserMenu from "@/components/common/user-menu";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center gap-4 px-4">
        {/* Left section: Favicon/Logo - fixed to left */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            alt="Nomad Logo"
            width={48}
            height={48}
            className="rounded-lg md:h-16 md:w-16"
          />
          <span className="hidden font-semibold lg:inline-block">Nomad</span>
        </Link>

        {/* Center section: Search bar - centered with max-width */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <div className="w-full max-w-md lg:max-w-lg">
            <SearchBar />
          </div>
        </div>

        {/* Right section: Auth, Orders, Contact, Theme - fixed to right */}
        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          {/* Auth Section */}
          <UserMenu />

          <Separator orientation="vertical" className="hidden h-6! lg:block" />

          {/* My Orders - hidden on mobile and tablet */}
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden cursor-pointer lg:flex"
              >
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

          <Separator orientation="vertical" className="hidden h-6! lg:block" />

          {/* Contact Service - hidden on mobile and tablet */}
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden lg:flex">
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

          <Separator orientation="vertical" className="hidden h-6! md:block" />

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="shrink-0"
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

"use client";

import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

import SearchBar from "@/components/common/search-bar";
import UserMenu from "@/components/common/user-menu";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  const { theme, setTheme } = useTheme();

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
          {/* Auth Section */}
          <UserMenu />

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

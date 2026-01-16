"use client";

import { Button } from "@nomad/ui/components/primitives/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@nomad/ui/components/primitives/hover-card";
import { Separator } from "@nomad/ui/components/primitives/separator";
import { cn } from "@nomad/ui/lib/utils";
import { useUiComponents } from "@nomad/ui/platform";
import { Moon, Sun } from "lucide-react";
import * as React from "react";

type NavItem = {
  label: string;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
};

type LogoProps = {
  href?: string;
  src: string;
  alt: string;
  label?: string;
};

type SiteHeaderProps = {
  logo: LogoProps;
  searchSlot?: React.ReactNode;
  userMenuSlot?: React.ReactNode;
  orderLinks?: NavItem[];
  contactLink?: NavItem;
  contactLines?: string[];
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

export function SiteHeader({
  logo,
  searchSlot,
  userMenuSlot,
  orderLinks = [],
  contactLink,
  contactLines = [],
  theme,
  onToggleTheme,
}: SiteHeaderProps) {
  const { Link, Image } = useUiComponents();

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center gap-4 px-4">
        <Link
          href={logo.href ?? "/"}
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={48}
            height={48}
            className="rounded-lg md:h-16 md:w-16"
          />
          {logo.label ? (
            <span className="hidden font-semibold lg:inline-block">
              {logo.label}
            </span>
          ) : null}
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="w-full max-w-md lg:max-w-lg">{searchSlot}</div>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          {userMenuSlot}

          {orderLinks.length > 0 && (
            <>
              <Separator
                orientation="vertical"
                className="hidden h-6! lg:block"
              />
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
                    {orderLinks.map(item => (
                      <Button
                        key={item.label}
                        asChild
                        className="justify-start"
                        size="sm"
                        variant="ghost"
                        onClick={item.onClick}
                      >
                        <Link
                          href={item.href ?? "#"}
                          target={item.target}
                          rel={item.rel}
                        >
                          {item.label}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </>
          )}

          {(contactLink || contactLines.length > 0) && (
            <>
              <Separator
                orientation="vertical"
                className="hidden h-6! lg:block"
              />
              <HoverCard openDelay={200} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden lg:flex">
                    联系客服
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent align="end" className="w-64">
                  <div className="space-y-3 text-sm">
                    {contactLink && (
                      <Link
                        href={contactLink.href ?? "#"}
                        target={contactLink.target}
                        rel={contactLink.rel}
                        className={cn(
                          "block font-medium text-primary hover:underline",
                          !contactLink.href &&
                            "cursor-default hover:no-underline"
                        )}
                        onClick={contactLink.onClick}
                      >
                        {contactLink.label}
                      </Link>
                    )}
                    {contactLines.length > 0 && <Separator />}
                    {contactLines.length > 0 && (
                      <div className="space-y-2">
                        {contactLines.map(line => (
                          <p key={line} className="font-medium">
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </>
          )}

          <Separator orientation="vertical" className="hidden h-6! md:block" />

          <Button
            aria-label="Toggle theme"
            className="shrink-0"
            size="icon"
            variant="ghost"
            onClick={onToggleTheme}
          >
            <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">
              {theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}

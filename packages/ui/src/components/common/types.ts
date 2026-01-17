import type * as React from "react";

// ============================================================
// SiteHeader Types
// ============================================================

export type NavItem = {
  label: string;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
};

export type LogoProps = {
  href?: string;
  src: string;
  alt: string;
  label?: string;
};

export type SiteHeaderProps = {
  logo: LogoProps;
  searchSlot?: React.ReactNode;
  userMenuSlot?: React.ReactNode;
  orderLinks?: NavItem[];
  contactLink?: NavItem;
  contactLines?: string[];
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

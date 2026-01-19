import type { LucideIcon } from "lucide-react";

export type SubItem = {
  key: string;
  title: string;
  url: string;
};

export type MenuItem = {
  key: string;
  title: string;
  url: string;
  icon: LucideIcon;
  items?: SubItem[];
  isActive: boolean;
  activeSubItemKey?: string;
};

export type SidebarSection = {
  items: MenuItem[];
};

export type AppSidebarProps = {
  sections: {
    travel: MenuItem[];
    extras: MenuItem[];
    business: MenuItem[];
    finance: MenuItem[];
  };
  onNavigate: (url: string, title: string) => void;
};

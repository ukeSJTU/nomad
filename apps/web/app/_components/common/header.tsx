"use client";

import { SiteHeader } from "@nomad/ui/components/common/site-header";
import { useTheme } from "next-themes";
import SearchBar from "@/components/common/search-bar";
import UserMenu from "@/components/common/user-menu";

const ORDER_LINKS = [
  { label: "机票订单", href: "/home/orders" },
  { label: "酒店订单", href: "#" },
  { label: "全部订单", href: "/home/orders" },
  { label: "手机号查订单", href: "#" },
];

const CONTACT_LINES = [
  "境内：95010 或 400-830-6666",
  "中国香港：+852-3008-3295",
  "中国澳门：+86-21 3406-4888",
  "中国台湾：+86-21 3406-4888",
  "其他国家和地区：+86-21-3406-4888",
];

export default function Header() {
  const { theme = "light", setTheme } = useTheme();

  return (
    <SiteHeader
      logo={{ src: "/logo.png", alt: "Nomad Logo", href: "/", label: "Nomad" }}
      searchSlot={
        <div className="w-full max-w-md lg:max-w-lg">
          <SearchBar />
        </div>
      }
      userMenuSlot={<UserMenu />}
      orderLinks={ORDER_LINKS}
      contactLink={{
        label: "访问客服中心 →",
        href: "/contact",
        target: "_blank",
        rel: "noopener noreferrer",
      }}
      contactLines={CONTACT_LINES}
      theme={theme === "dark" ? "dark" : "light"}
      onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
    />
  );
}

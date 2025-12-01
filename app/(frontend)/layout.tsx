import "./globals.css";

import { type ReactNode } from "react";

import { DevUserSwitcher } from "@/components/common";
import { env } from "@/config/env";

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      {env.NODE_ENV === "development" && <DevUserSwitcher />}
    </>
  );
}

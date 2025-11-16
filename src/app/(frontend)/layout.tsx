import "./globals.css";

import { type ReactNode } from "react";

import { DevUserSwitcher } from "@/components/common";

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      {process.env.NODE_ENV === "development" && <DevUserSwitcher />}
    </>
  );
}

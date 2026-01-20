import "@ukesjtu/nomad-ui/globals.css";
import "./globals.css";

import { type ReactNode } from "react";

import { DevUserSwitcher } from "@/components/common";
import { isDevelopment } from "@/config/env";

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      {isDevelopment() && <DevUserSwitcher />}
    </>
  );
}

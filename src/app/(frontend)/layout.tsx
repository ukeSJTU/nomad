import "./globals.css";

import type { ReactNode } from "react";

import Header from "@/components/common/header";

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
    </>
  );
}

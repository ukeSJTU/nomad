import "./globals.css";

import type { ReactNode } from "react";

import { Footer, Header } from "@/components/common";

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

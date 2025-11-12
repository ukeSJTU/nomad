import "./globals.css";

import type { CSSProperties, ReactNode } from "react";

import { Footer, Header, MainSidebar } from "@/components/common";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "clamp(11rem, 18vw, 15rem)",
          "--sidebar-width-icon": "4rem",
        } as CSSProperties
      }
    >
      <MainSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}

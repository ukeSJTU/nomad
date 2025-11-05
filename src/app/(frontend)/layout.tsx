import "./globals.css";

import type { ReactNode } from "react";

import { Footer, Header, MainSidebar } from "@/components/common";
import { Toaster } from "@/components/ui/sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <MainSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <Header />
          <Toaster />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

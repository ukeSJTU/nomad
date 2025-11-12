import "./globals.css";

import { type ReactNode, Suspense } from "react";

import { Footer, Header, MainSidebar } from "@/components/common";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Suspense fallback={<div>Loading...</div>}>
        <MainSidebar />
      </Suspense>
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

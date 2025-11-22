import { type ReactNode, Suspense } from "react";

import { Footer, Header, MainSidebar } from "@/components/common";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export function SidebarWrapper({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          "--sidebar-width": "11rem",
          "--sidebar-width-icon": "4.75rem",
        } as React.CSSProperties
      }
    >
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

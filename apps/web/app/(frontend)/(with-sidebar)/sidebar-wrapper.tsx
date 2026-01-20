import {
  SidebarInset,
  SidebarProvider,
} from "@ukesjtu/nomad-ui/components/primitives/sidebar";
import { Toaster } from "@ukesjtu/nomad-ui/components/primitives/sonner";
import { type ReactNode, Suspense } from "react";
import { Footer, Header, MainSidebar } from "@/components/common";

export function SidebarWrapper({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          "--sidebar-width": "13rem",
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

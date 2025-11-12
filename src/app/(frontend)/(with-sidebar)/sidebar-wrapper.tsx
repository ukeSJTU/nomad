import { type ReactNode, Suspense } from "react";

import { MainSidebar } from "@/components/common";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function SidebarWrapper({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Suspense fallback={<div>Loading...</div>}>
        <MainSidebar />
      </Suspense>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

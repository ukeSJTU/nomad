import { Toaster } from "@nomad/ui/components/sonner";
import { type ReactNode } from "react";
import { Footer, Header } from "@/components/common";

export default function WithoutSidebarLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Toaster />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

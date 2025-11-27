import type { ReactNode } from "react";

import { UserSidebar } from "@/components/auth";

export default function HomepageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto px-4 py-6 max-w-7xl">
        <div className="flex gap-6 items-start">
          {/* User homepage sidebar */}
          <aside className="w-52 bg-card rounded-lg shadow p-4 shrink-0 border border-border">
            <UserSidebar />
          </aside>

          {/* User homepage main content */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

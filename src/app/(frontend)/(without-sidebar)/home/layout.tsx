import type { ReactNode } from "react";

import UserSidebar from "@/components/auth/user-sidebar";

export default function HomepageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto px-4 py-6 max-w-7xl">
        <div className="flex gap-6 items-start">
          {/* 侧边栏 */}
          <aside className="w-52 bg-card rounded-lg shadow p-4 shrink-0 border border-border">
            <UserSidebar />
          </aside>

          {/* 主内容 */}
          <main className="flex-1 bg-card rounded-lg shadow p-6 border border-border">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

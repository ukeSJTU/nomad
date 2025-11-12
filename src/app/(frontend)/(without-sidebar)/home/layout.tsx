import type { ReactNode } from "react";

import UserSidebar from "@/components/auth/user-sidebar";

export default function HomepageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto px-4 py-6 max-w-7xl">
        <div className="flex gap-6 items-start">
          {/* 侧边栏 */}
          <aside className="w-[200px] bg-white rounded-lg shadow-sm p-4 shrink-0">
            <UserSidebar />
          </aside>

          {/* 主内容 */}
          <main className="flex-1 bg-white rounded-lg shadow-sm p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

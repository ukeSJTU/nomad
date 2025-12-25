"use client";

import { FileText, Scale, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const legalPages = [
  {
    id: "terms",
    title: "服务协议",
    href: "/terms",
    icon: FileText,
  },
  {
    id: "privacy",
    title: "个人信息保护政策",
    href: "/privacy",
    icon: ShieldAlert,
  },
  {
    id: "disclaimer",
    title: "免责声明",
    href: "/disclaimer",
    icon: Scale,
  },
];

export default function LegalPageLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Vertical Navigation Sidebar */}
        <aside className="md:w-64 flex-shrink-0">
          <div className="sticky top-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              法律文档
            </h2>
            <nav className="space-y-1">
              {legalPages.map(page => {
                const Icon = page.icon;
                const isActive = pathname === page.href;
                return (
                  <Link
                    key={page.id}
                    href={page.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
                    )}
                  >
                    <Icon className="size-5 flex-shrink-0" />
                    <span className="flex-1">{page.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}

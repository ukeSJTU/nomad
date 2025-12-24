import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

export function AirportSidebar() {
  return (
    <aside className="w-full lg:w-[280px] space-y-4">
      <Card className="bg-accent/50 border-accent">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-foreground">相关链接</span>
          </div>
          <div className="space-y-2 text-sm">
            <Link
              href="/flights/guide"
              className="block text-primary hover:underline transition-colors"
            >
              返回机场攻略首页
            </Link>
            <Link
              href="/flights"
              className="block text-primary hover:underline transition-colors"
            >
              特价机票查询
            </Link>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

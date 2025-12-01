import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Plane } from "lucide-react";
import Link from "next/link";

export default function MoreServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">更多服务</h1>
        <p className="text-muted-foreground mt-2">探索更多飞行相关的贴心服务</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/flights/guide">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Plane className="w-6 h-6" />
              </div>
              <CardTitle>机场攻略</CardTitle>
              <CardDescription>
                查看热门机场简介、交通指引及乘机流程
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                立即查看 <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

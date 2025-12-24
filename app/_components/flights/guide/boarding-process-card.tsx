import { ArrowRight, Plane } from "lucide-react";
import Link from "next/link";

export function BoardingProcessCard() {
  return (
    <Link href="/flights/guide/process" className="block group">
      <div className="bg-card border border-accent p-4 hover:shadow-md transition-shadow rounded-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-sm">
              <Plane className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-primary text-lg">乘机流程</span>
          </div>
          <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
        </div>
        <div className="text-xs text-muted-foreground pl-10">
          boarding procedures
        </div>
      </div>
    </Link>
  );
}

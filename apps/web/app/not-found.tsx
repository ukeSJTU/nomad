import "./(frontend)/globals.css";

import { Button } from "@nomad/ui/components/primitives/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-5xl font-bold text-primary">Nomad</h1>
      <h2 className="text-8xl font-bold text-muted-foreground">404</h2>
      <p className="text-xl text-muted-foreground text-center">
        人在旅途难免迷失
      </p>
      <Button asChild className="mt-4">
        <Link href="/">回到首页</Link>
      </Button>
    </div>
  );
}

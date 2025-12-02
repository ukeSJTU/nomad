import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function BoardingProcessPage() {
  const processes = [
    { id: 1, title: "国内出发流程", src: "/flights-process/process-1.png" },
    { id: 2, title: "国际出发流程", src: "/flights-process/process-2.png" },
    { id: 3, title: "国内到达流程", src: "/flights-process/process-3.png" },
    { id: 4, title: "国际到达流程", src: "/flights-process/process-4.png" },
  ];

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="text-muted-foreground mb-6 text-xs">
        <Link href="/flights" className="hover:text-primary">
          首页
        </Link>{" "}
        &gt;{" "}
        <Link href="/flights/guide" className="hover:text-primary">
          机场攻略
        </Link>{" "}
        &gt; 乘机流程
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-8 text-center">
        乘机流程指南
      </h1>

      <div className="space-y-12 max-w-5xl mx-auto">
        {processes.map(process => (
          <div
            key={process.id}
            className="bg-card rounded-lg shadow-sm border p-6"
          >
            <h2 className="text-xl font-bold text-primary mb-6 border-l-4 border-primary pl-3">
              {process.title}
            </h2>
            <div className="relative w-full h-[200px] md:h-[300px]">
              <Image
                src={process.src}
                alt={process.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

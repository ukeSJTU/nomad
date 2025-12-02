import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function BoardingProcessPage() {
  const processes = [
    {
      id: 1,
      title: "国内出发流程",
      src: "/flights-process/domestic-departure.png",
    },
    {
      id: 2,
      title: "国际出发流程",
      src: "/flights-process/international-departure.png",
    },
    {
      id: 3,
      title: "国内到达流程",
      src: "/flights-process/domestic-arrival.png",
    },
    {
      id: 4,
      title: "国际到达流程",
      src: "/flights-process/international-arrival.png",
    },
  ];

  return (
    <div className="container mx-auto px-4 min-h-screen bg-background">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/flights">首页</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/flights/guide">机场攻略</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>乘机流程图</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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

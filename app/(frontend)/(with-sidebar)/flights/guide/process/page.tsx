import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PlaneLanding, PlaneTakeoff } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function BoardingProcessPage() {
  const processGroups = [
    {
      id: "departure",
      title: "出发",
      subtitle: "Departure",
      icon: PlaneTakeoff,
      processes: [
        {
          id: 1,
          title: "国内出发流程",
          subtitle: "Domestic Departure",
          src: "/flights-process/domestic-departure.png",
        },
        {
          id: 2,
          title: "国际出发流程",
          subtitle: "International Departure",
          src: "/flights-process/international-departure.png",
        },
      ],
    },
    {
      id: "arrival",
      title: "到达",
      subtitle: "Arrival",
      icon: PlaneLanding,
      processes: [
        {
          id: 3,
          title: "国内到达流程",
          subtitle: "Domestic Arrival",
          src: "/flights-process/domestic-arrival.png",
        },
        {
          id: 4,
          title: "国际到达流程",
          subtitle: "International Arrival",
          src: "/flights-process/international-arrival.png",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 min-h-screen bg-background pb-6">
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

      <div className="mb-6 rounded-lg bg-neutral-100 p-4 border border-neutral-200">
        <h1 className="text-2xl font-bold text-foreground mb-2">乘机流程图</h1>
        <p className="text-sm text-muted-foreground">
          本流程图以上海浦东机场为例，适用于常规乘机，仅供参考，具体要求以当地机场、航空公司公布的政策为准。
        </p>
      </div>

      <div className="space-y-8 max-w-7xl mx-auto">
        {processGroups.map(group => {
          const Icon = group.icon;
          return (
            <div key={group.id} className="space-y-4">
              {/* 分组标题 */}
              <div className="flex items-center gap-3 text-accent-foreground px-4 py-3 rounded-md">
                <Icon className="w-6 h-6" />
                <div>
                  <h2 className="text-xl font-bold">{group.title}</h2>
                  <p className="text-sm">{group.subtitle}</p>
                </div>
              </div>

              {/* 流程图列表 - 垂直堆叠 */}
              <div className="space-y-6">
                {group.processes.map(process => (
                  <Image
                    src={process.src}
                    alt={process.title}
                    width={1200}
                    height={300}
                    className="w-full h-auto"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

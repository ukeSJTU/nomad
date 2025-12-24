import { ArrowRight, Info, Plane } from "lucide-react";
import Link from "next/link";

export default function MoreServicesPage() {
  const services = [
    {
      href: "#",
      icon: Info,
      title: "报销凭证",
      description: "提供报销凭证下载和管理服务",
      color: "bg-green-100 text-green-600",
      hoverColor: "hover:bg-green-50",
      comingSoon: true,
    },
    {
      href: "/flights/guide",
      icon: Plane,
      title: "机场攻略",
      description: "查看热门机场简介、交通指引及乘机流程",
      color: "bg-blue-100 text-blue-600",
      hoverColor: "hover:bg-blue-50",
    },
    {
      href: "#",
      icon: Info,
      title: "国内机场大全",
      description: "全面的国内机场信息查询",
      color: "bg-orange-100 text-orange-600",
      hoverColor: "hover:bg-orange-50",
      comingSoon: true,
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="text-muted-foreground mb-4 text-xs">
        <Link href="/flights" className="hover:text-primary">
          机票首页
        </Link>{" "}
        &gt; 更多服务
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-normal text-foreground bg-muted p-3 mb-6 border-l-4 border-primary">
        更多服务
      </h1>

      <p className="text-muted-foreground mb-8 text-sm">
        探索更多飞行相关的贴心服务，让您的旅程更加便捷舒适
      </p>

      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map(service => {
          const Icon = service.icon;
          const content = (
            <div
              className={`bg-white border border-gray-200 p-6 transition-all h-full ${
                service.comingSoon
                  ? "opacity-75 cursor-not-allowed"
                  : `cursor-pointer hover:shadow-lg ${service.hoverColor}`
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  {service.comingSoon && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      即将推出
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  {service.description}
                </p>

                {!service.comingSoon && (
                  <div className="flex items-center text-sm text-[#0066cc] font-medium group">
                    立即查看{" "}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </div>
            </div>
          );

          if (service.comingSoon) {
            return (
              <div key={service.title} className="relative">
                {content}
              </div>
            );
          }

          return (
            <Link key={service.title} href={service.href} className="block">
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

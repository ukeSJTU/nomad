import { getCityByIataCodeAction } from "@/actions/airport-guide";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AirportDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Extract IATA code from slug (e.g., "airport-BJS" -> "BJS")
  const match = slug.match(/^airport-([a-zA-Z]{3})$/);

  if (!match) {
    notFound();
  }

  const cityIataCode = match[1].toUpperCase();

  // Fetch city from DB
  const city = await getCityByIataCodeAction(cityIataCode);

  if (!city) {
    notFound();
  }

  const airportName = `${city.name}机场`;
  const isBeijing = cityIataCode === "BJS" || cityIataCode === "PEK";

  // Content Data (Mocked/Static based on crawl)
  const introContent = isBeijing ? (
    <>
      <p className="mb-4">
        北京首都国际机场位于北京市东北侧六环内，距离市区中心的车程大约30公里，是全中国最重要、规模最大、运输最繁忙的大型国际航空港。作为中国第一国门，这里也是全世界设施及服务最先进的机场之一，拥有十分高效、细致的航空服务。
      </p>
      <p className="mb-4">
        机场目前共有三座航站楼，航站楼间有免费的摆渡车可以方便中转。而各航站楼内部，也有便捷的设施帮助旅客出行，Wifi覆盖、咨询问讯处、休息区、购物区、商务中心、儿童游乐区、行李寄存与搬运、特殊旅客便利设施等一应俱全，可以满足一般旅客所有的出行需求。
      </p>
      <p>
        同时，机场开通了前往市区中心的地铁线和十几条大巴路线，还有通向天津、秦皇岛、唐山等津冀主要城市的直通班车，交通非常方便，旅客可以在此感受便捷、舒适的出行体验。
      </p>
    </>
  ) : (
    <p>
      {airportName}位于{city.name}
      ，是该地区重要的交通枢纽。机场设施完善，服务周到，为旅客提供便捷的出行体验。
      这里拥有现代化的航站楼、宽敞的候机大厅以及丰富多样的商业餐饮设施。
    </p>
  );

  const trafficContent = isBeijing ? (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">公交/地铁/出租</h3>
      <div className="bg-muted p-4 rounded-md">
        <h4 className="font-bold mb-2">[空港1路]</h4>
        <p className="text-sm mb-1">起终点：2号航站楼 - 樱花园</p>
        <p className="text-sm mb-1">运行时间：05:20-22:30</p>
        <p className="text-sm text-muted-foreground">
          备注信息：发车间隔不超过15分钟。发车时间以实际为准。
        </p>
      </div>
      <div className="bg-muted p-4 rounded-md">
        <h4 className="font-bold mb-2">[空港2路]</h4>
        <p className="text-sm mb-1">起终点：2号航站楼 - 后俸伯</p>
        <p className="text-sm mb-1">运行时间：06:00-21:00</p>
      </div>
    </div>
  ) : (
    <p>暂无{airportName}的详细交通信息，请查阅当地交通指南。</p>
  );

  const phoneContent = isBeijing ? (
    <div className="space-y-2 text-sm">
      <p>
        <span className="font-bold">北京首都国际机场:</span> 010-96158
      </p>
      <p>
        <span className="font-bold">1号/5号停车场预约:</span> 010-64540814
      </p>
      <p>
        <span className="font-bold">2号停车楼咨询:</span> 010-64590704
      </p>
      <p>
        <span className="font-bold">3号停车楼咨询:</span> 010-64530133
      </p>
      <p>
        <span className="font-bold">出租车调度管理:</span> 010-64558892
      </p>
      <p>
        <span className="font-bold">失物招领:</span> 010-96158
      </p>
    </div>
  ) : (
    <p>暂无{airportName}的详细电话信息。</p>
  );

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="text-muted-foreground mb-4 text-xs">
        <Link href="/flights" className="hover:text-primary">
          首页
        </Link>{" "}
        &gt;{" "}
        <Link href="/flights/guide" className="hover:text-primary">
          机场攻略
        </Link>{" "}
        &gt; {city.name}
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-6">{airportName}</h1>

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none mb-6">
          <TabsTrigger
            value="home"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-6 py-3 text-base"
          >
            机场首页
          </TabsTrigger>
          <TabsTrigger
            value="intro"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-6 py-3 text-base"
          >
            机场简介
          </TabsTrigger>
          <TabsTrigger
            value="traffic"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-6 py-3 text-base"
          >
            机场交通
          </TabsTrigger>
          <TabsTrigger
            value="phone"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-6 py-3 text-base"
          >
            机场电话
          </TabsTrigger>
        </TabsList>

        <div className="flex gap-6">
          <div className="flex-1">
            <TabsContent value="home" className="mt-0 space-y-6">
              {/* Intro Section */}
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-[#0066cc]">
                  {airportName}简介
                </h2>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {introContent}
                </div>
                <div className="text-right">
                  <span className="text-[#0066cc] text-xs cursor-pointer hover:underline">
                    查看全部简介&gt;&gt;
                  </span>
                </div>
              </div>

              {/* Airlines Discount Tickets (Mock) */}
              <div className="border-t pt-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  航空公司打折机票
                </h2>
                <div className="bg-[#f4f8ff] border border-[#e1e9f5] p-4">
                  <div className="grid grid-cols-4 gap-y-3 gap-x-4 text-xs">
                    {[
                      "四川航空",
                      "祥鹏航空",
                      "奥凯航空",
                      "中国国航",
                      "大新华",
                      "南方航空",
                      "成都航空",
                      "上海航空",
                      "华夏航空",
                      "天津航空",
                      "吉祥航空",
                      "海南航空",
                      "首都航空",
                      "幸福航空",
                      "中国联航",
                      "昆明航空",
                      "厦门航空",
                      "东方航空",
                      "河北航空",
                      "西部航空",
                      "山东航空",
                      "西藏航空",
                      "深圳航空",
                      "春秋航空",
                    ].map(airline => (
                      <div
                        key={airline}
                        className="flex items-center gap-2 cursor-pointer hover:text-[#0066cc]"
                      >
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        {airline}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hot Timetable */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {city.name}热门时刻表
                  </h2>
                  <span className="text-[#0066cc] text-xs cursor-pointer hover:underline">
                    更多机场&gt;&gt;
                  </span>
                </div>
                <div className="bg-[#f4f8ff] border border-[#e1e9f5] p-4">
                  <div className="grid grid-cols-5 gap-y-3 gap-x-4 text-xs">
                    {[
                      "上海",
                      "广州",
                      "深圳",
                      "成都",
                      "杭州",
                      "武汉",
                      "西安",
                      "重庆",
                      "青岛",
                      "长沙",
                      "南京",
                      "昆明",
                      "厦门",
                      "三亚",
                      "海口",
                      "乌鲁木齐",
                      "哈尔滨",
                      "沈阳",
                      "大连",
                      "郑州",
                    ].map(dest => (
                      <Link
                        key={dest}
                        href="#"
                        className="text-[#0066cc] hover:underline block truncate"
                      >
                        {city.name}到{dest}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="intro" className="mt-0">
              <Card className="border-none shadow-none">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg font-bold text-[#0066cc]">
                    {airportName}详细介绍
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 text-sm text-gray-600 leading-relaxed">
                  {introContent}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="traffic" className="mt-0">
              <Card className="border-none shadow-none">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg font-bold text-[#0066cc]">
                    交通指南
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0">{trafficContent}</CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="phone" className="mt-0">
              <Card className="border-none shadow-none">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg font-bold text-[#0066cc]">
                    常用电话
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0">{phoneContent}</CardContent>
              </Card>
            </TabsContent>
          </div>

          {/* Right Sidebar (Reused from Home) */}
          <aside className="w-[280px] space-y-4">
            <Card className="bg-blue-50/50 border-blue-100">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-700">相关链接</span>
                </div>
                <div className="space-y-2 text-sm">
                  <Link
                    href="/flights/guide"
                    className="block text-primary hover:underline"
                  >
                    返回机场攻略首页
                  </Link>
                  <Link
                    href="/flights"
                    className="block text-primary hover:underline"
                  >
                    特价机票查询
                  </Link>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Tabs>
    </div>
  );
}

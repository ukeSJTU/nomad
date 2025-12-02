import { getAirportByIataCodeAction } from "@/actions/airport-guide";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AirportDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Extract IATA code from slug (e.g., "airport-PEK" -> "PEK")
  const match = slug.match(/^airport-([a-zA-Z]{3})$/);

  if (!match) {
    console.log("Invalid slug format:", slug);
    notFound();
  }

  const airportIataCode = match[1].toUpperCase();

  // Fetch airport from DB
  const airport = await getAirportByIataCodeAction(airportIataCode);

  if (!airport) {
    notFound();
  }

  const airportName = airport.name;
  const cityName = airport.city.name;

  // Content Data - 所有机场使用相同的模板文本
  const introContent = (
    <>
      <p className="mb-4">
        {airportName}位于{cityName}
        ，是该地区重要的交通枢纽和航空门户。机场设施完善，服务周到，为旅客提供便捷、舒适的出行体验。
      </p>
      <p className="mb-4">
        机场拥有现代化的航站楼，配备了先进的设施帮助旅客出行。Wifi覆盖、咨询问讯处、休息区、购物区、商务中心、儿童游乐区、行李寄存与搬运、特殊旅客便利设施等一应俱全，可以满足旅客的各种出行需求。
      </p>
      <p>
        同时，机场开通了前往市区的多种交通方式，包括地铁、机场大巴、出租车等，交通十分便利，旅客可以根据自己的需求选择合适的出行方式。
      </p>
    </>
  );

  const trafficContent = (
    <div className="space-y-4">
      <h3 className="font-bold text-lg text-foreground">公交/地铁/出租</h3>
      <div className="bg-muted p-4 rounded-md">
        <h4 className="font-bold mb-2 text-foreground">机场快线</h4>
        <p className="text-sm mb-1 text-foreground">
          连接机场与市区主要交通枢纽
        </p>
        <p className="text-sm mb-1 text-foreground">运行时间：06:00-23:00</p>
        <p className="text-sm text-muted-foreground">
          发车间隔约15-20分钟，具体时刻请以现场公告为准。
        </p>
      </div>
      <div className="bg-muted p-4 rounded-md">
        <h4 className="font-bold mb-2 text-foreground">机场大巴</h4>
        <p className="text-sm mb-1 text-foreground">多条线路覆盖市区主要区域</p>
        <p className="text-sm mb-1 text-foreground">
          运行时间：根据航班动态调整
        </p>
        <p className="text-sm text-muted-foreground">
          详细线路和时刻表请咨询机场问讯处。
        </p>
      </div>
    </div>
  );

  const phoneContent = (
    <div className="space-y-2 text-sm text-foreground">
      <p>
        <span className="font-bold">{airportName}总机:</span> 查询当地114
      </p>
      <p>
        <span className="font-bold">问讯服务:</span> 机场总机转问讯台
      </p>
      <p>
        <span className="font-bold">失物招领:</span> 机场总机转失物招领处
      </p>
      <p className="mt-4 text-muted-foreground">
        温馨提示：具体联系电话请拨打机场总机或访问机场官方网站查询。
      </p>
    </div>
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
        &gt; {cityName}
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-6">{airportName}</h1>

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-border rounded-none mb-6">
          <TabsTrigger
            value="home"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-6 py-3 text-base text-foreground"
          >
            机场首页
          </TabsTrigger>
          <TabsTrigger
            value="intro"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-6 py-3 text-base text-foreground"
          >
            机场简介
          </TabsTrigger>
          <TabsTrigger
            value="traffic"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-6 py-3 text-base text-foreground"
          >
            机场交通
          </TabsTrigger>
          <TabsTrigger
            value="phone"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-6 py-3 text-base text-foreground"
          >
            机场电话
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <TabsContent value="home" className="mt-0 space-y-6">
              {/* Intro Section */}
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-primary">
                  {airportName}简介
                </h2>
                <div className="text-sm text-foreground leading-relaxed">
                  {introContent}
                </div>
                <div className="text-right">
                  <span className="text-primary text-xs cursor-pointer hover:underline">
                    查看全部简介&gt;&gt;
                  </span>
                </div>
              </div>

              {/* Airlines Discount Tickets (Mock) */}
              <div className="border-t border-border pt-6">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  航空公司打折机票
                </h2>
                <div className="bg-accent/50 border border-accent p-4 rounded-md">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-4 text-xs">
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
                        className="flex items-center gap-2 cursor-pointer text-foreground hover:text-primary transition-colors"
                      >
                        <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                        {airline}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hot Timetable */}
              <div className="border-t border-border pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-foreground">
                    {cityName}热门时刻表
                  </h2>
                  <span className="text-primary text-xs cursor-pointer hover:underline">
                    更多机场&gt;&gt;
                  </span>
                </div>
                <div className="bg-accent/50 border border-accent p-4 rounded-md">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-3 gap-x-4 text-xs">
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
                        className="text-primary hover:underline block truncate"
                      >
                        {cityName}到{dest}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="intro" className="mt-0">
              <Card className="border-none shadow-none">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg font-bold text-primary">
                    {airportName}详细介绍
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 text-sm text-foreground leading-relaxed">
                  {introContent}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="traffic" className="mt-0">
              <Card className="border-none shadow-none">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg font-bold text-primary">
                    交通指南
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0">{trafficContent}</CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="phone" className="mt-0">
              <Card className="border-none shadow-none">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg font-bold text-primary">
                    常用电话
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0">{phoneContent}</CardContent>
              </Card>
            </TabsContent>
          </div>

          {/* Right Sidebar (Reused from Home) */}
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
        </div>
      </Tabs>
    </div>
  );
}

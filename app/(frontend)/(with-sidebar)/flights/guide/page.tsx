import { getPopularAirportsAction } from "@/actions/airport-guide";
import { ArrowRight, Plane } from "lucide-react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";

export default async function AirportGuidePage() {
  // Fetch popular cities with their airports from DB
  const popularCities = await getPopularAirportsAction();

  const domesticCities = popularCities.filter(c => c.isDomestic);
  const internationalCities = popularCities.filter(c => !c.isDomestic);

  // Group by city-airport pairs (not flattened)
  const domesticAirports = domesticCities.flatMap(city =>
    city.airports.map(airport => ({
      cityName: city.name,
      airportName: airport.name,
      airportCode: airport.iataCode,
      key: airport.id,
    }))
  );

  const internationalAirports = internationalCities.flatMap(city =>
    city.airports.map(airport => ({
      cityName: city.name,
      airportName: airport.name,
      airportCode: airport.iataCode,
      key: airport.id,
    }))
  );

  return (
    <div className="container mx-auto pb-4 px-4 flex flex-col lg:flex-row gap-6 min-h-screen bg-background">
      <div className="flex-1">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/flights">机票首页</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>机场攻略</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="space-y-8">
          <h1 className="text-2xl font-normal text-foreground bg-muted p-3 mb-6 border-l-4 border-primary">
            热门机场
          </h1>

          {/* Domestic Airports */}
          <div className="mb-8">
            <div className="border-b-2 border-primary mb-4 pb-1">
              <h2 className="text-primary font-bold text-lg inline-block mr-4">
                国内机场
              </h2>
            </div>

            <div className="bg-card p-6 border border-border rounded-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {domesticAirports.map(airport => (
                  <Link
                    key={airport.key}
                    href={`/flights/guide/airport-${airport.airportCode}`}
                    className="group block"
                  >
                    <div className="flex flex-row items-baseline gap-2 min-w-0">
                      <div className="font-bold text-foreground group-hover:text-primary transition-colors shrink-0">
                        {airport.cityName}
                      </div>
                      <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors truncate">
                        {airport.airportName}
                      </div>
                    </div>
                  </Link>
                ))}
                {domesticAirports.length === 0 && (
                  <div className="col-span-full text-muted-foreground text-sm">
                    暂无热门国内机场数据
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* International Airports */}
          <div>
            <div className="border-b-2 border-primary mb-4 pb-1">
              <h2 className="text-primary font-bold text-lg inline-block mr-4">
                国际/中国港澳台地区机场
              </h2>
            </div>

            <div className="bg-card p-6 border border-border rounded-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {internationalAirports.map(airport => (
                  <Link
                    key={airport.key}
                    href={`/flights/guide/airport-${airport.airportCode}`}
                    className="group block"
                  >
                    <div className="flex flex-row items-baseline gap-2 min-w-0">
                      <div className="font-bold text-foreground group-hover:text-primary transition-colors shrink-0">
                        {airport.cityName}
                      </div>
                      <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors truncate">
                        {airport.airportName}
                      </div>
                    </div>
                  </Link>
                ))}
                {internationalAirports.length === 0 && (
                  <div className="col-span-full text-muted-foreground text-sm">
                    暂无热门国际机场数据
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className="w-full lg:w-[280px] space-y-4">
        {/* Boarding Process Card */}
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

        {/* Weather Card: Using hardcoded data is expected for demonstration */}
        <Card className="bg-accent/50 border border-accent shadow-none">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4 border-b border-accent pb-2">
              <span className="font-bold text-primary">今日天气</span>
              <span className="text-primary text-xs cursor-not-allowed opacity-70">
                查看更多 &gt;
              </span>
            </div>

            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xl font-bold text-foreground">北京</div>
                <div className="text-xs text-muted-foreground mt-1">
                  2025-12-02 周一
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-light text-primary">-3℃~5℃</div>
                <div className="text-sm text-muted-foreground">多云</div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-accent">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">明天 (12-03)</span>
                <span className="text-muted-foreground">多云</span>
                <span className="text-foreground font-medium">-7℃~0℃</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">后天 (12-04)</span>
                <span className="text-muted-foreground">晴</span>
                <span className="text-foreground font-medium">-8℃~-2℃</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

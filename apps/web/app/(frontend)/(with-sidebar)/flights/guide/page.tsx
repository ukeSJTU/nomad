import { getPopularAirportsAction } from "@/actions/airport-guide";

import { AirportList, GuideSidebar } from "@/components/flights";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const dynamic = "force-dynamic";

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

          <AirportList
            title="国内机场"
            airports={domesticAirports}
            emptyMessage="暂无热门国内机场数据"
          />

          <AirportList
            title="国际/中国港澳台地区机场"
            airports={internationalAirports}
            emptyMessage="暂无热门国际机场数据"
          />
        </div>
      </div>

      <GuideSidebar />
    </div>
  );
}

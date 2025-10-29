import { redirect } from "next/navigation";
import { Suspense } from "react";

import {
  FlightSearchResult,
  RoundTripFlightSearchResult,
  searchOneWayFlights,
  searchRoundTripFlights,
} from "@/lib/queries";
import { getAllCities } from "@/lib/queries/cities";

import { FlightSearchPageClient } from "./page.client";

interface FlightSearchParams {
  tripType?: string;
  from?: string;
  to?: string;
  departDate?: string;
  returnDate?: string; // Add if you handle round trips
  class?: string;
}

export default async function FlightSearchPage({
  searchParams,
}: {
  searchParams: Promise<FlightSearchParams>;
}) {
  const params = await searchParams;

  if (!params.from || !params.to || !params.departDate) {
    redirect("/flights");
  }

  console.log(params.tripType);

  // 处理舱位类型
  const classType = params.class?.toUpperCase() as
    | "ECONOMY"
    | "BUSINESS"
    | "FIRST"
    | undefined;

  let flights: FlightSearchResult[] | RoundTripFlightSearchResult | undefined;

  try {
    if (params.tripType === "one-way") {
      // 单程航班搜索
      flights = await searchOneWayFlights({
        from: params.from,
        to: params.to,
        departureDate: params.departDate,
        classType,
      });
    } else if (params.tripType === "round-trip") {
      // 往返航班搜索 - 需要验证返程日期
      if (!params.returnDate) {
        redirect("/flights");
      }

      flights = await searchRoundTripFlights({
        from: params.from,
        to: params.to,
        departureDate: params.departDate,
        returnDate: params.returnDate,
        classType,
      });
    } else {
      // 默认为单程
      flights = await searchOneWayFlights({
        from: params.from,
        to: params.to,
        departureDate: params.departDate,
        classType,
      });
    }
  } catch (error) {
    console.error(error);
  }

  console.log(flights);

  // Fetch city data on the server
  const cities = await getAllCities();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightSearchPageClient cities={cities} />
    </Suspense>
  );
}

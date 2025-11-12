"use client";

import { Clock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { FlightCard } from "@/components/flights/flight-card";
import { FlightCardSkeleton } from "@/components/flights/flight-card-skeleton";
import { FlightFilterSort } from "@/components/flights/flight-filter-sort";
import { QuickDateSelector } from "@/components/flights/quick-date-selector";
import {
  SearchForm,
  type SearchFormData,
} from "@/components/flights/search-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type {
  FlightSearchResult,
  RoundTripFlightSearchResult,
} from "@/lib/queries";
import type { CityData } from "@/lib/queries/cities";
import { formatDateWithWeekday, formatTime } from "@/utils/date";
import {
  calculateDaysOffset,
  calculateFlightDuration,
  formatAirportDisplay,
  formatDuration,
  formatFlightTime,
  getLowestPrice,
} from "@/utils/flight";

interface FlightSearchPageClientProps {
  cities: CityData[];
  flights?: FlightSearchResult[] | RoundTripFlightSearchResult;
  tripType?: "one-way" | "round-trip";
}

export function FlightSearchPageClient({
  cities,
  flights,
  tripType: _initialTripType,
}: FlightSearchPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [filteredFlights, setFilteredFlights] = useState<FlightSearchResult[]>(
    []
  );
  const [activeRoundTripTab, setActiveRoundTripTab] = useState<
    "outbound" | "return"
  >("outbound");

  // Store selected outbound flight seat class ID for round-trip
  const [selectedOutboundSeatClassId, setSelectedOutboundSeatClassId] =
    useState<string | null>(null);

  // Parse and validate URL parameters
  const parsedParams = useMemo(() => {
    const tripType = searchParams.get("tripType");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const departDate = searchParams.get("departDate");
    const returnDate = searchParams.get("returnDate");
    const seatClass = searchParams.get("class");

    // Validate required params
    if (!tripType || !from || !to || !departDate || !seatClass) {
      return null;
    }

    // Find matching cities
    const departureCity = cities.find(city => city.iataCode === from);
    const arrivalCity = cities.find(city => city.iataCode === to);

    if (!departureCity || !arrivalCity) {
      return null;
    }

    return {
      tripType: tripType as "one-way" | "round-trip",
      departureCity,
      arrivalCity,
      departureDate: new Date(departDate),
      returnDate: returnDate ? new Date(returnDate) : undefined,
      seatClass,
    };
  }, [searchParams, cities]);

  // Redirect to /flights if params are invalid
  useEffect(() => {
    if (!parsedParams) {
      router.replace("/flights");
    }
  }, [parsedParams, router]);

  useEffect(() => {
    // Update last refresh time when search params change
    if (parsedParams) {
      setLastUpdateTime(new Date());
    }
  }, [searchParams, parsedParams]);

  // Handle form changes (auto-search)
  const handleFormChange = (data: SearchFormData) => {
    // The SearchForm component already validates required fields before calling onChange
    // So we can safely build the URL here
    const params = new URLSearchParams();
    params.set("tripType", data.tripType);
    params.set("from", data.departureCity!.iataCode);
    params.set("to", data.arrivalCity!.iataCode);
    params.set("departDate", data.departureDate!.toISOString().split("T")[0]);
    if (data.returnDate && data.tripType === "round-trip") {
      params.set("returnDate", data.returnDate.toISOString().split("T")[0]);
    }
    params.set("class", data.seatClass);

    const newUrl = `/flights/search?${params.toString()}`;
    const currentUrl = `/flights/search?${searchParams.toString()}`;

    // Only navigate if the URL actually changed
    if (newUrl !== currentUrl) {
      router.push(newUrl);
    }
  };

  // If params are invalid, show nothing (will redirect)
  if (!parsedParams) {
    return null;
  }

  // Get display values from parsed params
  const {
    tripType,
    departureCity,
    arrivalCity,
    departureDate,
    returnDate,
    seatClass,
  } = parsedParams;

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* 1. Search Form (filled with URL params, no search button) */}
      <div className="pb-6">
        <SearchForm
          showSearchButton={false}
          cities={cities}
          initialValues={{
            tripType,
            departureCity,
            arrivalCity,
            departureDate,
            returnDate,
            seatClass,
          }}
          onChange={handleFormChange}
        />
      </div>

      {/* 2. Quick Date Selector */}
      {parsedParams && (
        <div className="items-center pb-2 w-full">
          <QuickDateSelector
            from={parsedParams.departureCity.iataCode}
            to={parsedParams.arrivalCity.iataCode}
            departureDate={
              parsedParams.departureDate.toISOString().split("T")[0]
            }
            returnDate={parsedParams.returnDate?.toISOString().split("T")[0]}
            tripType={parsedParams.tripType}
            classType={
              parsedParams.seatClass === "any"
                ? undefined
                : (parsedParams.seatClass.toUpperCase() as
                    | "ECONOMY"
                    | "BUSINESS"
                    | "FIRST")
            }
          />
        </div>
      )}

      {/* 3. Search Info + Last Update Time */}
      <div className="mb-6 flex items-center justify-between">
        {/* Left: Trip Info */}
        {tripType === "one-way" ? (
          // One-way trip: Enhanced text display with hierarchy
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              单程
            </span>
            <span className="text-lg font-semibold text-foreground">
              {departureCity.name}
            </span>
            <span className="text-base text-muted-foreground">→</span>
            <span className="text-lg font-semibold text-foreground">
              {arrivalCity.name}
            </span>
            <Separator orientation="vertical" className="h-5" />
            <span className="text-sm font-medium text-muted-foreground">
              {formatDateWithWeekday(departureDate)}
            </span>
          </div>
        ) : (
          // Round-trip: Tabs for outbound and return with enhanced styling
          <Tabs
            value={activeRoundTripTab}
            onValueChange={value =>
              setActiveRoundTripTab(value as "outbound" | "return")
            }
            className="w-auto"
          >
            <TabsList className="h-auto">
              <TabsTrigger
                value="outbound"
                className="flex-col items-start py-2 px-3"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    1
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wide opacity-70">
                    选择去程
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-semibold">
                    {departureCity.name}
                  </span>
                  <span className="text-xs opacity-60">→</span>
                  <span className="text-sm font-semibold">
                    {arrivalCity.name}
                  </span>
                  <span className="text-xs font-medium opacity-70 ml-1">
                    {formatDateWithWeekday(departureDate)}
                  </span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="return"
                className="flex-col items-start py-2 px-3"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    2
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wide opacity-70">
                    选择返程
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-semibold">
                    {arrivalCity.name}
                  </span>
                  <span className="text-xs opacity-60">→</span>
                  <span className="text-sm font-semibold">
                    {departureCity.name}
                  </span>
                  <span className="text-xs font-medium opacity-70 ml-1">
                    {returnDate && formatDateWithWeekday(returnDate)}
                  </span>
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {/* Right: Last Update Time with Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-help hover:text-foreground transition-colors">
              <Clock className="h-4 w-4" />
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-wide opacity-60">
                  最近更新
                </span>
                <span className="text-sm font-mono font-semibold">
                  {formatTime(lastUpdateTime)}
                </span>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>机票价格变动频繁，搜索结果有效期15min。</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* 4. Search Toolbar (Filtering and Sorting) - Sticky */}
      {flights &&
        (Array.isArray(flights)
          ? flights.length > 0 && (
              <FlightFilterSort
                flights={flights}
                onFilteredFlightsChange={setFilteredFlights}
              />
            )
          : (flights.outbound.length > 0 || flights.inbound.length > 0) && (
              <FlightFilterSort
                flights={
                  activeRoundTripTab === "outbound"
                    ? flights.outbound
                    : flights.inbound
                }
                onFilteredFlightsChange={setFilteredFlights}
              />
            ))}

      {/* 5. Search Results Cards */}
      <div className="space-y-4">
        {!flights ? (
          // Loading state
          <>
            {[1, 2, 3, 4, 5].map(i => (
              <FlightCardSkeleton key={i} />
            ))}
          </>
        ) : Array.isArray(flights) ? (
          // One-way flights
          filteredFlights.length > 0 ? (
            filteredFlights.map(flight => {
              const durationMinutes = calculateFlightDuration(
                flight.departure.datetime,
                flight.arrival.datetime
              );
              const daysOffset = calculateDaysOffset(
                flight.departure.datetime,
                flight.arrival.datetime
              );
              const lowestPrice = getLowestPrice(flight.seatClasses);

              return (
                <FlightCard
                  key={flight.id}
                  airlineLogo={flight.airline.logoUrl || undefined}
                  airlineName={flight.airline.name}
                  flightNumber={flight.flightNumber}
                  aircraftType={flight.aircraftType || "N/A"}
                  departureTime={formatFlightTime(flight.departure.datetime)}
                  departureAirport={formatAirportDisplay(
                    flight.departure.airport.name,
                    flight.departure.terminal
                  )}
                  arrivalTime={formatFlightTime(flight.arrival.datetime)}
                  arrivalAirport={formatAirportDisplay(
                    flight.arrival.airport.name,
                    flight.arrival.terminal
                  )}
                  daysOffset={daysOffset > 0 ? daysOffset : undefined}
                  duration={formatDuration(durationMinutes)}
                  price={lowestPrice}
                  buttonText="订票"
                  onButtonClick={() => {
                    // For one-way flights, find the seat class matching the selected class type
                    const selectedSeatClass = flight.seatClasses.find(
                      sc => sc.classType === seatClass.toUpperCase()
                    );

                    if (selectedSeatClass) {
                      // Navigate to passengers page with flight seat class ID
                      router.push(
                        `/flights/booking/passengers?seatClassId=${selectedSeatClass.id}`
                      );
                    }
                  }}
                />
              );
            })
          ) : (
            // No results for one-way
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>未找到航班</CardTitle>
                <CardDescription>
                  抱歉,没有找到符合您搜索条件的航班。请尝试调整搜索条件。
                </CardDescription>
              </CardHeader>
            </Card>
          )
        ) : // Round-trip flights - use filtered flights based on active tab
        filteredFlights.length > 0 ? (
          filteredFlights.map(flight => {
            const durationMinutes = calculateFlightDuration(
              flight.departure.datetime,
              flight.arrival.datetime
            );
            const daysOffset = calculateDaysOffset(
              flight.departure.datetime,
              flight.arrival.datetime
            );
            const lowestPrice = getLowestPrice(flight.seatClasses);

            return (
              <FlightCard
                key={flight.id}
                airlineLogo={flight.airline.logoUrl || undefined}
                airlineName={flight.airline.name}
                flightNumber={flight.flightNumber}
                aircraftType={flight.aircraftType || "N/A"}
                departureTime={formatFlightTime(flight.departure.datetime)}
                departureAirport={formatAirportDisplay(
                  flight.departure.airport.name,
                  flight.departure.terminal
                )}
                arrivalTime={formatFlightTime(flight.arrival.datetime)}
                arrivalAirport={formatAirportDisplay(
                  flight.arrival.airport.name,
                  flight.arrival.terminal
                )}
                daysOffset={daysOffset > 0 ? daysOffset : undefined}
                duration={formatDuration(durationMinutes)}
                price={lowestPrice}
                buttonText={
                  activeRoundTripTab === "outbound" ? "选择去程" : "选择返程"
                }
                onButtonClick={() => {
                  // Find the seat class matching the selected class type
                  const selectedSeatClass = flight.seatClasses.find(
                    sc => sc.classType === seatClass.toUpperCase()
                  );

                  if (!selectedSeatClass) return;

                  if (activeRoundTripTab === "outbound") {
                    // Store outbound selection and switch to return tab
                    setSelectedOutboundSeatClassId(selectedSeatClass.id);
                    setActiveRoundTripTab("return");
                  } else {
                    // Both flights selected, navigate to booking with both IDs
                    if (selectedOutboundSeatClassId) {
                      router.push(
                        `/flights/booking/passengers?outboundSeatClassId=${selectedOutboundSeatClassId}&inboundSeatClassId=${selectedSeatClass.id}`
                      );
                    }
                  }
                }}
              />
            );
          })
        ) : (
          // No results for round-trip
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>未找到航班</CardTitle>
              <CardDescription>
                抱歉,没有找到符合您搜索条件的航班。请尝试调整搜索条件。
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}

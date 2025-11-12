"use client";

import {
  Armchair,
  ArrowDownAZ,
  ArrowUpAZ,
  Clock,
  DollarSign,
  Plane,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { FlightSearchResult } from "@/lib/queries";

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "duration-asc"
  | "duration-desc"
  | "departure-asc"
  | "departure-desc";

export type TimeRange = "0-6" | "6-12" | "12-18" | "18-24";
export type SeatClassType = "ECONOMY" | "BUSINESS" | "FIRST";

export interface FlightFilters {
  airlines: string[]; // Array of airline IDs
  seatClasses: SeatClassType[]; // Array of seat class types
  departureTimeRanges: TimeRange[];
  arrivalTimeRanges: TimeRange[];
}

interface FlightFilterSortProps {
  flights: FlightSearchResult[];
  onFilteredFlightsChange: (flights: FlightSearchResult[]) => void;
  /** Initial seat classes to filter by (for linking with search form) */
  initialSeatClasses?: SeatClassType[];
}

export function FlightFilterSort({
  flights,
  onFilteredFlightsChange,
  initialSeatClasses = [],
}: FlightFilterSortProps) {
  const [sortOption, setSortOption] = useState<SortOption>("price-asc");
  const [filters, setFilters] = useState<FlightFilters>({
    airlines: [],
    seatClasses: initialSeatClasses,
    departureTimeRanges: [],
    arrivalTimeRanges: [],
  });

  // Extract unique airlines from flights
  const airlines = useMemo(() => {
    const airlineMap = new Map<
      string,
      { id: string; name: string; iataCode: string }
    >();
    flights.forEach(flight => {
      if (!airlineMap.has(flight.airline.id)) {
        airlineMap.set(flight.airline.id, {
          id: flight.airline.id,
          name: flight.airline.name,
          iataCode: flight.airline.iataCode,
        });
      }
    });
    return Array.from(airlineMap.values());
  }, [flights]);

  // Helper function to check if time is in range
  const isTimeInRange = (datetime: string, range: TimeRange): boolean => {
    const date = new Date(datetime);
    const hour = date.getHours();

    switch (range) {
      case "0-6":
        return hour >= 0 && hour < 6;
      case "6-12":
        return hour >= 6 && hour < 12;
      case "12-18":
        return hour >= 12 && hour < 18;
      case "18-24":
        return hour >= 18 && hour < 24;
      default:
        return false;
    }
  };

  // Filter and sort flights
  const filteredAndSortedFlights = useMemo(() => {
    // Apply filters
    let filtered = flights;

    // Filter by airlines
    if (filters.airlines.length > 0) {
      filtered = filtered.filter(flight =>
        filters.airlines.includes(flight.airline.id)
      );
    }

    // Filter by seat classes
    if (filters.seatClasses.length > 0) {
      filtered = filtered.filter(flight =>
        flight.seatClasses.some(seatClass =>
          filters.seatClasses.includes(seatClass.classType)
        )
      );
    }

    // Filter by departure time ranges
    if (filters.departureTimeRanges.length > 0) {
      filtered = filtered.filter(flight =>
        filters.departureTimeRanges.some(range =>
          isTimeInRange(flight.departure.datetime, range)
        )
      );
    }

    // Filter by arrival time ranges
    if (filters.arrivalTimeRanges.length > 0) {
      filtered = filtered.filter(flight =>
        filters.arrivalTimeRanges.some(range =>
          isTimeInRange(flight.arrival.datetime, range)
        )
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.lowestPrice - b.lowestPrice;
        case "price-desc":
          return b.lowestPrice - a.lowestPrice;
        case "duration-asc": {
          const durationA =
            new Date(a.arrival.datetime).getTime() -
            new Date(a.departure.datetime).getTime();
          const durationB =
            new Date(b.arrival.datetime).getTime() -
            new Date(b.departure.datetime).getTime();
          return durationA - durationB;
        }
        case "duration-desc": {
          const durationA =
            new Date(a.arrival.datetime).getTime() -
            new Date(a.departure.datetime).getTime();
          const durationB =
            new Date(b.arrival.datetime).getTime() -
            new Date(b.departure.datetime).getTime();
          return durationB - durationA;
        }
        case "departure-asc":
          return (
            new Date(a.departure.datetime).getTime() -
            new Date(b.departure.datetime).getTime()
          );
        case "departure-desc":
          return (
            new Date(b.departure.datetime).getTime() -
            new Date(a.departure.datetime).getTime()
          );
        default:
          return 0;
      }
    });

    return sorted;
  }, [flights, filters, sortOption]);

  // Update parent component when filtered flights change
  useMemo(() => {
    onFilteredFlightsChange(filteredAndSortedFlights);
  }, [filteredAndSortedFlights, onFilteredFlightsChange]);

  // Toggle airline filter
  const toggleAirline = (airlineId: string) => {
    setFilters(prev => ({
      ...prev,
      airlines: prev.airlines.includes(airlineId)
        ? prev.airlines.filter(id => id !== airlineId)
        : [...prev.airlines, airlineId],
    }));
  };

  // Toggle seat class filter
  const toggleSeatClass = (seatClass: SeatClassType) => {
    setFilters(prev => ({
      ...prev,
      seatClasses: prev.seatClasses.includes(seatClass)
        ? prev.seatClasses.filter(sc => sc !== seatClass)
        : [...prev.seatClasses, seatClass],
    }));
  };

  // Toggle time range filter
  const toggleTimeRange = (type: "departure" | "arrival", range: TimeRange) => {
    const key =
      type === "departure" ? "departureTimeRanges" : "arrivalTimeRanges";
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(range)
        ? prev[key].filter(r => r !== range)
        : [...prev[key], range],
    }));
  };

  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: "0-6", label: "00:00-06:00" },
    { value: "6-12", label: "06:00-12:00" },
    { value: "12-18", label: "12:00-18:00" },
    { value: "18-24", label: "18:00-24:00" },
  ];

  const [airlineSelectOpen, setAirlineSelectOpen] = useState(false);
  const [seatClassSelectOpen, setSeatClassSelectOpen] = useState(false);
  const [timeSelectOpen, setTimeSelectOpen] = useState(false);

  const seatClassOptions: { value: SeatClassType; label: string }[] = [
    { value: "ECONOMY", label: "经济舱" },
    { value: "BUSINESS", label: "商务舱" },
    { value: "FIRST", label: "头等舱" },
  ];

  return (
    <div className="sticky top-0 z-10 bg-background pb-6">
      <div className="border rounded-lg p-4 bg-card">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Filtering */}
          <div className="flex items-center gap-3">
            {/* Airline Filter */}
            <Select
              open={airlineSelectOpen}
              onOpenChange={setAirlineSelectOpen}
            >
              <SelectTrigger className="w-auto min-w-[140px]">
                <Plane className="h-5 w-5 mr-2" />
                <SelectValue placeholder="航空公司" />
                {filters.airlines.length > 0 && (
                  <span className="ml-2 text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                    {filters.airlines.length}
                  </span>
                )}
              </SelectTrigger>
              <SelectContent className="w-72">
                <div className="p-3 space-y-2 max-h-80 overflow-y-auto">
                  <div className="text-sm font-semibold mb-2">选择航空公司</div>
                  {airlines.map(airline => (
                    <div
                      key={airline.id}
                      className="flex items-center space-x-2 py-1"
                    >
                      <Checkbox
                        id={`airline-${airline.id}`}
                        checked={filters.airlines.includes(airline.id)}
                        onCheckedChange={() => toggleAirline(airline.id)}
                      />
                      <Label
                        htmlFor={`airline-${airline.id}`}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {airline.name} ({airline.iataCode})
                      </Label>
                    </div>
                  ))}
                </div>
              </SelectContent>
            </Select>

            {/* Seat Class Filter */}
            <Select
              open={seatClassSelectOpen}
              onOpenChange={setSeatClassSelectOpen}
            >
              <SelectTrigger className="w-auto min-w-[140px]">
                <Armchair className="h-5 w-5 mr-2" />
                <SelectValue placeholder="座舱类型" />
                {filters.seatClasses.length > 0 && (
                  <span className="ml-2 text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                    {filters.seatClasses.length}
                  </span>
                )}
              </SelectTrigger>
              <SelectContent className="w-64">
                <div className="p-3 space-y-2">
                  <div className="text-sm font-semibold mb-2">选择座舱类型</div>
                  {seatClassOptions.map(option => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2 py-1"
                    >
                      <Checkbox
                        id={`seat-class-${option.value}`}
                        checked={filters.seatClasses.includes(option.value)}
                        onCheckedChange={() => toggleSeatClass(option.value)}
                      />
                      <Label
                        htmlFor={`seat-class-${option.value}`}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </SelectContent>
            </Select>

            {/* Departure/Arrival Time Filter */}
            <Select open={timeSelectOpen} onOpenChange={setTimeSelectOpen}>
              <SelectTrigger className="w-auto min-w-[140px]">
                <Clock className="h-5 w-5 mr-2" />
                <SelectValue placeholder="起抵时间" />
                {(filters.departureTimeRanges.length > 0 ||
                  filters.arrivalTimeRanges.length > 0) && (
                  <span className="ml-2 text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                    {filters.departureTimeRanges.length +
                      filters.arrivalTimeRanges.length}
                  </span>
                )}
              </SelectTrigger>
              <SelectContent className="w-96">
                <div className="p-4 space-y-4">
                  <div className="text-sm font-semibold">选择起抵时间</div>
                  {/* Departure Time */}
                  <div>
                    <div className="text-sm font-medium mb-2">
                      起飞时间（出发地时间）
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {timeRanges.map(range => (
                        <div
                          key={`departure-${range.value}`}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`departure-${range.value}`}
                            checked={filters.departureTimeRanges.includes(
                              range.value
                            )}
                            onCheckedChange={() =>
                              toggleTimeRange("departure", range.value)
                            }
                          />
                          <Label
                            htmlFor={`departure-${range.value}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {range.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Arrival Time */}
                  <div>
                    <div className="text-sm font-medium mb-2">
                      到达时间（目的地时间）
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {timeRanges.map(range => (
                        <div
                          key={`arrival-${range.value}`}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`arrival-${range.value}`}
                            checked={filters.arrivalTimeRanges.includes(
                              range.value
                            )}
                            onCheckedChange={() =>
                              toggleTimeRange("arrival", range.value)
                            }
                          />
                          <Label
                            htmlFor={`arrival-${range.value}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {range.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SelectContent>
            </Select>
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Right: Sorting */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              排序:
            </span>
            <Button
              variant={
                sortOption === "price-asc" || sortOption === "price-desc"
                  ? "default"
                  : "outline"
              }
              size="default"
              onClick={() =>
                setSortOption(
                  sortOption === "price-asc" ? "price-desc" : "price-asc"
                )
              }
            >
              <DollarSign className="h-5 w-5 mr-2" />
              价格
              {sortOption === "price-asc" ? (
                <ArrowUpAZ className="h-4 w-4 ml-2" />
              ) : sortOption === "price-desc" ? (
                <ArrowDownAZ className="h-4 w-4 ml-2" />
              ) : null}
            </Button>
            <Button
              variant={
                sortOption === "duration-asc" || sortOption === "duration-desc"
                  ? "default"
                  : "outline"
              }
              size="default"
              onClick={() =>
                setSortOption(
                  sortOption === "duration-asc"
                    ? "duration-desc"
                    : "duration-asc"
                )
              }
            >
              <Clock className="h-5 w-5 mr-2" />
              耗时
              {sortOption === "duration-asc" ? (
                <ArrowUpAZ className="h-4 w-4 ml-2" />
              ) : sortOption === "duration-desc" ? (
                <ArrowDownAZ className="h-4 w-4 ml-2" />
              ) : null}
            </Button>
            <Button
              variant={
                sortOption === "departure-asc" ||
                sortOption === "departure-desc"
                  ? "default"
                  : "outline"
              }
              size="default"
              onClick={() =>
                setSortOption(
                  sortOption === "departure-asc"
                    ? "departure-desc"
                    : "departure-asc"
                )
              }
            >
              <Plane className="h-5 w-5 mr-2" />
              起飞时间
              {sortOption === "departure-asc" ? (
                <ArrowUpAZ className="h-4 w-4 ml-2" />
              ) : sortOption === "departure-desc" ? (
                <ArrowDownAZ className="h-4 w-4 ml-2" />
              ) : null}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

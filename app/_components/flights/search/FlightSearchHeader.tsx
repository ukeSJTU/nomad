/**
 * Flight Search Header Component
 *
 * Displays trip information and last update time for flight search results
 */

"use client";

import { Clock } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FLIGHT_UI_TEXT,
  ROUND_TRIP_STEPS,
} from "@/domains/flights/flights.constants";
import { formatDateWithWeekday, formatTime } from "@/lib/date";
import type { CityData } from "@/types/dto";
import type { TripType } from "@/types/validations";

interface FlightSearchHeaderProps {
  /**
   * Trip type (one-way or round-trip)
   */
  tripType: TripType;

  /**
   * Departure city data
   */
  departureCity: CityData;

  /**
   * Arrival city data
   */
  arrivalCity: CityData;

  /**
   * Departure date
   */
  departureDate: Date;

  /**
   * Return date (for round-trip only)
   */
  returnDate?: Date;

  /**
   * Last update time
   */
  lastUpdateTime: Date;

  /**
   * Active tab for round-trip (outbound or return)
   */
  activeTab?: "outbound" | "return";

  /**
   * Callback when tab changes (for round-trip)
   */
  onTabChange?: (tab: "outbound" | "return") => void;
}

export function FlightSearchHeader({
  tripType,
  departureCity,
  arrivalCity,
  departureDate,
  returnDate,
  lastUpdateTime,
  activeTab = "outbound",
  onTabChange,
}: FlightSearchHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      {/* Left: Trip Info */}
      {tripType === "one-way" ? (
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {FLIGHT_UI_TEXT.ONE_WAY}
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
        <Tabs
          value={activeTab}
          onValueChange={value => onTabChange?.(value as "outbound" | "return")}
          className="w-auto"
        >
          <TabsList className="h-auto">
            <TabsTrigger
              value="outbound"
              className="flex-col items-start py-2 px-3"
            >
              <div className="flex items-center gap-2 mb-0.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {ROUND_TRIP_STEPS.OUTBOUND}
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {FLIGHT_UI_TEXT.TAB_SELECT_OUTBOUND}
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
              <div className="flex items-center gap-2 mb-0.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {ROUND_TRIP_STEPS.RETURN}
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {FLIGHT_UI_TEXT.TAB_SELECT_RETURN}
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
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                {FLIGHT_UI_TEXT.LAST_UPDATE}
              </span>
              <span className="text-sm font-mono font-semibold">
                {formatTime(lastUpdateTime)}
              </span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{FLIGHT_UI_TEXT.PRICE_FLUCTUATION_NOTICE}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

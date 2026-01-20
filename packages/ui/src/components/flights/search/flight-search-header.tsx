import { Separator } from "@ukesjtu/nomad-ui/components/primitives/separator";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@ukesjtu/nomad-ui/components/primitives/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ukesjtu/nomad-ui/components/primitives/tooltip";
import { Clock } from "lucide-react";
import type { CityData } from "./types";

export interface FlightSearchHeaderProps {
  /**
   * Trip type (one-way or round-trip)
   */
  tripType: "one-way" | "round-trip";

  /**
   * Departure city data
   */
  departureCity: CityData;

  /**
   * Arrival city data
   */
  arrivalCity: CityData;

  /**
   * Departure date formatted string (e.g., "10月30日 周四")
   */
  formattedDepartureDate: string;

  /**
   * Return date formatted string (for round-trip only, e.g., "11月2日 周一")
   */
  formattedReturnDate?: string;

  /**
   * Last update time formatted string (e.g., "18:11:15")
   */
  formattedLastUpdateTime: string;

  /**
   * Active tab for round-trip (outbound or return)
   */
  activeTab?: "outbound" | "return";

  /**
   * Callback when tab changes (for round-trip)
   */
  onTabChange?: (tab: "outbound" | "return") => void;

  /**
   * UI text constants
   */
  text: {
    oneWay: string;
    tabSelectOutbound: string;
    tabSelectReturn: string;
    lastUpdate: string;
    priceFluctuationNotice: string;
  };

  /**
   * Round trip step numbers
   */
  roundTripSteps: {
    outbound: number;
    return: number;
  };
}

export function FlightSearchHeader({
  tripType,
  departureCity,
  arrivalCity,
  formattedDepartureDate,
  formattedReturnDate,
  formattedLastUpdateTime,
  activeTab = "outbound",
  onTabChange,
  text,
  roundTripSteps,
}: FlightSearchHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      {/* Left: Trip Info */}
      {tripType === "one-way" ? (
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {text.oneWay}
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
            {formattedDepartureDate}
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
                  {roundTripSteps.outbound}
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {text.tabSelectOutbound}
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
                  {formattedDepartureDate}
                </span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="return"
              className="flex-col items-start py-2 px-3"
            >
              <div className="flex items-center gap-2 mb-0.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {roundTripSteps.return}
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {text.tabSelectReturn}
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
                  {formattedReturnDate}
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
                {text.lastUpdate}
              </span>
              <span className="text-sm font-mono font-semibold">
                {formattedLastUpdateTime}
              </span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text.priceFluctuationNotice}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

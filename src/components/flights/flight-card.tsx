"use client";

import { ArrowRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/currency";

export interface FlightCardProps {
  /** Airline logo URL */
  airlineLogo?: string;
  /** Airline name */
  airlineName: string;
  /** Flight number */
  flightNumber: string;
  /** Aircraft type */
  aircraftType: string;
  /** Departure time (HH:mm format) */
  departureTime: string;
  /** Departure airport */
  departureAirport: string;
  /** Arrival time (HH:mm format) */
  arrivalTime: string;
  /** Arrival airport */
  arrivalAirport: string;
  /** Days offset (optional, e.g., +1, +2) */
  daysOffset?: number;
  /** Total duration (e.g., "2h 55m") */
  duration: string;
  /** Price (number, in CNY) */
  price: number;
  /** Button text */
  buttonText?: string;
  /** Button click handler */
  onButtonClick?: () => void;
  /** Custom className */
  className?: string;
}

export function FlightCard({
  airlineLogo,
  airlineName,
  flightNumber,
  aircraftType,
  departureTime,
  departureAirport,
  arrivalTime,
  arrivalAirport,
  daysOffset,
  duration,
  price,
  buttonText = "订票",
  onButtonClick,
  className,
}: FlightCardProps) {
  // Get airline initials for avatar fallback
  const getAirlineInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card
      className={cn(
        "hover:shadow-lg transition-shadow w-full max-w-8xl",
        className
      )}
    >
      <CardContent className="py-2">
        <div className="flex items-center gap-6">
          {/* Left: Airline information */}
          <div className="flex items-center gap-3 min-w-[180px]">
            {/* Airline logo */}
            <Avatar className="h-12 w-12 shrink-0">
              <AvatarImage src={airlineLogo} alt={airlineName} />
              <AvatarFallback className="text-xs font-semibold">
                {getAirlineInitials(airlineName)}
              </AvatarFallback>
            </Avatar>

            {/* Airline name and flight number */}
            <div className="flex flex-col gap-0.5">
              <div className="text-sm font-medium text-foreground leading-tight">
                {airlineName}
              </div>
              <div className="text-xs text-muted-foreground leading-tight">
                {flightNumber} {aircraftType}
              </div>
            </div>
          </div>

          {/* Middle: Flight itinerary information */}
          <div className="flex-1 flex items-center justify-center gap-8">
            {/* Departure information */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-2xl font-bold text-foreground leading-none">
                {departureTime}
              </div>
              <div className="text-sm text-muted-foreground leading-none">
                {departureAirport}
              </div>
            </div>

            {/* Arrow with duration */}
            <div className="flex flex-col items-center justify-center gap-1 min-w-32">
              <div className="text-xs text-muted-foreground">{duration}</div>
              <div className="w-full flex items-center">
                <div className="flex-1 h-px bg-muted-foreground/30" />
                <ArrowRight className="h-4 w-4 text-muted-foreground mx-1" />
                <div className="flex-1 h-px bg-muted-foreground/30" />
              </div>
            </div>

            {/* Arrival information */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-2xl font-bold text-foreground leading-none">
                {arrivalTime}
                {daysOffset && daysOffset > 0 && (
                  <span className="text-sm text-orange-500 ml-1.5 font-medium">
                    +{daysOffset}
                  </span>
                )}
              </div>
              <div className="text-sm text-muted-foreground leading-none">
                {arrivalAirport}
              </div>
            </div>
          </div>

          {/* Right: Price and action */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Price */}
            <div className="text-2xl font-bold text-orange-500 leading-none">
              {formatCurrency(price)}
            </div>

            {/* Book button */}
            <Button
              onClick={onButtonClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 shrink-0"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

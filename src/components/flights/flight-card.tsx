"use client";

import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface SeatClassOption {
  /** Seat class ID */
  id: string;
  /** Seat class type */
  classType: "ECONOMY" | "BUSINESS" | "FIRST";
  /** Total seats */
  totalSeats: number;
  /** Available seats */
  availableSeats: number;
  /** Price (number, in CNY) */
  price: number;
}
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
  /** Price (number, in CNY) - for backward compatibility */
  price?: number;
  /** Seat class options - for new expandable card */
  seatClasses?: SeatClassOption[];
  /** Lowest price (number, in CNY) - for new expandable card */
  lowestPrice?: number;
  /** Button text */
  buttonText?: string;
  /** Button click handler - for backward compatibility (single price mode) */
  onButtonClick?: () => void;
  /** Seat class button click handler - for new expandable card */
  onSeatClassClick?: (seatClass: SeatClassOption) => void;
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
  seatClasses,
  lowestPrice,
  buttonText = "预订",
  onButtonClick,
  onSeatClassClick,
  className,
}: FlightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get airline initials for avatar fallback
  const getAirlineInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get seat class display name
  const getSeatClassName = (classType: string) => {
    switch (classType) {
      case "ECONOMY":
        return "经济舱";
      case "BUSINESS":
        return "商务舱";
      case "FIRST":
        return "头等舱";
      default:
        return classType;
    }
  };

  // Determine if this is a multi-seat-class card
  const isMultiSeatClass = seatClasses && seatClasses.length > 1;
  // Use lowestPrice if available, otherwise fall back to price prop
  const displayPrice = lowestPrice ?? price ?? 0;

  return (
    <Card
      className={cn(
        "hover:shadow-lg transition-shadow w-full max-w-8xl",
        className
      )}
    >
      <CardContent className="py-2">
        {/* Main flight information row */}
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
            <div className="flex flex-col items-end">
              <div className="text-2xl font-bold text-orange-500 leading-none">
                {formatCurrency(displayPrice)}
                {isMultiSeatClass && (
                  <span className="text-sm text-muted-foreground ml-1">起</span>
                )}
              </div>
            </div>

            {/* Book button or expand button */}
            {isMultiSeatClass ? (
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                variant="outline"
                className="px-6 shrink-0"
              >
                {isExpanded ? (
                  <>
                    收起 <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    订票 <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={onButtonClick}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 shrink-0"
              >
                {buttonText}
              </Button>
            )}
          </div>
        </div>

        {/* Expanded seat class options */}
        {isMultiSeatClass && isExpanded && seatClasses && (
          <div className="mt-4 pt-4 border-t space-y-2">
            {seatClasses.map(seatClass => (
              <div
                key={seatClass.id}
                className="flex items-center justify-between py-2 px-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="font-medium">
                    {getSeatClassName(seatClass.classType)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    剩余 {seatClass.availableSeats} 座
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-xl font-bold text-orange-500">
                    {formatCurrency(seatClass.price)}
                  </div>
                  <Button
                    onClick={() => onSeatClassClick?.(seatClass)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6"
                    size="sm"
                  >
                    {buttonText}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface FlightCardSkeletonProps {
  /** Custom className */
  className?: string;
}

export function FlightCardSkeleton({ className }: FlightCardSkeletonProps) {
  return (
    <Card
      className={cn(
        "hover:shadow-lg transition-shadow w-full max-w-8xl",
        className
      )}
    >
      <CardContent className="pt-6">
        <div className="flex items-center gap-6">
          {/* Left: Airline information skeleton */}
          <div className="flex items-center gap-3 min-w-[180px]">
            {/* Airline logo skeleton */}
            <Skeleton className="h-12 w-12 rounded-full shrink-0" />

            {/* Airline name and flight number skeleton */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>

          {/* Middle: Flight itinerary information skeleton */}
          <div className="flex-1 flex items-center justify-center gap-8">
            {/* Departure information skeleton */}
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Arrow with duration skeleton */}
            <div className="flex flex-col items-center justify-center gap-2 min-w-32">
              <Skeleton className="h-3 w-16" />
              <div className="w-full flex items-center">
                <Skeleton className="flex-1 h-px" />
                <Skeleton className="h-4 w-4 mx-1" />
                <Skeleton className="flex-1 h-px" />
              </div>
            </div>

            {/* Arrival information skeleton */}
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* Right: Price and action skeleton */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Price skeleton */}
            <Skeleton className="h-8 w-20" />

            {/* Book button skeleton */}
            <Skeleton className="h-10 w-16 shrink-0" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

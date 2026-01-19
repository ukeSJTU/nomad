import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@nomad/ui/components/primitives/card";
import type { FlightCardProps } from "../results/flight-card";
import { FlightCard } from "../results/flight-card";

export interface FlightListOneWayProps {
  /**
   * Array of transformed flight data ready for display
   */
  flights: FlightCardProps[];

  /**
   * Text to display when no flights are found
   */
  noFlightsTitle?: string;

  /**
   * Description text for empty state
   */
  noFlightsDescription?: string;

  /**
   * Custom className for the container
   */
  className?: string;
}

export function FlightListOneWay({
  flights,
  noFlightsTitle = "未找到航班",
  noFlightsDescription = "请尝试调整搜索条件",
  className,
}: FlightListOneWayProps) {
  if (flights.length === 0) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{noFlightsTitle}</CardTitle>
          <CardDescription>{noFlightsDescription}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className={className}>
      {flights.map((flight, index) => (
        <FlightCard key={flight.flightNumber || index} {...flight} />
      ))}
    </div>
  );
}

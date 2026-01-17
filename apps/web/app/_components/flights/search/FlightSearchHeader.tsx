/**
 * Flight Search Header Component
 *
 * Container component that wraps the UI component and provides formatting logic
 */

import { FlightSearchHeader as FlightSearchHeaderUI } from "@nomad/ui/components/flights/search";
import { FLIGHT_UI_TEXT, ROUND_TRIP_STEPS } from "@/config/ui";
import { formatDateWithWeekday, formatTime } from "@/lib/format";
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
    <FlightSearchHeaderUI
      tripType={tripType}
      departureCity={departureCity}
      arrivalCity={arrivalCity}
      formattedDepartureDate={formatDateWithWeekday(departureDate)}
      formattedReturnDate={
        returnDate ? formatDateWithWeekday(returnDate) : undefined
      }
      formattedLastUpdateTime={formatTime(lastUpdateTime)}
      activeTab={activeTab}
      onTabChange={onTabChange}
      text={{
        oneWay: FLIGHT_UI_TEXT.ONE_WAY,
        tabSelectOutbound: FLIGHT_UI_TEXT.TAB_SELECT_OUTBOUND,
        tabSelectReturn: FLIGHT_UI_TEXT.TAB_SELECT_RETURN,
        lastUpdate: FLIGHT_UI_TEXT.LAST_UPDATE,
        priceFluctuationNotice: FLIGHT_UI_TEXT.PRICE_FLUCTUATION_NOTICE,
      }}
      roundTripSteps={{
        outbound: ROUND_TRIP_STEPS.OUTBOUND,
        return: ROUND_TRIP_STEPS.RETURN,
      }}
    />
  );
}

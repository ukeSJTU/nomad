"use client";

import { Button } from "@ukesjtu/nomad-ui/components/primitives/button";
import { ArrowLeftRight } from "lucide-react";
import { useState } from "react";
import { CitySelector } from "./city-selector";
import type { CityData } from "./types";

export interface CityInputProps {
  departureCity: CityData | null;
  arrivalCity: CityData | null;
  onDepartureCityChange: (city: CityData) => void;
  onArrivalCityChange: (city: CityData) => void;
  onSwap?: () => void;
  cities: CityData[];
}

export function CityInput({
  departureCity,
  arrivalCity,
  onDepartureCityChange,
  onArrivalCityChange,
  onSwap,
  cities,
}: CityInputProps) {
  const [departureOpen, setDepartureOpen] = useState(false);
  const [arrivalOpen, setArrivalOpen] = useState(false);

  const handleDepartureSelect = (city: CityData) => {
    onDepartureCityChange(city);
    // Auto-open arrival selector after selecting departure city
    setArrivalOpen(true);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <CitySelector
          onSelect={handleDepartureSelect}
          title="选择出发城市"
          selectedCity={departureCity}
          cities={cities}
          open={departureOpen}
          onOpenChange={setDepartureOpen}
        >
          <Button
            variant="outline"
            className="w-full h-16 flex flex-col items-start justify-center"
          >
            <span className="text-xs text-muted-foreground">出发地</span>
            <span className="text-lg font-medium">
              {departureCity
                ? `${departureCity.name}(${departureCity.iataCode})`
                : "请选择"}
            </span>
          </Button>
        </CitySelector>
      </div>

      {onSwap && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onSwap}
          className="shrink-0"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
      )}

      <div className="flex-1">
        <CitySelector
          onSelect={onArrivalCityChange}
          title="选择到达城市"
          selectedCity={arrivalCity}
          cities={cities}
          open={arrivalOpen}
          onOpenChange={setArrivalOpen}
        >
          <Button
            variant="outline"
            className="w-full h-16 flex flex-col items-start justify-center"
          >
            <span className="text-xs text-muted-foreground">目的地</span>
            <span className="text-lg font-medium">
              {arrivalCity
                ? `${arrivalCity.name}(${arrivalCity.iataCode})`
                : "请选择"}
            </span>
          </Button>
        </CitySelector>
      </div>
    </div>
  );
}

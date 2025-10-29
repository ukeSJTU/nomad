"use client";

import { useState } from "react";

import { CityInput } from "@/components/flights/city-selector";
import { DateSelector } from "@/components/flights/date-selector";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CityData } from "@/lib/queries/cities";

interface SearchFormProps {
  showSearchButton?: boolean;
  onSearch?: (data: SearchFormData) => void;
  cities: CityData[];
}

export interface SearchFormData {
  tripType: "one-way" | "round-trip";
  departureCity: CityData | null;
  arrivalCity: CityData | null;
  departureDate: Date | undefined;
  returnDate: Date | undefined;
  seatClass: string;
}

export function SearchForm({
  showSearchButton = false,
  onSearch,
  cities,
}: SearchFormProps) {
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [departureCity, setDepartureCity] = useState<CityData | null>(null);
  const [arrivalCity, setArrivalCity] = useState<CityData | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [seatClass, setSeatClass] = useState("economy");

  const handleSwap = () => {
    const temp = departureCity;
    setDepartureCity(arrivalCity);
    setArrivalCity(temp);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        tripType,
        departureCity,
        arrivalCity,
        departureDate: departureDate || undefined,
        returnDate: returnDate || undefined,
        seatClass,
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Trip Type Selection */}
      <div className="space-y-2">
        <Label>行程类型</Label>
        <RadioGroup
          value={tripType}
          onValueChange={value =>
            setTripType(value as "one-way" | "round-trip")
          }
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-way" id="one-way" />
            <Label htmlFor="one-way" className="font-normal cursor-pointer">
              单程
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="round-trip" id="round-trip" />
            <Label htmlFor="round-trip" className="font-normal cursor-pointer">
              往返
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Cities */}
      <div className="space-y-2">
        <CityInput
          departureCity={departureCity}
          arrivalCity={arrivalCity}
          onDepartureCityChange={setDepartureCity}
          onArrivalCityChange={setArrivalCity}
          onSwap={handleSwap}
          cities={cities}
        />
      </div>

      {/* Dates */}
      <DateSelector
        tripType={tripType}
        departureDate={departureDate}
        returnDate={returnDate}
        onDepartureDateChange={setDepartureDate}
        onReturnDateChange={setReturnDate}
        onTripTypeChange={setTripType}
        timezone={departureCity?.timezone}
      />

      {/* Seat Class */}
      <div className="space-y-2">
        <Label htmlFor="seat-class">舱位等级</Label>
        <Select value={seatClass} onValueChange={setSeatClass}>
          <SelectTrigger id="seat-class">
            <SelectValue placeholder="选择舱位等级" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="economy">经济舱</SelectItem>
            <SelectItem value="business">商务舱</SelectItem>
            <SelectItem value="first">头等舱</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search Button */}
      {showSearchButton && (
        <Button onClick={handleSearch} className="w-full" size="lg">
          搜索航班
        </Button>
      )}
    </div>
  );
}

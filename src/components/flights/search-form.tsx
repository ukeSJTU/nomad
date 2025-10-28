"use client";

import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { CityInput } from "@/components/flights/city-selector";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CityData } from "@/lib/queries/cities";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  showSearchButton?: boolean;
  onSearch?: (data: SearchFormData) => void;
  citiesPromise: Promise<CityData[]>;
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
  citiesPromise,
}: SearchFormProps) {
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [departureCity, setDepartureCity] = useState<CityData | null>(null);
  const [arrivalCity, setArrivalCity] = useState<CityData | null>(null);
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [seatClass, setSeatClass] = useState("economy");
  const [departureDateOpen, setDepartureDateOpen] = useState(false);
  const [returnDateOpen, setReturnDateOpen] = useState(false);

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
        departureDate,
        returnDate,
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
          citiesPromise={citiesPromise}
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>出发日期</Label>
          <Popover open={departureDateOpen} onOpenChange={setDepartureDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !departureDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departureDate
                  ? departureDate.toLocaleDateString("zh-CN")
                  : "选择日期"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={date => {
                  setDepartureDate(date);
                  setDepartureDateOpen(false);
                }}
                disabled={date => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {tripType === "round-trip" && (
          <div className="space-y-2">
            <Label>返程日期</Label>
            <Popover open={returnDateOpen} onOpenChange={setReturnDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !returnDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate
                    ? returnDate.toLocaleDateString("zh-CN")
                    : "选择日期"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={date => {
                    setReturnDate(date);
                    setReturnDateOpen(false);
                  }}
                  disabled={date =>
                    date < new Date() ||
                    (departureDate ? date < departureDate : false)
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      {/* Seat Class */}
      <div className="space-y-2">
        <Label htmlFor="seat-class">舱位等级</Label>
        <Select value={seatClass} onValueChange={setSeatClass}>
          <SelectTrigger id="seat-class">
            <SelectValue placeholder="选择舱位等级" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="economy">经济舱</SelectItem>
            <SelectItem value="premium-economy">超级经济舱</SelectItem>
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

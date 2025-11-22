"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
import type { CityData } from "@/types/dto";

import { CityInput } from "./city-selector";
import { DateSelector } from "./date-selector";

interface SearchFormProps {
  showSearchButton?: boolean;
  onSearch?: (data: SearchFormData) => void;
  onChange?: (data: SearchFormData) => void;
  cities: CityData[];
  initialValues?: Partial<SearchFormData>;
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
  onChange,
  cities,
  initialValues,
}: SearchFormProps) {
  const [tripType, setTripType] = useState<"one-way" | "round-trip">(
    initialValues?.tripType || "one-way"
  );
  const [departureCity, setDepartureCity] = useState<CityData | null>(
    initialValues?.departureCity || null
  );
  const [arrivalCity, setArrivalCity] = useState<CityData | null>(
    initialValues?.arrivalCity || null
  );
  const [departureDate, setDepartureDate] = useState<Date | null>(
    initialValues?.departureDate || null
  );
  const [returnDate, setReturnDate] = useState<Date | null>(
    initialValues?.returnDate || null
  );
  const [seatClass, setSeatClass] = useState(initialValues?.seatClass || "any");

  // Track if this is the initial mount to prevent triggering onChange on mount
  const isInitialMount = useRef(true);
  // Track if we're currently syncing from initialValues to prevent onChange trigger
  const isSyncingFromProps = useRef(false);

  // Update state when initialValues change (from URL params)
  useEffect(() => {
    if (initialValues) {
      isSyncingFromProps.current = true;

      if (initialValues.tripType !== undefined)
        setTripType(initialValues.tripType);
      if (initialValues.departureCity !== undefined)
        setDepartureCity(initialValues.departureCity);
      if (initialValues.arrivalCity !== undefined)
        setArrivalCity(initialValues.arrivalCity);
      if (initialValues.departureDate !== undefined)
        setDepartureDate(initialValues.departureDate);
      if (initialValues.returnDate !== undefined)
        setReturnDate(initialValues.returnDate);
      if (initialValues.seatClass !== undefined)
        setSeatClass(initialValues.seatClass);

      // Reset the flag after state updates have been applied
      setTimeout(() => {
        isSyncingFromProps.current = false;
      }, 0);
    }
  }, [initialValues]);

  // Trigger onChange when form values change (for auto-search)
  // Only trigger if we have the minimum required fields to avoid premature navigation
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Skip if we're syncing from props (URL params changed)
    if (isSyncingFromProps.current) {
      return;
    }

    if (!onChange) return;

    // Don't trigger onChange if basic required fields are missing
    if (!departureCity || !arrivalCity || !departureDate) {
      return;
    }

    // For round-trip, don't trigger if returnDate is missing
    if (tripType === "round-trip" && !returnDate) {
      return;
    }

    onChange({
      tripType,
      departureCity,
      arrivalCity,
      departureDate: departureDate || undefined,
      returnDate: returnDate || undefined,
      seatClass,
    });
  }, [
    tripType,
    departureCity,
    arrivalCity,
    departureDate,
    returnDate,
    seatClass,
    onChange,
  ]);

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

  // Auto-set return date when switching to round-trip
  const handleTripTypeChange = (newTripType: "one-way" | "round-trip") => {
    setTripType(newTripType);

    // If switching to round-trip and no return date is set, set a default
    if (newTripType === "round-trip" && !returnDate && departureDate) {
      // Default: 7 days after departure
      const defaultReturnDate = new Date(departureDate);
      defaultReturnDate.setDate(defaultReturnDate.getDate() + 7);
      setReturnDate(defaultReturnDate);
    }
  };

  return (
    <div className="w-full space-y-8 justify-center items-center">
      {/* Upper section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        {/* Trip Type Selection */}
        <div className="space-y-2">
          <RadioGroup
            value={tripType}
            onValueChange={value =>
              handleTripTypeChange(value as "one-way" | "round-trip")
            }
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="one-way"
                id="one-way"
                className="scale-125"
              />
              <Label
                htmlFor="one-way"
                className="text-base font-normal cursor-pointer"
              >
                单程
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="round-trip"
                id="round-trip"
                className="scale-125"
              />
              <Label
                htmlFor="round-trip"
                className="text-base font-normal cursor-pointer"
              >
                往返
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Seat Class */}
        <div className="space-y-2">
          <Select value={seatClass} onValueChange={setSeatClass}>
            <SelectTrigger id="seat-class" className="h-11 text-base">
              <SelectValue placeholder="选择舱位等级" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">不限座舱</SelectItem>
              <SelectItem value="economy">经济舱</SelectItem>
              <SelectItem value="business">商务舱</SelectItem>
              <SelectItem value="first">头等舱</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Lower section */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        {/* Cities */}
        <div className="space-y-2 flex-1">
          <CityInput
            departureCity={departureCity}
            arrivalCity={arrivalCity}
            onDepartureCityChange={setDepartureCity}
            onArrivalCityChange={setArrivalCity}
            onSwap={handleSwap}
            cities={cities}
          />
        </div>

        <div className="flex-1">
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
        </div>
      </div>

      {/* Search Button */}
      {showSearchButton && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10">
          <Button
            onClick={handleSearch}
            className="text-lg font-semibold rounded-full px-12 h-14 bg-secondary"
            size="lg"
          >
            <Search className="mr-2 h-6 w-6 stroke-[3px]" />搜 索
          </Button>
        </div>
      )}
    </div>
  );
}

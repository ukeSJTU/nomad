"use client";

import { SearchForm as SearchFormUI } from "@ukesjtu/nomad-ui/components/flights/search";
import { useEffect, useRef, useState } from "react";
import type { CityData } from "@/types/dto";

import { CityInput } from "./city-selector";
import { DateSelector } from "./date-selector";

interface SearchFormContainerProps {
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
}: SearchFormContainerProps) {
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
    <SearchFormUI
      tripType={tripType}
      departureCity={departureCity}
      arrivalCity={arrivalCity}
      departureDate={departureDate}
      returnDate={returnDate}
      seatClass={seatClass}
      cities={cities}
      showSearchButton={showSearchButton}
      onTripTypeChange={handleTripTypeChange}
      onDepartureCityChange={setDepartureCity}
      onArrivalCityChange={setArrivalCity}
      onDepartureDateChange={setDepartureDate}
      onReturnDateChange={setReturnDate}
      onSeatClassChange={setSeatClass}
      onSwap={handleSwap}
      onSearch={onSearch ? handleSearch : undefined}
      cityInputSlot={
        <CityInput
          departureCity={departureCity}
          arrivalCity={arrivalCity}
          onDepartureCityChange={setDepartureCity}
          onArrivalCityChange={setArrivalCity}
          onSwap={handleSwap}
          cities={cities}
        />
      }
      dateSelectorSlot={
        <DateSelector
          tripType={tripType}
          departureDate={departureDate}
          returnDate={returnDate}
          onDepartureDateChange={setDepartureDate}
          onReturnDateChange={setReturnDate}
          onTripTypeChange={setTripType}
          timezone={departureCity?.timezone}
        />
      }
    />
  );
}

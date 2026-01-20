import { Button } from "@ukesjtu/nomad-ui/components/primitives/button";
import { Label } from "@ukesjtu/nomad-ui/components/primitives/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@ukesjtu/nomad-ui/components/primitives/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ukesjtu/nomad-ui/components/primitives/select";
import { Search } from "lucide-react";
import type { SearchFormProps } from "./types";

export function SearchForm({
  tripType,
  departureCity,
  arrivalCity,
  departureDate,
  returnDate,
  seatClass,
  cities,
  showSearchButton = false,
  onTripTypeChange,
  onDepartureCityChange,
  onArrivalCityChange,
  onDepartureDateChange,
  onReturnDateChange,
  onSeatClassChange,
  onSwap,
  onSearch,
  cityInputSlot,
  dateSelectorSlot,
}: SearchFormProps & {
  cityInputSlot: React.ReactNode;
  dateSelectorSlot: React.ReactNode;
}) {
  return (
    <div className="w-full space-y-8 justify-center items-center">
      {/* Upper section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        {/* Trip Type Selection */}
        <div className="space-y-2">
          <RadioGroup
            value={tripType}
            onValueChange={value =>
              onTripTypeChange(value as "one-way" | "round-trip")
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
          <Select value={seatClass} onValueChange={onSeatClassChange}>
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
        <div className="space-y-2 flex-1">{cityInputSlot}</div>

        {/* Dates */}
        <div className="flex-1">{dateSelectorSlot}</div>
      </div>

      {/* Search Button */}
      {showSearchButton && onSearch && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10">
          <Button
            onClick={onSearch}
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

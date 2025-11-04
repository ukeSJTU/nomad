"use client";

import { Plus, X } from "lucide-react";

import type { SavedPassenger } from "@/app/(frontend)/flights/booking/passengers/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface PassengerFormData {
  chineseName: string;
  englishFirstName: string;
  englishLastName: string;
  documentType: string;
  documentNumber: string;
  phone: string;
}

interface QuickPassengerSelectProps {
  savedPassengers: SavedPassenger[];
  selectedPassengerIds: string[];
  onTogglePassenger: (passengerId: string) => void;
}

/**
 * Quick passenger selection component
 * Displays saved passengers as clickable chips with checkboxes
 */
function QuickPassengerSelect({
  savedPassengers,
  selectedPassengerIds,
  onTogglePassenger,
}: QuickPassengerSelectProps) {
  if (savedPassengers.length === 0) {
    return null;
  }

  // Show first 5 passengers by default
  const displayedPassengers = savedPassengers.slice(0, 5);
  const hasMore = savedPassengers.length > 5;

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {displayedPassengers.map(passenger => (
        <div
          key={passenger.id}
          className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={() => onTogglePassenger(passenger.id)}
        >
          <Checkbox
            checked={selectedPassengerIds.includes(passenger.id)}
            onCheckedChange={() => onTogglePassenger(passenger.id)}
          />
          <span className="text-sm">{passenger.name}</span>
        </div>
      ))}
      {hasMore && (
        <Button variant="outline" className="px-4 py-2">
          更多常用乘机人 ∨
        </Button>
      )}
    </div>
  );
}

interface PassengerInfoFormProps {
  passengerNumber: number;
  data: PassengerFormData;
  onChange: (field: keyof PassengerFormData, value: string) => void;
  onRemove?: () => void;
  showRemove: boolean;
}

/**
 * Passenger information form component
 * Displays form fields for entering passenger details
 */
function PassengerInfoForm({
  passengerNumber,
  data,
  onChange,
  onRemove,
  showRemove,
}: PassengerInfoFormProps) {
  // Compute display name: use Chinese name if present, otherwise English name
  const displayName = data.chineseName
    ? data.chineseName
    : [data.englishFirstName, data.englishLastName].filter(Boolean).join(" ");

  return (
    <div className="relative bg-white border border-gray-200 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-6">
        {/* Left side: Number with divider */}
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-md bg-linear-to-br from-blue-50 to-blue-100 text-blue-600 font-bold text-2xl">
            {passengerNumber}
          </div>
          {/* Vertical divider */}
          <div className="w-px bg-gray-200 self-stretch"></div>
        </div>

        {/* Right side: Form content */}
        <div className="flex-1 space-y-5">
          {/* Header with delete button */}
          <div className="flex items-center justify-between gap-2">
            <Input
              type="text"
              value={displayName}
              readOnly
              placeholder="请与登机证件姓名保持一致"
            />
            {showRemove && onRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md -mr-2"
              >
                <X className="h-4 w-4" />
                删除
              </Button>
            )}
          </div>

          {/* Document Type and Number */}
          <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
            <div>
              <Select
                value={data.documentType}
                onValueChange={value => onChange("documentType", value)}
              >
                <SelectTrigger
                  id={`document-type-${passengerNumber}`}
                  className="h-12 w-[120px] border border-gray-200 rounded-md focus:border-blue-500 focus:ring-0 text-base font-medium"
                >
                  <SelectValue placeholder="身份证" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id_card">身份证</SelectItem>
                  <SelectItem value="passport">护照</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Input
                id={`document-number-${passengerNumber}`}
                value={data.documentNumber}
                onChange={e => onChange("documentNumber", e.target.value)}
                placeholder="登机证件号码"
                className="h-12 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-0 text-base placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Phone Number with Country Code */}
          <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
            <div>
              <Select defaultValue="86">
                <SelectTrigger className="h-12 w-[120px] border border-gray-200 rounded-md focus:border-blue-500 focus:ring-0 text-base font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="86">中国 86</SelectItem>
                  <SelectItem value="1">美国 1</SelectItem>
                  <SelectItem value="44">英国 44</SelectItem>
                  <SelectItem value="81">日本 81</SelectItem>
                  <SelectItem value="82">韩国 82</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Input
                id={`phone-${passengerNumber}`}
                value={data.phone}
                onChange={e => onChange("phone", e.target.value)}
                placeholder="乘机人手机号码（选填）"
                className="h-12 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-0 text-base placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Frequent Flyer Checkbox */}
          <div className="pt-3">
            <div className="flex items-center space-x-3">
              <Checkbox
                id={`frequent-flyer-${passengerNumber}`}
                className="rounded border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 w-5 h-5"
              />
              <Label
                htmlFor={`frequent-flyer-${passengerNumber}`}
                className="text-sm text-gray-600 font-normal leading-none cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                常旅客卡
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PassengerFormCardProps {
  passengers: PassengerFormData[];
  savedPassengers: SavedPassenger[];
  selectedPassengerIds: string[];
  onChange: (
    index: number,
    field: keyof PassengerFormData,
    value: string
  ) => void;
  onToggleSavedPassenger: (passengerId: string) => void;
  onRemovePassenger: (index: number) => void;
  onAddPassenger: () => void;
}

/**
 * Main passenger form card component
 * Contains the entire passenger section with title, quick selection, all passenger forms, and add button
 */
export function PassengerFormCard({
  passengers,
  savedPassengers,
  selectedPassengerIds,
  onChange,
  onToggleSavedPassenger,
  onRemovePassenger,
  onAddPassenger,
}: PassengerFormCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">乘机人</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Passenger Selection */}
        <QuickPassengerSelect
          savedPassengers={savedPassengers}
          selectedPassengerIds={selectedPassengerIds}
          onTogglePassenger={onToggleSavedPassenger}
        />

        {/* All Passenger Information Forms */}
        <div className="space-y-4">
          {passengers.map((passenger, index) => (
            <PassengerInfoForm
              key={index}
              passengerNumber={index + 1}
              data={passenger}
              onChange={(field, value) => onChange(index, field, value)}
              onRemove={() => onRemovePassenger(index)}
              showRemove={passengers.length > 1}
            />
          ))}
        </div>

        {/* Add Passenger Button */}
        <Button
          variant="outline"
          className="w-full text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700"
          onClick={onAddPassenger}
        >
          <Plus className="h-4 w-4 mr-2" />
          新增乘机人
        </Button>
      </CardContent>
    </Card>
  );
}

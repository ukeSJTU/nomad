"use client";

import { X } from "lucide-react";

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

  return (
    <div className="space-y-2">
      <Label className="text-sm text-muted-foreground">常用旅客</Label>
      <div className="flex flex-wrap gap-3">
        {savedPassengers.map(passenger => (
          <div
            key={passenger.id}
            className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onTogglePassenger(passenger.id)}
          >
            <Checkbox
              checked={selectedPassengerIds.includes(passenger.id)}
              onCheckedChange={() => onTogglePassenger(passenger.id)}
            />
            <span className="text-sm">{passenger.name}</span>
          </div>
        ))}
      </div>
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
  return (
    <div className="space-y-4">
      {/* Header with passenger number and remove button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-medium">
            {passengerNumber}
          </div>
          <span className="text-sm text-muted-foreground">
            请与登机证件姓名保持一致
          </span>
        </div>
        {showRemove && onRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-blue-600 hover:text-blue-700"
          >
            <X className="h-4 w-4 mr-1" />
            删除
          </Button>
        )}
      </div>

      {/* Document Type and Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`document-type-${passengerNumber}`}>
            证件类型 <span className="text-red-500">*</span>
          </Label>
          <Select
            value={data.documentType}
            onValueChange={value => onChange("documentType", value)}
          >
            <SelectTrigger id={`document-type-${passengerNumber}`}>
              <SelectValue placeholder="选择证件类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id_card">身份证</SelectItem>
              <SelectItem value="passport">护照</SelectItem>
              <SelectItem value="other">其他</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`document-number-${passengerNumber}`}>
            证件号码 <span className="text-red-500">*</span>
          </Label>
          <Input
            id={`document-number-${passengerNumber}`}
            value={data.documentNumber}
            onChange={e => onChange("documentNumber", e.target.value)}
            placeholder="请输入证件号码"
          />
        </div>
      </div>

      {/* Chinese Name */}
      <div className="space-y-2">
        <Label htmlFor={`chinese-name-${passengerNumber}`}>中文姓名</Label>
        <Input
          id={`chinese-name-${passengerNumber}`}
          value={data.chineseName}
          onChange={e => onChange("chineseName", e.target.value)}
          placeholder="请输入中文姓名"
        />
      </div>

      {/* English Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`english-last-name-${passengerNumber}`}>
            英文姓 (Last Name)
          </Label>
          <Input
            id={`english-last-name-${passengerNumber}`}
            value={data.englishLastName}
            onChange={e => onChange("englishLastName", e.target.value)}
            placeholder="ZHANG"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`english-first-name-${passengerNumber}`}>
            英文名 (First Name)
          </Label>
          <Input
            id={`english-first-name-${passengerNumber}`}
            value={data.englishFirstName}
            onChange={e => onChange("englishFirstName", e.target.value)}
            placeholder="SAN"
          />
        </div>
      </div>

      {/* Phone Number with Country Code */}
      <div className="space-y-2">
        <Label htmlFor={`phone-${passengerNumber}`}>
          乘机人手机号码（选填）
        </Label>
        <div className="grid grid-cols-3 gap-2">
          <Select defaultValue="86">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="86">中国 86</SelectItem>
              <SelectItem value="1">美国 1</SelectItem>
              <SelectItem value="44">英国 44</SelectItem>
            </SelectContent>
          </Select>
          <Input
            id={`phone-${passengerNumber}`}
            value={data.phone}
            onChange={e => onChange("phone", e.target.value)}
            placeholder="乘机人手机号码（选填）"
            className="col-span-2"
          />
        </div>
      </div>

      {/* Frequent Flyer Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox id={`frequent-flyer-${passengerNumber}`} />
        <label
          htmlFor={`frequent-flyer-${passengerNumber}`}
          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          常旅客
        </label>
      </div>
    </div>
  );
}

interface PassengerFormCardProps {
  passengerNumber: number;
  data: PassengerFormData;
  savedPassengers: SavedPassenger[];
  selectedPassengerIds: string[];
  onChange: (field: keyof PassengerFormData, value: string) => void;
  onToggleSavedPassenger: (passengerId: string) => void;
  onRemove?: () => void;
  showRemove: boolean;
}

/**
 * Main passenger form card component
 * Combines quick passenger selection and passenger info form
 */
export function PassengerFormCard({
  passengerNumber,
  data,
  savedPassengers,
  selectedPassengerIds,
  onChange,
  onToggleSavedPassenger,
  onRemove,
  showRemove,
}: PassengerFormCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">乘机人 {passengerNumber}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Passenger Selection */}
        <QuickPassengerSelect
          savedPassengers={savedPassengers}
          selectedPassengerIds={selectedPassengerIds}
          onTogglePassenger={onToggleSavedPassenger}
        />

        {/* Passenger Information Form */}
        <PassengerInfoForm
          passengerNumber={passengerNumber}
          data={data}
          onChange={onChange}
          onRemove={onRemove}
          showRemove={showRemove}
        />
      </CardContent>
    </Card>
  );
}

"use client";

import { Button } from "@ukesjtu/nomad-ui/components/primitives/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ukesjtu/nomad-ui/components/primitives/card";
import { Checkbox } from "@ukesjtu/nomad-ui/components/primitives/checkbox";
import { Input } from "@ukesjtu/nomad-ui/components/primitives/input";
import { Label } from "@ukesjtu/nomad-ui/components/primitives/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ukesjtu/nomad-ui/components/primitives/select";
import { Plus, X } from "lucide-react";

export interface PassengerFormData {
  name: string;
  documentType: string;
  documentNumber: string;
  phone: string;
  linkedSavedPassengerId?: string;
}

export interface SavedPassenger {
  id: string;
  name: string;
  documentType: string;
  documentNumber: string;
  phone: string | null;
}

export interface QuickPassengerSelectProps {
  savedPassengers: SavedPassenger[];
  selectedPassengerIds: string[];
  onTogglePassenger: (passengerId: string) => void;
}

/**
 * Quick passenger selection component
 * Displays saved passengers as clickable chips with checkboxes
 */
export function QuickPassengerSelect({
  savedPassengers,
  selectedPassengerIds,
  onTogglePassenger,
}: QuickPassengerSelectProps) {
  if (savedPassengers.length === 0) {
    return null;
  }

  const displayedPassengers = savedPassengers.slice(0, 5);
  const hasMore = savedPassengers.length > 5;

  return (
    <div className="flex flex-wrap gap-2.5 items-center">
      {displayedPassengers.map(passenger => (
        <Label
          key={passenger.id}
          className="group flex items-center gap-2.5 px-4 py-2.5 border border-input/60 rounded-lg hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm cursor-pointer transition-all duration-200"
        >
          <Checkbox
            checked={selectedPassengerIds.includes(passenger.id)}
            onCheckedChange={() => {
              onTogglePassenger(passenger.id);
            }}
            onClick={e => e.stopPropagation()}
            className="transition-all"
          />
          <span className="text-sm font-medium group-hover:text-primary transition-colors">
            {passenger.name}
          </span>
        </Label>
      ))}
      {hasMore && (
        <Button
          variant="outline"
          size="sm"
          className="h-10 px-4 border-dashed hover:border-solid hover:border-primary/50 hover:bg-primary/5"
        >
          更多常用乘机人
          <span className="ml-1.5 text-xs">∨</span>
        </Button>
      )}
    </div>
  );
}

export interface PassengerInfoFormProps {
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
export function PassengerInfoForm({
  passengerNumber,
  data,
  onChange,
  onRemove,
  showRemove,
}: PassengerInfoFormProps) {
  const displayName = data.name;

  return (
    <div className="group relative bg-linear-to-br from-card via-card to-card/95 border border-border/60 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
      <div className="flex gap-6">
        {/* Left side: Number with divider */}
        <div className="flex items-start gap-5">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-primary/15 to-primary/5 text-primary font-bold text-xl shadow-sm ring-1 ring-primary/10 group-hover:ring-primary/20 transition-all">
            {passengerNumber}
          </div>
          {/* Vertical divider */}
          <div className="w-px bg-linear-to-b from-transparent via-border to-transparent self-stretch" />
        </div>

        {/* Right side: Form content */}
        <div className="flex-1 space-y-5">
          {/* Header with delete button */}
          <div className="flex items-center justify-between gap-2 pb-1">
            <h3 className="text-lg font-semibold text-foreground tracking-tight">
              乘机人 {passengerNumber}
              {displayName && (
                <span className="ml-2.5 text-sm font-normal text-muted-foreground/80">
                  ({displayName})
                </span>
              )}
            </h3>
            {showRemove && onRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg -mr-2 transition-colors"
              >
                <X className="h-4 w-4" />
                <span className="ml-1">删除</span>
              </Button>
            )}
          </div>

          {/* Passenger Name */}
          <div className="space-y-2">
            <Label
              htmlFor={`name-${passengerNumber}`}
              className="text-sm font-medium"
            >
              姓名 <span className="text-destructive">*</span>
            </Label>
            <Input
              id={`name-${passengerNumber}`}
              value={data.name}
              onChange={e => onChange("name", e.target.value)}
              placeholder="请输入姓名"
              className="h-11 border border-input/60 rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-primary focus:outline-none text-base transition-all"
            />
          </div>

          {/* Document Type and Number */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              证件信息 <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
              <div>
                <Select
                  value={data.documentType}
                  onValueChange={value => onChange("documentType", value)}
                >
                  <SelectTrigger
                    id={`document-type-${passengerNumber}`}
                    className="h-11 w-[130px] border border-input/60 rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-primary focus:outline-none text-base font-medium transition-all"
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
                  className="h-11 border border-input/60 rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-primary focus:outline-none text-base transition-all"
                />
              </div>
            </div>
          </div>

          {/* Phone Number with Country Code */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              联系电话{" "}
              <span className="text-muted-foreground font-normal">
                （选填）
              </span>
            </Label>
            <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
              <div>
                <Select defaultValue="86">
                  <SelectTrigger className="h-11 w-[130px] border border-input/60 rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-primary focus:outline-none text-base font-medium transition-all">
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
                  placeholder="乘机人手机号码"
                  className="h-11 border border-input/60 rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-primary focus:outline-none text-base transition-all"
                />
              </div>
            </div>
          </div>

          {/* Frequent Flyer Checkbox */}
          <div className="pt-2 pb-1">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors -mx-1">
              <Checkbox
                id={`frequent-flyer-${passengerNumber}`}
                className="rounded border-input/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary w-5 h-5 transition-all"
              />
              <Label
                htmlFor={`frequent-flyer-${passengerNumber}`}
                className="text-sm text-muted-foreground font-medium leading-none cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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

export interface PassengerFormCardProps {
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
  showDeleteButton?: (passengers: PassengerFormData[]) => boolean;
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
  showDeleteButton,
}: PassengerFormCardProps) {
  const defaultShowDeleteButton = (forms: PassengerFormData[]): boolean => {
    if (forms.length === 1) {
      return Boolean(
        forms[0].name || forms[0].documentNumber || forms[0].phone
      );
    }
    return true;
  };

  const shouldShowDelete =
    showDeleteButton?.(passengers) ?? defaultShowDeleteButton(passengers);

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold tracking-tight">
          <span className="bg-linear-to-r from-foreground to-foreground/80 bg-clip-text">
            乘机人信息
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Passenger Selection */}
        {savedPassengers.length > 0 && (
          <QuickPassengerSelect
            savedPassengers={savedPassengers}
            selectedPassengerIds={selectedPassengerIds}
            onTogglePassenger={onToggleSavedPassenger}
          />
        )}

        {/* All Passenger Information Forms */}
        <div className="space-y-4">
          {passengers.map((passenger, index) => (
            <PassengerInfoForm
              key={index}
              passengerNumber={index + 1}
              data={passenger}
              onChange={(field, value) => onChange(index, field, value)}
              onRemove={() => onRemovePassenger(index)}
              showRemove={shouldShowDelete}
            />
          ))}
        </div>

        {/* Add Passenger Button */}
        <Button
          variant="outline"
          size="lg"
          className="w-full h-12 text-primary border-primary/60 border-dashed hover:border-solid hover:bg-primary/5 hover:text-primary font-medium rounded-xl shadow-sm hover:shadow transition-all"
          onClick={onAddPassenger}
        >
          <Plus className="h-4 w-4 mr-2" />
          新增乘机人
        </Button>
      </CardContent>
    </Card>
  );
}

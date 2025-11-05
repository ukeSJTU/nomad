"use client";

import { Car, Shield, Utensils } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  type AncillaryService,
  getAncillaryServicesByCategory,
} from "@/lib/schema/ancillary";
import { formatCurrency } from "@/lib/utils/currency";

export interface AncillarySelectionProps {
  /**
   * Array of selected service codes
   */
  selectedServices: string[];
  /**
   * Callback when a service is toggled
   */
  onToggleService: (code: string) => void;
  /**
   * Optional title for the card
   */
  title?: string;
  /**
   * Optional className for the card
   */
  className?: string;
}

/**
 * AncillarySelection Component
 *
 * Displays ancillary services (insurance, airport pickup, meals) in an accordion
 * with checkboxes for selection.
 */
export function AncillarySelection({
  selectedServices,
  onToggleService,
  title = "选择增值服务",
  className,
}: AncillarySelectionProps) {
  const renderServiceOption = (service: AncillaryService) => {
    const isSelected = selectedServices.includes(service.code);

    return (
      <div
        key={service.code}
        className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 cursor-pointer transition-colors"
        onClick={e => {
          // Prevent double-firing when clicking on checkbox
          if ((e.target as HTMLElement).closest('button[role="checkbox"]')) {
            return;
          }
          onToggleService(service.code);
        }}
      >
        <Checkbox
          id={service.code}
          checked={isSelected}
          onCheckedChange={() => onToggleService(service.code)}
          className="mt-1"
        />
        <div className="flex-1 space-y-1">
          <Label
            htmlFor={service.code}
            className="text-base font-medium cursor-pointer"
          >
            {service.name}
          </Label>
          {service.description && (
            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>
          )}
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-orange-500">
            {formatCurrency(service.price)}
          </div>
        </div>
      </div>
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "INSURANCE":
        return <Shield className="h-5 w-5" />;
      case "AIRPORT_PICKUP":
        return <Car className="h-5 w-5" />;
      case "MEAL":
        return <Utensils className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "INSURANCE":
        return "旅行保险";
      case "AIRPORT_PICKUP":
        return "接送机服务";
      case "MEAL":
        return "机上餐食";
      default:
        return category;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {/* Insurance Services */}
          <AccordionItem value="insurance">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                {getCategoryIcon("INSURANCE")}
                <span className="font-semibold">
                  {getCategoryTitle("INSURANCE")}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {getAncillaryServicesByCategory("INSURANCE").map(service =>
                  renderServiceOption(service)
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Airport Pickup Services */}
          <AccordionItem value="airport-pickup">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                {getCategoryIcon("AIRPORT_PICKUP")}
                <span className="font-semibold">
                  {getCategoryTitle("AIRPORT_PICKUP")}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {getAncillaryServicesByCategory("AIRPORT_PICKUP").map(service =>
                  renderServiceOption(service)
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Meal Services */}
          <AccordionItem value="meal">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                {getCategoryIcon("MEAL")}
                <span className="font-semibold">
                  {getCategoryTitle("MEAL")}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {getAncillaryServicesByCategory("MEAL").map(service =>
                  renderServiceOption(service)
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

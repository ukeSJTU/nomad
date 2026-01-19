import { Car, Shield, Utensils } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../primitives/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../primitives/card";
import { Checkbox } from "../../primitives/checkbox";
import { Label } from "../../primitives/label";

export interface AncillaryService {
  code: string;
  name: string;
  description?: string;
  price: number;
  category: "INSURANCE" | "AIRPORT_PICKUP" | "MEAL";
}

export interface AncillaryCategory {
  category: "INSURANCE" | "AIRPORT_PICKUP" | "MEAL";
  services: AncillaryService[];
}

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
   * Ancillary services grouped by category
   */
  categories: AncillaryCategory[];
  /**
   * Function to format price (e.g., formatCurrency(50) => "¥50.00")
   */
  formatPrice: (price: number) => string;
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
  categories,
  formatPrice,
  title = "选择增值服务",
  className,
}: AncillarySelectionProps) {
  const renderServiceOption = (service: AncillaryService) => {
    const isSelected = selectedServices.includes(service.code);

    return (
      <Label
        key={service.code}
        className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 cursor-pointer transition-colors"
      >
        <Checkbox
          id={service.code}
          checked={isSelected}
          onCheckedChange={() => onToggleService(service.code)}
          onClick={e => e.stopPropagation()}
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
          <div className="text-lg font-bold text-secondary">
            {formatPrice(service.price)}
          </div>
        </div>
      </Label>
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

  const getCategoryValue = (category: string) => {
    switch (category) {
      case "INSURANCE":
        return "insurance";
      case "AIRPORT_PICKUP":
        return "airport-pickup";
      case "MEAL":
        return "meal";
      default:
        return category.toLowerCase();
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={categories.map(cat => getCategoryValue(cat.category))}
        >
          {categories.map(({ category, services }) => (
            <AccordionItem key={category} value={getCategoryValue(category)}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  {getCategoryIcon(category)}
                  <span className="font-semibold">
                    {getCategoryTitle(category)}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {services.map(service => renderServiceOption(service))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

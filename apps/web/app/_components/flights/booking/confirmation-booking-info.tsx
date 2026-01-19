import { ConfirmationBookingInfo as UiConfirmationBookingInfo } from "@nomad/ui/components/flights/booking";
import { getAncillaryServiceByCode } from "@/db/schema/ancillary";
import { IdentityType } from "@/types/dto";

interface ConfirmationBookingInfoProps {
  passengers: Array<{
    id: string;
    name: string;
    identityType: IdentityType;
    identityNumber: string;
  }>;
  contactPhone: string | null;
  contactEmail: string | null;
  ancillaryDetails: string[] | null;
}

export function ConfirmationBookingInfo({
  passengers,
  contactPhone,
  contactEmail,
  ancillaryDetails,
}: ConfirmationBookingInfoProps) {
  // Parse ancillary services
  const ancillaryServices = (ancillaryDetails || [])
    .map(code => {
      const service = getAncillaryServiceByCode(code);
      return service
        ? {
            name: service.name,
            price: service.price.toString(),
          }
        : null;
    })
    .filter((s): s is { name: string; price: string } => s !== null);

  return (
    <UiConfirmationBookingInfo
      passengers={passengers}
      contactPhone={contactPhone}
      contactEmail={contactEmail}
      ancillaryServices={ancillaryServices}
    />
  );
}

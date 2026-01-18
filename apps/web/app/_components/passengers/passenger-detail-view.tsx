import { PassengerDetailView as PassengerDetailViewUI } from "@nomad/ui/components/passengers";
import { formatDateString } from "@/lib/format";
import type { PassengerDetailData } from "@/types/dto";

interface PassengerDetailViewProps {
  passenger: PassengerDetailData;
}

export default function PassengerDetailView({
  passenger,
}: PassengerDetailViewProps) {
  // Format dates for display
  const formattedPassenger = {
    ...passenger,
    dateOfBirth: formatDateString(passenger.dateOfBirth),
    documentExpiryDate: passenger.documentExpiryDate
      ? formatDateString(passenger.documentExpiryDate)
      : null,
  };

  return <PassengerDetailViewUI passenger={formattedPassenger} />;
}

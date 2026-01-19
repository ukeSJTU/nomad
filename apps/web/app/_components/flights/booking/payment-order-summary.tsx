import type {
  PaymentOrderSummaryAncillaryProps,
  PaymentOrderSummaryFlightProps,
} from "@nomad/ui/components/flights/booking";
import { PaymentOrderSummary as PaymentOrderSummaryUI } from "@nomad/ui/components/flights/booking";
import { getAncillaryServiceByCode } from "@/db/schema/ancillary";
import { PaymentPageOrder } from "@/types/dto";

interface PaymentOrderSummaryProps {
  order: PaymentPageOrder;
}

// Format flight datetime
const formatFlightTime = (datetime: Date) => {
  return new Date(datetime).toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatFlightDate = (datetime: Date) => {
  return new Date(datetime).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// Convert flight data to UI props
const mapFlightToProps = (
  flight: PaymentPageOrder["outboundFlight"]
): PaymentOrderSummaryFlightProps => {
  return {
    flightNumber: flight.flightNumber,
    airlineName: flight.airline.name,
    departureDate: formatFlightDate(flight.departureDatetime),
    departureTime: formatFlightTime(flight.departureDatetime),
    departureAirport: flight.departureAirport.name,
    arrivalTime: formatFlightTime(flight.arrivalDatetime),
    arrivalAirport: flight.arrivalAirport.name,
  };
};

export function PaymentOrderSummary({ order }: PaymentOrderSummaryProps) {
  // Get ancillary services details
  const ancillaryServices: PaymentOrderSummaryAncillaryProps[] = (
    order.ancillaryDetails || []
  )
    .map(code => getAncillaryServiceByCode(code))
    .filter((service): service is NonNullable<typeof service> => !!service)
    .map(service => ({
      name: service.name,
      price: service.price.toString(),
    }));

  return (
    <PaymentOrderSummaryUI
      outboundFlight={mapFlightToProps(order.outboundFlight)}
      inboundFlight={
        order.inboundFlight ? mapFlightToProps(order.inboundFlight) : null
      }
      passengers={order.passengers.map(p => ({
        name: p.name,
        identityNumber: p.identityNumber,
      }))}
      contactPhone={order.contactPhone}
      contactEmail={order.contactEmail}
      ancillaryServices={ancillaryServices}
    />
  );
}

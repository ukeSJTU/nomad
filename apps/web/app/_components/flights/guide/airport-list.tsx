import {
  type AirportListProps,
  AirportList as AirportLisUI,
} from "@nomad/ui/components/flights/guide";

export function AirportList({
  title,
  airports,
  emptyMessage,
}: AirportListProps) {
  return (
    <AirportLisUI
      title={title}
      airports={airports}
      emptyMessage={emptyMessage}
    />
  );
}

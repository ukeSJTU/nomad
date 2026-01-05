import {
  type AirportListProps,
  AirportList as AirportListUI,
} from "@nomad/ui/components/flights/guide";

export function AirportList({
  title,
  airports,
  emptyMessage,
}: AirportListProps) {
  return (
    <AirportListUI
      title={title}
      airports={airports}
      emptyMessage={emptyMessage}
    />
  );
}

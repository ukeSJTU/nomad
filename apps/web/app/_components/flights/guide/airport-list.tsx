import Link from "next/link";

interface Airport {
  cityName: string;
  airportName: string;
  airportCode: string;
  key: string;
}

interface AirportListProps {
  title: string;
  airports: Airport[];
  emptyMessage: string;
}

export function AirportList({
  title,
  airports,
  emptyMessage,
}: AirportListProps) {
  return (
    <div className="mb-8">
      <div className="border-b-2 border-primary mb-4 pb-1">
        <h2 className="text-primary font-bold text-lg inline-block mr-4">
          {title}
        </h2>
      </div>

      <div className="bg-card p-6 border border-border rounded-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {airports.map(airport => (
            <Link
              key={airport.key}
              href={`/flights/guide/airport-${airport.airportCode}`}
              className="group block"
            >
              <div className="flex flex-row items-baseline gap-2 min-w-0">
                <div className="font-bold text-foreground group-hover:text-primary transition-colors shrink-0">
                  {airport.cityName}
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors truncate">
                  {airport.airportName}
                </div>
              </div>
            </Link>
          ))}
          {airports.length === 0 && (
            <div className="col-span-full text-muted-foreground text-sm">
              {emptyMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export type Airport = {
  cityName: string;
  airportName: string;
  airportCode: string;
  key: string;
};

export type AirportListProps = {
  title: string;
  airports: Airport[];
  emptyMessage: string;
};

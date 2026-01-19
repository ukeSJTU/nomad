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

export type WeatherForecast = {
  date: string;
  weather: string;
  tempRange: string;
};

export type WeatherCardProps = {
  cityName: string;
  date: string;
  dayOfWeek: string;
  currentTempRange: string;
  currentWeather: string;
  forecasts: WeatherForecast[];
  onViewMore?: () => void;
  viewMoreDisabled?: boolean;
};

export type AirportGuideLink = {
  href: string;
  label: string;
};

export type AirportGuideProps = {
  links: AirportGuideLink[];
  title?: string;
};

export type AirportWeatherProps = WeatherCardProps;

export type BoardingProcessCardProps = {
  href: string;
  title?: string;
  subtitle?: string;
};

export type DestinationGuideProps = {
  boardingProcess: BoardingProcessCardProps;
  weather: WeatherCardProps;
};

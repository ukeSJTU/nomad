import { WeatherCard, type WeatherCardProps } from "./weather-card";

export type AirportWeatherProps = WeatherCardProps;

export function AirportWeather(props: AirportWeatherProps) {
  return (
    <aside className="w-full lg:w-[280px] space-y-4">
      <WeatherCard {...props} />
    </aside>
  );
}

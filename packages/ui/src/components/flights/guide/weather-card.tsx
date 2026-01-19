import { Card, CardContent } from "../../primitives/card";

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

export function WeatherCard({
  cityName,
  date,
  dayOfWeek,
  currentTempRange,
  currentWeather,
  forecasts,
  onViewMore,
  viewMoreDisabled = true,
}: WeatherCardProps) {
  return (
    <Card className="bg-accent/50 border border-accent shadow-none">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4 border-b border-accent pb-2">
          <span className="font-bold text-primary">今日天气</span>
          <button
            type="button"
            onClick={onViewMore}
            disabled={viewMoreDisabled}
            className="text-primary text-xs cursor-not-allowed opacity-70 disabled:cursor-not-allowed disabled:opacity-70 enabled:cursor-pointer enabled:opacity-100 enabled:hover:underline"
          >
            查看更多 &gt;
          </button>
        </div>

        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xl font-bold text-foreground">{cityName}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {date} {dayOfWeek}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-light text-primary">
              {currentTempRange}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentWeather}
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-accent">
          {forecasts.map(forecast => (
            <div
              key={forecast.date}
              className="flex justify-between items-center text-xs"
            >
              <span className="text-muted-foreground">{forecast.date}</span>
              <span className="text-muted-foreground">{forecast.weather}</span>
              <span className="text-foreground font-medium">
                {forecast.tempRange}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

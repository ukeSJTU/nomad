import { DestinationGuide } from "@nomad/ui/components/flights/guide";

export function GuideSidebar() {
  // TODO: Replace with actual weather data from API
  const weatherData = {
    cityName: "北京",
    date: "2025-12-02",
    dayOfWeek: "周一",
    currentTempRange: "-3℃~5℃",
    currentWeather: "多云",
    forecasts: [
      { date: "明天 (12-03)", weather: "多云", tempRange: "-7℃~0℃" },
      { date: "后天 (12-04)", weather: "晴", tempRange: "-8℃~-2℃" },
    ],
  };

  const boardingProcessData = {
    href: "/flights/guide/process",
  };

  return (
    <DestinationGuide
      boardingProcess={boardingProcessData}
      weather={weatherData}
    />
  );
}

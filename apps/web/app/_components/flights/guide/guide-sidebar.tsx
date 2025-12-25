import { BoardingProcessCard } from "./boarding-process-card";
import { WeatherCard } from "./weather-card";

export function GuideSidebar() {
  return (
    <aside className="w-full lg:w-[280px] space-y-4">
      <BoardingProcessCard />
      <WeatherCard />
    </aside>
  );
}

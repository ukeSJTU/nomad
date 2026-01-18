import {
  BoardingProcessCard,
  type BoardingProcessCardProps,
} from "./boarding-process-card";
import { WeatherCard, type WeatherCardProps } from "./weather-card";

export type DestinationGuideProps = {
  boardingProcess: BoardingProcessCardProps;
  weather: WeatherCardProps;
};

export function DestinationGuide({
  boardingProcess,
  weather,
}: DestinationGuideProps) {
  return (
    <aside className="w-full lg:w-[280px] space-y-4">
      <BoardingProcessCard {...boardingProcess} />
      <WeatherCard {...weather} />
    </aside>
  );
}

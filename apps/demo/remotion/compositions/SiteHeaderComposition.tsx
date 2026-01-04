import { Composition } from "remotion";
import { SiteHeaderScene } from "../components/SiteHeaderScene";
import {
  DURATION_HEADER_DEMO,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../constants";

export const SiteHeaderComposition = () => (
  <Composition
    id="SiteHeaderDemo"
    component={SiteHeaderScene}
    durationInFrames={DURATION_HEADER_DEMO}
    fps={VIDEO_FPS}
    width={VIDEO_WIDTH}
    height={VIDEO_HEIGHT}
  />
);

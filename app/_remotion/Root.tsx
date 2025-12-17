import { Composition } from "remotion";

import {
  SCENE_DURATIONS,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "./constants";
import { AuthScene } from "./scenes/AuthScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 业务展示动画场景 */}
      <Composition
        id="AuthScene"
        component={AuthScene}
        durationInFrames={SCENE_DURATIONS.AUTH}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};

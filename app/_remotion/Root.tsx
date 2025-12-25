import { Composition } from "remotion";

import { BusinessShowcase } from "./compositions/BusinessShowcase";
import {
  SCENE_DURATIONS,
  TOTAL_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "./constants";
import { AuthScene } from "./scenes/AuthScene";
import { IntroScene } from "./scenes/IntroScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 完整业务展示动画 - 主Composition */}
      <Composition
        id="BusinessShowcase"
        component={BusinessShowcase}
        durationInFrames={TOTAL_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{}}
      />

      {/* 单独场景 - 用于开发和调试 */}
      <Composition
        id="IntroScene"
        component={IntroScene}
        durationInFrames={SCENE_DURATIONS.INTRO}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="AuthScene"
        component={AuthScene}
        durationInFrames={SCENE_DURATIONS.AUTH_SIGNIN}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};

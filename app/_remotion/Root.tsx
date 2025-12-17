import { Composition } from "remotion";

import { Main } from "./MyComp/Main";
import { NextLogo } from "./MyComp/NextLogo";
import {
  COMP_NAME,
  DURATION_IN_FRAMES,
  SCENE_DURATIONS,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
  defaultMyCompProps,
} from "./constants";
import { AuthScene } from "./scenes/AuthScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 示例组件 (可以参考后删除) */}
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      />
      <Composition
        id="NextLogo"
        component={NextLogo}
        durationInFrames={300}
        fps={30}
        width={140}
        height={140}
        defaultProps={{
          outProgress: 0,
        }}
      />

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

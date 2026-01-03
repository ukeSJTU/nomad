import { Composition } from "remotion";
import { VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "./constants";

const EmptyScene: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", background: "#ffffff00" }} />
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Minimal empty Remotion composition for demo */}
      <Composition
        id="Empty"
        component={EmptyScene}
        durationInFrames={VIDEO_FPS}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};

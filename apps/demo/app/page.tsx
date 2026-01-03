"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";

import { BusinessShowcase } from "@/remotion/compositions/BusinessShowcase";
import {
  TOTAL_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "@/remotion/constants";

const Home: NextPage = () => {
  return (
    <div>
      <div className="max-w-3xl m-auto mb-5">
        <div className="overflow-hidden rounded-geist shadow-[0_0_200px_rgba(0,0,0,0.15)] mb-10 mt-16">
          <Player
            component={BusinessShowcase}
            durationInFrames={TOTAL_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={{
              width: "100%",
            }}
            controls
            autoPlay
            loop
            acknowledgeRemotionLicense
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

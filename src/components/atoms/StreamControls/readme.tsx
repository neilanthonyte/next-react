import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import {
  StreamControlAudio,
  StreamControlCameraToggle,
  StreamControls,
  StreamControlEnd,
  StreamControlShareScreen,
  StreamControlSize,
  StreamControlVideo,
} from ".";
import { useEffect, useState } from "react";

export enum EStreamControlsTestState {
  Video = "video",
  Audio = "audio",
  ScreenShare = "screenShare",
  Camera = "camera",
  StreamEnded = "streamEnded",
  StreamSize = "streamSize",
}

export interface IStreamControlsTestState {
  video: boolean;
  audio: boolean;
  screenShare: boolean;
  isFrontCamera: boolean;
  streamEnded: boolean;
  isStreamExpanded: boolean;
}

export const streamControlsInitialState: IStreamControlsTestState = {
  video: true,
  audio: true,
  screenShare: false,
  isFrontCamera: true,
  streamEnded: false,
  isStreamExpanded: false,
};

export const DemoStandard = () => {
  const { setOutput, setTestAttributes } = useDebug({
    test: {
      componentName: "StreamControls",
      scenario: "standard",
    },
  });

  const [streamState, setStreamState] = useState<IStreamControlsTestState>(
    streamControlsInitialState,
  );

  useEffect(() => {
    setTestAttributes({
      video: streamState.video.toString(),
      audio: streamState.audio.toString(),
      screenShare: streamState.screenShare.toString(),
      isFrontCamera: streamState.isFrontCamera.toString(),
      streamEnded: streamState.streamEnded.toString(),
      isStreamExpanded: streamState.isStreamExpanded.toString(),
    });

    setOutput(streamState);
  }, [streamState]);

  return (
    <div style={{ backgroundColor: "#333", padding: 16 }}>
      <StreamControls>
        <StreamControlVideo
          isEnabled={streamState.video}
          onClick={() => setStreamState((s) => ({ ...s, video: !s.video }))}
        />
        <StreamControlAudio
          isEnabled={streamState.audio}
          onClick={() => setStreamState((s) => ({ ...s, audio: !s.audio }))}
        />
        <StreamControlShareScreen
          isEnabled={streamState.screenShare}
          onClick={() =>
            setStreamState((s) => ({ ...s, screenShare: !s.screenShare }))
          }
        />
        <StreamControlCameraToggle
          onClick={() =>
            setStreamState((s) => ({
              ...s,
              isFrontCamera: !s.isFrontCamera,
            }))
          }
        />
        <StreamControlEnd
          onClick={() =>
            setStreamState((s) => ({
              ...s,
              streamEnded: true,
            }))
          }
        />
        <StreamControlSize
          isExpanded={streamState.isStreamExpanded}
          onClick={() =>
            setStreamState((s) => ({
              ...s,
              isStreamExpanded: !s.isStreamExpanded,
            }))
          }
        />
      </StreamControls>
    </div>
  );
};

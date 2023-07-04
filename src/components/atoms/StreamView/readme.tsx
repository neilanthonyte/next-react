import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { StreamView, StreamViewControls, StreamViewSubStream } from ".";
import { useCallback, useState } from "react";
import { HStack } from "../../structure/HStack";
import { Button } from "../../generic/Button";

const initDevices = async (
  deviceKind: "audio" | "video" | "both" = "both",
): Promise<MediaStream> => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const devicesIds: any = { video: null, audioIn: null, audioOut: null };

  devices.forEach(async (device) => {
    switch (device.kind) {
      case "videoinput": {
        if (deviceKind === "video" || deviceKind === "both")
          devicesIds.video = device.deviceId;
        break;
      }
      case "audioinput": {
        if (
          (deviceKind === "audio" || deviceKind === "both") &&
          device.deviceId === "default"
        ) {
          devicesIds.audioIn = device.deviceId;
          break;
        }
      }

      default:
        break;
    }
  });

  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { deviceId: devicesIds.video },
    audio: devicesIds.audioIn ? { deviceId: devicesIds.audioIn } : false,
  });
  return mediaStream;
};

export const DemoStandard = () => {
  useDebug({
    test: {
      componentName: "StreamView",
      scenario: "standard",
    },
  });

  const [mediaStream, setMediaStream] = useState<MediaStream>();

  React.useEffect(() => {
    initDevices("video").then(setMediaStream);
  }, []);

  return <StreamView mediaStream={mediaStream} />;
};

export const DemoChildStream = () => {
  useDebug({
    test: {
      componentName: "StreamView",
      scenario: "child-stream",
    },
  });

  const [mediaStream, setMediaStream] = useState<MediaStream>();

  React.useEffect(() => {
    initDevices("video").then(setMediaStream);
  }, []);

  return (
    <StreamView mediaStream={mediaStream}>
      <StreamViewSubStream mediaStream={mediaStream} />
    </StreamView>
  );
};

export const DemoControls = () => {
  useDebug({
    test: {
      componentName: "StreamView",
      scenario: "controls",
    },
  });

  const [mediaStream, setMediaStream] = useState<MediaStream>();

  React.useEffect(() => {
    initDevices().then(setMediaStream);
  }, []);

  const handleToggleAudio = useCallback(() => {
    const audioStreams = mediaStream.getAudioTracks();
    audioStreams.forEach((stream) => (stream.enabled = !stream.enabled));
  }, [mediaStream]);

  const handleToggleVideo = useCallback(() => {
    const videoStreams = mediaStream.getVideoTracks();
    videoStreams.forEach((stream) => (stream.enabled = !stream.enabled));
  }, [mediaStream]);

  return (
    <StreamView mediaStream={mediaStream}>
      <StreamViewControls>
        <HStack>
          <Button onClick={handleToggleVideo}>Toggle video on/off</Button>
          <Button onClick={handleToggleAudio}>Toggle audio on/off</Button>
        </HStack>
      </StreamViewControls>
    </StreamView>
  );
};

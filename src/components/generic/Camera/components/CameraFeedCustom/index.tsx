import * as React from "react";

import {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { DataType } from "../../index";
import { getCanvasBlob } from "../helpers/getCanvasBlob";

import { cssComposer } from "../../../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "CameraFeedCustom");
export interface ICameraFeedCustomProps {
  onErrorRenderingCamera: () => void;
  facingMode: "user" | "environment";
  round: boolean;
  width?: number;
}

export interface ICameraFeedCustomImperativeMethods {
  capturePhoto: (type: DataType) => Promise<string | Blob>;
}

/**
 * This component shows only the camera feed on the screen, when a photo is taken it should call onPhotoTaken.
 */
const CameraFeedCustomUnRefed: React.FC<ICameraFeedCustomProps> = (
  { facingMode = "user", onErrorRenderingCamera, width, round },
  ref,
) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoStream = useRef<MediaStream>(null);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [internalFacingMode, setInternalFacingMode] = useState<
    "user" | "environment"
  >(facingMode);
  const onErrorRenderingCameraProp = useRef(onErrorRenderingCamera);

  // on perm denied changed.
  useEffect(() => {
    onErrorRenderingCameraProp.current = onErrorRenderingCamera;
  }, [onErrorRenderingCamera]);

  useEffect(() => {
    const setup = async (): Promise<void> => {
      try {
        // when requiring environment camera add exact property as mentioned; https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        let parsedFacingMode;
        if (internalFacingMode === "environment") {
          parsedFacingMode = { facingMode: { exact: "environment" } };
        } else {
          parsedFacingMode = { facingMode: internalFacingMode };
        }

        // get stream
        const stream = await window.navigator.mediaDevices.getUserMedia({
          video: parsedFacingMode,
          audio: false,
        });

        videoStream.current = stream;
        videoRef.current.srcObject = videoStream.current;
        await videoRef.current.play();
      } catch (err) {
        // used to default back to user mode if you have specified environment and there is no env cam available
        if (err.constraint === "facingMode" && facingMode === "environment") {
          setInternalFacingMode("user");
          return null;
        }
        // tslint:disable-next-line:no-console
        console.warn("CameraFeedCustom error", err);
        setErrorOccurred(true);
        onErrorRenderingCameraProp.current();
        return null;
      }
    };

    setup();
    return () => {
      if (videoStream.current) {
        videoStream.current.getVideoTracks().forEach((track) => track.stop());
      }
    };
  }, [internalFacingMode]);

  useImperativeHandle(
    ref,
    (): ICameraFeedCustomImperativeMethods => ({
      capturePhoto: async (type: DataType) => {
        if (errorOccurred) {
          return;
        }
        // set the contents of the canvas to be the current value of the video stream.
        const canvas = document.createElement("canvas");
        canvas.setAttribute("width", videoRef.current.videoWidth.toString());
        canvas.setAttribute("height", videoRef.current.videoHeight.toString());
        canvas.getContext("2d").drawImage(videoRef.current, 0, 0);

        if (type === "blob") {
          return await getCanvasBlob(canvas);
        }
        if (type === "data64") {
          return canvas.toDataURL();
        }
      },
    }),
  );

  if (errorOccurred) {
    return null;
  }

  const classNames = {
    wrapper: true,
    round: round || false,
  };

  return (
    <div
      className={css("", { "-round": round })}
      data-test="custom-feed-wrapper"
    >
      <video className={css("stream")} ref={videoRef} data-test="custom-feed" />
    </div>
  );
};

/**
 * As this component only returns a camera feed, we need to be able to tell it to take a photo somehow.
 * This is difficult as it the camera feed should be unaware of any of the "buttons" or how it is used
 * in other components. To get around this, we have used a "forwardRef" and inside the component used a function called
 * "useImperativeHandle", which essentially lets the parent component access certain methods.
 */
export const CameraFeedCustom = forwardRef<any, any>(
  CameraFeedCustomUnRefed as any,
);

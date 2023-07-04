import * as React from "react";
import { useImperativeHandle, useRef } from "react";

import { FacingMode, DataType } from "../../index";
import { getDataUrlFromFile } from "../helpers/getDataUrlFromFile";
import { rotateImage } from "../helpers/rotateImage";

export interface ICameraFeedNativeProps {
  videoEnvironment: FacingMode;
}

export interface ICameraFeedNativeImperativeMethods {
  capturePhoto: (type: DataType) => Promise<string | Blob>;
}

export const CameraFeedNative = React.forwardRef<{}, ICameraFeedNativeProps>(
  ({ videoEnvironment }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    let checkFeed: () => void;
    let watchFeed: () => void;

    useImperativeHandle(ref, (): ICameraFeedNativeImperativeMethods => {
      return {
        capturePhoto: async (returnType: DataType) => {
          return new Promise((resolve, reject) => {
            // ensure there is only one click event listener on inputRef.current at all times
            inputRef.current.removeEventListener("click", watchFeed);
            checkFeed = () => {
              // ensure there is only one focus event listener on window at all times
              window.removeEventListener("focus", checkFeed);
              // proceed further only if the node still exists in DOM
              if (inputRef.current) {
                // wait a brief moment before checking feed,
                // as on some platforms the inputRef.current state
                // is not immediately updated when window emits the focus event
                setTimeout(() => {
                  (async () => {
                    const file = inputRef.current.files[0];
                    if (file) {
                      const fileDataUrl = await getDataUrlFromFile(file);
                      const image = await rotateImage(fileDataUrl, returnType);
                      inputRef.current.value = ""; // content received, reset input
                      resolve(image);
                    } else {
                      resolve(null);
                    }
                  })().catch(reject);
                }, 1000);
              }
            };
            // window will regain focus when the feed (camera or the file selection dialog) is closed,
            // and this is the moment to check if we've got any content from the feed
            watchFeed = () => window.addEventListener("focus", checkFeed);
            inputRef.current.addEventListener("click", watchFeed);
            inputRef.current.click();
          });
        },
      };
    });

    return (
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture={videoEnvironment}
        style={{
          display: "none",
        }}
        data-test="native-feed"
      />
    );
  },
);

CameraFeedNative.displayName = "CameraFeedNative";

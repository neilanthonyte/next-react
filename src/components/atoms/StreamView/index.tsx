import * as React from "react";
import { useEffect, useRef } from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "StreamView");

export interface IStreamViewProps {
  mediaStream: MediaStream;
}

/**
 * Wrapper component rendering the main media stream and children
 * Please use only decoration components exported here as children
 */
export const StreamView: React.FC<IStreamViewProps> = ({
  mediaStream,
  children,
}) => {
  const videoRef = useRef<HTMLVideoElement>();

  useEffect(() => {
    videoRef.current.srcObject = mediaStream;
  }, [mediaStream]);

  return (
    <div className={css("")} data-test="stream-view">
      <video
        ref={videoRef}
        autoPlay={true}
        height={"100%"}
        width={"100%"}
        data-test="stream"
      />
      {children}
    </div>
  );
};

/**
 * Renders a sub stream inside the main stream
 */
export const StreamViewSubStream: React.FC<IStreamViewProps> = ({
  mediaStream,
}) => {
  const videoRef = useRef<HTMLVideoElement>();

  useEffect(() => {
    videoRef.current.srcObject = mediaStream;
  }, [mediaStream]);

  return (
    <div className={css("childStream")}>
      <video
        ref={videoRef}
        autoPlay={true}
        height={"100%"}
        width={"100%"}
        data-test="child-stream"
      />
    </div>
  );
};

/**
 * Styled wrapper component for rendering stream controls
 */
export const StreamViewControls: React.FC = ({ children }) => {
  return (
    <div className={css("controls")} data-test="controls">
      {children}
    </div>
  );
};

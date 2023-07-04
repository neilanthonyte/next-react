import * as React from "react";

import { Icon } from "../../generic/Icon";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "StreamControls");

export interface ITogglableControl {
  isEnabled?: boolean;
  onClick: () => void;
}

export interface IStreamControlsProps {}

/**
 * Renders a list of controls used for video/audio streams
 */
export const StreamControls: React.FC<IStreamControlsProps> = ({
  children,
}) => {
  return (
    <div className={css("")} data-test="stream-controls">
      {children}
    </div>
  );
};

export const StreamControlVideo: React.FC<ITogglableControl> = ({
  isEnabled,
  onClick,
}) => {
  return (
    <div
      className={css("control", "-icon")}
      onClick={onClick}
      data-test="control-video"
    >
      <Icon name={isEnabled ? "video-off" : "video"} />
    </div>
  );
};

export const StreamControlAudio: React.FC<ITogglableControl> = ({
  isEnabled,
  onClick,
}) => {
  return (
    <div
      className={css("control", "-icon")}
      onClick={onClick}
      data-test="control-audio"
    >
      <Icon name={isEnabled ? "microphone-off" : "microphone"} />
    </div>
  );
};

export const StreamControlShareScreen: React.FC<ITogglableControl> = ({
  isEnabled,
  onClick,
}) => {
  return (
    <div
      className={css("control", "-icon")}
      onClick={onClick}
      data-test="control-share-screen"
    >
      <Icon name={isEnabled ? "share-screen-off" : "share-screen"} />
    </div>
  );
};

export const StreamControlCameraToggle: React.FC<ITogglableControl> = ({
  onClick,
}) => {
  return (
    <div
      className={css("control", "-icon")}
      onClick={onClick}
      data-test="control-toggle-camera"
    >
      <Icon name="switch-camera" />
    </div>
  );
};

export const StreamControlEnd: React.FC<ITogglableControl> = ({ onClick }) => {
  return (
    <div
      className={css("control", "-button")}
      data-test="control-end-stream"
      onClick={onClick}
    >
      Leave
    </div>
  );
};

interface IStreamSizeControl {
  isExpanded: boolean;
  onClick: () => void;
}

export const StreamControlSize: React.FC<IStreamSizeControl> = ({
  isExpanded,
  onClick,
}) => {
  return (
    <div
      className={css("control", "-icon")}
      onClick={onClick}
      data-test="control-stream-size"
    >
      <Icon name={isExpanded ? "minimise" : "maximise"} />
    </div>
  );
};

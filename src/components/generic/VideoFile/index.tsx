import * as React from "react";

import { Button } from "../Button";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { useCallback, useState, useRef } from "react";

const css = cssComposer(styles);

export interface IVideoFileProps {
  src: string;
}

export const VideoFile: React.FC<IVideoFileProps> = ({ src }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const videoElm = useRef<HTMLVideoElement>();

  const playPauseVideo = useCallback(() => {
    if (isVideoPlaying) {
      videoElm.current.pause();
      setIsVideoPlaying(false);
      return;
    }

    videoElm.current.play();
    setIsVideoPlaying(true);
  }, [isVideoPlaying, videoElm]);

  const pauseVideo = useCallback(() => setIsVideoPlaying(false), []);

  return (
    <div className={css("videoFile")}>
      <video onClick={playPauseVideo} onEnded={pauseVideo} ref={videoElm}>
        <source type="video/mp4" src={src} />
      </video>
      {!isVideoPlaying && (
        <div className={css("videoFile_overlay")} onClick={playPauseVideo}>
          <Button onClick={playPauseVideo}>Click to play</Button>
        </div>
      )}
    </div>
  );
};

export default VideoFile;

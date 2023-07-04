import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.scss";

import { Icon } from "../Icon";
import { cssComposer } from "../../../helpers/cssComposer";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const css = cssComposer(styles);

import { defaultTransition } from "../../../helpers/cssTransitions";

export interface IVideoViewProps {
  src: string; // src of the video file
  poster: string; // image to show when the video is not playing
  children: React.ReactNode;
}

export const VideoView = ({ src, poster, children }: IVideoViewProps) => {
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const video = useRef<HTMLVideoElement>(null);

  // toggle the video state if the video playing state changes
  useEffect(() => {
    if (!video.current) {
      return;
    }

    if (video.current.paused && videoPlaying) {
      // we need to play the video
      video.current.play();
    }

    if (!video.current.paused && !videoPlaying) {
      // we need to pause the video
      video.current.pause();
    }
  }, [videoPlaying, video]);

  // avoid arrow functions in render method
  const toggleVideoPlaying = useMemo(
    () => () => setVideoPlaying(!videoPlaying),
    [videoPlaying],
  );
  const setVideoStopped = useMemo(() => () => setVideoPlaying(false), []);

  return (
    <div className={css("videoView")}>
      {/* video must come first */}
      {src && (
        <video
          onClick={toggleVideoPlaying}
          onEnded={setVideoStopped}
          ref={video}
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <TransitionGroup>
        {!videoPlaying && (
          <CSSTransition classNames={defaultTransition} timeout={500}>
            <div className={css("videoView_body")}>
              {children}
              <Icon
                name="play"
                className={css("videoView_playButton")}
                onClick={toggleVideoPlaying}
              />
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

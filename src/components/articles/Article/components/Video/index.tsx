import * as React from "react";

import YouTube from "../../../../generic/YouTube";

export interface IVideoProps {
  videoProvider: string;
  videoId: any;
}

export const Video: React.FC<IVideoProps> = ({ videoProvider, videoId }) => {
  switch (videoProvider) {
    case "youtube":
      return <YouTube id={videoId} />;
    default:
      return <div>Unknown video provider</div>;
  }
};

export default Video;

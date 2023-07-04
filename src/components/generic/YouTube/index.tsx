import * as React from "react";
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

const getUrl = (id: string) => `https://www.youtube.com/embed/${id}`;

export interface IYouTubeProps {
  id: string;
}

export const YouTube: React.FC<IYouTubeProps> = ({ id }) => {
  return (
    <div className={css("youtube")}>
      <iframe src={getUrl(id)} frameBorder="0" allowFullScreen />
    </div>
  );
};

export default YouTube;

import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

export interface ICaptionProps {
  title?: string;
  description?: string;
}

export const Caption: React.FC<ICaptionProps> = ({
  title,
  description = "",
}) => (
  <div className={css("caption")}>
    {title && (
      <div data-test="title" className={css("caption_title")}>
        {title}
      </div>
    )}
    {description && (
      <div data-test="description" className={css("caption_description")}>
        {description}
      </div>
    )}
  </div>
);

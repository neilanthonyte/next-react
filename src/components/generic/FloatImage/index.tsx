import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

interface IFloatingImageProps {
  src: string;
  direction?: string;
  children: any;
}

/**
 * Wraps the article.
 * @param {*} param0
 */
export const FloatingImage: React.FC<IFloatingImageProps> = ({
  src,
  direction = "right",
  children,
}) => {
  return (
    <div className={css("floatImage")}>
      <img className={css("floatImage_image", `-${direction}`)} src={src} />
      {children}
    </div>
  );
};

export default FloatingImage;

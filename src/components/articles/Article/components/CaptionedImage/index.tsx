import * as React from "react";

import { Img } from "../../../../generic/Img";
import { Caption } from "../../../../generic/Caption";

import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
const css = cssComposer(styles, "articleImage");

export interface ICaptionedImageProps {
  imageUrl: string;
  description?: string;
  size?: string;
  position?: string;
}

export const CaptionedImage: React.FC<ICaptionedImageProps> = ({
  imageUrl,
  description,
  size = "full",
  position = "middle",
}) => (
  <div className={css("", `-${position}`, `-${size}`)}>
    <Img src={imageUrl} />
    {description && <Caption description={description} />}
  </div>
);

export default CaptionedImage;

import * as React from "react";
import { cssComposer } from "../../../../../helpers/cssComposer";
import { ImgBlock } from "../../../ImgBlock";

import styles from "./styles.scss";
const css = cssComposer(styles, "CameraPreview");

export interface ICameraPreviewProps {
  image: string | Blob;
  round: boolean;
}

export const CameraPreview: React.FC<ICameraPreviewProps> = ({
  image,
  round = false,
}) => {
  const src = image instanceof Blob ? URL.createObjectURL(image) : image;

  return (
    <div
      className={css("", { "-round": round })}
      data-test="preview"
      data-test-is-round={round}
    >
      <ImgBlock src={src} className={css("cameraPreview")} />
    </div>
  );
};

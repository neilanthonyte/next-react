import * as React from "react";

import { Grid } from "../../structure/Grid";
import { ImgBlock } from "../ImgBlock";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "imageGalleryGrid");

export interface IImage {
  url: string;
  title?: string;
}

export interface IImageGalleryProps {
  images: IImage[];
}

export const ImageGallery: React.FC<IImageGalleryProps> = ({ images }) => {
  return (
    <div className={css("")}>
      {images && images.length ? (
        <Grid size="sm">
          {images.map((image, key: number) => (
            <div key={key} className={css("image")}>
              <ImgBlock
                size="sm"
                src={image.url}
                zoomable={true}
                alt={image.title}
              />
            </div>
          ))}
        </Grid>
      ) : null}
    </div>
  );
};

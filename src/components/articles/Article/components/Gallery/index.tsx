import * as React from "react";
import ImageGallery from "react-image-gallery";

import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { IGalleryImage } from "next-shared/src/models/Article";

import { CircularIcon } from "../../../../generic/CircularIcon";
import { ImgBlock } from "../../../../generic/ImgBlock";
import { Img } from "../../../../generic/Img";

import { cssComposer } from "../../../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "articleGallery");

export interface IGalleryProps {
  images: IGalleryImage[];
}

const renderItem = (item: any) => (
  <div className={css("item")}>
    <ImgBlock src={item.full} />
  </div>
);

/**
 * Renders a block Gallery.
 */
export const Gallery: React.FC<IGalleryProps> = ({ images }) => {
  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }
  // default to a single image
  if (images.length === 1) {
    return <Img src={images[0].full} responsive={true} />;
  }

  return (
    <div className={css("")}>
      <ImageGallery
        items={images}
        autoPlay={true}
        thumbnailPosition={"top"}
        renderItem={renderItem}
        renderLeftNav={(onClick: any, disabled: boolean) => {
          return (
            <CircularIcon
              className={css("navLeft")}
              name={"chevron-left"}
              onClick={onClick}
              size={EStandardSizes.Large}
            />
          );
        }}
        renderRightNav={(onClick: any, disabled: boolean) => {
          return (
            <CircularIcon
              className={css("navRight")}
              name={"chevron-right"}
              onClick={onClick}
              size={EStandardSizes.Large}
            />
          );
        }}
      />
    </div>
  );
};

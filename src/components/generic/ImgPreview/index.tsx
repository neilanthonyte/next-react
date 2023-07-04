import * as React from "react";
import { NavLink } from "react-router-dom";

import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

import CircularIcon from "../CircularIcon";
import { Img } from "../Img";
import { Icon } from "../Icon";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { ImgBlock } from "../ImgBlock";
const css = cssComposer(styles, "ImgPreview");

export interface IImgPreviewMainImage {
  imageUrl: string;
}

export const ImgPreviewMainImage: React.FC<IImgPreviewMainImage> = ({
  imageUrl,
}) => (
  <ImgBlock variant="contain" src={imageUrl} className={css("mainImage_img")} />
);

export interface IImgPreviewEmpty {
  icon?: string;
}

/**
 * Displays an empty image inside the image preview
 *
 * @example when you need to hint at the user that they should add another photo
 */
export const ImgPreviewEmpty: React.FC<IImgPreviewEmpty> = ({
  icon = "plus",
}) => {
  return (
    <div className={css("empty")}>
      <Icon
        size={EStandardSizes.Small}
        name={icon}
        className={css("empty_icon")}
      />
    </div>
  );
};

export interface IImgPreviewActionProps {
  actions: {
    icon: string;
    onClick: (ev?: React.MouseEvent) => void;
  }[];
}

/**
 * Displays actions on an image preview
 *
 * @example you might use this to remove an image by passing an action with "cancel" icon
 */
export const ImgPreviewActions: React.FC<IImgPreviewActionProps> = ({
  actions,
}) => {
  return (
    <div className={css("actions")}>
      {actions.map((action, i) => (
        <CircularIcon
          key={i}
          name={action.icon}
          onClick={action.onClick}
          variant={TColorVariants.Danger}
        />
      ))}
    </div>
  );
};

interface IImgPreviewWrapperProps {
  url: string;
  onClick?: () => void;
  children?: any;
}

const ImgPreviewWrapper: React.FC<IImgPreviewWrapperProps> = ({
  url,
  onClick,
  children,
}) => {
  if (!url) {
    return (
      <div onClick={onClick} className={css("")}>
        {children}
      </div>
    );
  }
  if (env.webLinks) {
    return (
      <a href={url} className={css("")}>
        {children}
      </a>
    );
  }
  return (
    <NavLink to={url} className={css("")}>
      {children}
    </NavLink>
  );
};

export interface IImgPreviewProps {
  onClick?: () => void;
  clickThroughUrl?: string;
  children: React.ReactElement[] | React.ReactElement;
}

/**
 * Renders a self contained image in a preview size, optionally with actions and decorations
 */
export const ImgPreview: React.FC<IImgPreviewProps> = ({
  clickThroughUrl,
  onClick,
  children,
}) => {
  /**
   * Ensures that at least either a main image or empty preview exists exists in the imgPreview component!
   */
  const x: any = React.Children.toArray(children).find(
    (y: any) => y.type !== ImgPreviewMainImage || y.type !== ImgPreviewEmpty,
  );
  if (typeof x === "undefined") {
    throw new Error(
      "ImgPreview must include either a main image or an empty image",
    );
  }

  return (
    <div data-test="img-preview">
      <ImgPreviewWrapper url={clickThroughUrl} onClick={onClick}>
        {children}
      </ImgPreviewWrapper>
    </div>
  );
};

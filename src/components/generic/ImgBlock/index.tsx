import * as React from "react";
import { useRef, useState, useLayoutEffect } from "react";

import { cssComposer } from "../../../helpers/cssComposer";
import CircularIcon from "../CircularIcon";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

import styles from "./styles.scss";
import { ImageModal } from "../ImageModal";
const css = cssComposer(styles, "ImgBlock");

type TImgBlockSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IImgBlockProps {
  src: string;
  className?: string;
  variant?: "cover" | "contain";
  style?: any;
  size?: TImgBlockSize;
  circular?: boolean;
  inset?: boolean;
  squareRatio?: boolean;
  /** Allow the user to zoom into the image */
  zoomable?: boolean;
  /** Alt text */
  alt?: string;
  onClick?: () => any;
}

/**
 * Displays an image within a placeholder space. The size is defined by the class applied.
 */
export const ImgBlock: React.FC<IImgBlockProps> = ({
  className,
  variant = "cover",
  style = {},
  size = "",
  squareRatio = false,
  inset = false,
  children,
  src,
  alt,
  zoomable,
  circular = false,
  onClick,
}) => {
  const img = useRef<HTMLImageElement>();
  const [loaded, setLoaded] = useState<boolean>();
  const [enlarge, setEnlarge] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (!img.current) return;
    img.current.onload = () => {
      setLoaded(true);
    };
  }, []);

  const imgStyle = { backgroundImage: `url('${src}')` };

  return (
    <>
      <ImageModal
        src={!!enlarge && src}
        alt={alt}
        onClose={() => setEnlarge(false)}
      />
      <div
        className={css("", `-size-${size}`, `-${variant}`, {
          "-square": squareRatio,
          "-circular": circular,
          "-inset": inset,
          "-zoomable": zoomable,
          className,
        })}
        onClick={() =>
          zoomable ? setEnlarge(true) : onClick ? onClick() : false
        }
        style={style}
        data-test="img-block-wrapper"
        data-test-is-square={squareRatio}
      >
        {!loaded ? (
          <img src={src} ref={img} />
        ) : (
          <div className={css("img")} style={imgStyle} data-test="img-block" />
        )}
        {!!children && <div className={css("children")}>{children}</div>}
        {!!zoomable && (
          <div className={css("zoomable")}>
            <CircularIcon name="enlarge2" variant={TColorVariants.Info} />
          </div>
        )}
      </div>
    </>
  );
};

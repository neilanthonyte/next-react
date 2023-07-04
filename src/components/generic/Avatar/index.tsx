import * as React from "react";

import { TLayoutDirections } from "next-shared/src/types/layouts";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Avatar");

export interface IAvatarProps {
  src: string;
  stdSize?: EStandardSizes;
  label?: string;
  direction?: TLayoutDirections;
}

/**
 * Displays a system avatar.
 */
export const Avatar: React.FC<IAvatarProps> = ({
  src,
  label = "",
  direction,
  stdSize = EStandardSizes.Medium,
}) => (
  <div className={css("", `${direction}`)}>
    <div
      style={{ backgroundImage: `url(${src})` }}
      className={css("image", {
        [`-stdSize-${stdSize}`]: !!stdSize,
        [`-${direction}`]: !!direction,
      })}
      data-test={"image"}
    />
    {!!label && (
      <span
        className={css("label", {
          [`-stdSize-${stdSize}`]: !!stdSize,
        })}
      >
        {label}
      </span>
    )}
  </div>
);

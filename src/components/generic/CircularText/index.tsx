import * as React from "react";

import { Icon, IIconProps } from "../Icon";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
const css = cssComposer(styles, "CircularText");

export interface ICircularTextProps {
  size?: EStandardSizes;
  variant?: TColorVariants;
  children: any;
  isBlock?: boolean;
  onClick?: (args: any) => any;
}

/**
 * Component that renders icons in a circular button
 */
export const CircularText: React.FC<ICircularTextProps> = ({
  size = "",
  variant = TColorVariants.None,
  isBlock = false,
  children,
  ...props
}) => {
  const classNames = css("", `-stdSize-${size}`, `-color-${variant}`, {
    "-isBlock": isBlock,
  });

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

import * as React from "react";

import { Icon, IIconProps } from "../Icon";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

export interface ICircularIconProps extends IIconProps {
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: TColorVariants;
}

/**
 * Component that renders icons in a circular button
 */
export const CircularIcon: React.FC<ICircularIconProps> = ({
  isActive = false,
  disabled = false,
  size = "",
  className = "",
  variant = TColorVariants.Primary,
  onClick,
  ...rest
}) => {
  const classNames = css(
    "circularIcon",
    `-stdSize-${size}`,
    `-color-${variant}`,
    { "-color-active": isActive, "-color-disabled": disabled, className },
  );

  return (
    <Icon
      className={classNames}
      onClick={disabled ? null : onClick}
      {...rest}
    />
  );
};

export default CircularIcon;

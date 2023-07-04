import * as React from "react";
import tinyColor from "tinycolor2";

import { Icon } from "../Icon";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Badge");

export type TBadgeVariant = "primary" | "secondary";
export type TBadgeSize = "xs" | "sm" | "md" | "lg";

export interface IBadgeProps {
  /** The value to show in the badge */
  children?: any;
  variant?: TColorVariants;
  icon?: string;
  size?: TBadgeSize;
  /** Override for specific colour - not to be used for status-related colours */
  hexColor?: string;
}

export const Badge: React.FC<IBadgeProps> = ({
  children,
  variant = TColorVariants.Primary,
  icon = null,
  hexColor,
  size,
}) => {
  const style: React.CSSProperties = {};
  const color = hexColor ? tinyColor(hexColor) : null;
  // dynamically pick text colour to complement the background colour
  const textColor = color
    ? color.isLight()
      ? "dark"
      : "light"
    : [TColorVariants.None, TColorVariants.Disabled].includes(variant)
    ? null
    : "light";

  // for special cases only
  if (color) {
    style.backgroundColor = hexColor;
    style.borderColor = hexColor;
  }

  return (
    <span
      data-test="counter"
      className={css(
        "",
        `-color-${variant}`,
        `-size-${size}`,
        `-text-${textColor}`,
      )}
      style={style}
    >
      <span>
        {!!icon && <Icon name={icon} />}
        <span className={css("label", { "-withIcon": !!icon })}>
          {children}
        </span>
      </span>
    </span>
  );
};

// presets:
export const SuccessBadge: React.FC<IBadgeProps> = ({ variant, ...props }) => (
  <Badge variant={TColorVariants.Success} {...props} />
);

export const WarningBadge: React.FC<IBadgeProps> = ({ variant, ...props }) => (
  <Badge variant={TColorVariants.Warning} {...props} />
);

export const DangerBadge: React.FC<IBadgeProps> = ({ variant, ...props }) => (
  <Badge variant={TColorVariants.Danger} {...props} />
);

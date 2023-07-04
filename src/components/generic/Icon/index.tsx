import { NavLink } from "react-router-dom";
import * as React from "react";

import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Icon");

interface IIconWrapper {
  to?: string;
  className?: string;
  onClick?: (...args: any[]) => any;
  style: React.CSSProperties;
  children: any;
}

const IconWrapper: React.FC<IIconWrapper> = ({
  to,
  className,
  onClick,
  children,
  style,
}) => {
  if (to && onClick) {
    throw new Error(
      "Cannot provide both 'onClick' & 'to' props to Icon component.",
    );
  }

  if (to) {
    return (
      <NavLink to={to} className={className} style={style} data-test="icon">
        {children}
      </NavLink>
    );
  } else {
    return (
      <span
        className={className}
        style={style}
        onClick={
          onClick
            ? function (this: any, e: React.MouseEvent<HTMLElement>) {
                e.stopPropagation();
                onClick.call(this, e);
              }
            : null
        }
        data-test="icon"
      >
        {children}
      </span>
    );
  }
};

export interface IIconProps {
  name: string;
  to?: string;
  children?: any;
  className?: string;
  /** Reduce the strength of the icon */
  subtle?: boolean;
  size?: EStandardSizes;
  animate?: boolean;
  onClick?: (...args: any[]) => any;
  variant?: TColorVariants;
  /** For special cases only - please style using the variant instead */
  backgroundColor?: string;
}

export const Icon: React.FC<IIconProps> = ({
  name,
  children,
  to,
  className = "",
  size = "",
  animate = "",
  onClick,
  subtle = false,
  variant = TColorVariants.None,
  backgroundColor,
}) => {
  const fontClass = css("", `-size-${size}`, `-color-${variant}`, animate, {
    "-clickable": !!onClick,
    "-subtle": subtle,
    [`icon-${name}`]: true,
    className,
  });

  const style = backgroundColor ? { backgroundColor } : null;

  return (
    <IconWrapper
      data-test="icon"
      className={fontClass}
      onClick={onClick || null}
      to={to}
      style={style}
    >
      {React.Children.map(children, (child) => {
        if (!child) {
          return null;
        }
        if (child.type !== Icon) {
          throw new Error("Only one Icon component allowed as child");
        }
        return (
          <div className={css("childIcon")} data-test="child-icon">
            {child}
          </div>
        );
      })}
    </IconWrapper>
  );
};

export const AllIcons = () =>
  Object.keys(styles).map((iconClass, i) => {
    if (!iconClass.match(/^icon-/)) {
      return null;
    }
    const name = iconClass.replace(/^icon-/, "");
    return (
      <div
        key={i}
        style={{
          display: "inline-block",
          fontSize: "8pt",
          margin: "0 32px 32px 0",
          textAlign: "center",
        }}
      >
        <Icon name={name} size={EStandardSizes.Large} />
        <div style={{ marginTop: "8px" }}>{name}</div>
      </div>
    );
  });

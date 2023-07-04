import * as React from "react";

import { TDialogSizes } from "next-shared/src/types/dialogs";

import { Footer } from "../../abstract/Footer";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

const css = cssComposer(styles, "Dialog");

export interface IDialogHeaderProps {
  children?: any;
  navbar?: boolean;
}

export const DialogHeader: React.FC<IDialogHeaderProps> = ({
  children = null,
}) => {
  if (!children) {
    return null;
  }
  return (
    <div className={css("header")} data-test="dialog-header">
      <h3>{children}</h3>
    </div>
  );
};

export interface IDialogBodyProps {
  fixedHeight?: boolean;
  children: any;
}

export const DialogBody: React.FC<IDialogBodyProps> = ({
  children,
  fixedHeight = false,
}) => (
  <div
    className={css("body", { "-fixedHeight": fixedHeight })}
    data-test="dialog-body"
  >
    {children}
  </div>
);

export interface IFooterAction {
  label: string;
  onClick: (args?: any) => any;
  icon?: string;
  variant?: TColorVariants;
  // TODO absorb into variant
  disabled?: boolean;
}

export interface IDialogFooterProps {
  onAccept?: (args?: any) => any;
  acceptLabel?: string;
  acceptDisabled?: boolean;
  onCancel?: (args?: any) => any;
  cancelLabel?: string;
  actions?: Array<IFooterAction>;
  children?: any;
  isSticky?: boolean;
}

export const DialogFooter: React.FC<IDialogFooterProps> = ({
  children,
  isSticky,
  ...rest
}: IDialogFooterProps) => {
  return (
    <div
      className={css("footer", { "-isSticky": isSticky })}
      data-test="dialog-footer"
    >
      <Footer {...rest}>{children}</Footer>
    </div>
  );
};

/**
 * Dialog box. This is usually a blocking message and can be
 * enhanced with actions requiring more logic (e.g. async requests) through.
 *
 * For a simpler inline message use [Message](#Message)
 */
export interface IDialogProps {
  size?: TDialogSizes;
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
  closeable?: boolean;
}

export const Dialog: React.FC<IDialogProps> = ({
  size = TDialogSizes.Medium,
  children,
  className,
  sticky = false,
  closeable = true,
}) => {
  return (
    <div
      className={css(
        "",
        `-size-${size}`,
        { "-sticky": sticky, "-closeable": closeable },
        className,
      )}
      data-test="dialog-content"
    >
      {children}
    </div>
  );
};

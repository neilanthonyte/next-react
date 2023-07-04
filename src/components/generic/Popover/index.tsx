import * as React from "react";
import { ReactElement } from "react";
import _Popover from "react-popover";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Popover");

export enum EPopupVariant {
  Standard = "standard",
  Filters = "filters",
}

// for use across the codebase without referencing an external typedef.
export type TPopoverPosition = _Popover.PopoverPlace;

export interface IPopoverProps {
  /** The opened/closed state of the popover. */
  open: boolean;
  /** Called when the popover should close. Use this method to close the
   * popover and perform and related logic. */
  closeHandler?: (event: Event) => void;
  /** The element that the popover will position itself around. */
  target: ReactElement;
  /** Object determining placement of ppopover in relation to target element.
   */
  placement?: {
    /** Desired location of popover in relation to target element. */
    position: TPopoverPosition;
    /** Force placment of popover, ignoring if there is available space. */
    force?: boolean;
  };
  variant?: EPopupVariant;
  showTip?: boolean;
}

export const Popover: React.FC<IPopoverProps> = ({
  open,
  closeHandler,
  children,
  target,
  placement,
  variant = EPopupVariant.Standard,
  showTip = true,
}) => {
  const body = (
    <div className={css("body")} data-test="popover-body">
      {children}
    </div>
  );

  const innerProps: _Popover.PopoverProps = {
    body,
    isOpen: open,
    className: css("", `-${variant}`),
    onOuterAction: closeHandler,
  };

  if (placement) {
    if (placement.force) {
      innerProps.place = placement.position;
    } else {
      innerProps.preferPlace = placement.position;
    }
  }

  return (
    <_Popover
      {...innerProps}
      // HACK https://github.com/littlebits/react-popover/issues/159
      appendTarget={document.body}
      // default and no-show from library
      tipSize={showTip ? 7 : 0.01}
    >
      {target}
    </_Popover>
  );
};

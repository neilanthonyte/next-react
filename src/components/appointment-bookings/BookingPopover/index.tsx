import * as React from "react";
import { useRef, useEffect } from "react";

import { TDialogSizes } from "next-shared/src/types/dialogs";

import { Dialog, DialogBody } from "../../structure/Dialog";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "BookingPopover");

export interface IBookingPopoverProps {
  children: any;
}

/**
 * Component used for rendering booking flow in a modal
 */
export const BookingPopover: React.FC<IBookingPopoverProps> = ({
  children,
}) => {
  const element = useRef<HTMLDivElement>();
  useEffect(() => {
    if (!element.current) return;
    // HACK - timeout needed to ensure it's in the DOM (including animation)
    setTimeout(() => {
      if (element.current)
        element.current.scrollIntoView({ behavior: "smooth", block: "start" });
      else console.warn("popover disappeared");
    }, 500);
  }, [element]);
  return (
    <div className={css("")}>
      <div className={css("overlay")}></div>
      <div className={css("popover")} ref={element}>
        <Dialog size={TDialogSizes.Full}>
          <DialogBody>{children}</DialogBody>
        </Dialog>
      </div>
    </div>
  );
};

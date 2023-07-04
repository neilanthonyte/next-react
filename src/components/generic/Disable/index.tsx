import * as React from "react";

import { Loader } from "../Loader";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Disable");

export interface IDisableProps {
  children: any;
  disabled?: boolean;
  message?: string;
  showSpinner?: boolean;
}

/**
 * Component conditionally rendering a disabled styled overlay on its content
 * Includes options to render a spinner and a message
 */
export const Disable: React.FC<IDisableProps> = ({
  children,
  disabled,
  message,
  showSpinner = false,
}) => {
  return (
    <div className={css("", { "-active": disabled })}>
      <div className={css("content")}>{children}</div>
      <div className={css("overlay")}>
        {!!message && <div className={css("message")}>{message}</div>}
        {showSpinner && (
          <div>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

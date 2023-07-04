import * as React from "react";

import { CircularIcon } from "../CircularIcon";
import { Collapse } from "../Collapse";
import { ErrorMessage, MessageBody } from "../Message";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "InputControls");

interface IInputControlsProps {
  children: any;
  onClearValue?: ((...args: any[]) => any) | boolean;
  errors?: any[] | boolean;
  /** Determine if the clear is indented, rather than overlaid */
  indentClear?: boolean;
}

export const InputControls: React.FC<IInputControlsProps> = ({
  onClearValue = false,
  errors = [],
  children,
  indentClear,
}) => {
  const error: string =
    Array.isArray(errors) && errors.length ? errors[0] : null;
  const clearFunc: (...args: any[]) => any =
    typeof onClearValue === "function" ? onClearValue : undefined;

  return (
    <div>
      <div
        className={css("", {
          "-clearable": !!onClearValue,
          "-indentClear": indentClear,
        })}
      >
        <div className={css("input")}>
          {children}
          <span
            className={css("clear", { "-active": !!onClearValue })}
            data-test="clear"
            data-test-active={!!onClearValue ? "active" : "inactive"}
          >
            <CircularIcon
              name="cancel"
              variant={TColorVariants.Secondary}
              disabled={!onClearValue}
              onClick={clearFunc}
            />
          </span>
        </div>
      </div>
      <div data-test="errors">
        <Collapse isOpened={!!error}>
          <div data-test="error">
            <ErrorMessage>
              <MessageBody>{error}</MessageBody>
            </ErrorMessage>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

import * as React from "react";

import { AltButton, Button } from "../../generic/Button";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Footer");

export interface IFooterAction {
  label: string;
  onClick: (args?: any) => any;
  disabled?: boolean;
}

export interface IFooterProps {
  onAccept?: (args?: any) => any;
  acceptLabel?: string;
  acceptDisabled?: boolean;
  onCancel?: (args?: any) => any;
  cancelLabel?: string;
  actions?: Array<IFooterAction>;
  children?: any;
}

/**
 * Renders a basic footer content
 * Supports some common action out of the box (accept and cancel)
 * and custom actions
 */
export const Footer: React.FC<IFooterProps> = ({
  onAccept,
  acceptLabel = "Done",
  acceptDisabled = false,
  onCancel,
  cancelLabel = "Cancel",
  actions,
  children,
}) => {
  if (!(onCancel || onAccept || actions || children)) {
    return null;
  }
  const hasActions = !!onCancel || !!onAccept || !!actions?.length;
  return (
    <div className={css("")} data-test="dialog-footer">
      <div className={css("content")} data-test="content">
        {children}
      </div>
      {hasActions && (
        <div className={css("actions")}>
          {onCancel && (
            <span data-test="cancel">
              <AltButton onClick={onCancel}>{cancelLabel}</AltButton>
            </span>
          )}
          {onAccept && (
            <span data-test="accept">
              <Button
                onClick={onAccept}
                disableOnSuccess={false}
                disabled={acceptDisabled}
              >
                {acceptLabel}
              </Button>
            </span>
          )}
          {!!actions?.length && (
            <span className={css("custom-actions")} data-test="custom-actions">
              {actions.map((action, i) => (
                <span key={i} data-test={`action-${i}`}>
                  <Button
                    onClick={action.onClick}
                    disableOnSuccess={false}
                    disabled={action.disabled}
                  >
                    {action.label}
                  </Button>
                </span>
              ))}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

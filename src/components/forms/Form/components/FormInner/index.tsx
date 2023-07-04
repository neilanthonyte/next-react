import * as React from "react";

import {
  DialogHeader,
  DialogFooter,
  IFooterAction,
} from "../../../../structure/Dialog";

import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
const css = cssComposer(styles, "FormInner");

// TODO - tighten type
export interface IFormProps {
  title?: string;
  onSubmit: ((arg?: any) => any) | boolean;
  submitLabel?: string;
  onCancel: ((arg?: any) => any) | boolean;
  cancelLabel?: string;
}

/**
 * Top-level form component.
 */
export const FormInner: React.FC<IFormProps> = ({
  onSubmit,
  title = false,
  submitLabel = "Submit",
  onCancel,
  cancelLabel,
  children,
}) => {
  const actions: IFooterAction[] = [];

  if (typeof onSubmit === "function") {
    actions.push({ label: submitLabel, onClick: onSubmit });
  }

  return (
    <form
      className={css("")}
      onSubmit={(e) => {
        e.preventDefault();
        if (typeof onSubmit === "function") {
          onSubmit();
        }
      }}
    >
      {title && (
        <div data-test="header">
          <DialogHeader>{title}</DialogHeader>
        </div>
      )}
      <div data-test="body">{children}</div>
      <div data-test="footer">
        <DialogFooter
          actions={actions}
          onCancel={typeof onCancel === "function" ? onCancel : undefined}
          cancelLabel={cancelLabel}
        />
      </div>
    </form>
  );
};

// HACK - legacy support
export default FormInner;

import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
const css = cssComposer(styles);

export const formFieldLayoutTypes = {
  DEFAULT: "-default",
  INLINE: "-inline",
};

export interface IFormFieldLayoutProps {
  layout?: string | boolean;
}

/**
 * Renders a collection of fields in a chosen layout.
 */
export const FormFieldLayout: React.FC<IFormFieldLayoutProps> = ({
  children,
  layout = false,
}) => {
  layout = layout || formFieldLayoutTypes.DEFAULT;
  return (
    <div className={css("formFieldLayout", layout)}>
      {React.Children.map(
        children,
        (field, i) =>
          field && (
            <div key={i} className={css("formFieldLayout_field")}>
              {field}
            </div>
          ),
      )}
    </div>
  );
};

export default FormFieldLayout;

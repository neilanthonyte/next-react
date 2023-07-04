import * as React from "react";
import * as PropTypes from "prop-types";

import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
import { BlockButton } from "../../../../generic/Button";
const css = cssComposer(styles);

export interface IFormGroupProps {
  label?: string;
  /** Additional descriptive text */
  description?: string;
  /** Callback for removing selected instance */
  onNewInstance?: () => void;
  /** Label for new instance button */
  newInstanceLabel?: string;
}

/**
 * A collection of fields to be rendered together in a group. Supports multiple
 * group instances.
 */
export const FormGroup: React.FC<IFormGroupProps> = ({
  label,
  description,
  onNewInstance,
  newInstanceLabel = "",
  children,
}) => (
  <div
    className={css("formGroup", { "-multiValue": !!onNewInstance })}
    data-test={"form-group"}
  >
    <header>
      {label && <h4 className={css("formGroup_label")}>{label}</h4>}
      {description && (
        <p className={css("formGroup_description")}>{description}</p>
      )}
    </header>
    {React.Children.map(children, (formInput, i) => (
      <div key={i} className={css("formGroup_instance")}>
        {formInput}
      </div>
    ))}
    {onNewInstance && (
      <BlockButton onClick={onNewInstance}>
        {newInstanceLabel ? newInstanceLabel : "Click to add another entry"}
      </BlockButton>
    )}
  </div>
);

export default FormGroup;

import * as React from "react";

import { TLayoutDirections } from "next-shared/src/types/layouts";
import { Img } from "../Img";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "InputDecoration");

interface IInputDecorationProps {
  label?: string;
  description?: string;
  descriptionImageUrl?: string;
  hasError?: any;
  isRequired?: boolean;
  disabled?: boolean;
  layout?: TLayoutDirections;
}
/**
 * Used to wrap one or more input fields and provide common elements, e.g. errors,
 * labels, decorations, etc.
 */
export const InputDecoration: React.FC<IInputDecorationProps> = ({
  label,
  description,
  descriptionImageUrl,
  hasError = false,
  isRequired = false,
  layout = TLayoutDirections.Column,
  children,
}) => {
  // Wraps all parts of the input
  const formInputClasses = css("", `-layout-${layout}`, {
    "-error": hasError,
  });

  const showDescription = !!descriptionImageUrl || !!description;

  return (
    <div
      className={formInputClasses}
      data-test="form-input"
      data-layout={layout}
    >
      <div className={css("container")}>
        {label && (
          <label className={css("label")} data-test="label">
            {label}{" "}
            {!isRequired && (
              <span className={css("label_optional")}>(optional)</span>
            )}
          </label>
        )}
        {showDescription && (
          <div
            className={css("description", {
              "-withImage": !!descriptionImageUrl,
            })}
          >
            {descriptionImageUrl && (
              <div className={css("descriptionImage")}>
                <Img responsive={true} src={descriptionImageUrl} />
              </div>
            )}
            {description && (
              <div
                dangerouslySetInnerHTML={{ __html: description }}
                data-test="description"
              />
            )}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

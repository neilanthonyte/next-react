import * as React from "react";
import { RawHTML } from "../../../../articles/Article/components/RawHTML";

import styles from "./styles.scss";

export interface IFormHeadingProps {
  label: string;
  description?: string;
}

export const FormHeading: React.FC<IFormHeadingProps> = ({
  label,
  description,
}) => {
  return (
    <div className={styles.FormHeading}>
      <h4>{label}</h4>
      {!!description && (
        <div className={styles.FormHeading_description}>
          <RawHTML html={description} />
        </div>
      )}
    </div>
  );
};

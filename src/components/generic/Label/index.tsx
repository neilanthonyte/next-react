import * as React from "react";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "Label");

export interface ILabelProps {
  text: string;
  description?: string;
  children: React.ReactElement<any>;
}

/**
 * Label component to wrap an input component. Has optional description text about the field
 */
export const Label: React.FC<ILabelProps> = ({
  text,
  description = "",
  children,
}) => {
  return (
    <div className={css("")}>
      <div className={css("text")}>
        {text}
        <div className={css("description")}>{description}</div>
      </div>
      {children}
    </div>
  );
};

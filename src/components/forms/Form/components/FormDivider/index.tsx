import * as React from "react";

import styles from "./styles.scss";

export interface IFormDividerProps {}

export const FormDivider: React.FC<IFormDividerProps> = ({}) => {
  return <div className={styles.FormDivider} />;
};

import * as React from "react";

import styles from "./styles.scss";

export interface ICenterProps {}

export const Center: React.FC<ICenterProps> = ({ children }) => {
  return <div className={styles.Center}>{children}</div>;
};

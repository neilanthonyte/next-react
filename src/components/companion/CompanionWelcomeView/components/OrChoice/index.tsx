import React from "react";

import styles from "./styles.scss";

export interface IOrChoiceProps {}

export const OrChoice: React.FC<IOrChoiceProps> = ({ children }) => {
  return <div className={styles.OrChoice}>{children}</div>;
};

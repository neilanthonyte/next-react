import * as React from "react";

import styles from "../../styles.scss";

export interface IRawHTMLProps {
  html: string;
}

export const RawHTML: React.FC<IRawHTMLProps> = ({ html }) => (
  <div className={styles.text} dangerouslySetInnerHTML={{ __html: html }} />
);

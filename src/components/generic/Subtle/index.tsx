import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Subtle");

export interface ISubtleProps {
  children: any;
}

/**
 * Wrapper component rendering its content in a subtle styled way
 */
export const Subtle: React.FC<ISubtleProps> = ({ children }) => {
  return <span className={css("")}>{children}</span>;
};

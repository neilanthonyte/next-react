import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

export interface IGoalProps {
  children: string;
  unit?: string;
}

export const Goal: React.FC<IGoalProps> = ({ children, unit = false }) => (
  <span className={css("goal")}>
    {children}
    {unit && <small>{unit}</small>}
  </span>
);

export default Goal;

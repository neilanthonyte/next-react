import * as React from "react";
import * as _ from "lodash";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "numericStatistic");

export interface INumericStatisticProps {
  label?: string;
  children: string | number;
}

export const NumericStatistic: React.FC<INumericStatisticProps> = ({
  label,
  children,
}) => (
  <span className={css("")}>
    <span className={css("value")}>{children.toString()}</span>
    <label className={css("label")}>{label}</label>
  </span>
);

import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Trend");

export interface ITrend {
  value: number;
  asPercent?: boolean;
  isInverted?: boolean;
}

export interface ITrendProps {
  trend: ITrend;
}

const getTrendSign = (value: number) => {
  if (value === 0) {
    return "";
  }
  if (value > 0) {
    return "+";
  }
  if (value < 0) {
    return "-";
  }
};

const getTrendStatus = (value: number, invert: boolean) => {
  if (value === 0) {
    return "neutral";
  }
  if (value > 0) {
    return invert ? "negative" : "positive";
  }
  if (value < 0) {
    return invert ? "positive" : "negative";
  }
};

export const Trend: React.FC<ITrendProps> = ({ trend }) => {
  const { value, asPercent = false, isInverted = false } = trend;
  const trendSign = getTrendSign(value);
  const trendStatus = getTrendStatus(value, isInverted);

  // absolute the value here before we set the sign manually.
  const trendStr = `${trendSign}${Math.abs(value)}${asPercent ? "%" : ""}`;
  return <div className={css("", `-${trendStatus}`)}>{trendStr}</div>;
};

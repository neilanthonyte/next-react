import * as React from "react";
import styles from "./styles.scss";

export interface IMetricProps {
  value: number | string;
}

export const Metric: React.FC<IMetricProps> = (props) => {
  const { value } = props;

  return (
    <div className={styles.metricContainer}>
      <h1>{value}</h1>
    </div>
  );
};

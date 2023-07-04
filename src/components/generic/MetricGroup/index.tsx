import * as React from "react";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
const css = cssComposer(styles, "metricGroup");

export interface IMetricGroupProps {
  stdSize: EStandardSizes;
}

export const MetricGroup: React.FC<IMetricGroupProps> = ({
  children,
  stdSize,
}) => {
  return (
    <div data-test="metric-group" className={css("")}>
      {React.Children.toArray(children).map((child, i) => (
        <div key={i}>
          {React.cloneElement(child as React.ReactElement, { size: stdSize })}
        </div>
      ))}
    </div>
  );
};

export interface IMetricProps {
  size?: EStandardSizes;
  title?: string;
}

export const Metric: React.FC<IMetricProps> = ({ children, size, title }) => {
  return (
    <div data-test="metric" className={css("metric")}>
      {React.cloneElement(children as React.ReactElement, { size })}
      {title ? (
        <p
          data-test="metric-title"
          className={css("metric_title", `-size-${size}`)}
        >
          {title}
        </p>
      ) : null}
    </div>
  );
};

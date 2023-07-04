import * as React from "react";

import { Icon } from "../../generic/Icon";
import { Goal } from "../../generic/Goal";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";

import FhirGoal from "../../resources/FhirGoal";
const css = cssComposer(styles);

export interface IMetricCellProps {
  value?: string;
  valueLabel?: string;
  goal?: string;
  fhirGoal?: fhir3.Goal;
  goalLabel?: string;
  unit?: string;
  trend?: "up" | "down" | "stable";
}

/**
 * Renders metric data.
 */
export const MetricCell: React.FC<IMetricCellProps> = (props) => {
  const { value, valueLabel, goal, fhirGoal, goalLabel, unit, trend } = props;
  return (
    <div className={css("metricCell")}>
      {value && (
        <div className={css("metricCell_metric")}>
          {valueLabel && (
            <div className={css("metricCell_label")}>{valueLabel}</div>
          )}
          <div className={css("metricCell_metric_value")}>
            {trend && (
              <div className={css("metricCell_trend", `-${trend}`)}>
                <Icon name="trend" />
              </div>
            )}
            <span>
              {value}
              {unit && <small>{unit}</small>}
            </span>
          </div>
        </div>
      )}
      {goal && (
        <div className={css("metricCell_goal")}>
          {goalLabel && (
            <div className={css("metricCell_label")}>{goalLabel}</div>
          )}
          <Goal unit={unit}>{goal}</Goal>
        </div>
      )}
      {fhirGoal && (
        <div className={css("metricCell_goal")}>
          {goalLabel && (
            <div className={css("metricCell_label")}>{goalLabel}</div>
          )}
          <FhirGoal goal={fhirGoal} />
        </div>
      )}
    </div>
  );
};

export default MetricCell;

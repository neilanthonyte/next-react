import * as React from "react";
import { CircularMetric } from "../../generic/CircularMetric";
import { Metric, MetricGroup } from "../../generic/MetricGroup";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { ChecklistDayPreview } from "next-shared/src/models/ChecklistDayPreview";

export interface IChecklistDayPreviewMetricsProps {
  dayPreview: ChecklistDayPreview;
}

export const ChecklistDayPreviewMetrics: React.FC<
  IChecklistDayPreviewMetricsProps
> = ({ dayPreview }) => {
  return (
    <MetricGroup stdSize={EStandardSizes.Medium}>
      <Metric title={"Completed Tasks"}>
        <CircularMetric variant={TColorVariants.Success}>
          {dayPreview.completedTasks}
        </CircularMetric>
      </Metric>
      <Metric title={"Incomplete Tasks"}>
        <CircularMetric variant={TColorVariants.Danger}>
          {dayPreview.incompleteTasks}
        </CircularMetric>
      </Metric>
    </MetricGroup>
  );
};

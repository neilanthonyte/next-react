import * as React from "react";
import { useContext, useMemo } from "react";

import { CircularMetric } from "../../generic/CircularMetric";
import { Metric, MetricGroup } from "../../generic/MetricGroup";
import { OpsActionsContext } from "../../../contexts/OpsActionsContext";
import { PendingContent } from "../../structure/PendingContent";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { ChecklistContext } from "../../../contexts/ChecklistContext";

/**
 * Utilises the system 3 contexts to show an overview containing the remaining task count and outstanding issues.
 */
export const TasksAndActionsOverviewWidget: React.FC = () => {
  const { checklistTasks } = useRequiredContext(ChecklistContext);
  const { opsActions } = useContext(OpsActionsContext);

  const pendingTaskCount: number | null = useMemo(() => {
    if (checklistTasks === null) {
      return;
    }
    const dailyTasks = (checklistTasks || []).filter((t) => t.isDailyTask());
    return dailyTasks.filter((dailyChecklistTask) =>
      dailyChecklistTask.isOutstanding(),
    ).length;
  }, [checklistTasks]);

  const pendingActionCount: number | null = useMemo(() => {
    if (opsActions === null) {
      return;
    }

    return opsActions.length;
  }, [opsActions]);

  const dataIsLoaded = pendingTaskCount !== null && pendingActionCount !== null;

  return (
    <PendingContent check={dataIsLoaded} isLocalised>
      {dataIsLoaded && (
        <MetricGroup stdSize={EStandardSizes.Medium}>
          <Metric title={"Tasks Remaining"}>
            <CircularMetric
              variant={
                pendingTaskCount === 0
                  ? TColorVariants.Success
                  : TColorVariants.Danger
              }
            >
              {pendingTaskCount}
            </CircularMetric>
          </Metric>
          <Metric title={"Issues to Resolve"}>
            <CircularMetric
              variant={
                pendingActionCount === 0
                  ? TColorVariants.Success
                  : TColorVariants.Danger
              }
            >
              {pendingActionCount}
            </CircularMetric>
          </Metric>
        </MetricGroup>
      )}
    </PendingContent>
  );
};

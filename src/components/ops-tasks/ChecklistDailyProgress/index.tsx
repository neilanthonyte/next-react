import * as React from "react";
import { useMemo } from "react";

import { ProgressBar, IProgressState } from "../../generic/ProgressBar";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { ChecklistContext } from "../../../contexts/ChecklistContext";
import { Loader } from "../../generic/Loader";

export interface IChecklistDailyProgressChartProps {}

export const ChecklistDailyProgress: React.FC<
  IChecklistDailyProgressChartProps
> = () => {
  const { checklistTasks } = useRequiredContext(ChecklistContext);

  const progress: IProgressState[] = useMemo(() => {
    if (checklistTasks === null) {
      return;
    }

    const dailyTasks = checklistTasks.filter((t) => t.isDailyTask());
    const totalTasks = dailyTasks.length;
    const completedTasks = dailyTasks.filter((t) => !t.isOutstanding());
    const tasksLate = Object.values(completedTasks).filter(
      (task) => task.wasLate,
    ).length;

    return [
      {
        progress: completedTasks.length / totalTasks,
        state: TColorVariants.Success,
      },
      {
        progress: tasksLate / totalTasks,
        state: TColorVariants.Danger,
      },
    ];
  }, [checklistTasks]);

  return progress ? (
    <ProgressBar progress={progress} size={EStandardSizes.ExtraSmall} />
  ) : (
    <Loader />
  );
};

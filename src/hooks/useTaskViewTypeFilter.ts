import { useCallback } from "react";

import { ChecklistTask } from "next-shared/src/models/ChecklistTask";
import { TTaskViewTypes } from "next-shared/src/types/TTaskViewTypes";
import { useTaskDueTodayFilter } from "./useTaskDueTodayFilter";

export const useTaskViewTypeFilter = (
  type: TTaskViewTypes,
): ((task: ChecklistTask) => boolean) => {
  const dueFilter = useTaskDueTodayFilter();

  return useCallback(
    (task: ChecklistTask) => {
      switch (type) {
        case TTaskViewTypes.DueToday:
          return dueFilter(task);
        case TTaskViewTypes.Upcoming: {
          return !dueFilter(task);
        }
        default:
          throw new Error("unknown task view type");
      }
    },
    [type],
  );
};

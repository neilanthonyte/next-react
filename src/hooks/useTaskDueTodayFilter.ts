import { useMemo, useCallback } from "react";

import { useClient } from "../hooks/useClient";
import { ChecklistTask } from "next-shared/src/models/ChecklistTask";

export const useTaskDueTodayFilter = (): ((task: ChecklistTask) => boolean) => {
  const client = useClient();
  const activeLocation = useMemo(
    () => client.auth.activeLocation,
    [client.auth.activeLocation],
  );

  const dueFilter = useCallback(
    (task: ChecklistTask): boolean =>
      activeLocation
        ? task.dueToday(activeLocation) || task.isOverdue()
        : false,
    [activeLocation],
  );

  return dueFilter;
};

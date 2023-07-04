import * as React from "react";
import { useMemo } from "react";

import { Widget } from "../../generic/Widget";
import { VStack } from "../../structure/VStack";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { ChecklistContext } from "../../../contexts/ChecklistContext";
import { ChecklistTask } from "next-shared/src/models/ChecklistTask";
import { PlaceholderView } from "../../views/PlaceholderView";
import { checklistPaths } from "../../views/opsTasksRoutes";
import { useTaskDueTodayFilter } from "../../../hooks/useTaskDueTodayFilter";
import { ChecklistDailyProgress } from "../../ops-tasks/ChecklistDailyProgress";
import { AnimatedList } from "../../atoms/AnimatedList";
import { OpsTask } from "../../ops-tasks/OpsTask";

export const ChecklistDailyProgressWidget: React.FC = () => {
  const { checklistTasks } = useRequiredContext(ChecklistContext);

  const dayFilter = useTaskDueTodayFilter();

  const dueToday = useMemo(
    () =>
      (checklistTasks || []).filter(
        (t) => dayFilter(t) && t.completedAt === null,
      ),
    [checklistTasks],
  );

  const nextTasks: ChecklistTask[] = useMemo(() => {
    const dailyTasks = (checklistTasks || []).filter((t) => t.isDailyTask());
    return dailyTasks.filter((t) => t.isOutstanding()).slice(0, 4);
  }, [checklistTasks]);

  return (
    <Widget
      badge={dueToday.length}
      label="Daily Task Progress"
      toMore={`${checklistPaths.root}${checklistPaths.checklistDueToday}`}
    >
      {nextTasks ? (
        <VStack>
          <ChecklistDailyProgress />
          <AnimatedList
            tasks={nextTasks.map((t) => ({
              id: t.id,
              component: () => <OpsTask task={t} />,
            }))}
          />
        </VStack>
      ) : (
        <PlaceholderView icon={"tick"} instruction={"Tasks up to date"} />
      )}
    </Widget>
  );
};

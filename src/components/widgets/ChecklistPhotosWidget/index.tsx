import * as React from "react";
import { useMemo } from "react";

import { Widget } from "../../generic/Widget";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { ChecklistContext } from "../../../contexts/ChecklistContext";
import { ChecklistTaskImages } from "../../ops-tasks/ChecklistTaskImages";

export const ChecklistPhotosWidget: React.FC = () => {
  const { checklistTasks } = useRequiredContext(ChecklistContext);
  const dailyTasks = useMemo(
    () => (checklistTasks || []).filter((t) => t.isDailyTask()),
    [checklistTasks],
  );

  return (
    <Widget
      label="Today's Photos"
      toMore="/tasks/due-today"
      loading={!dailyTasks}
    >
      {!!dailyTasks && <ChecklistTaskImages checklistTasks={dailyTasks} />}
    </Widget>
  );
};

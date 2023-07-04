import * as React from "react";

import { ChecklistDayPreview } from "next-shared/src/models/ChecklistDayPreview";
import { ChecklistTask } from "next-shared/src/models/ChecklistTask";

export interface ITaskGroup {
  label: string;
  dueAt: number;
  tasks: ChecklistTask[];
}

export interface IChecklistContextValue {
  checklistTasks: ChecklistTask[];
  filteredTasks: ChecklistTask[];
  groupedTasks: ITaskGroup[];
  isOpenToday: boolean;
  checklistDayPreview: ChecklistDayPreview;
  updateTask: (opsTask: ChecklistTask, value?: any) => Promise<void>;
  filter: (task: ChecklistTask) => boolean;
  setFilter: (filter: (task: ChecklistTask) => boolean) => void;
}

export const ChecklistContext = React.createContext<IChecklistContextValue>({
  checklistTasks: undefined,
  filteredTasks: undefined,
  groupedTasks: undefined,
  isOpenToday: undefined,
  checklistDayPreview: undefined,
  updateTask: undefined,
  filter: undefined,
  setFilter: undefined,
});

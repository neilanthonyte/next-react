import React, { useContext } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as _ from "lodash";

import { useClient } from "../../../hooks/useClient";
import { ChecklistTask } from "next-shared/src/models/ChecklistTask";
import {
  ChecklistContext,
  IChecklistContextValue,
  ITaskGroup,
} from "../../../contexts/ChecklistContext";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { ErrorResolverContext } from "../../../contexts/ErrorResolver";
import { useCachedSyncedData } from "../../../hooks/core/useCachedSyncedData";
import moment from "moment";
import { useSyncedTasks } from "next-react/src/hooks/useSyncedTasks";

export interface IChecklistHandlerProps {
  /** Extra tasks to add to the main set of tasks coming from the server.
   * This can come from another source or be pseudo tasks made to
   * correlation to the completion of actions performed in other parts of
   * the system.
   */
  extraOpsTasks?: ChecklistTask[];
  /** Function to perform an update on the extra tasks passed in */
  onUpdate?: (opsTask: ChecklistTask, value?: any) => void;
}

/**
 * Provides the business logic for handling tasks.
 */
export const ChecklistHandler: React.FC<IChecklistHandlerProps> = ({
  children,
  extraOpsTasks: _extraOpsTasks,
  onUpdate = null,
}) => {
  // avoid re-renders if extraOpsTasks isn't provided
  const extraOpsTasks = useMemo(() => _extraOpsTasks || [], [_extraOpsTasks]);

  const client = useClient();
  const { resolveError } = useRequiredContext(ErrorResolverContext);
  const [filter, setFilter] = useState<(task: ChecklistTask) => boolean>(
    () => () => true,
  );

  // full set of tasks that include anything coming from the server and
  // anything else passed in
  const [checklistTasks, setChecklistTasks] = useState<ChecklistTask[]>(null);

  const { checklist, error } = useSyncedTasks();
  /**
   * Add an extra tasks passed in to the main set coming from the server
   */
  useEffect(() => {
    if (checklist === undefined) {
      return;
    }

    const { checklistTasks } = checklist;

    // if extra tasks where provided then add them to the original tasks
    // from the server
    const combinedTasks = [...checklistTasks, ...extraOpsTasks];
    setChecklistTasks(combinedTasks);
  }, [checklist, extraOpsTasks, error]);

  /**
   * Run the update function passed in on the task if it's in the extra ones
   * otherwise we just update the given task on the server
   */
  const updateTask = useCallback(
    async (opsTask: ChecklistTask, value?: any): Promise<void> => {
      // ensure extra ops task and the update function is valid before updating
      if (!opsTask.id) {
        // check that this ops task exists in the extra ones
        const extraOpsTasksIndex = extraOpsTasks.indexOf(opsTask);

        // if it does then run the passed in update function on it if it valid
        if (extraOpsTasksIndex === -1) {
          console.warn("unable to find task");
        } else if (typeof onUpdate !== "function") {
          console.warn("no onUpdate provided");
        } else {
          // let the onUpdate handle setting the value or do something different
          onUpdate(opsTask, value);
        }

        return;
      }

      // otherwise just run the normal update task on server
      // this is for either for:
      //  - normal task
      //  - extra task where onUpdate function wasn't provided
      try {
        // provides a more responsive experience
        // value was provided and not already overidden in the task
        if (value !== undefined) {
          opsTask.setValue(value);
        }
        await client.tasks.updateTask(opsTask);
      } catch (e) {
        // reset value as it failed to update
        opsTask.resetValue();
        console.warn(e);
        resolveError({
          title: `Unable to update "${opsTask.title}"`,
          approach: "modal",
        });
      }
    },
    [extraOpsTasks, onUpdate],
  );

  const provider: IChecklistContextValue = useMemo(() => {
    const { dayPreview = null, isOpenToday = null } = checklist || {};

    if (checklist === null || checklistTasks === null) {
      return {
        checklistTasks: null,
        filteredTasks: null,
        groupedTasks: null,
        checklistDayPreview: null,
        updateTask,
        filter,
        setFilter,
        // HACK should be moved to the location
        isOpenToday,
      };
    }

    // reduce base on the provided filter function
    const filteredTasks = checklistTasks.filter(filter);
    const sortedTasks = _.sortBy(filteredTasks, (t) => t.dueToday);

    const groupedTasks: { [label: string]: ITaskGroup } = {};
    sortedTasks.map((t) => {
      const label = t.getDueLabel();
      if (!groupedTasks[label]) {
        groupedTasks[label] = {
          label,
          dueAt: t.dueDate,
          tasks: [],
        };
      }
      groupedTasks[label].tasks.push(t);
    });

    return {
      checklistTasks,
      filteredTasks,
      groupedTasks: _.orderBy(Object.values(groupedTasks), (grp) => grp.dueAt),
      checklistDayPreview: dayPreview,
      updateTask,
      filter,
      setFilter,
      // HACK should be moved to the location
      isOpenToday,
    };
  }, [checklistTasks, filter]);

  return (
    <ChecklistContext.Provider value={provider}>
      {children}
    </ChecklistContext.Provider>
  );
};

/**
 * Convenience hook to use the checklist context methods from the checklist handler.
 */
export const useChecklistContext = () => {
  const context = useContext(ChecklistContext);
  if (!context) {
    throw new Error(
      "Missing context. useCheclistContext must be used inside CheclistHandler",
    );
  }
  return context;
};

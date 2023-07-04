import React, { useCallback, useMemo } from "react";
import { flatten, sortBy } from "lodash";
import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";
import { timestampLabel } from "next-shared/src/helpers/time";
import { Action } from "next-shared/src/models/Action";
import { BaseTask } from "next-shared/src/models/BaseTask";
import {
  ActionFulfillment,
  EActionFulfillmentResolution,
} from "next-shared/src/models/ActionFulfillment";

import { Task } from "../../generic/Task";
import { List, ListItem } from "../../structure/List";

import { useUpdateActionFulfillment } from "../../../hooks/actions/useUpdateActionFulfillment";

export interface IActionTaskListProps {
  actions: Action[];
  onlyNextDue?: boolean;
}

interface IActionTasks {
  action: Action;
  fulfillment: ActionFulfillment;
  task: BaseTask;
}

export const ActionTaskList: React.FC<IActionTaskListProps> = ({
  actions = [],
  onlyNextDue = false,
}) => {
  const { updateActionFulfillment } = useUpdateActionFulfillment();

  // generate a list of tasks for each action fulfillment
  const tasks: IActionTasks[] = useMemo(() => {
    return flatten(
      actions.map((action) => {
        let fulfillments = [...action.fulfillments].sort((a, b) => {
          return (
            (a.resolvedAt || 0) - (b.resolvedAt || 0) + (a.dueAt - b.dueAt)
          );
        });
        if (onlyNextDue && fulfillments.length) {
          fulfillments = [fulfillments[0]];
        }
        return fulfillments.map((fulfillment) => {
          return {
            action,
            fulfillment,
            task: BaseTask.unserialize({
              title: action.title,
              type: "boolean",
              dueDate: fulfillment.dueAt,
              completedAt: fulfillment.resolvedAt,
              completed: fulfillment.resolution
                ? fulfillment.resolution ===
                  EActionFulfillmentResolution.Success
                  ? true
                  : false
                : null,
              // value: null,
              // wasLate: false,
            }),
          };
        });
      }),
    );
  }, [actions]);

  const updateTask = useCallback(
    async (fulfillment: ActionFulfillment, actionSubjectTimezone: string) => {
      const updatedFulfillment = cloneModelObject(fulfillment);
      // TODO think of more interactions, e.g. unsuccessful
      updatedFulfillment.resolution = EActionFulfillmentResolution.Success;
      await updateActionFulfillment({
        fulfillment: updatedFulfillment,
        subjectTimezone: actionSubjectTimezone,
      });
    },
    [],
  );

  return (
    <List>
      {tasks.map((a) => (
        <ListItem key={a.fulfillment.fulfillmentId}>
          <Task
            task={a.task}
            onChange={() =>
              updateTask(a.fulfillment, a.action.latestSubjectTimezone)
            }
            details={`Due ${timestampLabel(a.fulfillment.dueAt)}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

import React, { useEffect, useState } from "react";
import { useDebug } from "next-react/src/debug/DemoWrapper";

import { useActions } from "../useActions";
import { Button } from "../../../components/generic/Button";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";
import { List, ListItem } from "next-react/src/components/structure/List";
import { Task } from "next-react/src/components/generic/Task";
import {
  ActionFulfillment,
  EActionFulfillmentResolution,
} from "next-shared/src/models/ActionFulfillment";
import { Action } from "next-shared/src/models/Action";
import { BaseTask } from "next-shared/src/models/BaseTask";
import { timestampLabel } from "next-shared/src/helpers/time";
import { currentUnixTimestamp } from "next-react/src/helpers/currentUnixTimestamp";
import { useUpdateActionFulfillments } from ".";
import { useDebugSocketWatcher } from "../../useDebugSocketWatcher";

interface IPatientIdInputProps {
  initialValue: string;
  onClick: (patientId: string) => void;
}

const PatientIdInput = ({ initialValue, onClick }: IPatientIdInputProps) => {
  const [patientId, setPatientId] = useState<string>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientId(e.currentTarget.value);
  };

  const handleClick = () => {
    onClick(patientId);
  };

  return (
    <>
      <label htmlFor="patient-id-input">
        Patient ID
        <input
          id="patient-id-input"
          value={patientId}
          onChange={handleChange}
        />
        <Button type="button" onClick={handleClick}>
          Set Patient ID
        </Button>
      </label>
    </>
  );
};

const useActionTasks = (subjectId: string) => {
  const [actionFulfillmentTasks, setActionFulfillmentTasks] = useState<
    IActionTask[]
  >([]);
  const { actions } = useActions(subjectId);
  useEffect(() => {
    const newTasks = (actions || []).flatMap((action) => {
      return action.fulfillments.map((fulfillment) => ({
        action,
        fulfillment,
        task: BaseTask.unserialize({
          title: action.title,
          type: "boolean",
          dueDate: fulfillment.dueAt,
          completedAt: fulfillment.resolvedAt,
          completed:
            fulfillment.resolution !== undefined &&
            fulfillment.resolution !== null
              ? fulfillment.resolution === EActionFulfillmentResolution.Success
                ? true
                : false
              : null,
        }),
      }));
    });
    setActionFulfillmentTasks(newTasks);
  }, [actions, subjectId]);

  return { actionFulfillmentTasks, setActionFulfillmentTasks };
};

interface IActionTask {
  action: Action;
  fulfillment: ActionFulfillment;
  task: BaseTask;
}

export const DemoStandard = () => {
  const { nextPatient } = useSyncedSessionData();
  const [subjectId, setSubjectId] = useState<string>(
    nextPatient?.patientId || "",
  );

  useDebugSocketWatcher();

  const { actionFulfillmentTasks, setActionFulfillmentTasks } =
    useActionTasks(subjectId);
  const [fulfillmentsPendingUpdate, setFulfillmentsPendingUpdate] = useState<{
    [fulfillmentId: string]: ActionFulfillment;
  }>({});

  const { updateActionFulfillments, error } = useUpdateActionFulfillments();

  const { setOutput } = useDebug({
    setSessionDebug: true,
    test: {
      componentName: "useUpdateActionFulfillments",
      scenario: "standard",
    },
  });

  useEffect(() => {
    setOutput(error);
  }, [error]);

  const onSetPatientId = (patientId: string) => {
    setSubjectId(patientId);
  };

  const handleUpdate = (fulfillment: ActionFulfillment) => {
    // TODO
    const updatedActionFulfillments = actionFulfillmentTasks.map((task) => {
      if (fulfillment.fulfillmentId === task.fulfillment.fulfillmentId) {
        task.fulfillment.resolution =
          task?.fulfillment?.resolution === EActionFulfillmentResolution.Success
            ? EActionFulfillmentResolution.Failed
            : EActionFulfillmentResolution.Success;
        task.task.completed = !task.task.completed;
        const timestampNow = currentUnixTimestamp();
        task.fulfillment.resolvedAt = timestampNow;
        fulfillmentsPendingUpdate[fulfillment.fulfillmentId] = task.fulfillment;
      }
      return task;
    });

    setActionFulfillmentTasks(updatedActionFulfillments);
  };

  const handleSendUpdate = async () => {
    const updatedFulfillments = await updateActionFulfillments({
      subjectId,
      fulfillments: Object.values(fulfillmentsPendingUpdate),
      subjectTimezone: "Australia/Sydney",
    });
    if (updatedFulfillments) {
      setFulfillmentsPendingUpdate({});
    }
  };
  return (
    <>
      <PatientIdInput initialValue={subjectId} onClick={onSetPatientId} />
      <List>
        {actionFulfillmentTasks.map((fulfillmentTask) => (
          <ListItem key={fulfillmentTask.fulfillment.fulfillmentId}>
            <Task
              task={fulfillmentTask.task}
              onChange={() => handleUpdate(fulfillmentTask.fulfillment)}
              details={`Due ${timestampLabel(
                fulfillmentTask.fulfillment.dueAt,
              )}`}
            />
            <span>
              {Object.keys(fulfillmentsPendingUpdate).includes(
                fulfillmentTask.fulfillment.fulfillmentId,
              ) ? (
                <strong>changes pending...</strong>
              ) : (
                "up to date"
              )}
            </span>
          </ListItem>
        ))}
      </List>
      <Button
        type="button"
        onClick={handleSendUpdate}
        disabled={Object.keys(fulfillmentsPendingUpdate).length <= 0}
      >
        Send pending changes
      </Button>
    </>
  );
};

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
import { useUpdateActionFulfillment } from ".";
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

  const { actionFulfillmentTasks } = useActionTasks(subjectId);

  const { updateActionFulfillment, error } = useUpdateActionFulfillment();

  const { setOutput } = useDebug({
    setSessionDebug: true,
    test: {
      componentName: "useUpdateActionFulfillment",
      scenario: "standard",
    },
  });

  useEffect(() => {
    setOutput(error);
  }, [error]);

  const onSetPatientId = (patientId: string) => {
    setSubjectId(patientId);
  };

  const handleUpdate = async (
    fulfillment: ActionFulfillment,
    subjectTimezone: string,
  ) => {
    fulfillment.resolution =
      fulfillment?.resolution === EActionFulfillmentResolution.Success
        ? EActionFulfillmentResolution.Failed
        : EActionFulfillmentResolution.Success;
    fulfillment.resolvedAt = currentUnixTimestamp();
    await updateActionFulfillment({
      fulfillment,
      subjectTimezone,
    });
  };

  return (
    <>
      <PatientIdInput initialValue={subjectId} onClick={onSetPatientId} />
      <List>
        {actionFulfillmentTasks.map((fulfillmentTask) => (
          <ListItem key={fulfillmentTask.fulfillment.fulfillmentId}>
            <Task
              task={fulfillmentTask.task}
              onChange={() =>
                handleUpdate(
                  fulfillmentTask.fulfillment,
                  fulfillmentTask.action.latestSubjectTimezone,
                )
              }
              details={`Due ${timestampLabel(
                fulfillmentTask.fulfillment.dueAt,
              )}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

import React, { useState } from "react";

import { List, ListItem } from "../../../components/structure/List";
import { useDebug } from "../../../debug/DemoWrapper";
import { useCreateAction } from ".";
import { Action, InstructionAction } from "next-shared/src/models/Action";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";
import { Button } from "../../../components/generic/Button";
import { currentUnixTimestamp } from "next-react/src/helpers/currentUnixTimestamp";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    setSessionDebug: true,
    test: {
      componentName: "useCreateAction",
      scenario: "standard",
    },
  });
  const { nextPatient } = useSyncedSessionData();
  const [createdActions, setCreatedActions] = useState<Action[]>([]);
  const [actionCounter, setActionCounter] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleSuccess = (data: Action) => {
    setErrorMessage("");
    setCreatedActions([...createdActions, data]);
    setActionCounter(actionCounter + 1);
  };

  const { createAction, error, isLoading } = useCreateAction(
    handleSuccess,
    () => setErrorMessage("Error occured"),
  );

  const handleCreateTestAction = () => {
    if (nextPatient?.patientId) {
      createAction({
        action: InstructionAction.unserialize({
          type: "instruction",
          data: {
            message: `New instruction action - ${actionCounter}`,
          },
          title: `New instruction action - ${actionCounter}`,
          activeAt: currentUnixTimestamp(),
          occurrences: [],
          authorId: nextPatient.patientId,
          subjectId: nextPatient.patientId,
          ownerId: nextPatient.patientId,
        }),
      });
    } else {
      console.warn("No next patient present");
    }
  };
  return (
    <>
      <List>
        {createdActions.map((action) => (
          <ListItem key={action.actionId}>
            Created <strong>{action.type}</strong> - {action.title}
          </ListItem>
        ))}
      </List>
      {errorMessage && setOutput(errorMessage)}
      <Button onClick={handleCreateTestAction}>Create new action</Button>
    </>
  );
};

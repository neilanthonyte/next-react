import React, { useState } from "react";
import { ErrorMessage } from "../../../components/generic/Message";
import { currentUnixTimestamp } from "../../../helpers/currentUnixTimestamp";
import { List, ListItem } from "../../../components/structure/List";
import { useDebug } from "../../../debug/DemoWrapper";
import { useCreateInstructionAction } from "../useCreateInstructionAction";
import { Action, InstructionAction } from "next-shared/src/models/Action";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";
import { Button } from "../../../components/generic/Button";

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
  const handleSuccess = (data: InstructionAction) => {
    setErrorMessage("");
    setCreatedActions([...createdActions, data]);
    setActionCounter(actionCounter + 1);
  };

  const { createInstructionAction, error, isLoading } =
    useCreateInstructionAction(handleSuccess, () =>
      setErrorMessage("Error occured"),
    );

  const handleCreateTestAction = () => {
    if (nextPatient?.patientId) {
      createInstructionAction({
        data: {
          message: `New instruction action - ${actionCounter}`,
        },
        title: `New instruction action - ${actionCounter}`,
        activeAt: currentUnixTimestamp(),
        authorId: nextPatient.patientId,
        subjectId: nextPatient.patientId,
      });
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
      <Button onClick={handleCreateTestAction}>Create new instruction</Button>
    </>
  );
};

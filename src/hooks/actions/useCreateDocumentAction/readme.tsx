import React, { useEffect } from "react";

import { mockLetters } from "next-shared/src/mockData/mockLetters";

import { List, ListItem } from "../../../components/structure/List";
import { useDebug } from "../../../debug/DemoWrapper";
import { useCreateDocumentAction } from "../useCreateDocumentAction";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";
import { Button } from "../../../components/generic/Button";
import { usePatientActions } from "../usePatientActions";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    setSessionDebug: true,
    test: {
      componentName: "useCreateAction",
      scenario: "standard",
    },
  });

  const { nextPatient } = useSyncedSessionData();
  const { documentActions } = usePatientActions(nextPatient?.patientId);

  const { createDocumentAction, error } = useCreateDocumentAction();

  useEffect(() => {
    if (error) {
      setOutput(error.message);
    }
  }, [error]);

  return (
    <>
      <h3>Mock Letters to add</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <List>
          {mockLetters.map((letter) => (
            <ListItem key={letter.id}>
              <strong>{letter.letterTemplateName}</strong>
              <Button
                type="button"
                onClick={() =>
                  createDocumentAction({
                    patientId: nextPatient.patientId,
                    authorId: nextPatient.patientId,
                    documentSource: letter,
                  })
                }
              >
                Create it as document
              </Button>
            </ListItem>
          ))}
        </List>
        <List>
          {(documentActions || []).map((action) => (
            <ListItem key={action.actionId}>
              <strong>{action.type}</strong> - {action.title}
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

import { Button } from "next-react/src/components/generic/Button";
import { List, ListItem } from "next-react/src/components/structure/List";
import { useDebug } from "next-react/src/debug/DemoWrapper";
import React, { useEffect, useState } from "react";
import { useRemoveAction } from ".";

import { useSyncedSessionData } from "../../core/useSyncedSessionData";
import { usePatientActions } from "../usePatientActions";

export const DemoStandard = () => {
  useDebug({
    setSessionDebug: true,
  });
  const { nextPatient } = useSyncedSessionData();
  const [subjectId, setSubjectId] = useState(nextPatient?.patientId);
  const { documentActions } = usePatientActions(nextPatient?.patientId);

  const { removeAction } = useRemoveAction();

  useEffect(() => {
    if (nextPatient?.patientId && !subjectId) {
      setSubjectId(nextPatient?.patientId);
    }
  }, [nextPatient?.patientId]);

  return (
    <>
      <h3>Documents for Subject {subjectId} </h3>
      {!documentActions ||
        (documentActions.length <= 0 && (
          <span>
            No document action for the target subject. Please create some to
            delete.
          </span>
        ))}
      <List>
        {(documentActions || []).map((action) => (
          <ListItem key={action.actionId}>
            <strong>{action.title}</strong> - {action.resource.title}
            <Button
              type="button"
              onClick={() => removeAction(action)}
              icon="remove"
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </>
  );
};

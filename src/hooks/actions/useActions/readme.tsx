import * as React from "react";

import { useActions } from ".";
import { List, ListItem } from "../../../components/structure/List";
import { useDebug } from "../../../debug/DemoWrapper";
import { useDebugSocketWatcher } from "../../useDebugSocketWatcher";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";

export const DemoStandard = () => {
  const { nextPatient } = useSyncedSessionData();
  useDebug({
    setSessionDebug: true,
    requireSession: "patient",
    test: {
      componentName: "useActions",
      scenario: "standard",
    },
  });
  const { actions } = useActions(nextPatient?.patientId);
  useDebugSocketWatcher();
  return (
    <>
      <div>
        Display actions for {nextPatient?.getDisplayName()} with next patient
        ID: {nextPatient?.patientId}
      </div>
      <List>
        {(actions || []).map((a) => (
          <ListItem key={a.actionId}>
            {a.type} &gt; {a.title}
          </ListItem>
        ))}
      </List>
    </>
  );
};

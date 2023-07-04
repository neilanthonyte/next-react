import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { ActionTaskList } from ".";
import { useActions } from "../../../hooks/actions/useActions";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { useSyncedSessionData } from "next-react/src/hooks/core/useSyncedSessionData";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    setSessionDebug: true,
    test: {
      componentName: "ActionTaskList",
      scenario: "standard",
    },
  });

  const { nextPatient } = useSyncedSessionData();

  const { actions, ...rest } = useActions(nextPatient?.patientId);

  return (
    <LoadingBlock {...rest}>
      {!!actions && <ActionTaskList actions={actions} onlyNextDue={true} />}
    </LoadingBlock>
  );
};

import * as React from "react";

import { useSyncedTasks } from ".";

export const DemoStandard = () => {
  const checklistResponse = useSyncedTasks();
  // TODO - write a better demo
  return <pre>{JSON.stringify(checklistResponse, null, " ")}</pre>;
};

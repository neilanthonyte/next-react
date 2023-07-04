import * as React from "react";

import { TasksAndActionsOverviewWidget } from "./";
import { ChecklistHandler } from "../../handlers/ChecklistHandler";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard: React.FC = () => (
  <NextAppHandlerWeb>
    <ChecklistHandler>
      <TasksAndActionsOverviewWidget />
    </ChecklistHandler>
  </NextAppHandlerWeb>
);

export const DemoError: React.FC = () => (
  <NextAppHandlerWeb configOverride={{ debugRequestErrorCount: 1 }}>
    <ChecklistHandler>
      <TasksAndActionsOverviewWidget />
    </ChecklistHandler>
  </NextAppHandlerWeb>
);

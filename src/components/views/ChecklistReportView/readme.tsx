import * as React from "react";

import { ChecklistReportView } from "./index";
import { ChecklistHandler } from "../../handlers/ChecklistHandler";
import { OpsActionsHandler } from "../../handlers/OpsActionsHandler";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoMock = () => {
  return (
    <NextAppHandlerWeb>
      <OpsActionsHandler>
        <ChecklistHandler>
          <ChecklistReportView />
        </ChecklistHandler>
      </OpsActionsHandler>
    </NextAppHandlerWeb>
  );
};

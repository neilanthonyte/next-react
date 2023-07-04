import * as React from "react";

import { OpsActionsView } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { OpsActionsHandler } from "../../handlers/OpsActionsHandler";

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <OpsActionsHandler>
        <OpsActionsView />
      </OpsActionsHandler>
    </NextAppHandlerWeb>
  );
};

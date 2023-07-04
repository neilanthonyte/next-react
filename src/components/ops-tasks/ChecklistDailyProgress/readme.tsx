import * as React from "react";

import { ChecklistDailyProgress } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { ChecklistHandler } from "../../handlers/ChecklistHandler";

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <ChecklistHandler>
        <ChecklistDailyProgress />
      </ChecklistHandler>
    </NextAppHandlerWeb>
  );
};

import * as React from "react";
import { useContext } from "react";

import { ChecklistTaskTable } from ".";
import { OpsActionsHandler } from "../../handlers/OpsActionsHandler";
import { ChecklistHandler } from "../../handlers/ChecklistHandler";
import { ChecklistContext } from "../../../contexts/ChecklistContext";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

const Inner = () => {
  const { checklistTasks } = useContext(ChecklistContext);
  return <ChecklistTaskTable checklistTasks={checklistTasks} />;
};

export const DemoMock = () => {
  return (
    <NextAppHandlerWeb>
      <OpsActionsHandler>
        <ChecklistHandler>
          <Inner />
        </ChecklistHandler>
      </OpsActionsHandler>
    </NextAppHandlerWeb>
  );
};

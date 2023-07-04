import * as React from "react";

import { OpsTask } from ".";
import { ChecklistContext } from "../../../contexts/ChecklistContext";
import { OpsActionsHandler } from "../../handlers/OpsActionsHandler";
import { ChecklistHandler } from "../../handlers/ChecklistHandler";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export interface IDemoStandardProps {}

export const DemoStandard: React.FC<IDemoStandardProps> = ({}) => {
  return (
    <div data-test="ChecklistTask-scenario-standard">
      <NextAppHandlerWeb>
        <OpsActionsHandler>
          <ChecklistHandler>
            <ChecklistContext.Consumer>
              {({ checklistTasks }) =>
                Array.isArray(checklistTasks) ? (
                  checklistTasks.map((t, i) => (
                    <div key={i} data-test={`task-${i + 1}`}>
                      <OpsTask task={t} />
                    </div>
                  ))
                ) : (
                  <div>Loading...</div>
                )
              }
            </ChecklistContext.Consumer>
          </ChecklistHandler>
        </OpsActionsHandler>
      </NextAppHandlerWeb>
    </div>
  );
};

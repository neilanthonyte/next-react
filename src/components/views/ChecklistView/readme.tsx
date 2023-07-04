import * as React from "react";
import { MemoryRouter } from "react-router-dom";

import { ChecklistView } from ".";
import { OpsActionsHandler } from "../../handlers/OpsActionsHandler";
import { ChecklistHandler } from "../../handlers/ChecklistHandler";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { MockCameraUploadHandler } from "../../../handlers/MockCameraUploadHandler";
import { TTaskViewTypes } from "next-shared/src/types/TTaskViewTypes";

export const DemoDueToday = () => {
  return (
    <div data-test="ChecklistView-scenario-dueToday">
      <MemoryRouter>
        <NextAppHandlerWeb>
          <MockCameraUploadHandler>
            <OpsActionsHandler>
              <ChecklistHandler>
                <ChecklistView type={TTaskViewTypes.DueToday} />
              </ChecklistHandler>
            </OpsActionsHandler>
          </MockCameraUploadHandler>
        </NextAppHandlerWeb>
      </MemoryRouter>
    </div>
  );
};

export const DemoUpcoming = () => {
  return (
    <div data-test="ChecklistView-scenario-upcoming">
      <MemoryRouter>
        <NextAppHandlerWeb>
          <MockCameraUploadHandler>
            <OpsActionsHandler>
              <ChecklistHandler>
                <ChecklistView type={TTaskViewTypes.Upcoming} />
              </ChecklistHandler>
            </OpsActionsHandler>
          </MockCameraUploadHandler>
        </NextAppHandlerWeb>
      </MemoryRouter>
    </div>
  );
};

```jsx
import { ManagerDashboardView } from "./";

import { MemoryRouter } from "react-router-dom";

import { MockNextApiClient } from "../../handlers/MockNextApiClient";

import { NextStatistics } from "../../handlers/NextStatistics";

import { MockCameraUploadHandler } from "../../handlers/MockCameraUploadHandler";
import { OpsActionsHandler } from "../../handlers/OpsActionsHandler";
import { ChecklistHandler } from "../../handlers/ChecklistHandler";

<MockNextApiClient>
  <MemoryRouter>
    {" "}
    <MockCameraUploadHandler>
      <OpsActionsHandler>
        <ChecklistHandler>
          <ManagerDashboardView />
        </ChecklistHandler>
      </OpsActionsHandler>
    </MockCameraUploadHandler>{" "}
  </MemoryRouter>
</MockNextApiClient>;
```

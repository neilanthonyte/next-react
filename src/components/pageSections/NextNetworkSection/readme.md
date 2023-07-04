```jsx
import { DashboardView } from "./";

import { MemoryRouter } from "react-router-dom";

import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { NextStatistics } from "../../handlers/NextStatistics";

import { MockCameraUploadHandler } from "../../handlers/MockCameraUploadHandler";
import { OpsActionsHandler } from "../../handlers/OpsActionsHandler";
import { ChecklistHandler } from "../../handlers/ChecklistHandler";

// import { ApiClientContext } from "../../../contexts/ApiClientContext";
// import { nextClientFactory } from "../../../../apis/next";

// const client = nextClientFactory(
//   "https://services-dev.nextpracticeclinics.com/"
// );
// client.auth
//   .setSessionFromSessionId("7ece9cc0-0cfa-4491-81c6-26856665f2a1")
//   .catch(console.error);

// <ApiClientContext.Provider value={{ client }}>
// </ApiClientContext.Provider>

<MockNextApiClient>
  <MemoryRouter>
    <MockCameraUploadHandler>
      <OpsActionsHandler>
        <ChecklistHandler>
          <NextNetworkSection />
        </ChecklistHandler>
      </OpsActionsHandler>
    </MockCameraUploadHandler>
  </MemoryRouter>
</MockNextApiClient>;
```

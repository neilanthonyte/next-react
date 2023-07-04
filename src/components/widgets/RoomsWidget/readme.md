### Standard Usage

For this example to work we will need to mock the socket events

```jsx
import { AppointmentsWidget } from "./";

import { useState } from "react";
import { MemoryRouter } from "react-router-dom";

import { MockNextApiClient } from "../../handlers/MockNextApiClient";

import { nextClientFactory } from "../../../client/nextClientFactory";
import { ApiClientContext } from "../../../contexts/ApiClientContext";

const client = nextClientFactory(
  "https://services-dev.nextpracticeclinics.com/",
);
client.auth
  .setSessionFromSessionId("1f31354b-5e71-4401-a0e8-f481ae2f8055")
  .catch(console.error);

<ApiClientContext.Provider value={{ client }}>
  {" "}
  <MemoryRouter>
    <div style={{ maxWidth: "360px" }}>
      <RoomsWidget />
    </div>
  </MemoryRouter>
</ApiClientContext.Provider>;
```

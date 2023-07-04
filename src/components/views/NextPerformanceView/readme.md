### Standard Usage

For this example to work we will need to mock the socket events

```jsx
import { useState } from "react";
import { Route, Switch } from "react-router";
import { MemoryRouter } from "react-router-dom";

import { MockNextApiClient } from "../../handlers/MockNextApiClient";

import { nextClientFactory } from "../../../client/nextClientFactory";
import { ApiClientContext } from "../../../contexts/ApiClientContext";

import { NextSystemView } from "./";
import { RoomView } from "../RoomView";

const client = nextClientFactory(
  "https://services-dev.nextpracticeclinics.com/",
);
client.auth
  .setSessionFromSessionId("1f31354b-5e71-4401-a0e8-f481ae2f8055")
  .catch(console.error);

<ApiClientContext.Provider value={{ client }}>
  <MemoryRouter>
    {" "}
    <Switch>
      <Route path="/" exact={true} component={NextSystemView} />
      <Route path="/system/scopes/:scopeId" component={RoomView} />
    </Switch>{" "}
  </MemoryRouter>
</ApiClientContext.Provider>;
```

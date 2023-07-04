```jsx
import { CreateRoomModal } from "./";

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

const [isOpen, setIsOpen] = useState(true);

<ApiClientContext.Provider value={{ client }}>
  <MemoryRouter>
    {" "}
      {({ scopes, rooms }) => {
        return (
          <>
            <CreateRoomModal open={isOpen} onClose={() => setIsOpen(false)} />
            <h3>Rooms</h3>
            <ul>
              {rooms ? (
                rooms.map((c) => <li>{c.label}</li>)
              ) : (
                <li>Loading...</li>
              )}
            </ul>
            <p>
              <a onClick={() => setIsOpen(true)}>Open modal</a>
            </p>
          </>
        );
      }}
  </MemoryRouter>
</ApiClientContext.Provider>;
```

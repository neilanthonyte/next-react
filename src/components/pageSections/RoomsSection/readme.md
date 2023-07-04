```jsx
import { MemoryRouter } from "react-router-dom";

import { MockNextApiClient } from "../../handlers/MockNextApiClient";

import { RoomsSection } from "./";

<MockNextApiClient>
  <MemoryRouter>
    {" "}
    <RoomsSection />{" "}
  </MemoryRouter>
</MockNextApiClient>;
```

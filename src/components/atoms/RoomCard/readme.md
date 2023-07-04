Room card works alongside the `RoomView`, when you click on the card it should navigate you to /scopes/:scopeId

### Empty room

```jsx
import { RoomCard } from "./";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { scopes } from "../../../../apis/next/mockClient/modules/MockScopesModule";
const MemoryRouter = require("react-router-dom").MemoryRouter;

<MemoryRouter>
  <MockNextApiClient>
    <RoomCard scope={scopes.emptyRoom} />
  </MockNextApiClient>
</MemoryRouter>;
```

### Room with practitioner

```jsx
import { RoomCard } from "./";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { scopes } from "../../../../apis/next/mockClient/modules/MockScopesModule";
const MemoryRouter = require("react-router-dom").MemoryRouter;

<MemoryRouter>
  <MockNextApiClient>
    <RoomCard scope={scopes.roomWithStaffMember} />
  </MockNextApiClient>
</MemoryRouter>;
```

### Room with practitioner and patient

```jsx
import { RoomCard } from "./";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { scopes } from "../../../../apis/next/mockClient/modules/MockScopesModule";
const MemoryRouter = require("react-router-dom").MemoryRouter;

<MemoryRouter>
  <MockNextApiClient>
    <RoomCard scope={scopes.roomWithStaffMemberAndPatient} />
  </MockNextApiClient>
</MemoryRouter>;
```

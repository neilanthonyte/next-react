### With patient

```jsx
import { CompanionAppCard } from "./";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { scopes } from "../../../../apis/next/mockClient/modules/MockScopesModule";
const MemoryRouter = require("react-router-dom").MemoryRouter;

<MemoryRouter>
  <MockNextApiClient>
    <CompanionAppCard scope={scopes.companionWithPatient} />
  </MockNextApiClient>
</MemoryRouter>;
```

### Without patient

```jsx
import { CompanionAppCard } from "./";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { scopes } from "../../../../apis/next/mockClient/modules/MockScopesModule";
const MemoryRouter = require("react-router-dom").MemoryRouter;

<MemoryRouter>
  <MockNextApiClient>
    <CompanionAppCard scope={scopes.companionNoPatient} />
  </MockNextApiClient>
</MemoryRouter>;
```

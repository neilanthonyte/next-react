```jsx harmony
import { ChecklistDailyProgressWidget } from "./";
import { MockSpgApiClient } from "../../handlers/MockSpgApiClient";
import { OpsActionsHandler } from "../../handlers/OpsActionsHandler";
const MemoryRouter = require("react-router-dom").MemoryRouter;

<MemoryRouter>
  <MockSpgApiClient>
    <OpsActionsHandler>
      <ChecklistDailyProgressWidget />
    </OpsActionsHandler>
  </MockSpgApiClient>
</MemoryRouter>;
```

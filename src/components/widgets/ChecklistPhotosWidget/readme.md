```jsx harmony
import { ChecklistPhotosWidget } from "./";
import { MockSpgApiClient } from "../../handlers/MockSpgApiClient";
const MemoryRouter = require("react-router-dom").MemoryRouter;

<MemoryRouter>
  <MockSpgApiClient>
    <ChecklistPhotosWidget />
  </MockSpgApiClient>
</MemoryRouter>;
```

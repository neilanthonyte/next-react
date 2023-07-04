```jsx
import { ContentView } from "./";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";

const MemoryRouter = require("react-router-dom").MemoryRouter;

<MockNextApiClient>
  <MemoryRouter>
    <ContentView />
  </MemoryRouter>
</MockNextApiClient>;
```

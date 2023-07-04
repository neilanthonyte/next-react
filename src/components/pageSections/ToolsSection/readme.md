```jsx
import { MemoryRouter } from "react-router-dom";

import { ToolsSection } from "./";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";

<MockNextApiClient>
  <MemoryRouter>
    <ToolsSection />
  </MemoryRouter>
</MockNextApiClient>;
```

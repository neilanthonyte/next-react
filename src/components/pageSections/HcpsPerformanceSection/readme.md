```jsx
import { MemoryRouter } from "react-router-dom";

import { IHcpsPerformanceSection } from "./";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";

<MockNextApiClient>
  <MemoryRouter>
    <HcpsPerformanceSection />
  </MemoryRouter>
</MockNextApiClient>;
```

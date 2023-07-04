```jsx
import { MemoryRouter } from "react-router-dom";

import { NextManagerDecoration } from "./";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { NewsHandler } from "../../handlers/NewsHandler";

<MockNextApiClient>
  <NewsHandler>
    <MemoryRouter>
      <NextManagerDecoration />
    </MemoryRouter>
  </NewsHandler>
</MockNextApiClient>;
```

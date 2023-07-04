```jsx
import { MemoryRouter } from "react-router-dom";

import { BlogArticlesSection } from "./";

import { LocationsHandler } from "../../handlers/LocationsHandler";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";

<MemoryRouter>
  <MockNextApiClient>
    <LocationsHandler locationSlug={"next-head-office-dev"}> />
      </LocationBlogArticlesHandler>
    </LocationsHandler>
  </MockNextApiClient>
</MemoryRouter>;
```

```jsx harmony
import { NewsArticlesView } from "./";
import { NewsTestHandler } from "../../handlers/NewsTestHandler";
import { MemoryRouter } from "react-router-dom";

<MemoryRouter>
  <NewsTestHandler>
    <NewsArticlesView />
  </NewsTestHandler>
</MemoryRouter>;
```

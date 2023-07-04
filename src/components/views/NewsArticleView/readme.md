```jsx harmony
import { NewsArticleView } from "./";
import { NewsArticleSideBar } from "../../atoms/NewsArticleSideBar";
import { NewsTestHandler } from "../../handlers/NewsTestHandler";

import { Route, Switch } from "react-router";
import { MemoryRouter, NavLink } from "react-router-dom";

<MemoryRouter>
  <NewsTestHandler>
    <div>
      <NavLink to="/news">Show news</NavLink>
    </div>
    <Switch>
      <Route
        path="/:slug"
        component={() => (
          <div
            style={{
              minHeight: "300px",
              position: "relative",
              display: "flex",
            }}
          >
            <div style={{ width: "250px", flexShrink: 0 }}>
              <NewsArticleSideBar />
            </div>
            <div style={{ flexGrow: 1 }}>
              <NewsArticleView />
            </div>
          </div>
        )}
      />
    </Switch>
  </NewsTestHandler>
</MemoryRouter>;
```

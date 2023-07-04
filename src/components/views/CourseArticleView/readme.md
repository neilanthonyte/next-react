### Simple example

```jsx harmony
import { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router";
import { createMemoryHistory } from "history";

import { CourseArticleView } from "./";
import { MockSpgApiClient } from "../../handlers/MockSpgApiClient";
import { buildCourseArticleRoute } from "../../index";

const [history] = useState(createMemoryHistory());
useEffect(() => {
  history.push(buildCourseArticleRoute("slug-1", "opening"));
}, []);

<Router history={history}>
  <MockSpgApiClient>
    <Switch>
      <Route
        path={buildCourseArticleRoute()}
        component={() => (
          <div data-test="CourseArticleView-scenario-standard">
            <div data-test="subject">
              <CourseArticleView />
            </div>
            <div data-test="output">This is the output div</div>
          </div>
        )}
      />
    </Switch>
  </MockSpgApiClient>
</Router>;
```

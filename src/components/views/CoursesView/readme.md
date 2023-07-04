### Simple Example

```jsx harmony
import { useEffect } from "react";
import { Router, Route, Switch, NavLink } from "react-router-dom";
import { createMemoryHistory } from "history";

import { MockSpgApiClient } from "../../handlers/MockSpgApiClient";

import { CoursesView } from ".";
import { CourseView } from "../CourseView";
import { CourseArticleView } from "../CourseArticleView";
import { CourseArticleSidebar } from "../../atoms/CourseArticleSidebar";

import {
  coursesRoutes,
  buildCourseRoute,
  buildCourseArticleRoute,
} from "../../index";

const history = createMemoryHistory();
useEffect(() => {
  history.push(coursesRoutes.base);
}, []);

<Router history={history}>
  <MockSpgApiClient>
    <div data-test="CoursesView-scenario-standard">
      <Switch>
        <Route
          path={buildCourseArticleRoute()}
          component={() => (
            <div style={{ display: "flex" }}>
              <div style={{ width: "260px", flexShrink: 0 }}>
                <CourseArticleSidebar />
              </div>
              <div style={{ flexGrow: 1 }}>
                <CourseArticleView />
              </div>
            </div>
          )}
        />
        <Route path={buildCourseRoute()} component={() => <CourseView />} />
        <Route
          path={coursesRoutes.base}
          exact={true}
          component={() => <CoursesView />}
        />
      </Switch>
    </div>
  </MockSpgApiClient>
</Router>;
```

### Test example

```jsx harmony
import { MemoryRouter } from "react-router-dom";

import { MockSpgApiClient } from "../../handlers/MockSpgApiClient";

import { CoursesView } from ".";

<MemoryRouter>
  <MockSpgApiClient>
    </CoursesHandler>
  </MockSpgApiClient>
</MemoryRouter>;
```

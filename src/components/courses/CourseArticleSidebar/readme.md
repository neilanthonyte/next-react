### Simple example

```jsx harmony
import { MemoryRouter, Route, Switch } from "react-router";

import { CourseArticleSidebar } from "./";
import { MockSpgApiClient } from "../../handlers/MockSpgApiClient";
import { buildCourseArticleRoute, buildCourseRoute } from "../../index";

<MemoryRouter initialEntries={[buildCourseArticleRoute("slug-1", "opening")]}>
  <MockSpgApiClient>
    <div
      style={{ height: "100vh" }}
      data-test="CourseArticleSidebar-scenario-standard"
    >
      <Switch>
        <Route
          path={buildCourseArticleRoute()}
          component={() => (
            <div style={{ width: "300px" }} data-test="subject">
              <CourseArticleSidebar />
            </div>
          )}
        />
        <Route
          path={buildCourseRoute()}
          component={() => <div data-test="output">This is the output div</div>}
        />
      </Switch>
    </div>
  </MockSpgApiClient>
</MemoryRouter>;
```

### Test navigation between articles example

```jsx harmony
import { MemoryRouter, Route, Switch } from "react-router";

import { CourseArticleSidebar } from "./";
import { MockSpgApiClient } from "../../handlers/MockSpgApiClient";
import { buildCourseArticleRoute, buildCourseRoute } from "../../index";

<MemoryRouter initialEntries={[buildCourseArticleRoute("slug-1", "opening")]}>
  <MockSpgApiClient>
    <div data-test="CourseArticleSidebar-scenario-course-navigation">
      <Switch>
        <Route
          path={buildCourseArticleRoute()}
          component={() => (
            <div style={{ width: "300px" }} data-test="subject">
              <CourseArticleSidebar />
            </div>
          )}
        />
      </Switch>
    </div>
  </MockSpgApiClient>
</MemoryRouter>;
```

### Test back button example

```jsx harmony
import { MemoryRouter, Route, Switch } from "react-router";

import { CourseArticleSidebar } from "./";
import { MockSpgApiClient } from "../../handlers/MockSpgApiClient";
import { buildCourseArticleRoute, buildCourseRoute } from "../../index";

<MemoryRouter initialEntries={[buildCourseArticleRoute("slug-1", "opening")]}>
  <MockSpgApiClient>
    <div data-test="CourseArticleSidebar-scenario-back-button">
      <Switch>
        <Route
          path={buildCourseArticleRoute()}
          component={() => (
            <div style={{ width: "300px" }} data-test="subject">
              <CourseArticleSidebar />
            </div>
          )}
        />
        <Route
          path={buildCourseRoute()}
          component={() => <div data-test="output">This is the output div</div>}
        />
      </Switch>
    </div>
  </MockSpgApiClient>
</MemoryRouter>;
```

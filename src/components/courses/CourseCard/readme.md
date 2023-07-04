### Simple Example

```jsx harmony
import { useContext } from "react";
import { MemoryRouter, Switch, Route } from "react-router";

import { MockSpgApiClient } from "../../handlers/MockSpgApiClient";
import { CoursesContext } from "../../../contexts/CoursesContext";
import { CourseCard } from "./";
import { buildCourseRoute } from "../../index";

const ExampleComponent = () => {
  const { courses } = useContext(CoursesContext);
  const course = courses && courses[0];

  return course && <CourseCard course={course} />;
};

<MockSpgApiClient>
  <MemoryRouter>
    <div data-test="CourseCard-scenario-standard">
      <Switch>
        <Route
          path={buildCourseRoute()}
          component={() => (
            <div data-test="output">This would be the selected course.</div>
          )}
        />
        <Route path="/">
          <div data-test="subject">
            <ExampleComponent />
          </div>
        </Route>
      </Switch>
    </div>
  </MemoryRouter>
</MockSpgApiClient>;
```

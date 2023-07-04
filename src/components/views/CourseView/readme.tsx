import * as React from "react";
import { useEffect } from "react";
import { Router } from "react-router";
import { Switch, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

import { CourseView } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { buildCourseRoute } from "../../views/coursesRoutes";

const history = createMemoryHistory();
export const DemoStandard = () => {
  useEffect(() => {
    history.push(buildCourseRoute("slug-1"));
  }, []);

  return (
    <div data-test="CourseView-scenario-standard">
      <NextAppHandlerWeb>
        <Router history={history}>
          <Switch>
            <Route path={buildCourseRoute()} component={() => <CourseView />} />
          </Switch>
        </Router>
      </NextAppHandlerWeb>
    </div>
  );
};

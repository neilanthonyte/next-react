import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { NavBar } from ".";
import { Route, Switch } from "react-router-dom";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "NavBar",
      scenario: "standard",
    },
  });

  const items = [
    {
      to: "/",
      icon: "task-image",
      label: "Home",
    },
    {
      to: "/foo",
      icon: "drawer",
      label: "Foo",
    },
    {
      to: "/bar",
      icon: "maintenance-solid",
      label: "Bar",
    },
  ];

  return (
    <>
      <Switch>
        <Route path="/" exact={true}>
          Home
        </Route>
        <Route path="/foo" exact={true}>
          Foo
        </Route>
        <Route path="/bar" exact={true}>
          Bar
        </Route>
      </Switch>
      <NavBar items={items}></NavBar>
    </>
  );
};

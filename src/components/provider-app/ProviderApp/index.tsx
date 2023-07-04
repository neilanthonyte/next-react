import * as React from "react";
import { MemoryRouter, Route, Switch } from "react-router-dom";

import { RequireUserSession } from "../../handlers/RequireSession";
import { useDebug } from "../../../debug/DemoWrapper";
import { ProviderAppProvider } from "../ProviderAppProvider";
import { DeviceListView } from "../DeviceListView";
import { CaptureReviewView } from "../CaptureReviewView";
import { NavBar } from "../NavBar";
import {
  AppScreen,
  AppScreenBody,
  AppScreenHeader,
} from "../../generic/AppScreen";
import { NavigationBar } from "../../structure/NavigationBar";
import { ProviderAppPatient } from "../ProviderAppPatient";
import { ProviderAppSettingsView } from "../ProviderAppSettingsView";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "ProviderApp");

export interface IProviderAppProps {}

export const ProviderApp: React.FC<IProviderAppProps> = ({}) => {
  // are we running in a demo?
  const { setOutput } = useDebug();
  const inDebug = !!setOutput;
  // const Router = inDebug ? MemoryRouter : BrowserRouter;

  const navItems = [
    {
      to: "/",
      icon: "task-image",
      label: "Capture",
    },
    {
      to: "/review",
      icon: "drawer",
      label: "Review",
    },
    {
      to: "/settings",
      icon: "maintenance-solid",
      label: "Settings",
    },
  ];

  return (
    <RequireUserSession>
      <ProviderAppProvider>
        <MemoryRouter>
          <div className={css("")}>
            <div className={css("body")}>
              <Switch>
                <Route exact path="/">
                  <AppScreen>
                    <AppScreenHeader>
                      <NavigationBar>Devices</NavigationBar>
                    </AppScreenHeader>
                    <AppScreenBody>
                      <DeviceListView />
                    </AppScreenBody>
                  </AppScreen>
                </Route>
                <Route path="/review">
                  <AppScreen>
                    <AppScreenHeader>
                      <NavigationBar>Review</NavigationBar>
                    </AppScreenHeader>
                    <AppScreenBody muted={true}>
                      <CaptureReviewView />
                    </AppScreenBody>
                  </AppScreen>
                </Route>
                <Route path="/settings">
                  <AppScreen>
                    <AppScreenHeader>
                      <NavigationBar>Settings</NavigationBar>
                    </AppScreenHeader>
                    <AppScreenBody muted={true}>
                      <ProviderAppSettingsView />
                    </AppScreenBody>
                  </AppScreen>
                </Route>
              </Switch>
            </div>
            <div className={css("tabBar")}>
              <ProviderAppPatient />
              <NavBar items={navItems} />
            </div>
          </div>
        </MemoryRouter>
      </ProviderAppProvider>
    </RequireUserSession>
  );
};

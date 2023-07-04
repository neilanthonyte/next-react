import * as React from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { Icon } from "../../../../generic/Icon";
import {
  defaultTransition,
  ICssTransition,
  sidePanelSwitchTransition,
} from "../../../../../helpers/cssTransitions";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
const css = cssComposer(styles, "SidePanelViews");

export interface ISidePanelViewsProps {
  routes: any[];
  transition?: ICssTransition;
  transitionForward?: ICssTransition;
  transitionBack?: ICssTransition;
  routingLevel?: number;
  className?: string;
  showErrorForNoMatch?: boolean;
  fixedPositioning?: boolean;
}

/**
 * Toggles between different views based on the routing.
 */
export const SidePanelViews: React.FC<ISidePanelViewsProps> = ({
  routes,
  fixedPositioning,
}) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div
      data-test="side-panel"
      className={css("", {
        "-fixed": fixedPositioning,
      })}
    >
      <TransitionGroup>
        <CSSTransition
          classNames={defaultTransition}
          timeout={500}
          key={location.pathname}
        >
          <Switch location={location}>
            {routes.map((tab) => {
              const { path } = tab;
              return (
                <Route
                  key={path}
                  path={path}
                  component={() => {
                    return (
                      <div
                        data-test="background"
                        className={css("background")}
                        onClick={() => history.goBack()}
                      />
                    );
                  }}
                />
              );
            })}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <TransitionGroup>
        <CSSTransition
          classNames={sidePanelSwitchTransition}
          timeout={500}
          key={location.pathname}
        >
          <Switch location={location}>
            {routes.map((tab) => {
              const { path, component, hasClose = true } = tab;
              return (
                <Route
                  key={path}
                  path={path}
                  component={() => {
                    return (
                      <div className={css("panel")}>
                        <div className={css("panel_inner")}>{component()}</div>
                        {hasClose && (
                          <div
                            data-test="close-button"
                            className={css("close")}
                            onClick={() => history.goBack()}
                          >
                            <Icon name="close" />
                          </div>
                        )}
                      </div>
                    );
                  }}
                />
              );
            })}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

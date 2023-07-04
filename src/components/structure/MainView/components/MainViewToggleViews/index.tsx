import * as React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
const css = cssComposer(styles);

import { UnknownRoute } from "../UnknownRoute";
import { SyncedScroll } from "../../../SyncedScroll";
import {
  defaultTransition,
  ICssTransition,
} from "../../../../../helpers/cssTransitions";
import { splitLocation } from "../../../../../helpers/splitLocation";

export interface IToggleViewsProps {
  routes: any[];
  transition?: ICssTransition;
  transitionForward?: ICssTransition;
  transitionBack?: ICssTransition;
  routingLevel?: number;
  className?: string;
  showErrorForNoMatch?: boolean;
}

interface IStateProps {
  scrollOffsets: any;
}

interface IToggleViewsInnerProps
  extends IToggleViewsProps,
    IStateProps,
    RouteComponentProps {
  dispatch: any;
}

/**
 * Toggles between different views based on the routing.
 */
export class ToggleViewsInner extends React.Component<IToggleViewsInnerProps> {
  private routeIndex: number;
  private chosenTransition: any;

  constructor(props: IToggleViewsInnerProps) {
    super(props);
    this.routeIndex = -1;
    this.chosenTransition = {};
  }

  public render() {
    const {
      routes,
      routingLevel = 1,
      location,
      transition = defaultTransition,
      showErrorForNoMatch = true,
      className = "",
    } = this.props;

    let { transitionForward = null, transitionBack = null } = this.props;

    if (!transitionForward) {
      transitionForward = transition;
    }
    if (!transitionBack) {
      transitionBack = transition;
    }

    // only respond to changes on our level
    const { base } = splitLocation(location.pathname, routingLevel);
    // determine which route this is
    const routeIndex = routes.map((r) => r.path).indexOf(base);

    const chosenTransition =
      routeIndex < this.routeIndex ? transitionBack : transitionForward;
    this.routeIndex = routeIndex;

    // copy over the previous object to ensure the existing transition is updated as well
    this.chosenTransition.appear = chosenTransition.appear;
    this.chosenTransition.appearActive = chosenTransition.appearActive;
    this.chosenTransition.enter = chosenTransition.enter;
    this.chosenTransition.enterActive = chosenTransition.enterActive;
    this.chosenTransition.exit = chosenTransition.exit;
    this.chosenTransition.exitActive = chosenTransition.exitActive;

    return (
      <TransitionGroup className={css("toggleViews", { className })}>
        <CSSTransition
          classNames={this.chosenTransition}
          timeout={500}
          key={base || "_root_"}
        >
          <SyncedScroll id={base} className={css("toggleViews_tab")}>
            <Switch location={location}>
              {routes.map((tab) => {
                if (tab.redirect) {
                  return (
                    <Redirect
                      exact={true}
                      push
                      from={tab.path}
                      to={tab.redirect}
                      key={`redirect-${tab.redirect}`}
                    />
                  );
                }

                const { path, component: TabComponent } = tab;
                // a default subview (i.e. one with the same path as the parent's route) should end with
                // to indicate its a default view, e.g. /foo/ (will match /foo, but not /foo/bar)
                const isExact = path.endsWith("/");
                return (
                  <Route
                    key={path}
                    path={path}
                    exact={isExact}
                    component={TabComponent}
                  />
                );
              })}
              {showErrorForNoMatch && <Route component={UnknownRoute} />}
            </Switch>
          </SyncedScroll>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

// TODO: To be replaced with hooks in the future
export const MainViewToggleViews: React.ComponentClass<IToggleViewsProps> =
  withRouter(ToggleViewsInner) as any;

MainViewToggleViews.displayName = "MainViewToggleViews";
export default MainViewToggleViews;

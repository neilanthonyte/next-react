import * as _ from "lodash";
import * as React from "react";
import { Redirect } from "react-router";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { FocusView } from "./components/FocusView";
import { MobileNav } from "./components/MobileNav";
import { SideNav } from "./components/SideNav";
import { TabbedViews } from "./components/TabbedViews";
import { useClient } from "../../../hooks/useClient";
import { TPermissions } from "next-shared/src/types/permissions";

import { INavItem } from "./components/SideNav/components/StackedNavItems";
import computeAbsolutePaths from "./helpers/computeAbsolutePaths";
import computeFocusPaths from "./helpers/computeFocusPaths";
import { extractActiveTabs } from "./helpers/extractActiveTabs";
import { filterOutUnauthorizedRoutes } from "./helpers/filterOutUnAuthorizedRoutes";
import { prepViews } from "./helpers/prepViews";
import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";

const css = cssComposer(styles);

export interface IMainViewSubRoute {
  path?: string;
  routes?: IMainViewSubRoute[];
  focus?: boolean;
  component: React.FC;
  menu?: React.FC;
}

interface IRedirectRoute {
  path: string;
  redirect: string;
}

interface IComponentRoute {
  icon?: string;
  label?: string;
  path: string;
  menu?: React.FC;
  component?: React.FC;
  routes?: IMainViewSubRoute[];
  permission?: TPermissions;
  hidden?: boolean;
}

export type IMainViewRoute = IRedirectRoute | IComponentRoute;

export interface IMainViewInnerProps extends RouteComponentProps {
  /** A description of the routing. */
  routes?: IMainViewRoute[];
  /** A supplementary component shown at the bottom of the menu. */
  supplement?: any;
  /** Prop to pass to supplement component */
  supplementProps?: object;
  allowNavigation?: boolean;
  noLogos?: boolean;
  /** Determine if panels are attached absolutely or fixed - generally fixed should be used for the apps */
  fixedPositionedPanels?: boolean;
}

/**
 *  Application level wrapper to handle navigation and its states
 */
const MainViewInner: React.FC<IMainViewInnerProps> = ({
  supplement,
  supplementProps,
  allowNavigation = true,
  location,
  history,
  noLogos = false,
  routes,
  fixedPositionedPanels = false,
}) => {
  const [showNavOnMobile, setShowNavOnMobile] = React.useState(false);
  const client = useClient();

  const routesWithCorrectPaths = React.useMemo(() => {
    return prepViews(
      computeFocusPaths(
        computeAbsolutePaths(
          filterOutUnauthorizedRoutes(routes, client.auth.session),
        ),
      ),
      fixedPositionedPanels,
    );
  }, [client]);

  const onSideNavToggled = React.useCallback(() => {
    setShowNavOnMobile((s) => !s);
  }, []);

  // get the details for the active tab
  const activeTabs = extractActiveTabs(
    routesWithCorrectPaths,
    location.pathname,
  );
  if (activeTabs.length === 0) {
    console.warn(
      `Unable to find active route description for ${location.pathname}`,
    );
  }

  const activeChild: any = _.last(activeTabs);
  if (!activeChild) {
    return null;
  }

  const menuComponent = activeChild.menu;
  // focus mode removes all other components
  const isFocused = !!activeChild.focus;
  const hideBackButton = activeChild.focus?.hideBackButton;
  const gotoFocusPath = () => {
    history.push(activeChild.focus.path);
  };

  // only show visible tabs (no redirects, no hidden routes)
  const sideNavTabs: INavItem[] = routesWithCorrectPaths.filter(
    (route: any) => !_.has(route, "redirect") && !route.hidden,
  );

  // HACK causes a page jump
  if (activeChild.redirect) {
    history.push(activeChild.redirect);
    return null;
  }

  return (
    <div
      className={css("mainView", {
        "-showSideNav": showNavOnMobile,
        "-focused": isFocused,
      })}
      data-test="main-view"
    >
      <FocusView
        isFocused={isFocused}
        onCancelClick={hideBackButton ? false : gotoFocusPath}
      >
        <TabbedViews routes={routesWithCorrectPaths} />
      </FocusView>
      <SideNav
        items={sideNavTabs}
        className={css("mainView_sideNav")}
        menu={menuComponent}
        supplement={supplement}
        supplementProps={supplementProps}
        isDisabled={!allowNavigation}
        noLogos={noLogos}
      />
      <MobileNav
        isOpen={showNavOnMobile}
        onToggleOpen={onSideNavToggled}
        className={css("mainView_mobileNav")}
      />
    </div>
  );
};

export const MainView = withRouter(MainViewInner);

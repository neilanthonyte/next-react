import * as _ from "lodash";
import { matchPath } from "react-router-dom";

/**
 * Return the active tabs based on the current URL
 * TODO - currently matches the base '/' component for all routes
 */
export const extractActiveTabs = (routes: any, pathname: any): any[] => {
  const activeTabs = routes.filter((tab: any) => {
    return matchPath(pathname, { path: tab.path });
  });
  const activeChildTabs = activeTabs.map((tab: any) => {
    return tab.routes ? extractActiveTabs(tab.routes, pathname) : [];
  });
  return activeTabs.concat(_.flatten(activeChildTabs));
};

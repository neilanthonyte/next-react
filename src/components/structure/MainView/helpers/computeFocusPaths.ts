import * as _ from "lodash";

/**
 * Automatically determines the path for the focus mode. By default, it will use the previous route path, thereby
 * making it possible to back out of the focus mode.
 *
 * @param tabs
 * @returns {*}
 */
export const computeFocusPaths = (tabs: any[]): any =>
  tabs.map((tab: any, index: number) => {
    const previousTab = index > 0 ? tabs[index - 1] : false;
    const focusPath = tab.focus && previousTab ? previousTab.path : false;
    const focus = tab.focus
      ? {
          path: _.get(tab, "focus.path") || focusPath,
          hideBackButton: _.get(tab, "focus.hideBackButton") || false,
        }
      : false;

    return {
      ...tab,
      focus: focus,
      routes: tab.routes ? computeFocusPaths(tab.routes) : null,
    };
  });

export default computeFocusPaths;

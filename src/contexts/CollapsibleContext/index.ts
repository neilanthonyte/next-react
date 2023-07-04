import * as React from "react";

export type ICollapsibleContext = {
  // function callback
  onToggleCollapse?: any;
  // collapse state
  isCollapsed?: boolean;
  // collapsible disabled
  isDisabled?: boolean;
};

export const CollapsibleContext = React.createContext<ICollapsibleContext>({
  onToggleCollapse: undefined,
  isCollapsed: undefined,
  isDisabled: undefined,
});

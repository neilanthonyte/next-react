import * as React from "react";

import { MainViewToggleViews } from "../MainViewToggleViews";
import {
  tabSwitchTransitionForward,
  tabSwitchTransitionBack,
} from "../../../../../helpers/cssTransitions";
import { IToggleViewsProps } from "../MainViewToggleViews";
import FocusView from "../FocusView";

export interface ITabbedViewsProps extends IToggleViewsProps {}

export const TabbedViews = (props: ITabbedViewsProps) => (
  <MainViewToggleViews
    transitionForward={tabSwitchTransitionForward}
    transitionBack={tabSwitchTransitionBack}
    {...props}
  />
);
TabbedViews.displayName = "TabbedViews";

export default TabbedViews;

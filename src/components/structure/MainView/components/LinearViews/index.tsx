import * as React from "react";
import {
  panelSwitchTransitionForward,
  panelSwitchTransitionBack,
} from "../../../../../helpers/cssTransitions";
import MainViewToggleViews from "../MainViewToggleViews";

interface ITabbedViewProps {
  routes: any[];
  routingLevel?: number;
}

export const LinearViews = (props: ITabbedViewProps) => (
  <MainViewToggleViews
    transitionForward={panelSwitchTransitionForward}
    transitionBack={panelSwitchTransitionBack}
    {...props}
  />
);

export default LinearViews;

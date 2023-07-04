import * as React from "react";
import { useEffect, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

import {
  panelSwitchTransitionForward,
  panelSwitchTransitionBack,
  ICssTransition,
  noTransition,
} from "../../../helpers/cssTransitions";

export interface IToggleViewsProps {
  views: React.ReactElement[];
  activeIndex: number;
  transitionForward?: ICssTransition;
  transitionBack?: ICssTransition;
  transition?: ICssTransition;
}

export const ToggleViews: React.FC<IToggleViewsProps> = ({
  views,
  activeIndex = 0,
  transitionForward,
  transitionBack,
  transition,
}) => {
  // store reference to last index, use this to determine movement animation
  const previousIndex = useRef<number>(-1);
  const persistedTransition = useRef<ICssTransition>(noTransition);

  const chosenTransition =
    activeIndex > previousIndex.current // chose direction based on movements
      ? transitionForward || transition || panelSwitchTransitionForward // forward
      : transitionBack || transition || panelSwitchTransitionBack; // backward

  // store reference to last index, use this to determine movement animation
  useEffect(() => {
    previousIndex.current = activeIndex;
  }, [activeIndex]);

  // copy over the persisted object to ensure the existing (view leaving screen) transition is updated as well
  persistedTransition.current.appear = chosenTransition.appear;
  persistedTransition.current.appearActive = chosenTransition.appearActive;
  persistedTransition.current.enter = chosenTransition.enter;
  persistedTransition.current.enterActive = chosenTransition.enterActive;
  persistedTransition.current.exit = chosenTransition.exit;
  persistedTransition.current.exitActive = chosenTransition.exitActive;

  return (
    <TransitionGroup className={css("toggleViews")}>
      <CSSTransition
        classNames={persistedTransition.current}
        timeout={500}
        key={`index-${activeIndex}`}
      >
        <div className={css("toggleViews_tab")}>{views[activeIndex]}</div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default ToggleViews;

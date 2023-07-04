import * as React from "react";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import styles from "./styles.scss";
import { ICssTransition } from "../../../helpers/cssTransitions";

export const transition: ICssTransition = {
  appear: styles.transitionEnter,
  appearActive: styles.transitionEnterActive,
  enter: styles.transitionEnter,
  enterActive: styles.transitionEnterActive,
  exit: styles.transitionExit,
  exitActive: styles.transitionExitActive,
};

export interface ITaskListItem {
  id: number | string;
  component: React.FC | JSX.Element;
}

export interface IAnimatedListProps {
  tasks: ITaskListItem[];
}

/**
 * Animates a list of items
 */
export const AnimatedList: React.FC<IAnimatedListProps> = ({ tasks = [] }) => {
  return (
    <div data-test="TaskList">
      <TransitionGroup>
        {tasks.map((task: ITaskListItem) => {
          return (
            <CSSTransition classNames={transition} timeout={600} key={task.id}>
              {task.component}
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

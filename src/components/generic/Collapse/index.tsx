import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { ICssTransition } from "../../../helpers/cssTransitions";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "Collapse");

const anyWindow = window as any;
// TODO: Is this switch on window properties still necessary? Can it come from the env.js,
// or from the runtime env object?
const animateCollapse = !(
  anyWindow.env?.disableCollapse || anyWindow.disableCollapse
);

export interface ICollapseProps {
  isOpened: boolean;
  onClick?: () => void;
  size?: EStandardSizes;
}

export const StaticCollapse: React.FC<ICollapseProps> = ({
  isOpened,
  onClick,
  children,
}) => {
  return (
    <div className={css("")} onClick={onClick} data-test="collapse">
      <div className={css("contents", isOpened ? "-open" : "-closed")}>
        {children}
      </div>
    </div>
  );
};

export const AnimatedCollapse: React.FC<ICollapseProps> = ({
  isOpened,
  onClick,
  children,
  size = EStandardSizes.Large,
}) => {
  const transition: ICssTransition = {
    appear: css(`transition-${size}Enter`),
    appearActive: css(`transition-${size}EnterActive`),
    enter: css(`transition-${size}Enter`),
    enterActive: css(`transition-${size}EnterActive`),
    exit: css(`transition-${size}Exit`),
    exitActive: css(`transition-${size}ExitActive`),
  };

  return (
    <div className={css("")} onClick={onClick} data-test="collapse">
      <TransitionGroup>
        {isOpened && (
          <CSSTransition classNames={transition} timeout={500}>
            {/* Ensure there is only a single child as per Transition's definition */}
            <>{children}</>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export const Collapse: React.FC<ICollapseProps> = animateCollapse
  ? AnimatedCollapse
  : StaticCollapse;

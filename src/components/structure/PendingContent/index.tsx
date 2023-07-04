import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import {
  defaultTransition,
  noTransition,
} from "../../../helpers/cssTransitions";
import { LoadingOverlay } from "../../generic/Loader";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

export interface IPendingContentProps {
  check: boolean;
  fallback?: React.Component | React.FC;
  transition?: any;
  transitionChildren?: object;
  className?: string;
  children?: any;
  /**
   * If true will render inside a relatively positioned element. I.e., will not act as a screen
   */
  isLocalised?: boolean;
  /**
   * Use this to render the children while the content is pending
   */
  renderChildrenWhilePending?: boolean;
}

/**
 * Prevents part of the app from showing unless a condition is met. Provides
 * styling to allow the child components to be layered ontop of each other.
 */
export const PendingContent: React.FC<IPendingContentProps> = ({
  check,
  fallback = null,
  transition,
  transitionChildren = {},
  className = false,
  children = null,
  isLocalised = false,
  renderChildrenWhilePending = false,
}) => {
  // allow someone to pass null
  fallback = fallback ? fallback : () => <LoadingOverlay />;
  // default the transtions. Cannot be done in the props definition above.
  transition = transition ? transition : defaultTransition;
  // by default, no transition for underlying element
  transitionChildren = transitionChildren ? transitionChildren : noTransition;
  className = className ? className : css("protectedArea");

  return (
    <TransitionGroup className={className} component="div">
      {check && (
        <CSSTransition
          classNames={transitionChildren}
          timeout={500}
          key="success"
        >
          <div className={css("protectedArea_container")} data-test="content">
            {children}
          </div>
        </CSSTransition>
      )}
      {!check && (
        <CSSTransition classNames={transition} timeout={500} key="fallback">
          <div
            className={css(
              `protectedArea_${isLocalised ? "localised" : "fallback"}`,
            )}
            data-test="fallback"
          >
            {renderChildrenWhilePending && children}
            {React.createElement(fallback as any, {})}
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

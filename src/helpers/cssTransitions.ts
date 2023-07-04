/**
 * Transition object compatible with CSSTransition.
 */
import styles from "../scss/core/transitions.scss";

export interface ICssTransition {
  appear?: string;
  appearActive?: string;
  enter?: string;
  enterActive?: string;
  exit?: string;
  exitActive?: string;
}

export const noTransition: ICssTransition = {
  appear: "",
  appearActive: "",
  enter: "",
  enterActive: "",
  exit: "",
  exitActive: "",
};

export const defaultTransition: ICssTransition = {
  appear: styles.defaultTransitionEnter,
  appearActive: styles.defaultTransitionEnterActive,
  enter: styles.defaultTransitionEnter,
  enterActive: styles.defaultTransitionEnterActive,
  exit: styles.defaultTransitionExit,
  exitActive: styles.defaultTransitionExitActive,
};

export const assetTransition: ICssTransition = {
  appear: styles.assetTransitionEnter,
  appearActive: styles.assetTransitionEnterActive,
  enter: styles.assetTransitionEnter,
  enterActive: styles.assetTransitionEnterActive,
  exit: styles.assetTransitionExit,
  exitActive: styles.assetTransitionExitActive,
};

export const tabSwitchTransitionForward: ICssTransition = {
  appear: styles.tabSwitchTransitionForwardEnter,
  appearActive: styles.tabSwitchTransitionForwardEnterActive,
  enter: styles.tabSwitchTransitionForwardEnter,
  enterActive: styles.tabSwitchTransitionForwardEnterActive,
  exit: styles.tabSwitchTransitionForwardExit,
  exitActive: styles.tabSwitchTransitionForwardExitActive,
};

export const tabSwitchTransitionBack: ICssTransition = {
  appear: styles.tabSwitchTransitionBackEnter,
  appearActive: styles.tabSwitchTransitionBackEnterActive,
  enter: styles.tabSwitchTransitionBackEnter,
  enterActive: styles.tabSwitchTransitionBackEnterActive,
  exit: styles.tabSwitchTransitionBackExit,
  exitActive: styles.tabSwitchTransitionBackExitActive,
};

export const tabSwitchTransition: ICssTransition = tabSwitchTransitionForward;

export const panelSwitchTransitionForward: ICssTransition = {
  appear: styles.panelSwitchTransitionForwardEnter,
  appearActive: styles.panelSwitchTransitionForwardEnterActive,
  enter: styles.panelSwitchTransitionForwardEnter,
  enterActive: styles.panelSwitchTransitionForwardEnterActive,
  exit: styles.panelSwitchTransitionForwardExit,
  exitActive: styles.panelSwitchTransitionForwardExitActive,
};

export const panelSwitchTransitionBack: ICssTransition = {
  appear: styles.panelSwitchTransitionBackEnter,
  appearActive: styles.panelSwitchTransitionBackEnterActive,
  enter: styles.panelSwitchTransitionBackEnter,
  enterActive: styles.panelSwitchTransitionBackEnterActive,
  exit: styles.panelSwitchTransitionBackExit,
  exitActive: styles.panelSwitchTransitionBackExitActive,
};

export const panelSwitchTransition: ICssTransition =
  panelSwitchTransitionForward;

export const sidePanelSwitchTransition: ICssTransition = {
  appear: styles.sidePanelSwitchTransitionEnter,
  appearActive: styles.sidePanelSwitchTransitionEnterActive,
  enter: styles.sidePanelSwitchTransitionEnter,
  enterActive: styles.sidePanelSwitchTransitionEnterActive,
  exit: styles.sidePanelSwitchTransitionExit,
  exitActive: styles.sidePanelSwitchTransitionExitActive,
};

export const coverTransition: ICssTransition = {
  appear: styles.coverTransitionEnter,
  appearActive: styles.coverTransitionEnterActive,
  enter: styles.coverTransitionEnter,
  enterActive: styles.coverTransitionEnterActive,
  exit: styles.coverTransitionExit,
  exitActive: styles.coverTransitionExitActive,
};

export const navTransition: ICssTransition = {
  appear: styles.navTransitionEnter,
  appearActive: styles.navTransitionEnterActive,
  enter: styles.navTransitionEnter,
  enterActive: styles.navTransitionEnterActive,
  exit: styles.navTransitionExit,
  exitActive: styles.navTransitionExitActive,
};

export const taskTransition: ICssTransition = {
  appear: styles.taskTransitionEnter,
  appearActive: styles.taskTransitionEnterActive,
  enter: styles.taskTransitionEnter,
  enterActive: styles.taskTransitionEnterActive,
  exit: styles.taskTransitionExit,
  exitActive: styles.taskTransitionExitActive,
};

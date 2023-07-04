import * as _ from "lodash";
import * as React from "react";

import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { UrgencyBackground } from "../UrgencyBackground";

// css
import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "overdueTransition");

if (!env.overdueThreshold) {
  throw new Error("env.overdueThreshold not set");
}

interface IOverdueTransitionProps {
  dueAt: unixTimestamp;
  disabled?: boolean;
  threshold?: number;
  children: any;
}

interface IOverdueTransitionState {
  from: "none" | "low" | "med" | "high";
  to: "none" | "low" | "med" | "high";
  fadeIn: { animation: string };
}

/**
 * Component that color transitions to show overdue based on a due at timestamp and how over the current time it is.
 */
export class OverdueTransition extends React.Component<
  IOverdueTransitionProps,
  IOverdueTransitionState
> {
  // timer
  private nextTick: any = null;
  // overdue background color is all initially hidden
  private initialState: IOverdueTransitionState = {
    from: "none",
    to: "none",
    fadeIn: {
      animation: "",
    },
  };

  constructor(props: IOverdueTransitionProps) {
    super(props);

    // set initial state
    this.state = this.initialState;
  }

  /**
   * Get keyframe to show color animation.
   */
  private _getKeyframe = (initOpacity: number, duration: number) => {
    const styleSheet: any = document.styleSheets[0];
    const animationName = _.uniqueId("keyframes");
    const keyframes = `@keyframes ${animationName} { 0% { opacity: ${initOpacity}; } 100% { opacity: 1; } }`;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    return {
      animation: `${animationName} ${duration}s linear both`,
    };
  };

  /**
   * Calculate keyframe to show color information based on
   * order and time information.
   */
  private _calculateKeyFrames(dueAt: number, disabled: boolean = false) {
    // get props
    const { threshold = parseInt(env.overdueThreshold, 10) } = this.props;

    // get time now
    const now = currentUnixTimestamp();

    // get how overdue due at time is
    const overdue = now - dueAt;

    // set initial styling
    const transition: IOverdueTransitionState = this.initialState;

    // get how many seconds elapsed from last tick
    const progress = overdue % threshold;

    // don't highlight overdue transition color if something is selected
    if (!disabled) {
      // get keyframe animation to show
      const fadeIn = this._getKeyframe(
        progress / threshold,
        threshold - progress,
      );

      if (overdue >= threshold * 3) {
        // high color is visible
        transition.from = "high";
        transition.to = "high";
      } else if (overdue >= threshold * 2) {
        // fade from med to high color
        transition.from = "med";
        transition.to = "high";

        // set fade in transition animation
        transition.fadeIn = fadeIn;
      } else if (overdue >= threshold) {
        // fade from low to med color
        transition.from = "low";
        transition.to = "med";

        // set fade in transition animation
        transition.fadeIn = fadeIn;
      } else if (overdue >= 0) {
        // fade in current background color to low color
        transition.from = "none";
        transition.to = "low";

        // set fade in transition animation
        transition.fadeIn = fadeIn;
      } else {
        // not overdue
      }
    } else {
      transition.from = "none";
      transition.to = "none";
    }

    // render color transition
    this.setState(transition);

    if (overdue <= 0) {
      // in case we have a prop update before our callback triggers
      if (this.nextTick) {
        clearTimeout(this.nextTick);
        this.nextTick = null;
      }

      // order is not overdue yet so we tick down to time to when we start
      // the overdue color transition
      this.nextTick = setTimeout(() => {
        this._calculateKeyFrames(dueAt, disabled);
      }, Math.abs(overdue) * 1000);
    } else if (overdue < threshold * 3) {
      // transition in the future
      // in case we have a prop update before our callback triggers
      if (this.nextTick) {
        clearTimeout(this.nextTick);
        this.nextTick = null;
      }

      // order is overdue get next time to recalculate keyframe
      // animation to show
      this.nextTick = setTimeout(() => {
        this._calculateKeyFrames(dueAt, disabled);
      }, (threshold - progress) * 1000);
    }
  }

  /**
   * Calculate the color to show and how to transition based on current time difference to due time when mounted.
   */
  public componentDidMount() {
    // get props
    const { dueAt, disabled } = this.props;

    // calculate keyframe to show based on order due time
    this._calculateKeyFrames(dueAt, disabled);
  }

  /**
   * When component updates calculate color to show and how to transition based on current time difference to due time.
   */

  public UNSAFE_componentWillReceiveProps(
    nextProps: Readonly<IOverdueTransitionProps>,
  ): void {
    // get props
    const { dueAt, disabled } = nextProps;

    // calculate keyframe to show based on order due time
    this._calculateKeyFrames(dueAt, disabled);
  }

  /**
   * Clear any transitions when the component is unmounted.
   */
  public componentWillUnmount() {
    // stop the timer
    clearTimeout(this.nextTick);
    this.nextTick = null;
  }

  /**
   * Show overdue color and start transition.
   */
  public render = () => {
    // get the urgency color backgrounds to transition from and to.
    const { from, to, fadeIn } = this.state;

    return (
      <div className={css("")}>
        <div className={css("decoration")}>
          <UrgencyBackground urgency={from} />
          <div style={fadeIn} className={css("fadeIn")}>
            <UrgencyBackground urgency={to} />
          </div>
        </div>
        <div className={css("body")}>{this.props.children}</div>
      </div>
    );
  };
}

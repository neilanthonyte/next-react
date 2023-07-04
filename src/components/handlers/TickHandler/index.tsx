import * as React from "react";
import moment from "moment";

import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { TickContext } from "../../../contexts/TickContext";
import { unixTimestamp } from "next-shared/src/types/dateTypes";

/**
 * tick handler props
 */
interface ITickHandlerProps {
  tickDuration?: number;
  children: any;
}

/**
 * tick handler state
 */
interface ITickHandlerState {
  tick: unixTimestamp;
}

/**
 * tick handler component
 */
export class TickHandler extends React.Component<
  ITickHandlerProps,
  ITickHandlerState
> {
  // current tick
  private nextTick: any = null;

  /**
   * constructor
   *
   * @param {ITickHandlerProps} props
   */
  constructor(props: ITickHandlerProps) {
    super(props);

    // set the initial tick to the timestamp now
    this.state = {
      tick: currentUnixTimestamp(),
    };
  }

  /**
   * trigger the next tick and setup for the one after
   *
   * @private
   */
  private _triggerTick() {
    //get props
    const { tickDuration = 60 } = this.props;

    // validate value of tickDuration
    if (!(tickDuration > 0 && tickDuration <= 60)) {
      throw new Error(
        "tick duration must be great than 0 and less than or equal to 60 seconds",
      );
    }

    // get timestamp now
    const now = currentUnixTimestamp();

    // get the current exact minute we are one
    const currentMinute = moment().seconds(0).unix();

    // calculate the seconds until the next minute from now
    const secondsUntilNextMinute = 60 - (now - currentMinute);

    // get timestamp when next tick is due
    const due = now + tickDuration;

    // get seconds until the next tick
    let secondsUntilNexTick = due - now;
    if (secondsUntilNexTick > secondsUntilNextMinute) {
      secondsUntilNexTick = secondsUntilNextMinute;
    }

    // re-render
    this.setState({
      tick: now,
    });

    // setup timeout to calculate the next tick based
    this.nextTick = setTimeout(() => {
      // calculate the tick after
      this._triggerTick();
    }, secondsUntilNexTick * 1000);
  }

  /**
   * component did mount
   */
  public componentDidMount() {
    // start the tick trigger
    this._triggerTick();
  }

  /**
   * remove tick counter
   */
  public componentWillUnmount() {
    // cleanup and remove timeout
    clearTimeout(this.nextTick);
    this.nextTick = null;
  }

  /**
   * render
   *
   * @returns {any}
   */
  public render() {
    // get the current tick and add it to the provider
    const { tick } = this.state;
    const provider = {
      tick,
    };
    // pass in children to wrap context later
    const { children } = this.props;
    return (
      <TickContext.Provider value={provider}>{children}</TickContext.Provider>
    );
  }
}

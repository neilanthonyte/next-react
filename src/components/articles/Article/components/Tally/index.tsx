import * as React from "react";
import styles from "../../styles.scss";

const now = () => new Date().getTime();

const numberWithCommas = (x: number) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export interface ITallyProps {
  total: number;
}

interface ITallyState {
  value: number;
}

/**
 * Counts up to a specified number.
 */
export class Tally extends React.Component<ITallyProps, ITallyState> {
  private interval: any; // settimeout timer
  private startTime: number; // ms timestamp

  constructor(props: ITallyProps) {
    super(props);

    this.state = {
      value: 0,
    };
    this.updateVal = this.updateVal.bind(this);

    setTimeout(() => {
      this.startTime = now();
      this.interval = setInterval(this.updateVal, 20);
    }, 1000);
  }

  public componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  public updateVal() {
    const progress = Math.min(1, (now() - this.startTime) / 1000.0);
    if (progress >= 1) {
      clearInterval(this.interval);
    }
    this.setState({ value: Math.floor(this.props.total * progress) });
  }

  public render() {
    return (
      <div className={styles._figure}>{numberWithCommas(this.state.value)}</div>
    );
  }
}

export default Tally;

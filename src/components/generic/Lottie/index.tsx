import * as React from "react";
import * as lottie from "lottie-web";

export interface ILottieProps {
  style?: any;
  height?: number;
  width?: number;
  isPaused?: boolean;
  isStopped?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  animationData: {};
  rendererSettings?: {};
  segments: number[] | boolean;
  eventListeners?: Array<{
    eventName: string;
    callback: () => void;
  }>;
}

/**
 *  Wrapper for Airbnb Lottie
 *
 *  based on https://github.com/chenqingspring/react-lottie
 */
export class Lottie extends React.PureComponent<ILottieProps> {
  private options: any;
  private playthroughs: number;
  private el: HTMLDivElement;
  private anim: any; // lottie animation?

  constructor(props: ILottieProps) {
    super(props);
  }

  public componentDidMount() {
    const {
      loop = false,
      autoplay = true,
      animationData,
      rendererSettings,
      segments,
      eventListeners,
    } = this.props;

    // settings
    this.options = {
      container: this.el,
      renderer: "svg",
      loop,
      autoplay,
      segments: segments !== false,
      animationData,
      rendererSettings,
    };
    this.playthroughs = 0;
    // lottie init
    this.anim = lottie.loadAnimation(this.options);
    // register eventListeners if any
    if (eventListeners) {
      eventListeners.forEach((eventListener) => {
        this.anim.addEventListener(
          eventListener.eventName,
          eventListener.callback,
        );
      });
    }

    this.play();
  }

  /** HACK to force rerender and destroy/rebuild animation to play again */
  public componentDidUpdate(nextProps: any) {
    if (this.playthroughs < nextProps.playthroughs) {
      this.replay();
    }
  }

  public componentWillUnmount() {
    this.anim.destroy();
    // deregisters event listeners if any
    if (this.props.eventListeners) {
      this.props.eventListeners.forEach((eventListener) => {
        this.anim.removeEventListener(
          eventListener.eventName,
          eventListener.callback,
        );
      });
    }
    this.options.animationData = null;
    this.anim = null;
  }

  public replay() {
    this.playthroughs++;
    this.anim.destroy();
    this.anim = lottie.loadAnimation(this.options);
    this.play();
  }

  public play() {
    if (this.props.isStopped) {
      this.anim.stop();
    } else if (this.props.segments) {
      this.anim.playSegments(this.props.segments, true);
    } else {
      this.anim.play();
    }
  }

  public pause() {
    if (this.props.isPaused && !this.anim.isPaused) {
      this.anim.pause();
    } else if (!this.props.isPaused && this.anim.isPaused) {
      this.anim.pause();
    }
  }

  public getSize(initial: number) {
    let size;
    if (typeof initial === "number") {
      size = `${initial}px`;
    } else {
      size = initial || "100%";
    }
    return size;
  }

  public render() {
    const { width, height } = this.props;
    const lottieStyles = {
      width: this.getSize(width),
      height: this.getSize(height),
      overflow: "hidden",
      margin: "0 auto",
      outline: "none",
      ...this.props.style,
    };
    return (
      <div
        ref={(c) => {
          this.el = c;
        }}
        style={lottieStyles}
      />
    );
  }
}

export default Lottie;

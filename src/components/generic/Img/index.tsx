/**
 * Shows an image based version of the logo
 */
import * as React from "react";
import { CSSTransition } from "react-transition-group";
import { assetTransition } from "../../../helpers/cssTransitions";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

interface IImgProps {
  src: string;
  className?: string;
  style?: any;
  responsive?: boolean;
  fullwidth?: boolean;
}

interface IImgState {
  isLoaded: string | boolean;
}

export class Img extends React.Component<IImgProps, IImgState> {
  public state = { isLoaded: false };

  public componentDidMount() {
    this.setImageSource();
  }

  public componentDidUpdate(prevProps: IImgProps) {
    if (this.props.src !== prevProps.src) {
      this.setState({
        isLoaded: false,
      });
      this.setImageSource();
    }
  }

  private setImageSource() {
    const img = new Image();
    img.onload = () =>
      this.setState({
        isLoaded: true,
      });
    img.src = this.props.src;
  }

  public render() {
    const { isLoaded } = this.state;
    const {
      className,
      style,
      src,
      responsive = false,
      fullwidth = false,
    } = this.props;

    return (
      <CSSTransition
        classNames={assetTransition}
        timeout={500}
        in={isLoaded}
        mountOnEnter={true}
      >
        <img
          src={src}
          style={style}
          className={[
            css("image", {
              "-responsive": responsive,
              "-fullwidth": fullwidth,
            }),
            className,
          ].join(" ")}
          data-test="image"
        />
      </CSSTransition>
    );
  }
}

import * as React from "react";
import Lottie from "react-lottie";
import { withSize, SizeMeProps } from "react-sizeme";

import { StaticLogo } from "../StaticLogo";

import * as animationData from "./logo.json";
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "AnimatedLogo");

export interface IAnimatedLogoProps {
  loop?: boolean;
}

export interface IAnimatedLogoWithSizeProps
  extends IAnimatedLogoProps,
    SizeMeProps {}

const _AnimatedLogo: React.FC<IAnimatedLogoWithSizeProps> = ({
  loop = true,
  size,
}) => {
  const { width, height } = size;
  const key = `${Math.round(width)}x${Math.round(height)}`;

  return (
    <div className={css("")}>
      {env.lowPower ? (
        <StaticLogo className={css("fallback")} />
      ) : (
        <Lottie
          key={key}
          options={{
            loop,
            autoplay: true,
            animationData,
            // see: https://github.com/airbnb/lottie-web/wiki/Renderer-Settings
            rendererSettings: {
              // viewBoxOnly: true
              // viewBoxSize: true,
              // preserveAspectRatio: "xMidYMid meet"
            },
          }}
          width={Math.round(width)}
          height={Math.round(height)}
        />
      )}
    </div>
  );
};

export const AnimatedLogo: React.FC<IAnimatedLogoProps> = withSize({
  monitorHeight: true,
  monitorWidth: true,
})(_AnimatedLogo) as any;

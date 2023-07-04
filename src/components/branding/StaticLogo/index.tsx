import * as React from "react";

import { Img } from "../../generic/Img";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "StaticLogo");

export type TLogoMode = "light" | "dark" | "white" | "color" | "nav";

export interface IStaticLogoProps {
  variant?: "square" | "landscape" | "thumb";
  colorScheme?: TLogoMode;
  responsive?: boolean;
  fileType?: "svg" | "png";
  className?: string;
}

/**
 * Static (non-moving) logo. Assumes branding elements are available at a hosted location.
 */
export const StaticLogo: React.FC<IStaticLogoProps> = ({
  variant = "square",
  colorScheme = "color",
  fileType = "svg",
  responsive = true,
  className = "",
}) => {
  const url = `${env.logosBaseUrl}logo-${variant}-${colorScheme}.${fileType}`;
  const logoClassName = css(
    "",
    {
      "-responsive": responsive,
    },
    { className },
  );

  return <Img src={url} className={logoClassName} />;
};

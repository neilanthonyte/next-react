import * as React from "react";

import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "circularMetric");

export interface ICircularMetricProps {
  variant?: TColorVariants;
  size?: EStandardSizes;
  children: string | number;
  onClick?: (args: any) => any;
}

export const CircularMetric: React.FC<ICircularMetricProps> = ({
  children,
  size = EStandardSizes.Small,
  variant,
  onClick,
}) => {
  return (
    <div
      data-test="metric-value"
      className={css("", `-color-${variant}`, `-stdSize-${size}`, {
        "-clickable": !!onClick,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

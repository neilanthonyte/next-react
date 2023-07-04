import * as React from "react";
import { ReactText } from "react";

import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "rectangularMetric");

export interface IRectangularMetricProps {
  children?: ReactText[] | ReactText;
  size: EStandardSizes;
  variant?: TColorVariants;
  onClick?: () => void;
}

export const RectangularMetric: React.FC<IRectangularMetricProps> = ({
  children,
  size,
  onClick,
  variant = TColorVariants.None,
}) => {
  const classNames = css("", `-${size}`, `-color-${variant}`);

  return (
    <div onClick={onClick} className={classNames}>
      {children && <span>{children}</span>}
    </div>
  );
};

import * as React from "react";

import { IBadgeProps, TBadgeSize } from "../Badge";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

// css
import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "statusLabels");

export interface IStatusLabelsProps {
  children: React.ReactElement<IBadgeProps>[];
  size?: TBadgeSize;
}

/**
 * Shows status labels one after the other in a row.
 * Allows for two different sizes.
 */
export const StatusLabels: React.FC<IStatusLabelsProps> = ({
  children,
  size = "sm",
}) => {
  return (
    <div className={css("")}>
      <div className={css("labels")}>
        {React.Children.map(
          children.filter((child: React.ReactElement<IBadgeProps>) => child),
          (label: React.ReactElement<IBadgeProps>) =>
            React.cloneElement(label, { size }),
        )}
      </div>
    </div>
  );
};

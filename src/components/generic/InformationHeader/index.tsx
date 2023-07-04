import * as React from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

// css
import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "informationHeader");

export interface IInformationHeaderProps {
  primaryHeader: string;
  primaryDescription: string;
  secondaryHeader: string;
  secondaryDescription: string;
  height?: string;
  size: EStandardSizes;
}

/**
 * Show an information header with primary and secondary types.
 * Allows for two different sizes.
 */
export const InformationHeader: React.FC<IInformationHeaderProps> = ({
  primaryHeader,
  primaryDescription,
  secondaryHeader,
  secondaryDescription,
  height = "auto",
  size,
  children,
}) => (
  <div className={css("", `-size-${size}`)} style={{ height: `${height}` }}>
    <div className={css("info")}>
      <div className={css("primary")}>
        <div className={css("primaryHeader")}>{primaryHeader}</div>
        <div className={css("primaryDescription")}>{primaryDescription}</div>
      </div>
      <div className={css("secondary")}>
        <div className={css("secondaryHeader")}>{secondaryHeader}</div>
        <div className={css("secondaryDescription")}>
          {secondaryDescription}
        </div>
      </div>
    </div>
    {children}
  </div>
);

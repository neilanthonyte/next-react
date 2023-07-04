import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "HeroContent");

export interface IHeroContentProps {
  children: any;
}

/**
 * Displays children in the center of where this component is placed.
 */
export const HeroContent: React.FC<IHeroContentProps> = ({ children }) => {
  return (
    <div className={css("")} data-test="hero-content">
      {children}
    </div>
  );
};

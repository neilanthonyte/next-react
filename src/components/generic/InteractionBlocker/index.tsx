import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";

const css = cssComposer(styles, "InteractionBlocker");

export const InteractionBlocker: React.FC = ({ children }) => (
  <div data-test="interaction-blocker" className={css("")}>
    {children}
    <div
      data-test="interaction-blocker-overlay"
      className={css("overlay")}
    ></div>
  </div>
);

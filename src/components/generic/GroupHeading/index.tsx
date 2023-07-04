import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "GroupHeading");

export interface IGroupHeadingProps {}

export const GroupHeading: React.FC<IGroupHeadingProps> = ({ children }) => {
  return (
    <div className={css("")}>
      <h3>{children}</h3>
    </div>
  );
};

import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "VStack");

export interface IVStackProps {
  size?: "compact" | "comfortable";
  children: any;
}

export const VStack: React.FC<IVStackProps> = ({ children, size }) => {
  return (
    <div className={css("", `-size-${size}`)}>
      {React.Children.map(children, (child) =>
        child ? <div className={css("container")}>{child}</div> : null,
      )}
    </div>
  );
};

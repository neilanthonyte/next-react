import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "WeekGrid");

export interface IWeekGridProps {
  children: any;
}

export const WeekGrid: React.FC<IWeekGridProps> = ({ children }) => {
  return (
    <div className={css("")}>
      {!!children &&
        React.Children.map(children, (child, i) => (
          <div className={css("item")} key={i}>
            {React.cloneElement(child)}
          </div>
        ))}
    </div>
  );
};

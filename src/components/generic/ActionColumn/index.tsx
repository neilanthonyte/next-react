import * as React from "react";

import { IButtonProps } from "../Button";

// css
import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "ActionColumn");

export interface IActionColumnProps {
  actions: ((...args: any[]) => React.ReactElement<IButtonProps>)[];
}

/**
 * Action column. Shows clickable actions in a column.
 */
export const ActionColumn: React.FC<IActionColumnProps> = ({ actions }) => (
  <div className={css("")}>
    {actions.map(
      (
        Action: (...args: any[]) => React.ReactElement<IButtonProps>,
        index: number,
      ) => (
        <div className={css("action")} key={index}>
          <Action />
        </div>
      ),
    )}
  </div>
);

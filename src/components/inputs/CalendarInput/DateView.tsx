import * as React from "react";

import { Icon } from "../../generic/Icon";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "CalendarInput");

export interface IDateViewProps {
  date: string;
}

/**
 * Styled component to show picked date
 */
export const DateView: React.FC<IDateViewProps> = ({ date }) => {
  return (
    <>
      <div className={css("date")}>
        {date || <span className={css("placeholder")}>Pick a date</span>}
      </div>

      <div className={css("icon")}>
        <Icon name="calendar" />
      </div>
    </>
  );
};

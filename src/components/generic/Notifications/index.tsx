import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
export const css = cssComposer(styles, "Notifications");

export interface INotificationProps {
  amount: number;
}

/**
 * Component rendering a styled pulsating element with the number of notifications available
 */
export const Notifications: React.FC<INotificationProps> = ({ amount }) => (
  <div className={css("")}>
    <span className={css("label")} data-test="label">
      {amount}
    </span>
  </div>
);

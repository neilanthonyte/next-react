import * as React from "react";
import moment from "moment-timezone";

import { useTickReRender } from "../../../hooks/useTickReRender";

// team submodules
import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles);

/**
 * clock props interface
 */
interface IClockProps {
  label?: string;
  className?: string;
}

/**
 * clock component
 */
export const Clock: React.FC<IClockProps> = ({ label, className }) => {
  useTickReRender();
  return (
    <div className={[css("clock"), className].join(" ")}>
      {label && (
        <div>
          <h4 data-test="label" className={css("clock_label")}>
            {label}
          </h4>
        </div>
      )}
      <div>
        <h1 data-test="clock" className={css("clock_time")}>
          {moment().format("h:mmA")}
        </h1>
      </div>
    </div>
  );
};

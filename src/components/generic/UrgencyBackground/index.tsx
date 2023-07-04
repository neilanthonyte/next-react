import * as React from "react";
import { useMemo } from "react";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "urgencyBackground");

interface IUrgencyBackgroundProps {
  urgency: "none" | "low" | "med" | "high";
  children?: React.ReactElement<any>;
}

interface IStyle {
  style: { [key: string]: string | number };
}

interface IUrgencyBackgroundState {
  none: IStyle["style"];
  low: IStyle["style"];
  med: IStyle["style"];
  high: IStyle["style"];
}

/**
 * Component that shows color urgency as a background.
 */
export const UrgencyBackground: React.FC<IUrgencyBackgroundProps> = ({
  urgency,
  children,
}): React.ReactElement<any> => {
  // Set the set urgency to visible.
  //const visibility = useMemo<IUrgencyBackgroundState>(() => {
  // initially set everything to invisible
  const visibility = useMemo<IUrgencyBackgroundState>(() => {
    const v = {
      none: { opacity: 0 },
      low: { opacity: 0 },
      med: { opacity: 0 },
      high: { opacity: 0 },
    };

    if (urgency in v && v[urgency].opacity === 0) {
      v[urgency] = { opacity: 1 };
    }

    return v;
  }, [urgency]);

  // get visibility of urgency's
  const { high, med, low, none } = visibility;

  // render
  return (
    // container
    <div className={css("")}>
      <div style={none} className={css("none")} />
      {/* low urgency background color*/}
      <div style={low} className={css("low")} />
      {/* med urgency background color */}
      <div style={med} className={css("med")} />
      {/* high urgency background color */}
      <div style={high} className={css("high")} />
      {children}
    </div>
  );
};

import * as React from "react";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import * as _ from "lodash";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "ProgressDots");

interface IProgressDotProps {
  active: boolean;
  to?: string;
  onDotClick?: (event: React.MouseEvent, index?: string) => void;
}

const ProgressDot: React.FC<IProgressDotProps> = ({
  active,
  to,
  onDotClick,
}) => {
  const className = css("dot", { "-active": active });

  const _onClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDotClick && onDotClick(event, to);
  };

  return to ? (
    <NavLink className={className} to={to} onClick={_onClick} />
  ) : (
    <div className={className} onClick={_onClick}></div>
  );
};

export interface IProgressDotsProps {
  current: number;
  total: number;
  baseUrl?: string;
  onDotClick?: (event: React.MouseEvent, index?: string) => void;
}

/**
 * ProgressDots - Shows a user's current progress through sequences of views,
 * using a series of hollow 'dots' representing the total amount of items in the
 * sequence, with a solid dot representing the current element in the sequence
 * visible to the user.
 *
 * The component can optionaly take a baseUrl prop, and if so, can be used to
 * navigate between the items in the given sequence. This assumes that the
 * routes used to display the sequence items are of the form 'baseUrl/index'.
 *
 * The component can also optionally take an onDotClick event handler if custom
 * logic needs to be run when a ProgressDot is clicked.
 */
export const ProgressDots: React.FC<IProgressDotsProps> = ({
  current,
  total,
  baseUrl,
  onDotClick,
}) => {
  const arr: number[] = useMemo(() => _.times(total, (i) => i), [total]);

  return (
    <div className={css("")}>
      {arr.map((index) => (
        <ProgressDot
          key={index}
          active={index === current}
          to={baseUrl ? `${baseUrl}/${index}` : null}
          onDotClick={onDotClick}
        />
      ))}
    </div>
  );
};

import * as React from "react";
import * as _ from "lodash";

import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "ProgressBar");

export interface IProgressState {
  progress: number;
  state: TColorVariants;
}

export interface IProgressBarProps {
  progress: number | IProgressState[];
  size?: EStandardSizes;
  min?: number;
  max?: number;
  className?: string;
}

export const ProgressBar: React.FC<IProgressBarProps> = ({
  progress,
  size = EStandardSizes.Small,
  min = 0,
  max = 1,
  className = "",
}) => {
  const vals = Array.isArray(progress)
    ? progress
    : [{ progress, state: TColorVariants.Success }];
  const normalise = (v: number) => ((v - min) / (max - min)) * 100;
  const ordered = _.orderBy(vals, (v) => -v.progress);

  return (
    <div className={css("", `-stdSize-${size}`, { className })}>
      {ordered.map((v, i) => (
        <div
          key={i}
          className={css("bar", `-color-${v.state}`)}
          style={{ width: `${normalise(v.progress)}%` }}
        />
      ))}
    </div>
  );
};

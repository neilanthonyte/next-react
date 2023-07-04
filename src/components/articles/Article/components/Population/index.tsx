import * as React from "react";
import * as _ from "lodash";

import styles from "../../styles.scss";

// TODO: move to Icon
const getClasses = (count: number, applicable: number) =>
  _.times(count, (i) => (i < applicable ? "fi-mood-pos1" : "fi-mood-pos1-o"));

// source: https://stackoverflow.com/questions/8495687/split-array-into-chunks
const chunk = (arr: any[], len: number) => {
  const chunks = [];
  let i = 0;
  const n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
};

export interface IPopulationProps {
  size: number;
  applicable: number;
  columns?: number;
}

/**
 * Visulises a population percentage. Useful for highlighing key demographic
 * statistics.
 */
export const Population: React.FC<IPopulationProps> = ({
  size,
  applicable,
  columns,
}) => (
  <div className={styles.population}>
    {chunk(getClasses(size, (applicable / 100.0) * size), columns || size).map(
      (row, i) => {
        return (
          <div key={i}>
            {row.map((cls, iconIndex) => (
              <span key={iconIndex}>
                <span className={cls} />{" "}
              </span>
            ))}
          </div>
        );
      },
    )}
  </div>
);

export default Population;

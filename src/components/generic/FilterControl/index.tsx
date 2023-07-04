import * as _ from "lodash";
import * as React from "react";

import { TColorVariants } from "next-shared/src/types/TColorVariants";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "FilterControl");

export interface IFilterOption {
  value: string;
  state?: TColorVariants;
}

export type FilterControlProps = {
  /**
   * The contents of this array are what will be displayed to the user.
   */
  values: string[] | IFilterOption[];
  /**
   * If this value matches something from within the values[] prop,
   * this prop will make a point to highlight the value as "selected"
   */
  selectedValue: string;
  /**
   * Whenever a value from the values[] prop is selected, this callback is fired with it's value!
   */
  onClick?: (value: string) => void;
  /**
   * Condensed mode if set to true, will condense the filter options into a smaller view.
   * It does so by removing the radio buttons, and applying a bold filter to the selected item.
   */
  condensed?: boolean;
};

/**
 * This component renders out a list of available filters as provided through props.
 */
export const FilterControl: React.FC<FilterControlProps> = ({
  values,
  selectedValue,
  onClick,
  condensed,
}) => {
  if (onClick && !_.isFunction(onClick)) {
    throw new Error("onClick callback must be a function");
  }

  const isStringArray =
    Array.isArray(values) && values.length > 0 && typeof values[0] === "string";

  const stdValues: IFilterOption[] = isStringArray
    ? (values as string[]).map((v) => ({
        value: v,
      }))
    : (values as IFilterOption[]);

  return (
    <div className={css("")} data-test="filter-control">
      {stdValues.map((v, i) => (
        <div
          key={i}
          className={css("filter", `-state-${v.state}`, {
            "-active": selectedValue === v.value,
            "-condensed": !!condensed,
          })}
          onClick={() => onClick && onClick(v.value)}
          data-test={`filter-control-${i}`}
          data-test-active={selectedValue === v.value ? "active" : "inactive"}
        >
          {!condensed && <span className={css("filter_decoration")} />}
          <span data-test="filter-value" className={css("filter_label")}>
            {v.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FilterControl;

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { findIndex, isEqual, xor } from "lodash";

import { TColorVariants } from "next-shared/src/types/TColorVariants";
import {
  IOption,
  Options,
  standardizeOptions,
} from "../../../helpers/standardizeOptions";
import { CircularMetric } from "../../generic/CircularMetric";
import { InlineOptions, Option } from "../../generic/InlineOptions";

import { Disable } from "../../generic/Disable";
import CircularIcon from "../../generic/CircularIcon";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { Grid } from "../../structure/Grid";
import { Button } from "../../generic/Button";

import sharedStyles from "../styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "OptionsInput");

export type TOptionsInputVariant =
  | "dropdown"
  | "grid"
  | "inline"
  | "dots"
  | "icons"
  | "auto";

export interface IOptionsInputProps {
  variant?: TOptionsInputVariant;
  value?: any;
  options: Options<any>;
  onInputChange: (newVal: any) => void;
  defaultValue?: any;
  allowMultiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  /** As used by some of the variations, including 'dots' */
  size?: EStandardSizes;
}

export const OptionsInput: React.FC<IOptionsInputProps> = ({
  variant = "auto",
  value: currentValue,
  options,
  onInputChange,
  defaultValue,
  allowMultiple = false,
  disabled = false,
  size = EStandardSizes.Small,
  placeholder = "",
}) => {
  // only use the default value at first
  const [value, setValue] = useState(currentValue || defaultValue);
  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  if (variant === "auto") {
    // safest option
    // TODO make smarter choices
    variant = "dropdown";
  }

  const standardOptions: IOption<any>[] = useMemo(() => {
    const standardizedOptions = standardizeOptions(options);
    // only add placeholder for non multiple dropdown
    if (variant !== "dropdown" || allowMultiple === true) {
      return standardizedOptions;
    }

    // add placeholder label and value to options
    // TODO reinstate placeholderIndex props?
    // const placeholderIndex = getPlaceholderIndex(options);

    standardizedOptions.splice(0, 0, {
      value: null,
      label: placeholder || "Please Select...",
    });
    return standardizedOptions;
  }, [options, variant, placeholder]);

  const selectedIndicies = useMemo(() => {
    const valueArray = allowMultiple && Array.isArray(value) ? value : [value];
    return valueArray.map((v) =>
      findIndex(standardOptions, (opt) => isEqual(opt.value, v)),
    );
  }, [standardOptions, value]);

  // for the dropdown
  const selectedIndiciesStr = useMemo(
    () => selectedIndicies.map((n) => n.toString()),
    [selectedIndicies],
  );

  if (variant === "dots") {
    return (
      <div className={css("")}>
        {standardOptions.map((opt, index) => (
          <span key={index} className={css("dot")}>
            <CircularMetric
              size={size}
              variant={
                disabled
                  ? TColorVariants.Disabled
                  : selectedIndicies.indexOf(index) > -1
                  ? TColorVariants.Active
                  : TColorVariants.Primary
              }
              onClick={() =>
                onInputChange(
                  allowMultiple ? xor([opt.value], value) : opt.value,
                )
              }
            >
              {opt.label}
            </CircularMetric>
          </span>
        ))}
      </div>
    );
  }

  if (variant === "icons") {
    return (
      <div className={css("", "-icons")}>
        {standardOptions.map((opt, index) => (
          <span key={index} className={css("icon")}>
            <CircularIcon
              name={opt.icon || "tick"}
              variant={
                disabled
                  ? TColorVariants.Disabled
                  : selectedIndicies.indexOf(index) > -1
                  ? TColorVariants.Active
                  : TColorVariants.Primary
              }
              onClick={() =>
                onInputChange(
                  allowMultiple ? xor([opt.value], value) : opt.value,
                )
              }
              size={EStandardSizes.Medium}
            />
            <label>{opt.label}</label>
          </span>
        ))}
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={css("")}>
        <Disable disabled={disabled}>
          <Grid>
            {standardOptions.map((opt, index) => (
              <Button
                key={index}
                size={size}
                isBlock={true}
                variant={
                  selectedIndicies.indexOf(index) > -1 ? "primary" : "secondary"
                }
                status={disabled ? TColorVariants.Disabled : null}
                onClick={() =>
                  onInputChange(
                    allowMultiple ? xor([opt.value], value) : opt.value,
                  )
                }
              >
                {opt.label}
              </Button>
            ))}
          </Grid>
        </Disable>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={css("")}>
        <Disable disabled={disabled}>
          <InlineOptions size={size}>
            {standardOptions.map((opt, index) => (
              <Option
                key={index}
                selected={selectedIndicies.indexOf(index) > -1}
                onClick={() =>
                  onInputChange(
                    allowMultiple ? xor([opt.value], value) : opt.value,
                  )
                }
              >
                {opt.label}
              </Option>
            ))}
          </InlineOptions>
        </Disable>
      </div>
    );
  }

  if (variant === "dropdown") {
    return (
      <div className={css("")}>
        <select
          onChange={(evt) => {
            const indicies: string[] = [];
            if (allowMultiple) {
              const options = evt.target.options;
              for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                  indicies.push(options[i].value);
                }
              }
            } else {
              indicies.push(evt.target.value);
            }
            const values = indicies.map(
              (i) => standardOptions[parseInt(i)].value,
            );
            onInputChange(allowMultiple ? values : values[0]);
          }}
          value={allowMultiple ? selectedIndiciesStr : selectedIndiciesStr[0]}
          multiple={allowMultiple}
          disabled={disabled}
          className={sharedStyles.Input}
        >
          {standardOptions.map((v: any, i: number) => (
            <option key={v.label} value={i}>
              {v.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // unknown variant
  return null;
};

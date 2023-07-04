import * as React from "react";

import { standardizeOptions } from "../../../helpers/standardizeOptions";

import { SingleOptionsInput } from "../SingleOptionsInput";
import { MultiOptionsInput } from "../MultiOptionsInput";
import {
  ButtonOptionsInput,
  IButtonOptionsInputProps,
} from "../ButtonOptionsInput";

/**
 * Provides an input to select from a number of provided options. Dynamically
 * changes style based on the options provided.
 */

export interface IDynamicOptionsprops<T> extends IButtonOptionsInputProps<T> {
  placeholderValue?: string;
  disabled?: boolean;
}

export const DynamicOptionsInput = <T extends any>({
  options,
  value,
  allowMultiple,
  onInputChange,
  placeholderValue,
  disabled,
  autoOrder,
}: IDynamicOptionsprops<T>) => {
  const stdOptions = standardizeOptions(options, autoOrder);

  if (stdOptions.length < 3) {
    return (
      <span
        data-test="buttonOptionsInput"
        data-dynamic-input="ButtonOptionsInput"
      >
        <ButtonOptionsInput
          options={options}
          value={value}
          allowMultiple={allowMultiple}
          onInputChange={onInputChange}
          disabled={disabled}
        />
      </span>
    );
  } else if (allowMultiple) {
    return (
      <span
        data-test="multiOptionsInput"
        data-dynamic-input="MultiOptionsInput"
      >
        <MultiOptionsInput
          options={options}
          value={value}
          onInputChange={onInputChange}
          disabled={disabled}
        />
      </span>
    );
  } else {
    return (
      <span
        data-test="singleOptionsInput"
        data-dynamic-input="SingleOptionsInput"
      >
        <SingleOptionsInput
          options={options}
          value={value}
          onInputChange={onInputChange}
          placeholder={placeholderValue}
          disabled={disabled}
        />
      </span>
    );
  }
};

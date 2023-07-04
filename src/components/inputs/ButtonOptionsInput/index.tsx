import * as React from "react";
import * as _ from "lodash";

import { InlineOptions, Option } from "../../generic/InlineOptions";

import {
  standardizeOptions,
  StdOptions,
} from "../../../helpers/standardizeOptions";
import { isValueInOptions } from "../../../helpers/isValueInOptions";
import { TextInput } from "../TextInput";

export interface IButtonOptionsInputProps<T> {
  options: T[];
  value: T | T[];
  autoOrder?: boolean;
  allowMultiple?: boolean;
  onInputChange: (value: T | T[]) => void;
  disabled?: boolean;
  optionValue?: string;
}

export interface IButtonOptionsInputState<T> {
  value: T | T[];
}

export class ButtonOptionsInput<T> extends React.Component<
  IButtonOptionsInputProps<T>,
  IButtonOptionsInputState<T>
> {
  private options: StdOptions<T>;
  private name: string;

  constructor(props: IButtonOptionsInputProps<T>) {
    super(props);
    this.state = {
      value: props.value,
    };

    this.options = standardizeOptions(this.props.options, this.props.autoOrder);

    // check that allow multiple is used appropriately
    if (
      props.allowMultiple &&
      props.allowMultiple !== Array.isArray(props.value)
    ) {
      throw new Error("allowMultiple is not consistent with value");
    }

    // Replace any matching objects with the current value to make the comparison
    // a pointer comparison - needed for the validation
    this.options = this.options.map((o) => {
      // updates the pointer
      (Array.isArray(props.value) ? props.value : [props.value]).forEach(
        (v) => {
          if (_.isEqual(o.value, v)) {
            o.value = v;
          }
        },
      );
      return o;
    });

    this.name = _.uniqueId("name");
  }

  UNSAFE_componentWillReceiveProps(nextProps: IButtonOptionsInputProps<T>) {
    // TODO - sanitise the data
    if (_.has(nextProps, "value")) {
      this.setState({ value: nextProps.value });
    }
  }

  // Toggles one of the values
  toggleValue = (v: T) => {
    if (!Array.isArray(this.state.value)) {
      throw Error("Cannot call toggle value with non array values");
    }
    const value = _.xor(this.state.value, [v]);
    this.setValue(value);
  };

  // Sets the values
  setValue = (value: T | T[]) => {
    this.setState({ value });
    this.props.onInputChange(value);
  };

  render() {
    let allowMultipleDataTag;
    const selectedValueArray = _.isArray(this.state.value)
      ? this.state.value
      : [this.state.value];

    this.props.allowMultiple
      ? (allowMultipleDataTag = "multiple")
      : (allowMultipleDataTag = "single");

    if (!isValueInOptions(this.options, this.props.value)) {
      return (
        <TextInput
          onInputChange={() => {}}
          disabled={true}
          value={
            Array.isArray(this.state.value)
              ? this.state.value.join(", ")
              : this.state.value.toString()
          }
        />
      );
    }

    return (
      <div data-test="inline-options" data-input-type={allowMultipleDataTag}>
        <InlineOptions>
          {this.options.map((option) => {
            const selected = selectedValueArray.indexOf(option.value) > -1;
            const onClick = () => {
              this.props.allowMultiple
                ? this.toggleValue(option.value)
                : this.setValue(option.value);
            };
            return (
              <Option
                key={option.label}
                selected={selected}
                disabled={this.props.disabled}
                onClick={onClick}
                allowMultiple={this.props.allowMultiple}
                name={this.name}
              >
                <div data-value={option.label}>{option.label}</div>
              </Option>
            );
          })}
        </InlineOptions>
      </div>
    );
  }
}

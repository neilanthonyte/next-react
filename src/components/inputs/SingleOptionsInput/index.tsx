import * as React from "react";

import { standardizeOptions } from "../../../helpers/standardizeOptions";
import { TextInput } from "../TextInput";
import { isValueInOptions } from "../../../helpers/isValueInOptions";
import { BaseInput, IBaseInputProps, IBaseInputState } from "../BaseInput";

import sharedStyles from "../styles.scss";

export type IFormattedOption = {
  label: string;
  value: any;
};

/**
 * Options are formatted internally by this component.
 *
 * If you pass in an array of strings, this input will format that to be an object that looks like `IFormattedOptions`
 * a value will be assigned to that string.
 */
export type IOptions = IFormattedOption[] | string[] | IFormattedOption | any;

/**
 * @param options - Provides an array or an object that will be shown on the form.
 * @param onInputChange - A function called on every value change. First parameter is the value.
 * @param value - The value prop is the current value of the field. If a value is passed it will provide a default value.
 * @param placeholder - Sets the initial value of the dropdown menu. If it is blank "Please Select..." will be displayed.
 * @param placeholderIndex - Sets the location that the dropdown menu opens.
 * @param disabled - Disables input, but still shows value if value is passed as a prop.
 * @param autoOrder - Orders the array using the values.
 */
export interface ISingleOptionsProps extends IBaseInputProps<any> {
  options: IOptions;
  onInputChange: (newVal: any) => void;
  value: any;
  placeholder?: string;
  placeholderIndex?: string | number;
  disabled?: boolean;
  autoOrder?: boolean;
  variant?: string;
}

export interface ISingleOptionsState extends IBaseInputState {
  value: any;
  formattedOptions: IFormattedOption[];
}

export class SingleOptionsInput extends BaseInput<
  string,
  ISingleOptionsProps,
  ISingleOptionsState
> {
  constructor(props: ISingleOptionsProps) {
    super(props);
    this.state = {
      ...this.state,
      value: props.value,
      formattedOptions: this.getFormattedOptions(this.props.options),
    };
  }

  getFormattedOptions(options: any) {
    const placeholder = this.props.placeholder || "Please Select...";

    const formattedOptions = standardizeOptions(
      options,
      this.props.autoOrder,
    ).slice();

    const placeholderIndex = this.getPlaceholderIndex(options);

    /**
     * This logic adds the placeholder to the options array.
     * This can be the start, finish, or a defined index through the placeholder index prop.
     */
    formattedOptions.splice(placeholderIndex, 0, {
      value: "",
      label: placeholder,
    });

    return formattedOptions;
  }

  getPlaceholderIndex(options: any[]) {
    let placeholderIndex = 0;
    if (this.props.placeholderIndex === "TOP") {
      placeholderIndex = 0;
    } else if (this.props.placeholderIndex === "BOTTOM") {
      placeholderIndex = options.length;
    } else if (this.props.placeholderIndex) {
      placeholderIndex = this.props.placeholderIndex as number;
    }
    return placeholderIndex;
  }

  componentDidUpdate(
    previousProps: ISingleOptionsProps,
    previousState: ISingleOptionsState,
  ) {
    // options have changed, reformat and save.
    if (previousProps.options !== this.props.options) {
      this.setState({
        formattedOptions: this.getFormattedOptions(this.props.options),
      });
    }

    // suggestion for this input has change, reformat and save.
    if (previousState.suggestion !== this.state.suggestion) {
      if (!this.state.suggestion || !this.state.suggestion.data) {
        return;
      }
      this.setState({
        formattedOptions: this.getFormattedOptions(this.state.suggestion.data),
      });
    }
  }

  componentWillReceiveProps(nextProps: ISingleOptionsProps) {
    this.setState({ value: nextProps.value });
  }

  // Sets the values
  setValue = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const value = evt.target.value
      ? this.state.formattedOptions[parseInt(evt.target.value)].value
      : undefined;
    this.setState({ value: value });
    super.onInputChange(value);
  };

  render() {
    // wait for the options to be formatted
    if (!this.state.formattedOptions) {
      return;
    }

    const selectedIndex = this.state.formattedOptions
      .map((option: any, index: number) => {
        return option.value === this.state.value ? "" + index : false;
      })
      .filter((n: any) => n)[0];

    if (Array.isArray(this.props.value)) {
      return (
        <TextInput
          onInputChange={() => {}}
          disabled={true}
          value={this.state.value}
        />
      );
    }

    if (!isValueInOptions(this.state.formattedOptions, this.props.value)) {
      return (
        <TextInput
          onInputChange={() => {}}
          disabled={true}
          value={this.state.value}
        />
      );
    }

    if (this.state.fetchingSuggestion) {
      return (
        <select disabled={true} className={sharedStyles.Input}>
          <option>Loading...</option>
        </select>
      );
    }

    return (
      <select
        data-test="input"
        onChange={this.setValue}
        value={selectedIndex || ""}
        disabled={this.props.disabled}
        className={sharedStyles.Input}
      >
        {this.state.formattedOptions.map((v: any, i: number) => {
          return (
            <option
              key={v.label}
              value={i}
              data-test={`option-${v.value}`}
              data-value={JSON.stringify(v.value)}
            >
              {v.label}
            </option>
          );
        })}
      </select>
    );
  }
}

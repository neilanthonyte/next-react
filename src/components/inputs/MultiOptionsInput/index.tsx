import * as React from "react";

import { standardizeOptions } from "../../../helpers/standardizeOptions";
import { isValueInOptions } from "../../../helpers/isValueInOptions";
import { TextInput } from "../TextInput";
import sharedStyles from "../styles.scss";

/**
 * @param options - Provides an array or an object that will be shown on the form.
 * @param onInputChange - A function called on every value change. First parameter is the value.
 * @param value - The value prop is the current value of the field. If a value is passed it will provide a default value.
 * @param disabled - Disables input, but still shows value if value is passed as a prop.
 */
export interface IMultiOptionsInputProps {
  options: Array<any> | Object;
  onInputChange: Function;
  value?: any; // TODO: was Array in proptypes, but is given to a component expecting a string.
  disabled?: boolean;
}

export interface IMultiOptionsInputState {
  value: any; // TODO: was Array in proptypes, but is given to a component expecting a string.
}

export class MultiOptionsInput extends React.Component<
  IMultiOptionsInputProps,
  IMultiOptionsInputState
> {
  private options: any;

  constructor(props: IMultiOptionsInputProps) {
    super(props);
    // Sanitize props to make sure they are an array
    this.state = {
      value: props.value,
    };

    this.options = standardizeOptions(this.props.options);
  }

  UNSAFE_componentWillReceiveProps(nextProps: IMultiOptionsInputProps) {
    this.setState({ value: nextProps.value });
  }

  // Sets the values
  setValue = (value: any) => {
    this.setState({ value: value });
    this.props.onInputChange(value);
  };

  selectValues = (evt: any, options: any) => {
    // Look the value up by index, thereby honouring its original type. Allows for
    // numeric values

    // NOTE: evt.selectedOptions is not supported in older browsers or styleguidist
    const clickedOptions = evt.target.options || [];
    const value = [];
    // map over clicked.options
    // TODO evt.target.options is an object. Cant map an object
    for (let i = 0; i < clickedOptions.length; i++) {
      if (clickedOptions[i].selected) {
        value.push(clickedOptions[i].value);
      }
    }

    this.setValue(
      value.map((o) => {
        return options[parseInt(o)].value;
      }),
    );
  };

  render() {
    const { value } = this.state;

    const selectedIndicies = this.options
      .map((option: any, index: number) => {
        return value.indexOf(option.value) > -1 ? index.toString() : false;
      })
      .filter((n: any) => {
        return n;
      });

    if (!isValueInOptions(this.options, this.props.value)) {
      return (
        <TextInput
          onInputChange={() => {}}
          disabled={true}
          value={this.state.value}
        />
      );
    }

    return (
      <select
        data-test="input"
        onChange={(evt) => {
          this.selectValues(evt, this.options);
        }}
        value={selectedIndicies}
        multiple={true}
        disabled={this.props.disabled}
        className={sharedStyles.Input}
      >
        {this.options.map((v: any, i: number) => (
          <option key={v.label} value={i}>
            {v.label}
          </option>
        ))}
      </select>
    );
  }
}

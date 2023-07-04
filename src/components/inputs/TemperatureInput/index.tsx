import * as React from "react";

import { INumberInputProps, NumberInput } from "../NumberInput";
import { useTemperatureMetric } from "../../../hooks/useTemperatureMetric";
import { fahrenheitToCelsius } from "../../../helpers/fahrenheitToCelsius";
import { celsiusToFahrenheit } from "../../../helpers/celsiusToFahrenheit";

const valueToNumeric = (value: any, asCelsius: boolean) => {
  // try to coerce into a number
  const numValue =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.length > 0
      ? parseFloat(value)
      : null;

  const convertedValue =
    numValue !== null ? (asCelsius ? value : celsiusToFahrenheit(value)) : null;

  return convertedValue;
};

export interface ITemperatureInputProps extends INumberInputProps {
  fractionDigits: number;
}

export interface IInnerTemperatureInputProps extends ITemperatureInputProps {
  asCelsius: boolean;
}

export interface IInnerTemperatureInputState {
  inputValue: number;
}

class InnerTemperatureInput extends React.Component<
  IInnerTemperatureInputProps,
  IInnerTemperatureInputState
> {
  private lastValue: number;

  constructor(props: IInnerTemperatureInputProps) {
    super(props);
    this.state = {
      // the input value - kept seperate to the value prop due the conversion, which could cause an update cycle
      inputValue: valueToNumeric(props.value, props.asCelsius),
    };
    this.onTempChange = this.onTempChange.bind(this);
    this.lastValue = -1;
  }
  UNSAFE_componentWillReceiveProps(newProps: IInnerTemperatureInputProps) {
    // avoid hearing our own updates
    if (newProps.value !== this.lastValue) {
      this.setState({
        inputValue: valueToNumeric(newProps.value, newProps.asCelsius),
      });
    }
  }
  onTempChange(value: any) {
    const parsedValue = this.props.asCelsius
      ? value
      : fahrenheitToCelsius(value);

    // keep the input up to date
    this.setState({ inputValue: value });
    // remember what we've reported
    this.lastValue = parsedValue;
    this.props.onInputChange(parsedValue);
  }
  render() {
    const { asCelsius, ...rest } = this.props;
    return (
      <NumberInput
        {...rest}
        value={this.state.inputValue}
        onInputChange={this.onTempChange}
        placeholder={asCelsius ? "Celsius" : "Fahrenheit"}
      />
    );
  }
}

export const TemperatureInput: React.FC<ITemperatureInputProps> = (props) => {
  const asCelsius = useTemperatureMetric() === "metric";
  return <InnerTemperatureInput {...props} asCelsius={asCelsius} />;
};

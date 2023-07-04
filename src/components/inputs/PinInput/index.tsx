import * as React from "react";
import ReactCodeInput from "react-code-input";

/**
 * @param value - The value prop is the current value of the field. If a value is passed it will provide a default value.
 * @param length - The fields prop specifies how many fields. If not included it will default to four.
 * @param onInputChange - A function called on every value change. First parameter is the value.
 */
export interface IPinInputProps {
  value?: any;
  length: number;
  onInputChange: Function;
}

/**
 * Provides a pin input.
 */
export class PinInput extends React.Component<IPinInputProps> {
  private clearCount: number;

  constructor(props: IPinInputProps) {
    super(props);
    this.clearCount = 0;
  }

  UNSAFE_componentWillReceiveProps(newProps: IPinInputProps) {
    if (
      newProps.value !== this.props.value &&
      [null, ""].indexOf(newProps.value) > -1
    ) {
      this.clearCount++;
    }
  }
  render() {
    const { value, onInputChange, length }: IPinInputProps = this.props;
    if (!length) {
      throw new Error("length must be set and greater than 0");
    }
    return (
      <span data-test="pin-input">
        <ReactCodeInput
          key={this.clearCount}
          data-test="input"
          type="text"
          fields={length}
          onChange={onInputChange}
          value={value || ""}
          inputStyle={{
            fontFamily: "monospace",
            borderRadius: "6px",
            border: "1px solid lightgrey",
            // boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 0px",
            margin: "4px",
            // paddingLeft: "8px",
            padding: 0,
            width: "36px",
            // flexGrow: 1,
            textAlign: "center",
            height: "42px",
            fontSize: "32px",
            boxSizing: "border-box",
            color: "black",
            backgroundColor: "white",
          }}
        />
      </span>
    );
  }
}

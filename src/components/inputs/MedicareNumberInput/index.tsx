import * as React from "react";

import { NumberKeypad } from "../../generic/Keypad";
import { Collapse } from "../../generic/Collapse";
import { keypadActions } from "../../generic/Keypad/helpers/keypadActions";
import sharedStyles from "../styles.scss";

import styles from "./styles.scss";

const DELETE_KEY = 8;

export interface IMedicareNumberInputProps {
  value?: any;
  onInputChange: (...args: any[]) => any;
  hideKeypad?: boolean;
  disabled?: boolean;
}

export interface IMedicareNumberInputState {
  value: any;
  showKeypad: boolean;
}

/**
 * Renders a Medicare number input
 */
export class MedicareNumberInput extends React.Component<
  IMedicareNumberInputProps,
  IMedicareNumberInputState
> {
  private delayedKeypadHide: any;
  private irnInput: React.RefObject<any>;
  private medicareInput: React.RefObject<any>;

  constructor(props: IMedicareNumberInputProps) {
    super(props);
    this.state = {
      value: (props.value && this.formatValue(props.value)) || "",
      showKeypad: false,
    };
    this.delayedKeypadHide = null;
    this.irnInput = React.createRef();
    this.medicareInput = React.createRef();
  }
  announceChange = () => {
    this.props.onInputChange(this.state.value);
  };

  formatValue = (value: any) =>
    value === null
      ? ""
      : value
          .substr(0, 11)
          .replace(/^(\d{4}) ?(\d{0,5}) ?(\d{0,1})/, "$1$2$3")
          .trim();
  // set focus on the relevant input based on how many numbers have been entered
  updateFocus = () => {
    // ensure we're working with a spaceless value
    const value = this.state.value.replace(/\s/g, "");
    if (value.length >= 10) {
      if (document.activeElement !== this.irnInput.current) {
        this.irnInput.current.focus();
      }
    } else {
      if (document.activeElement !== this.medicareInput.current) {
        this.medicareInput.current.focus();
      }
    }
    // ensure the keypad is still showing
    setTimeout(this.updateKeypad);
  };
  setValue = (value: any) => {
    value = this.formatValue(value);
    this.setState(
      {
        value,
      },
      () => {
        // update the focus and blur when all numbers have been entered
        if (value && value.length >= 13) {
          this.updateKeypad();
        } else {
          this.updateFocus();
        }
        this.announceChange();
      },
    );
  };
  clearDelayedKeypadHide = () => {
    if (this.delayedKeypadHide) {
      clearTimeout(this.delayedKeypadHide);
      this.delayedKeypadHide = null;
    }
  };
  updateKeypad = () => {
    if (this.props.hideKeypad) {
      return;
    }
    // sets the boolean that will decide if the keypad will be shown
    const shouldShowKeypad =
      document.activeElement === this.medicareInput.current ||
      document.activeElement === this.irnInput.current;
    // highlights the current value in the irn field if there is already a value
    if (document.activeElement === this.irnInput.current) {
      this.irnInput.current.select();
    }
    // shows keypad if the medicareInput or irnInput fields are active
    if (shouldShowKeypad) {
      this.clearDelayedKeypadHide();
      this.setState({ showKeypad: true });
    } else {
      this.delayedKeypadHide = setTimeout(() => {
        this.setState({ showKeypad: false });
      }, 500);
    }
  };
  onKeySelect = (selected: any) => {
    const { value: currentValue } = this.state;
    // avoid losing focus
    clearTimeout(this.delayedKeypadHide);
    switch (selected.action) {
      case keypadActions.BACKSPACE: {
        const valueWithNoWhitespace = currentValue.replace(/\s/g, "");
        this.setValue(
          valueWithNoWhitespace.substring(0, valueWithNoWhitespace.length - 1),
        );
        return;
      }
    }
    // only updates the value if there are less than 11 numbers.
    // keeps the medicare number from going too long and becoming invalid
    const newValue = currentValue.substr(0, 10) + selected.value;
    this.setValue(newValue);
  };

  UNSAFE_componentWillReceiveProps(nextProps: IMedicareNumberInputProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: this.formatValue(nextProps.value) });
    }
  }
  // Formats with regex when input receives a default value
  componentDidMount() {
    this.formatValue(this.state.value);
  }
  render() {
    const { value: currentValue, showKeypad } = this.state;
    // Checks current value is not null before it uses substring
    const medicareValue = currentValue ? currentValue.substring(0, 10) : "";
    const irnValue = currentValue ? currentValue.substring(10) : "";

    // @ts-ignore
    return (
      <div data-test="input">
        <div className={styles.MedicareNumberInput}>
          <input
            type="text"
            data-test="medicare-number"
            pattern={"[0-9]*"}
            ref={this.medicareInput}
            onChange={(evt) => {
              this.setValue(evt.target.value + irnValue);
            }}
            onFocus={this.updateKeypad}
            onBlur={this.updateKeypad}
            value={medicareValue}
            placeholder={"Medicare Number: XXXX XXXXX X"}
            disabled={this.props.disabled}
            className={sharedStyles.Input}
          />
          <input
            type="text"
            data-test="irn-number"
            pattern={"[0-9]*"}
            ref={this.irnInput}
            value={irnValue}
            placeholder="IRN"
            onChange={(evt) => {
              this.setValue(medicareValue + evt.target.value);
            }}
            onKeyDown={(evt) => {
              if (evt.keyCode === DELETE_KEY) {
                const value = currentValue.substring(
                  0,
                  currentValue.length - 1,
                );
                // prevents the event from being performed on the medicare input
                setTimeout(() => this.setValue(value));
              }
            }}
            onFocus={this.updateKeypad}
            onBlur={this.updateKeypad}
            disabled={this.props.disabled}
            className={sharedStyles.Input}
          />
        </div>
        <Collapse
          isOpened={showKeypad}
          onClick={() => {
            // refocus the input
            // HACK - wait for the state to update in the event a value key was struck
            // TODO - stop propagation in keypad
            setTimeout(() => {
              this.updateFocus();
            });
          }}
        >
          <div data-test="medicare-keypad">
            <NumberKeypad onKeySelect={this.onKeySelect} />
          </div>
        </Collapse>
      </div>
    );
  }
}

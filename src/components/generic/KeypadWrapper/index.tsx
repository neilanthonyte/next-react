import * as React from "react";
import * as _ from "lodash";

import { KeypadOptions } from "../Keypad/types";
import { Collapse } from "../Collapse";
import { Keypad } from "../Keypad";
import { keypadActions } from "../Keypad/helpers/keypadActions";

// TODO: Type defs of props needed
/**
 * @param inputComponent - specifies the component that the keypad will be rendered with.
 * @param keypadOptions - provides the DOM keypad to be used with the input field.
 * @param keypadComponent - provides the component to be used as the DomKeyboard with the input field.
 */
export interface IKeypadWrapperProps {
  inputComponent?: any;
  keypadOptions?: Array<any>;
  keypadComponent?: any;
  replace?: boolean | KeypadOptions;
  alwaysShowKeypad?: boolean;
}

export interface IKeypadWrapperState {
  showKeypad: boolean;
}

export class KeypadWrapper extends React.Component<
  IKeypadWrapperProps,
  IKeypadWrapperState
> {
  private changeMadeRecently: boolean;
  private closeKeypadTimeout: any;
  private changeMadeTimeout: any;
  private inputComponent: any;

  constructor(props: IKeypadWrapperProps) {
    super(props);
    this.state = {
      showKeypad: props.alwaysShowKeypad ? true : false,
    };
    this.changeMadeRecently = null;
    this.closeKeypadTimeout = null;
    this.changeMadeRecently = false;
  }

  componentDidMount(): void {
    // ensure only one input component can be wrapped and exist.
    const inputComponent = this.inputComponent.querySelectorAll("input");
    if (inputComponent instanceof NodeList && inputComponent.length > 0) {
      console.warn(
        "Should only have on instance of an input component in KeypadWrapper.",
      );
    }
  }

  render() {
    const InputComponent = this.props.inputComponent;
    const { keypadOptions, keypadComponent } = this.props;

    const KeypadComponent = keypadComponent ? (
      keypadComponent
    ) : (
      <Keypad options={keypadOptions} />
    );
    /**
     * Whenever a user interacts with the keypad inputs, this function is called.
     * It essentially ensures that the keypad will not blur away for *atleast* another 5000 ms.
     */
    const inputChange = () => {
      clearTimeout(this.changeMadeTimeout);
      (this.changeMadeRecently = true),
        (this.changeMadeTimeout = setTimeout(() => {
          this.changeMadeRecently = false;
        }, 5000));
    };

    /**
     * Whenever the blur event is called on the actual input component, this will first check to see if a change has been made recently.
     * If a change has been made it will just recall itself until a change has not been made, at which point it will close the keypad.
     */
    const handleBlur = () => {
      clearTimeout(this.closeKeypadTimeout);
      this.closeKeypadTimeout = setTimeout(() => {
        this.changeMadeRecently
          ? handleBlur()
          : this.setState({
              showKeypad: this.props.alwaysShowKeypad ? true : false,
            });
      }, 500);
    };

    return (
      <div>
        {React.cloneElement(InputComponent, {
          ref: (x: any) => (this.inputComponent = x),
          onBlur: handleBlur,
          onFocus: () => this.setState({ showKeypad: true }),
        })}
        <Collapse isOpened={this.state.showKeypad}>
          {React.cloneElement(KeypadComponent, {
            onKeySelect: (selected: any) => {
              inputChange();

              // just in case the input component is wrapped in other elements
              const tagName = this.inputComponent.tagName.toLowerCase();
              this.inputComponent =
                tagName === "input"
                  ? this.inputComponent
                  : this.inputComponent.querySelector("input");

              const inputValue = this.inputComponent.value;
              const inputReplace = this.props.replace;

              // updates the input value and triggers events in a react friendly way
              const updateInput = (val: any) => {
                // https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                  HTMLInputElement.prototype,
                  "value",
                ).set;
                nativeInputValueSetter.call(this.inputComponent, val);

                const event = new Event("input", { bubbles: true });
                this.inputComponent.dispatchEvent(event);
              };

              if (typeof selected.value !== "undefined") {
                // replace current input with new value
                if (inputReplace === true) {
                  updateInput(selected.value);
                  return;
                }

                let oldValue = inputValue;

                // strip existing replace values
                if (
                  Array.isArray(inputReplace) &&
                  typeof oldValue === "string"
                ) {
                  inputReplace.map((o) => {
                    const value = o.label;
                    if (oldValue.endsWith(value)) {
                      oldValue = oldValue.substring(
                        0,
                        oldValue.length - value.length,
                      );
                    }
                  });
                }

                const newValue =
                  oldValue === null
                    ? selected.value
                    : oldValue + selected.value;

                updateInput(newValue);
              } else if (_.has(selected, "action")) {
                switch (selected.action) {
                  case keypadActions.BACKSPACE:
                    updateInput(inputValue.substring(0, inputValue.length - 1));
                    break;
                }
              }
            },
          })}
        </Collapse>
      </div>
    );
  }
}
